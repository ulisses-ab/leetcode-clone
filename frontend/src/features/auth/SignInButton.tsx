import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { SignInCard } from "@/features/auth/SignInCard";

export function SignInButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" size="sm">Sign In</Button>
      </DialogTrigger>
      <DialogContent showCloseButton={false} className="p-0 m-0 border-0 shadow-none bg-transparent">
        <SignInCard />
      </DialogContent>
    </Dialog>
  )
}