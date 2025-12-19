import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useOAuth } from "@/api/hooks/oauth";
import { FaGoogle, FaGithub } from "react-icons/fa";

export function SignInCard() {
  const { google } = useOAuth();

  return (
    <Card className="w-full max-w-sm p-4 space-y-4">
      <CardContent className="space-y-2">
        <Button
          variant="outline"
          onClick={google}
          className="w-full flex items-center justify-center gap-2"
        >
          <FaGoogle className="w-5 h-5" />
          Sign in with Google
        </Button>

        <Button
          variant="outline"
          onClick={google}
          className="w-full flex items-center justify-center gap-2"
        >
          <FaGithub className="w-5 h-5" />
          Sign in with GitHub
        </Button>
      </CardContent>
    </Card>
  );
}
