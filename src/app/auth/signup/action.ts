"use server";
import type { formValues as signUpFormValues } from "@/app/auth/signup/signup-forms/enter-credentials-form";
import { db } from "@/db";
import { phoneNumberVerificationTable, userTable } from "@/db/schema/users";
import axios from "axios";
import { eq } from "drizzle-orm";
import { isValidPhoneNumber } from "libphonenumber-js";
import { generateId } from "lucia";
import { TimeSpan, createDate } from "oslo";
import { alphabet, generateRandomString } from "oslo/crypto";

export async function signUp({ phoneNumber }: signUpFormValues) {
  try {
    // check if user exists
    const users = await db.query.userTable.findMany({
      where: (users, { eq }) => eq(users.phone_number, phoneNumber),
    });
    const pendingVerificationCodesForPhoneNumber =
      await db.query.phoneNumberVerificationTable.findMany({
        where: (pendingVerificationCodesForPhoneNumber, { eq }) => {
          return eq(
            pendingVerificationCodesForPhoneNumber.phoneNumber,
            phoneNumber
          );
        },
      });

    // user already exists and has a pending verification code that needs to be verified
    if (
      users.length === 1 &&
      pendingVerificationCodesForPhoneNumber.length === 1
    ) {
      // if code has expired, generate new one
      const verificationCodeExpired =
        new Date() > pendingVerificationCodesForPhoneNumber[0].expiresAt;
      const verificationCode = verificationCodeExpired
        ? await generatePhoneNumberVerificationCode(users[0].id, phoneNumber)
        : pendingVerificationCodesForPhoneNumber[0].code;

      // verification code must be generated
      await sendVerificationCodeToPhoneNumber(
        pendingVerificationCodesForPhoneNumber[0].phoneNumber,
        verificationCode
      );
    } else if (users.length > 1) {
      // user already exists
      return {
        error: "Multiple users have already been registered with this number",
      };
    }
  } catch (error) {
    console.error(error);
    return {
      error: "Something went wrong in querying the database",
    };
  }

  try {
    // create user
    const userId = await createUser(phoneNumber);

    try {
      const verificationCode = await generatePhoneNumberVerificationCode(
        userId,
        phoneNumber
      );

      try {
        await sendVerificationCodeToPhoneNumber(phoneNumber, verificationCode);
      } catch (error) {
        console.error(error);
        return {
          error: "something went wrong in sending the verification code",
        };
      }
    } catch (error) {
      console.error(error);
      return {
        error: "something went wrong in creating the verification code",
      };
    }
  } catch (error) {
    console.error(error);
    return {
      error: "Something went wrong in creating the user",
    };
  }

  // getting here will mean that the verification code has been sent to the
  // phone number, so redirect user to enter code page
  return;
}

async function createUser(phoneNumber: string) {
  validatePhoneNumber(phoneNumber);

  // create user
  const userId = generateId(6);

  await db.insert(userTable).values({
    id: userId,
    phone_number: phoneNumber,
  });

  return userId;
}

async function generatePhoneNumberVerificationCode(
  userId: string,
  phoneNumber: string
): Promise<string> {
  validatePhoneNumber(phoneNumber);
  await db
    .delete(phoneNumberVerificationTable)
    .where(eq(phoneNumberVerificationTable.userId, userId));
  const code = generateRandomString(6, alphabet("0-9"));

  await db.insert(phoneNumberVerificationTable).values({
    phoneNumber,
    userId,
    code,
    expiresAt: createDate(new TimeSpan(5, "m")),
  });

  return code;
}

async function sendVerificationCodeToPhoneNumber(
  phoneNumber: string,
  verificationCode: string
) {
  validatePhoneNumber(phoneNumber);

  const payload = {
    apikey: process.env["SEMAPHORE_API_KEY"],
    number: phoneNumber,
    message: "baho ka lubot {otp}",
    code: verificationCode,
    sendername: "SEMAPHORE",
  };

  console.log("payload", payload);

  // send verification code via sms
  const { data, status } = await axios.post(
    "https://api.semaphore.co/api/v4/otp",
    payload
  );

  return {
    data,
    status,
  };
}

function validatePhoneNumber(phoneNumber: string) {
  // validate phone number
  if (!isValidPhoneNumber(phoneNumber, "PH")) {
    throw new Error("Invalid phone number");
  }
}
