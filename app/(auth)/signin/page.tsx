"use client"

import { type FormEvent, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { LucideEye, LucideEyeOff, LucideLoader, LucideLock, LucideLogIn, LucideMail } from "@nattui/icons"
import { Button, Input, Label, Spacer } from "@nattui/react-components"
import { authClient } from "@/lib/auth-client"

export default function SigninPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)

    const { error } = await authClient.signIn.email({
      email,
      password,
    })

    if (error) {
      setError(error.message ?? "Something went wrong")
      setLoading(false)
      return
    }

    router.push("/")
  }

  return (
    <div className="flex w-full flex-col items-center">
      <form className="flex w-full max-w-360 flex-col" onSubmit={handleSubmit}>
        <h1 className="text-24 font-semibold">Sign in</h1>
        <Spacer className="h-8" />
        <p className="text-gray-11 text-14">
          Enter your credentials to access your account.
        </p>

        <Spacer className="h-32" />

        {error && (
          <>
            <p className="text-red-11 text-14">{error}</p>
            <Spacer className="h-16" />
          </>
        )}

        <Label htmlFor="email">Email</Label>
        <Spacer className="h-4" />
        <div className="relative">
          <LucideMail
            className="text-gray-11 pointer-events-none absolute top-14 left-14"
            size={16}
          />
          <Input
            autoComplete="email"
            className="pl-44!"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            type="email"
            value={email}
          />
        </div>

        <Spacer className="h-16" />

        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <Link className="text-primary-11 hover:text-primary-12 text-13 transition-colors" href="#">
            Forgot password?
          </Link>
        </div>
        <Spacer className="h-4" />
        <div className="relative">
          <LucideLock
            className="text-gray-11 pointer-events-none absolute top-14 left-14"
            size={16}
          />
          <Input
            autoComplete="current-password"
            className="px-44!"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            type={showPassword ? "text" : "password"}
            value={password}
          />
          <Button
            className="group absolute! top-6 right-6"
            iconOnly
            onClick={() => setShowPassword((prev) => !prev)}
            size={32}
            type="button"
            variant="ghost"
          >
            {showPassword ? (
              <LucideEyeOff
                className="text-gray-11 group-hover:text-gray-12 group-active:text-gray-12 transition-colors"
                size={16}
              />
            ) : (
              <LucideEye
                className="text-gray-11 group-hover:text-gray-12 group-active:text-gray-12 transition-colors"
                size={16}
              />
            )}
          </Button>
        </div>

        <Spacer className="h-24" />

        <Button
          iconStart={loading ? <LucideLoader className="animate-spin" size={16} /> : <LucideLogIn size={16} />}
          isDisabled={loading}
          isFullWidth
          size={44}
          type="submit"
          variant="accent"
        >
          {loading ? "Signing in..." : "Sign in"}
        </Button>

        <Spacer className="h-24" />

        <p className="text-gray-11 text-center text-14">
          Don&apos;t have an account?{" "}
          <Link className="text-primary-11 hover:text-primary-12 transition-colors" href="/signup">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  )
}
