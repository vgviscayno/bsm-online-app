"use client";
import EnterCredentialsForm, {
  formValues as EnterCredentialsFormValues,
} from "@/app/auth/signup/signup-forms/enter-credentials-form";
import VerifyCodeForm, {
  formValues as VerifyCodeFormValues,
} from "@/app/auth/signup/signup-forms/verify-code-form";
import Image from "next/image";
import { useState } from "react";

enum SignUpStep {
  EnterPhoneNumber,
  EnterVerificationCode,
}

export default function SignUpPage() {
  const [currentSignUpStep, setCurrentSignUpStep] = useState<SignUpStep>(
    SignUpStep.EnterPhoneNumber
  );
  let content: React.ReactNode = null;

  async function handleEnterCredentials(values: EnterCredentialsFormValues) {}

  async function handleVerifyCode(values: VerifyCodeFormValues) {}

  switch (currentSignUpStep) {
    default:
    case SignUpStep.EnterPhoneNumber:
      content = (
        <EnterCredentialsForm onEnterCredentials={handleEnterCredentials} />
      );
      break;
    case SignUpStep.EnterVerificationCode:
      content = <VerifyCodeForm onVerifyCode={handleVerifyCode} />;
      break;
  }

  return (
    <section className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="flex space-x-1">
        <Image
          priority
          src="/bsm-logo-square.png"
          alt="Bestseller Meatshop Logo"
          width={200}
          height={200}
          className="mb-4"
        />
      </div>
      {content}
    </section>
  );
}
