"use client";

import { signOut } from "next-auth/react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export function LogoutButton() {
  return (
    <DropdownMenuItem
      className="text-red-600 focus:bg-red-50 focus:text-red-700 cursor-pointer"
      onClick={() => signOut({ callbackUrl: "/login" })}
    >
      Log out
    </DropdownMenuItem>
  );
}
