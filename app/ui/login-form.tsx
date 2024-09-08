"use client";

import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/outline";
import { useFormState, useFormStatus } from "react-dom";
import { authenticate, createUser } from "@/app/lib/actions";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [signUp, setSignUp] = useState(false);
  const [errorMessage, formAction] = useFormState(
    signUp ? createUser : authenticate,
    ""
  );
  const { pending } = useFormStatus();

  const router = useRouter();

  useEffect(() => {
    if (errorMessage == "User successfully signed up and signed in") {
      router.push("/dashboard");
    }
  }, [errorMessage, router]);

  return (
    <form action={formAction} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className="mb-3 text-2xl">Please log in to continue.</h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:border-transparent focus:ring-orange-800"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500  peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:border-transparent focus:ring-orange-800"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-around pt-4">
          <button
            type="submit"
            onClick={() => setSignUp(!signUp)}
            className="mt-4 w-full border-2 rounded-lg border-transparent hover:bg-orange-500 hover:text-white"
            aria-disabled={pending}
          >
            Sign Up
          </button>
          <button
            type="submit"
            className="mt-4 w-full border-2 rounded-lg border-transparent hover:bg-orange-500 hover:text-white"
            aria-disabled={pending}
          >
            Log in
          </button>
        </div>
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage &&
            errorMessage != "User successfully signed up and signed in" && (
              <>
                <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                <p className="text-sm text-red-500">{errorMessage}</p>
              </>
            )}
        </div>
      </div>
    </form>
  );
}
