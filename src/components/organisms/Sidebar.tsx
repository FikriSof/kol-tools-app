"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Users,
    Unlock,
    Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarItems = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Creators",
        href: "/creators",
        icon: Users,
    },
    {
        title: "Unlock History",
        href: "/unlock-history",
        icon: Unlock,
    },
    {
        title: "Settings",
        href: "/settings",
        icon: Settings,
    },
];

export function Sidebar() {
    const pathname = usePathname();
    return (
        <div className="flex h-screen w-[260px] flex-col border-r border-slate-100 bg-white shadow-[1px_0_10px_rgba(0,0,0,0.02)] z-10 relative">
            <div className="p-6 pb-8">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-700 text-white font-bold text-lg">
                        K
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-[17px] text-slate-900 leading-tight">KOL Manager</span>
                        <span className="text-[13px] text-slate-500 font-medium">Agency Pro</span>
                    </div>
                </div>
            </div>
            <div className="flex-1 pr-4 pl-0">
                <nav className="flex flex-col gap-2">
                    {sidebarItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "group relative flex items-center gap-3 rounded-r-xl px-6 py-[14px] text-[15px] font-medium transition-all duration-200",
                                    isActive
                                        ? "bg-[#edf2fe] text-[#4338ca]"
                                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                )}
                            >
                                {isActive && (
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#4338ca] rounded-r-full" />
                                )}
                                <item.icon
                                    className={cn(
                                        "h-[20px] w-[20px]",
                                        isActive ? "text-[#4338ca]" : "text-slate-500"
                                    )}
                                    strokeWidth={isActive ? 2.5 : 2}
                                />
                                {item.title}
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </div>
    );
}
