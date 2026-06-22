"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ListBox, Select } from "@heroui/react";
import {
  Card,
  Button,
  Link,
  TextField,
  Label,
  InputGroup,
  Input,
  FieldError,
} from "@heroui/react";
import {
  Eye,
  EyeSlash,
  Person,
  At,
  ShieldKeyhole,
  CloudArrowUpIn,
} from "@gravity-ui/icons";
import { signUp } from "@/lib/auth-client";

export default function SignupPage() {
  // Form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("tenant");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  //search params
  const router = useRouter();
  const searchparams = useSearchParams();
  const redirectTo = searchparams.get("redirect") || "/";

  // UI States
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const toggleVisibility = () => setIsVisible(!isVisible);

  // Handle image selection & preview
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Upload to ImgBB
  const uploadToImgBB = async (file) => {
    const imgbbApiKey = "ae0ba10184298aa38421340e38125403";
    const body = new FormData();
    body.append("image", file);

    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
      {
        method: "POST",
        body: body,
      },
    );

    const data = await response.json();
    if (!data.success) {
      throw new Error("Failed to upload profile photo.");
    }
    return data.data.url;
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      let imageUrl = "";

      // Upload the image first if chosen
      if (imageFile) {
        imageUrl = await uploadToImgBB(imageFile);
      }

      const { data, error: authError } = await signUp.email({
        email,
        password,
        name,
        role,
        image: imageUrl,
      });

      if (authError) {
        setError(authError.message || "Something went wrong during signup.");
      } else {
        setSuccess("Account created successfully! Welcome.");
        setName("");
        setEmail("");
        setPassword("");
        setImageFile(null);
        setImagePreview("");
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
              Create an account
            </h1>
            <p className="text-zinc-500 text-sm mt-1">
              Fill in the fields below to get started
            </p>
          </div>

          {/* Form Body */}
          <form onSubmit={handleSignup} className="space-y-5 w-full">
            {/* Name Field */}
            <TextField isRequired name="name" className="flex flex-col w-full">
              <Label className="text-zinc-400 font-medium text-xs mb-1.5">
                Name
              </Label>
              <InputGroup className="relative flex items-center w-full group border border-zinc-800 rounded-xl bg-zinc-900/80 focus-within:bg-zinc-900 focus-within:border-indigo-500/50 transition-all shadow-sm h-11 px-3.5">
                <Person
                  className="text-zinc-500 pointer-events-none mr-2 shrink-0 group-focus-within:text-indigo-400 transition-colors"
                  size={16}
                />
                <Input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-transparent text-sm outline-none border-none text-white placeholder:text-zinc-600"
                />
              </InputGroup>
            </TextField>

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

            {/*select role field*/}

            <Select
              onChange={(value) => setRole(value)}
              className="w-full flex flex-col gap-1.5"
              placeholder="Select one"
            >
              <Label className="text-zinc-400 font-medium text-xs mb-1.5">
                Pick Role
              </Label>
              <Select.Trigger className=" flex items-center w-full border border-zinc-800 bg-zinc-900/80 hover:bg-zinc-900 text-sm text-zinc-300 focus-within:border-indigo-500/50 transition-all shadow-sm h-11 px-3.5 outline-none cursor-pointer group">
                <Select.Value className="text-white placeholder:text-zinc-600" />
                <Select.Indicator className="text-zinc-500 group-hover:text-zinc-300 transition-colors" />
              </Select.Trigger>
              <Select.Popover>
                <ListBox className="text-white bg-zinc-900 rounded-xl">
                  <ListBox.Item
                    id="tenant"
                    textValue="tenant"
                    className="flex items-center text-sm text-zinc-300 cursor-pointer outline-none transition-colors hover:bg-zinc-800/60 hover:text-white "
                  >
                    Tenant
                    <ListBox.ItemIndicator className="text-indigo-400 shrink-0 ml-2" />
                  </ListBox.Item>
                  <ListBox.Item
                    id="owner"
                    textValue="owner"
                    className="flex items-center text-sm text-zinc-300 cursor-pointer outline-none transition-colors hover:bg-zinc-800/60 hover:text-white "
                  >
                    Owner
                    <ListBox.ItemIndicator className="text-indigo-400 shrink-0 ml-2" />
                  </ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>

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
                  placeholder="Choose a password"
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

            {/* Premium Photo Upload Area */}
            <div className="flex flex-col gap-1.5 w-full">
              <Label className="text-zinc-400 font-medium text-xs">
                Profile Photo
              </Label>

              <div className="flex items-center gap-4 mt-0.5 w-full">
                <label className="flex flex-col items-center justify-center flex-1 h-20 border border-dashed border-zinc-800 rounded-xl cursor-pointer bg-zinc-900/40 hover:bg-zinc-900/80 hover:border-zinc-700 transition-all group relative overflow-hidden">
                  <div className="flex items-center gap-3 px-4 w-full">
                    <div className="p-2 bg-zinc-800/50 rounded-lg text-zinc-400 group-hover:text-zinc-200 group-hover:bg-zinc-800 transition-colors">
                      <CloudArrowUpIn className="w-4 h-4" />
                    </div>
                    <div className="text-left max-w-[200px] truncate">
                      <p className="text-xs font-medium text-zinc-300 group-hover:text-white transition-colors">
                        Upload avatar
                      </p>
                      <p className="text-[11px] text-zinc-500 truncate mt-0.5">
                        {imageFile ? imageFile.name : "PNG, JPG up to 5MB"}
                      </p>
                    </div>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>

                {/* Micro-preview Element */}
                {imagePreview && (
                  <div className="w-20 h-20 rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900 shrink-0 flex items-center justify-center relative animate-appearance-in">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>

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
              Sign Up
            </Button>

            {/* Navigation Option */}
            <div className="text-center mt-6 pt-5 border-t border-zinc-800/60 w-full text-xs text-zinc-500 font-medium">
              Already have an account?{" "}
              <Link
                href={`/auth/signin/redirect=${redirectTo}`}
                className="text-indigo-400 font-semibold hover:text-indigo-300 transition-colors ml-0.5 text-xs"
              >
                Sign in instead
              </Link>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
