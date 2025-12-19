import { useOAuth } from "@/api/hooks/oauth"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function SignInCard() {
  const { google } = useOAuth();
  
  return (
    <Card className="w-full max-w-sm">
      <Button variant="outline" onClick={google} className="w-full">
        Login with Google
      </Button>
    </Card>
  )
}
