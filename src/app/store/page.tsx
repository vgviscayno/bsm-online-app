import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";

export default async function DashboardPage() {
  const session = await getServerSession(options);
  return (
    <React.Fragment>
      {session ? (
        <p>Hi, {session.user?.name}</p>
      ) : (
        <p>
          You shall not pass!{" "}
          <Link href="/api/auth/signin">Please sign in</Link>
        </p>
      )}
    </React.Fragment>
  );
}
