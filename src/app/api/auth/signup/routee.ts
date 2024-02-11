import { db } from "@/db";
import { phoneNumberVerificationTable, userTable } from "@/db/schema/users";
import { eq } from "drizzle-orm";
import { parsePhoneNumber } from "libphonenumber-js";
import { generateId } from "lucia";
import { TimeSpan, createDate } from "oslo";
import { alphabet, generateRandomString } from "oslo/crypto";
import { z } from "zod";

const schema = z.object({
  phoneNumber: z.string().refine((value) => {
    const phoneNumber = parsePhoneNumber(value, "PH");
    return phoneNumber.isValid();
  }, "invalid phone number"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("body", body);

    const { phoneNumber } = schema.parse(body);

    // check if user exists
    const users = await db.query.userTable.findMany({
      where: (users, { eq }) => eq(users.phone_number, phoneNumber),
    });

    if (users.length > 0) {
      // user already exists
      throw new Error("User already exists");
    }

    // create user
    const userId = generateId(6);

    await db.insert(userTable).values({
      id: userId,
      phone_number: phoneNumber,
    });

    const verificationCode = await generatePhoneNumberVerificationCode(
      userId,
      phoneNumber
    );

    // send verification code to phone number

    return Response.json({});
  } catch (error) {
    return Response.json(error);
  }
}

async function generatePhoneNumberVerificationCode(
  userId: string,
  phoneNumber: string
): Promise<string> {
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
