import Link from 'next/link'

export default function Layout({ children }: { children: React.ReactNode }) {
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
