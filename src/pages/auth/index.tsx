import { useState } from "react"
import { auth } from "@/firebase/firebase"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth"
import { ArrowLeft, Chrome } from "lucide-react"
import Link from "next/link"

const AuthPage = () => {
  const [isRegister, setIsRegister] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    try {
      if (isRegister) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        await updateProfile(userCredential.user, { displayName: name })
      } else {
        await signInWithEmailAndPassword(auth, email, password)
      }
      window.location.href = "/"
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("Authentication failed. Try again.")
      }
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
      window.location.href = "/"
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("Google Sign-In failed. Try again.")
      }
    }
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white">
      <Link
        href="/"
        className="absolute left-5 top-5 p-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors z-10"
        aria-label="Go back"
      >
        <ArrowLeft className="h-5 w-5 text-gray-600" />
      </Link>

      <div className="hidden lg:flex flex-1 flex-col items-center justify-center bg-white p-8">
        <div className="text-6xl font-bold mb-4">
          <span className="text-emerald-500">Food</span>
          <span className="text-gray-900">Draft</span>
        </div>
        <p className="max-w-md text-center text-lg text-gray-600">
          Discover, create, and share amazing recipes with food lovers around the world
        </p>
      </div>

      <div className="flex-1 flex items-center justify-center sm:p-8 p-4">
        <div className="w-full max-w-md bg-white sm:p-6 py-6 px-2 space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-1">{isRegister ? "Create an account" : "Welcome Back"}</h2>
            <p className="text-sm text-gray-500">
              {isRegister ? "Enter your details to create an account" : "Sign in to your account"}
            </p>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>
          <div className="grid gap-2.5">
            <form onSubmit={handleSubmit} className="grid gap-3">
              {isRegister && (
                <div className="grid gap-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              )}
              <div className="grid gap-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex h-12 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="flex h-12 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              <button
                type="submit"
                className="inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-md text-sm font-medium h-12 px-4 py-2 mt-2 w-full bg-emerald-500 text-white hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isRegister ? "Sign Up" : "Sign In"}
              </button>
            </form>
            <div className="relative flex items-center justify-center">
              <div className="absolute w-full h-[1px] bg-gray-200" />
              <span className="relative bg-white px-2 text-sm text-gray-500">Or continue with</span>
            </div>
            <button
              onClick={handleGoogleSignIn}
              className="inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-md text-sm font-medium h-12 px-4 py-2 w-full border border-gray-300 bg-white hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Chrome className="mr-2 h-4 w-4" /> Sign in with Google
            </button>
          </div>
          <div className="text-sm text-center text-gray-500">
            {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              type="button"
              onClick={() => setIsRegister(!isRegister)}
              className="text-emerald-500 hover:text-emerald-600 cursor-pointer hover:underline transition-colors"
            >
              {isRegister ? "Login here" : "Create one here"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthPage
