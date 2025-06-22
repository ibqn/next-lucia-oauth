import { GithubIcon } from "@/components/github-icon"
import { GoogleIcon } from "@/components/google-icon"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { env } from "@/env"

export default function SignInPage() {
  return (
    <Card className="max-w-md w-full">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Welcome back</CardTitle>
        <CardDescription>Login with your GitHub or Google account</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid gap-6">
            <div className="flex flex-col gap-4">
              <Button asChild variant="outline" className="w-full">
                <a href={`${env.API_URL}/auth/sign-in/github`}>
                  <GithubIcon />
                  Login with GitHub
                </a>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <a href={`${env.API_URL}/auth/sign-in/google`}>
                  <GoogleIcon />
                  Login with Google
                </a>
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
