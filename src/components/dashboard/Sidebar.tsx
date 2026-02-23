"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Users,
    History,
    Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const sidebarItems = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Creators",
        href: "/dashboard/creators",
        icon: Users,
    },
    {
        title: "Unlock History",
        href: "/dashboard/unlock-history",
        icon: History,
    },
    {
        title: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
    },
];

export function Sidebar() {
    const pathname = usePathname();
    return (
        <div className="flex h-screen w-[240px] flex-col border-r border-slate-200 bg-white">
            <div className="p-6">
                <div className="flex items-center gap-2 font-bold text-xl text-slate-900">
                    <div className="h-8 w-8 rounded-md bg-indigo-600" />
                    <span>KOL Manager</span>
                </div>
            </div>
            <div className="flex-1 px-4 text-slate-500">
                <nav className="flex flex-col gap-1">
                    {sidebarItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-200 text-sm",
                                    isActive
                                        ? "bg-indigo-50 text-indigo-600 font-semibold shadow-sm"
                                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                )}
                            >
                                <item.icon className={cn("h-4 w-4", isActive ? "text-indigo-600" : "text-slate-500")} />
                                {item.title}
                            </Link>
                        );
                    })}
                </nav>
            </div>
            <div className="border-t border-slate-200 p-4">
                <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 border border-slate-200">
                        <AvatarImage src="/avatars/01.png" alt="@shadcn" />
                        <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold text-slate-900">John Doe</span>
                        <span className="text-xs text-slate-500">
                            admin@example.com
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
