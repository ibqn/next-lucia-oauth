import { ReactNode } from 'react'

type Props = Readonly<{
  children: ReactNode
}>

export default function AuthLayout({ children }: Props) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      {children}
    </div>
  )
}
