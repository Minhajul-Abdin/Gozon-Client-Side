"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

import { useState } from "react";
import {
  Card,
  Button,
  Link,
  TextField,
  Label,
  InputGroup,
  Input,
} from "@heroui/react";
import { Eye, EyeSlash, At, ShieldKeyhole } from "@gravity-ui/icons";
import { signIn } from "@/lib/auth-client";

export default function SigninPage() {
  // Form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const searchparams = useSearchParams();
  const redirectTo = searchparams.get("redirect") || "/";

  // UI States
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSignin = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const { data, error: authError } = await signIn.email({
        email,
        password,
      });

      if (authError) {
        setError(authError.message || "Invalid email or password.");
      } else {
        setSuccess("Welcome back! Signing you in...");
        router.push(redirectTo);
      }
    } catch (err) {
      setError(err.message || "An unexpected network error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-zinc-100 flex flex-col items-center justify-center p-4 md:p-6 relative overflow-hidden selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Background Mesh Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md z-10 space-y-6">
        {/* Form Container Card */}
        <Card className="w-full p-6 md:p-8 bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/80 rounded-2xl shadow-[0_24px_50px_-12px_rgba(0,0,0,0.7)]">
          {/* Header Container */}
          <div className="flex flex-col mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-white bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent">
              Welcome back
            </h1>
            <p className="text-zinc-500 text-sm mt-1">
              Enter your credentials to access your account
            </p>
          </div>

          {/* Form Body */}
          <form onSubmit={handleSignin} className="space-y-5 w-full">
            {/* Email Field */}
            <TextField
              isRequired
              name="email"
              type="email"
              className="flex flex-col w-full"
            >
              <Label className="text-zinc-400 font-medium text-xs mb-1.5">
                Email Address
              </Label>
              <InputGroup className="relative flex items-center w-full group border border-zinc-800 rounded-xl bg-zinc-900/80 focus-within:bg-zinc-900 focus-within:border-indigo-500/50 transition-all shadow-sm h-11 px-3.5">
                <At
                  className="text-zinc-500 pointer-events-none mr-2 shrink-0 group-focus-within:text-indigo-400 transition-colors"
                  size={16}
                />
                <Input
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent text-sm outline-none border-none text-white placeholder:text-zinc-600"
                />
              </InputGroup>
            </TextField>

            {/* Password Field */}
            <TextField
              isRequired
              name="password"
              className="flex flex-col w-full"
            >
              <Label className="text-zinc-400 font-medium text-xs mb-1.5">
                Password
              </Label>
              <InputGroup className="relative flex items-center w-full group border border-zinc-800 rounded-xl bg-zinc-900/80 focus-within:bg-zinc-900 focus-within:border-indigo-500/50 transition-all shadow-sm h-11 px-3.5">
                <ShieldKeyhole
                  className="text-zinc-500 pointer-events-none mr-2 shrink-0 group-focus-within:text-indigo-400 transition-colors"
                  size={16}
                />
                <Input
                  type={isVisible ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent text-sm outline-none border-none text-white placeholder:text-zinc-600 pr-8"
                />
                <button
                  className="absolute right-3 focus:outline-none text-zinc-500 hover:text-zinc-300 transition p-1 z-10"
                  type="button"
                  onClick={toggleVisibility}
                  aria-label="toggle password visibility"
                >
                  {isVisible ? <EyeSlash size={16} /> : <Eye size={16} />}
                </button>
              </InputGroup>
            </TextField>

            {/* Dynamic Status Badges */}
            {error && (
              <div className="p-4 bg-red-500/5 text-red-400 rounded-xl flex items-start gap-3 text-sm border border-red-500/10 animate-appearance-in w-full">
                <span className="font-semibold">Error:</span> {error}
              </div>
            )}

            {success && (
              <div className="p-4 bg-emerald-500/5 text-emerald-400 rounded-xl flex items-start gap-3 text-sm border border-emerald-500/10 animate-appearance-in w-full">
                <span className="font-semibold">Success:</span> {success}
              </div>
            )}

            {/* Action Button */}
            <Button
              type="submit"
              isLoading={isLoading}
              isDisabled={isLoading}
              className="w-full h-11 bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-semibold text-sm tracking-wide mt-4 hover:opacity-95 active:scale-[0.99] transition-all shadow-[0_4px_20px_rgba(79,70,229,0.3)] rounded-xl"
            >
              Sign In
            </Button>

            {/* Navigation Option */}
            <div className="text-center mt-6 pt-5 border-t border-zinc-800/60 w-full text-xs text-zinc-500 font-medium">
              Don't have an account?{" "}
              <Link
                href={`/auth/registration?redirect=${redirectTo}`}
                className="text-indigo-400 font-semibold hover:text-indigo-300 transition-colors ml-0.5 text-xs"
              >
                Create an account
              </Link>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
