import { GithubIcon } from '@/components/github-icon'
import { GoogleIcon } from '@/components/google-icon'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function SignInPage() {
  return (
    <Card className="max-w-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Welcome back</CardTitle>
        <CardDescription>
          Login with your GitHub or Google account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid gap-6">
            <div className="flex flex-col gap-4">
              <Button asChild variant="outline" className="w-full">
                {/* <a href="http://localhost:3000/sign-in/github"> */}
                <a href="/sign-in/github">
                  <GithubIcon />
                  Login with GitHub
                </a>
              </Button>
              <Button variant="outline" className="w-full">
                <GoogleIcon />
                Login with Google
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
