"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { processInvite } from "./actions";

export function InviteProcessor({ token }: { token: string }) {
  const router = useRouter();

  useEffect(() => {
    processInvite(token).then(() => {
      router.replace("/sign-up");
    });
  }, [token, router]);

  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <h1 className="text-2xl font-bold">Join Draftboard</h1>
      <p className="text-muted-foreground">Processing your invite&hellip;</p>
    </div>
  );
}
