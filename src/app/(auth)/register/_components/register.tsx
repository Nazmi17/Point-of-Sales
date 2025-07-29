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

export default function RegisterComponent() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = () => {
    console.log("tes");
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Login Form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-white dark:bg-gray-900">
        <div className="w-full max-w-md space-y-6">
          <div className="flex items-center space-x-2 mb-6 lg:mb-8">
            <div className="w-8 h-8 bg-black dark:bg-white rounded-full flex items-center justify-center">
              <span className="text-white dark:text-black font-bold text-sm">
                W
              </span>
            </div>
            <span className="text-xl font-semibold text-gray-900 dark:text-white">
              Warluk.
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

          <form className="space-y-4">
            {/* Full name */}
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-sm text-gray-700 dark:text-gray-300"
              >
                Full name
              </Label>
              <Input
                placeholder="Masukkan nama anda"
                required
                className="h-10 sm:h-11 text-sm sm:text-base bg-white dark:bg-gray-800 border-gray-300 dark:border-hgray-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm text-gray-700 dark:text-gray-300"
              >
                Email
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  placeholder="Masukkan email anda"
                  required
                  className="h-10 sm:h-11 text-sm sm:text-base bg-white dark:bg-gray-800 border-gray-300 dark:border-hgray-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm text-gray-700 dark:text-gray-300"
              >
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Masukkan password anda"
                  required
                  className="h-10 sm:h-11 text-sm sm:text-base bg-white dark:bg-gray-800 border-gray-300 dark:border-hgray-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  {showPassword ? (
                    <EyeOff size={16} className="sm:w-[18px] sm:h-[18px]" />
                  ) : (
                    <Eye size={16} className="sm:w-[18px] sm:h-[18px]" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm text-gray-700 dark:text-gray-300"
              >
                Konfirmasi Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Konfirmasi password anda"
                  required
                  className="h-10 sm:h-11 text-sm sm:text-base bg-white dark:bg-gray-800 border-gray-300 dark:border-hgray-600 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  {showPassword ? (
                    <EyeOff size={16} className="sm:w-[18px] sm:h-[18px]" />
                  ) : (
                    <Eye size={16} className="sm:w-[18px] sm:h-[18px]" />
                  )}
                </button>
              </div>
            </div>

            {/* Sign In */}
            <Button
              type="button" // Change to button to prevent form submission
              onClick={() => (window.location.href = "/dashboard")}
              className="w-full h-10 sm:h-11 bg-cyan-500 hover:bg-cyan-600 text-white text-sm sm:text-base"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>

            {/* Google */}
            <Button
              type="button"
              variant="outline"
              className="w-full h-10 sm:h-11 text-sm sm:text-base"
              onClick={handleGoogleSignIn}
            >
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Register dengan Google
            </Button>

            <div className="text-center text-xs sm:text-sm text-gray-600">
              Sudah punya akun?{" "}
              <Link
                href="/login"
                className="text-blue-600 hover:text-blue-800 font-medium underline"
              >
                Login secara gratis
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Gambar lauk */}
      <div className="hidden lg:flex flex-1 relative bg-gradient-to-br from-blue-400 to-blue-600 dark:from-blue-600 dark:to-blue-800">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <div className="w-48 h-48 lg:w-64 lg:h-64 bg-blue-300 dark:bg-blue-500 rounded-full opacity-20 dark:opacity-30"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white text-4xl lg:text-6xl">🐟</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
