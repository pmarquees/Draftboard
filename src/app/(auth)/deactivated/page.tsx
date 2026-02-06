"use client";

import { useEffect } from "react";
import { signOut } from "next-auth/react";
import { Loader2 } from "lucide-react";

export default function DeactivatedPage() {
  useEffect(() => {
    // Sign out and redirect to sign-in with a message
    signOut({ callbackUrl: "/sign-in?error=deactivated" });
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      <p className="mt-4 text-muted-foreground">Signing out...</p>
    </div>
  );
}
