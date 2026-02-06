"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { Logo } from "~/components/ui/logo";
import { api } from "~/lib/trpc/client";

interface ResetPasswordPageProps {
  params: Promise<{ token: string }>;
}

export default function ResetPasswordPage({ params }: ResetPasswordPageProps) {
  const { token } = use(params);
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const { data: tokenData, isLoading: isValidating } =
    api.user.validatePasswordResetToken.useQuery({ token });

  const resetMutation = api.user.resetPassword.useMutation({
    onSuccess: () => {
      setSuccess(true);
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    resetMutation.mutate({ token, password });
  }

  if (isValidating) {
    return (
      <Card className="w-full max-w-md border-border/50 shadow-2xl">
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  if (!tokenData?.valid) {
    return (
      <Card className="w-full max-w-md border-border/50 shadow-2xl">
        <CardHeader className="space-y-1 pt-12 text-center">
          <Logo className="mx-auto mb-4" width={48} height={48} />
          <XCircle className="mx-auto h-12 w-12 text-destructive" />
          <CardTitle className="text-2xl font-bold tracking-tight">
            Invalid Reset Link
          </CardTitle>
          <CardDescription>
            {tokenData?.reason || "This password reset link is invalid or has expired."}
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex flex-col space-y-4 px-8 pb-8">
          <p className="text-center text-sm text-muted-foreground">
            Please contact an administrator to request a new reset link.
          </p>
          <Button asChild variant="outline" className="w-full">
            <Link href="/sign-in">Back to sign in</Link>
          </Button>
        </CardFooter>
      </Card>
    );
  }

  if (success) {
    return (
      <Card className="w-full max-w-md border-border/50 shadow-2xl">
        <CardHeader className="space-y-1 pt-12 text-center">
          <Logo className="mx-auto mb-4" width={48} height={48} />
          <CheckCircle2 className="mx-auto h-12 w-12 text-green-500" />
          <CardTitle className="text-2xl font-bold tracking-tight">
            Password Reset Complete
          </CardTitle>
          <CardDescription>
            Your password has been successfully reset. You can now sign in with your new password.
          </CardDescription>
        </CardHeader>
        <CardFooter className="px-8 pb-8">
          <Button
            className="w-full"
            onClick={() => router.push("/sign-in")}
          >
            Sign in
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md border-border/50 shadow-2xl">
      <CardHeader className="space-y-1 pt-12 text-center">
        <Logo className="mx-auto mb-4" width={48} height={48} />
        <CardTitle className="text-2xl font-bold tracking-tight">
          Reset Your Password
        </CardTitle>
        <CardDescription>
          Hi {tokenData.user?.displayName}, enter a new password for your account.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4 px-8">
          {error && (
            <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="password">New Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
              disabled={resetMutation.isPending}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              autoComplete="new-password"
              disabled={resetMutation.isPending}
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 px-8 pb-8">
          <Button
            type="submit"
            className="w-full"
            disabled={resetMutation.isPending}
          >
            {resetMutation.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Reset Password
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Remember your password?{" "}
            <Link
              href="/sign-in"
              className="font-medium text-primary hover:underline"
            >
              Sign in
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
