"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff } from "lucide-react";


import Image from "next/image";
import Link from "next/link";
import {
  INITIAL_LOGIN_FORM,
  INITIAL_STATE_LOGIN_FORM,
} from "@/constants/auth-constant";
import { LoginForm, loginSchemaForm } from "@/validations/auth-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { login } from "../actions";
import { Loader2 } from "lucide-react";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormDescription,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = () => {
    console.log("tes");
  };

  // const onSubmit = async (values: LoginForm) => {
  //   setIsLoading(true);

  //   // Simulate API call
  //   setTimeout(() => {
  //     console.log("Login attempt:", { ...values, rememberMe });
  //     setIsLoading(false);
  //   }, 1000);
  // };

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchemaForm),
    defaultValues: INITIAL_LOGIN_FORM,
  });

  const [loginState, loginAction, isPendingLogin] = useActionState(
    login,
    INITIAL_STATE_LOGIN_FORM
  );

  const onSubmit = form.handleSubmit(async (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    startTransition(() => {
      loginAction(formData);
    });
  });

  useEffect(() => {
    if (loginState?.status === "error") {
      toast.error("Login Gagal", {
        description: loginState.errors?._form?.[0],
      });

      startTransition(() => {
        loginAction(null);
      });
    }
  }, [loginState]);

  console.log(loginState);
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Login Form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-white dark:bg-gray-900">
        <div className="w-full max-w-md space-y-6">
          <div className="flex items-center space-x-2 mb-6 lg:mb-8">
            <Image
              src="/Logo.svg"
              alt="Company Name"
              width={60}
              height={40}
              priority
            />
            <span className="text-xl font-semibold text-gray-900 dark:text-white">
              NZ Putra.
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
              Selamat datang!
            </h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              Tolong masukkan email dan password anda!
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={onSubmit} className="space-y-4">
              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-gray-700 dark:text-gray-300">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="Masukkan email anda"
                        autoComplete="email"
                        className="h-10 sm:h-11 text-sm sm:text-base bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-gray-700 dark:text-gray-300">
                      Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          placeholder="Masukkan password anda"
                          autoComplete="current-password"
                          className="h-10 sm:h-11 pr-10 text-sm sm:text-base bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        >
                          {showPassword ? (
                            <EyeOff
                              size={16}
                              className="sm:w-[18px] sm:h-[18px]"
                            />
                          ) : (
                            <Eye
                              size={16}
                              className="sm:w-[18px] sm:h-[18px]"
                            />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => {
                      if (checked === "indeterminate") {
                        console.log("Checkbox is in an indeterminate state");
                      } else {
                        setRememberMe(checked);
                      }
                    }}
                  />
                  <label
                    htmlFor="remember"
                    className="text-xs sm:text-sm font-normal text-gray-700 dark:text-gray-300 cursor-pointer"
                  >
                    Ingat saya untuk 30 hari
                  </label>
                </div>
                <button
                  type="button"
                  className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                >
                  Lupa password
                </button>
              </div>

              {/* Sign In */}
              <Button
                type="submit"
                className="w-full h-10 sm:h-11 bg-cyan-500 hover:bg-cyan-600 dark:bg-cyan-600 dark:hover:bg-cyan-700 text-white text-sm sm:text-base"
                disabled={isLoading}
              >
                {isPendingLogin ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Login"
                )}
              </Button>

              <div className="text-center text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                Tidak punya akun?{" "}
                <Link
                  type="button"
                  href={"/register"}
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium underline"
                >
                  Sign up secara gratis
                </Link>
              </div>
            </form>
          </Form>
        </div>
      </div>

      {/* Gambar lauk */}
      {/* Gambar lauk */}
      {/* Gambar lauk */}
      <div className="hidden lg:flex flex-1 relative bg-gradient-to-br from-blue-400 to-blue-600 dark:from-blue-600 dark:to-blue-800">
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src="/tes.png"
            alt="fish"
            width={250}
            height={250}
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}
