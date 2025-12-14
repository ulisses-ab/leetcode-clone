import { Button } from "@/components/ui/button";
import { UserMenu } from "./UserMenu";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils"; // shadcn cn utility

interface NavbarProps extends HTMLAttributes<HTMLElement> {
  title?: string;
}

export function Navbar({ title = "LeetClone", className, ...props }: NavbarProps) {
  return (
    <nav
      {...props}
      className={cn(
        "w-full px-4 py-2 flex items-center justify-between bg-background",
        className
      )}
    >
      <div className="flex items-center space-x-2">
        <span className="font-bold text-lg">{title}</span>
        <Button variant="ghost" size="sm">Problems</Button>
        <Button variant="ghost" size="sm">Leaderboard</Button>
      </div>

      <UserMenu />
    </nav>
  );
}
