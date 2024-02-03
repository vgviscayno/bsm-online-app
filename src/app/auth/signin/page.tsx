"use client";
import GoogleLogo from "@/components/GoogleLogo";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Image from "next/image";
import SignInWithCredentialsForm, {
  SignInWithCredentialsFormValues,
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
      <Button
        className="w-5/12"
        variant="outline"
        size="lg"
        onClick={function (e) {
          signIn("google", {
            callbackUrl: "/store",
            redirect: true,
          });
        }}
      >
        <GoogleLogo className="mr-3" width={30} height={30} />
        Sign in with Google
      </Button>
      <p>or</p>
      <SignInWithCredentialsForm onSignIn={handleSignInWithCredentials} />
    </main>
  );
}
