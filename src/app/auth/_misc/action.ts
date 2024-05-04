"use server";
import type { FormValues as EnterPhoneNumberFormValues } from "@/app/auth/_misc/enter-phone-number";
import { db } from "@/db";
import { phoneNumberVerificationTable } from "@/db/schema/users";
import { and, eq } from "drizzle-orm";
import { isValidPhoneNumber } from "libphonenumber-js";
import { generateId } from "lucia";
import { TimeSpan, createDate } from "oslo";

import { alphabet, generateRandomString } from "oslo/crypto";

// generate otp

export async function verifyPhoneNumber({
  phoneNumber,
}: EnterPhoneNumberFormValues) {
  try {
    validatePhoneNumber(phoneNumber);

    // send a code to phone number
    const code = await generatePhoneNumberVerificationCode(phoneNumber);

    const { data, status } = await sendVerificationCodeToPhoneNumber(
      phoneNumber,
      code
    );
    console.log("sendVerificationCodeToPhoneNumber", { data, status });
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return {
        error: error.message,
      };
    } else {
      return {
        error: "Something went wrong, kindly check logs",
      };
    }
  }
}

async function generatePhoneNumberVerificationCode(
  phoneNumber: string
): Promise<string> {
  await db
    .delete(phoneNumberVerificationTable)
    .where(eq(phoneNumberVerificationTable.phoneNumber, phoneNumber));

  // create new one
  const code = generateRandomString(6, alphabet("0-9"));

  await db.insert(phoneNumberVerificationTable).values({
    code,
    expiresAt: createDate(new TimeSpan(3, "m")),
    phoneNumber,
    id: generateId(6),
  });

  return code;
}

function validatePhoneNumber(phoneNumber: string) {
  // validate phone number
  if (!isValidPhoneNumber(phoneNumber, "PH")) {
    throw new Error("Invalid phone number");
  }
}

async function sendVerificationCodeToPhoneNumber(
  phoneNumber: string,
  verificationCode: string
) {
  validatePhoneNumber(phoneNumber);

  const message = `Did you request to log in or sign up using 0${phoneNumber}? If not, PLEASE IGNORE THIS MESSAGE.\n\nOtherwise, your OTP is {otp}.`;

  const payload = {
    apikey: process.env["SEMAPHORE_API_KEY"],
    number: phoneNumber,
    message,
    code: verificationCode,
    sendername: "SEMAPHORE",
  };

  console.log("payload sent to semaphore:", payload);

  // send verification code via sms
  const response = await fetch("https://api.semaphore.co/api/v4/otp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  const status = response.status;

  return {
    data,
    status,
  };
}

// verify otp
export async function verifyOTP(phoneNumber: string, otp: string) {
  const codeAwaitingVerification = await db
    .select()
    .from(phoneNumberVerificationTable)
    .where(
      and(
        eq(phoneNumberVerificationTable.code, otp),
        eq(phoneNumberVerificationTable.phoneNumber, phoneNumber)
      )
    );

  if (codeAwaitingVerification.length > 1) {
    // this is not expected
    // throw error immediately
    console.error(
      "Unexpected error occured: Multiple entries of the ff input has been found",
      {
        phoneNumber,
        otp,
      }
    );
    return {
      root: "Unexpected error occured: verification process will be restarted.",
      reload: true,
    };
  }

  // no table row found
  if (codeAwaitingVerification.length < 1) {
    return {
      root: "Invalid OTP, please enter correct OTP",
    };
  }

  // entry expired?
  if (codeAwaitingVerification[0].expiresAt < new Date()) {
    return {
      root: "OTP has expired, click on resend to send a new one to your phone number",
      resend: true,
    };
  }

  return;
}
