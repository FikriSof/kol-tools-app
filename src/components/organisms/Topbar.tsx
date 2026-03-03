import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth } from "@/lib/auth/auth";
import { LogoutButton } from "@/components/atoms/LogoutButton";

function getInitials(name?: string | null, email?: string | null): string {
    if (name) {
        const parts = name.trim().split(" ");
        if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
        return parts[0].slice(0, 2).toUpperCase();
    }
    if (email) return email.slice(0, 2).toUpperCase();
    return "??";
}

export async function Topbar() {
    const session = await auth();
    const user = session?.user;
    const initials = getInitials(user?.name, user?.email);

    return (
        <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
            <div className="flex items-center gap-4 w-1/3">
                <div className="relative w-full max-w-md">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <Input
                        type="search"
                        placeholder="Search..."
                        className="w-full pl-9 bg-slate-50 border-slate-200 focus:bg-white focus:ring-indigo-500/20 text-black"
                    />
                </div>
            </div>
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="relative text-slate-500 hover:text-slate-700 hover:bg-slate-50">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-red-500 border-2 border-white" />
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-9 w-9 rounded-full ring-2 ring-transparent hover:ring-indigo-100">
                            <Avatar className="h-9 w-9 border border-slate-200">
                                <AvatarImage src={user?.image ?? undefined} alt={user?.name ?? "User"} />
                                <AvatarFallback className="bg-indigo-50 text-indigo-700 text-sm font-semibold">
                                    {initials}
                                </AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 border-slate-200 bg-white" align="end" forceMount>
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-semibold leading-none text-slate-900">
                                    {user?.name ?? "User"}
                                </p>
                                <p className="text-xs leading-none text-slate-500">
                                    {user?.email ?? ""}
                                </p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-slate-100" />
                        <DropdownMenuItem className="text-slate-700 focus:bg-slate-50 focus:text-indigo-600">Profile</DropdownMenuItem>
                        <DropdownMenuItem className="text-slate-700 focus:bg-slate-50 focus:text-indigo-600">Settings</DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-slate-100" />
                        <LogoutButton />
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
