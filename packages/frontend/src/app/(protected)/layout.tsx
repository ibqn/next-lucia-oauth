import { validateRequest } from "@/auth"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function Layout({ children }: { children: React.ReactNode }) {
  const validationResult = await validateRequest()

  console.log("validate", validationResult)

  if (!validationResult.user) {
    redirect("/sign-in")
  }

  return (
    <div>
      <nav>
        <ul className="flex flex-row space-x-4">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/sign-in">Sign in</Link>
          </li>
          <li>
            <Link href="/profile">Profile</Link>
          </li>
        </ul>
      </nav>

      {children}
    </div>
  )
}
