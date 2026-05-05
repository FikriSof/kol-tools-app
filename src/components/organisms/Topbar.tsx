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
        <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8">
            <div className="flex items-center w-1/2">
                <div className="relative w-full max-w-[320px]">
                    <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                    <Input
                        type="search"
                        placeholder="Search creators, unlocks..."
                        className="w-full h-[40px] pl-10 bg-[#f8fafc] border-transparent focus:bg-white focus:border-slate-200 focus:ring-1 focus:ring-slate-200 text-[14px] text-slate-700 placeholder:text-slate-400 rounded-lg shadow-none"
                    />
                </div>
            </div>
            <div className="flex items-center gap-5">
                <Button variant="ghost" size="icon" className="relative text-slate-500 hover:text-slate-700 hover:bg-slate-50 h-10 w-10 rounded-full">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-2 right-2.5 h-[6px] w-[6px] rounded-full bg-red-500 border-[1px] border-white" />
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-10 w-10 rounded-full ring-2 ring-transparent hover:ring-indigo-100 p-0 overflow-hidden bg-slate-900 border border-slate-800 shadow-sm">
                            <Avatar className="h-full w-full rounded-none">
                                <AvatarImage src={user?.image ?? "https://i.pravatar.cc/150?u=a042581f4e29026704d"} alt={user?.name ?? "User"} className="object-cover opacity-100" />
                                <AvatarFallback className="bg-slate-800 text-slate-300 text-sm font-semibold rounded-none">
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
