"use client";
import EnterOTP from "@/app/auth/_misc/enter-otp";
import Image from "next/image";
import React from "react";
import EnterPhoneNumber from "./_misc/enter-phone-number";

export default function VerifyPhoneNumberPage() {
  const [phoneNumberToBeVerified, setPhoneNumberToBeVerified] = React.useState<
    string | null
  >(null);

  const [
    phoneNumberToBeVerifiedIsNullWhileHandleEnterOTPIsRunning,
    setPhoneNumberToBeVerifiedIsNullWhileHandleEnterOTPIsRunning,
  ] = React.useState<boolean>(false);

  return (
    <section className="flex flex-col h-svh mr-auto ml-auto space-y-3 p-3 items-center">
      <Image
        priority
        src="/bsm-logo-square.png"
        alt="Bestseller Meatshop Logo"
        width={300}
        height={300}
      />
      {phoneNumberToBeVerified !== null ? (
        <EnterOTP
          phoneNumberToBeVerified={phoneNumberToBeVerified}
          setPhoneNumberToBeVerifiedIsNullWhileHandleEnterOTPIsRunning={
            setPhoneNumberToBeVerifiedIsNullWhileHandleEnterOTPIsRunning
          }
        />
      ) : (
        <EnterPhoneNumber
          setPhoneNumberToBeVerified={setPhoneNumberToBeVerified}
        />
      )}
    </section>
  );
}
