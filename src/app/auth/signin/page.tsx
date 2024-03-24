"use client";
import Image from "next/image";
import SignInWithCredentialsForm, {
  FormValues as SignInWithCredentialsFormValues,
} from "./SignInWithCredentialsForm";

export default function SignInPage() {
  async function handleSignInWithCredentials(
    values: SignInWithCredentialsFormValues
  ) {
    console.log(values);
  }

  return (
    <main className="flex flex-col w-3/4 h-svh mr-auto ml-auto space-y-3 p-3 items-center">
      <Image
        priority
        src="/bsm-logo-square.png"
        alt="Bestseller Meatshop Logo"
        width={300}
        height={300}
      />
      <SignInWithCredentialsForm onSignIn={handleSignInWithCredentials} />
    </main>
  );
}
