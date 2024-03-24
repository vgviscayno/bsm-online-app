"use client";
import EnterOTP from "@/app/auth/verify/EnterOTP";
import Image from "next/image";
import React from "react";
import EnterPhoneNumber from "./EnterPhoneNumber";

import AlertEnterOTPError from "@/app/auth/verify/AlertEnterOTPError";
import { permanentRedirect } from "next/navigation";

export default function VerifyPhoneNumberPage() {
  const [phoneNumberToBeVerified, setPhoneNumberToBeVerified] = React.useState<
    string | null
  >(null);

  const [
    phoneNumberToBeVerifiedIsNullWhileHandleEnterOTPIsRunning,
    setPhoneNumberToBeVerifiedIsNullWhileHandleEnterOTPIsRunning,
  ] = React.useState<boolean>(false);

  return (
    <main className="flex flex-col h-svh mr-auto ml-auto space-y-3 p-3 items-center">
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
      {/* In theory, the app shouldn't be in this state, but just in case, */}
      {/* This component is here if ever the app ends in this state */}
      <AlertEnterOTPError
        open={phoneNumberToBeVerifiedIsNullWhileHandleEnterOTPIsRunning}
        onOpenChange={() => {
          if (!phoneNumberToBeVerifiedIsNullWhileHandleEnterOTPIsRunning) {
            permanentRedirect("/auth/verify");
          }
          setPhoneNumberToBeVerifiedIsNullWhileHandleEnterOTPIsRunning(
            !phoneNumberToBeVerifiedIsNullWhileHandleEnterOTPIsRunning
          );
        }}
      />
    </main>
  );
}
