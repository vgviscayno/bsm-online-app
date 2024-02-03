import type { AuthOptions } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import { DrizzleAdapter } from "@auth/drizzle-adapter";

import getGoogleProviderCredentials from "@/app/api/auth/[...nextauth]/googleProviderOptions";
import { db } from "../../../../db";
import { phoneCredentialsProviderConfig } from "./phoneCredentialsProvider";

export const options: AuthOptions = {
  providers: [
    GoogleProvider(getGoogleProviderCredentials()),
    CredentialsProvider(phoneCredentialsProviderConfig),
  ],
  // TODO: fix
  // @ts-ignore
  adapter: DrizzleAdapter(db),
  pages: {
    signIn: "/auth/signin",
  },
};
