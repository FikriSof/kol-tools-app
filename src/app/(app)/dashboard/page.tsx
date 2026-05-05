import { Card, CardContent } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Users, Lock, Calendar, CalendarDays, ArrowUpRight, ArrowDownRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function DashboardPage() {
    return (
        <div className="space-y-6 max-w-[1200px] w-full pt-2">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">Dashboard</h1>
                    <p className="text-[15px] text-slate-500 mt-1">Overview of your creator unlocks and activity.</p>
                </div>
                <Button variant="outline" className="h-10 px-4 text-slate-700 border-slate-300 font-medium hover:bg-slate-50 shadow-sm rounded-lg flex items-center gap-2">
                    <CalendarDays className="h-[18px] w-[18px] text-slate-500" />
                    Last 30 Days
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-3 mt-6">
                {/* Total Creators Card */}
                <Card className="border-slate-200 shadow-sm rounded-xl overflow-hidden pt-6 px-6 pb-6 bg-white">
                    <div className="flex flex-col h-full justify-between gap-8">
                        <div className="flex items-start justify-between">
                            <div className="h-12 w-12 rounded-xl bg-[#f1f5fe] flex items-center justify-center">
                                <Users className="h-6 w-6 text-[#4338ca]" />
                            </div>
                            <div className="flex items-center gap-1 bg-[#ecfdf3] text-[#027a48] px-2.5 py-1 rounded-full text-xs font-semibold">
                                <ArrowUpRight className="h-3.5 w-3.5" />
                                +12%
                            </div>
                        </div>
                        <div>
                            <p className="text-[13px] font-semibold text-slate-500 uppercase tracking-wider mb-1">Total Creators</p>
                            <div className="text-[32px] font-semibold text-slate-900 leading-none">1,248</div>
                        </div>
                    </div>
                </Card>

                {/* Total Unlocks Card */}
                <Card className="border-[#4338ca] shadow-sm rounded-xl overflow-hidden pt-6 px-6 pb-6 bg-white ring-1 ring-[#4338ca]">
                    <div className="flex flex-col h-full justify-between gap-8">
                        <div className="flex items-start justify-between">
                            <div className="h-12 w-12 rounded-xl bg-[#4338ca] flex items-center justify-center shadow-sm">
                                <Lock className="h-6 w-6 text-white" />
                            </div>
                            <div className="flex items-center gap-1 bg-[#ecfdf3] text-[#027a48] px-2.5 py-1 rounded-full text-xs font-semibold">
                                <ArrowUpRight className="h-3.5 w-3.5" />
                                +24%
                            </div>
                        </div>
                        <div>
                            <p className="text-[13px] font-semibold text-[#4338ca] uppercase tracking-wider mb-1">Total Unlocks</p>
                            <div className="text-[32px] font-semibold text-slate-900 leading-none">8,592</div>
                        </div>
                    </div>
                </Card>

                {/* This Month Unlocks Card */}
                <Card className="border-slate-200 shadow-sm rounded-xl overflow-hidden pt-6 px-6 pb-6 bg-white">
                    <div className="flex flex-col h-full justify-between gap-8">
                        <div className="flex items-start justify-between">
                            <div className="h-12 w-12 rounded-xl bg-[#f1f5fe] flex items-center justify-center">
                                <Calendar className="h-6 w-6 text-[#4338ca]" />
                            </div>
                            <div className="flex items-center gap-1 bg-[#fef3f2] text-[#b42318] px-2.5 py-1 rounded-full text-xs font-semibold">
                                <ArrowDownRight className="h-3.5 w-3.5" />
                                -3%
                            </div>
                        </div>
                        <div>
                            <p className="text-[13px] font-semibold text-slate-500 uppercase tracking-wider mb-1">This Month Unlocks</p>
                            <div className="text-[32px] font-semibold text-slate-900 leading-none">432</div>
                        </div>
                    </div>
                </Card>
            </div>

            <div className="mt-8">
                <Card className="border-slate-200 shadow-sm rounded-xl overflow-hidden bg-white">
                    <div className="flex items-center justify-between p-6 border-b border-slate-100">
                        <h2 className="text-xl font-semibold tracking-tight text-slate-900">
                            Recent Unlock Activity
                        </h2>
                        <Button variant="ghost" className="text-[#4338ca] hover:text-[#3730a3] hover:bg-indigo-50 font-medium px-2 h-auto flex items-center gap-1.5 text-[15px]">
                            View All <ArrowRight className="h-4 w-4" />
                        </Button>
                    </div>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader className="bg-[#f8fafc]">
                                <TableRow className="hover:bg-transparent border-slate-100">
                                    <TableHead className="text-slate-500 text-[13px] font-semibold uppercase tracking-wider h-11 pl-6">Creator</TableHead>
                                    <TableHead className="text-slate-500 text-[13px] font-semibold uppercase tracking-wider h-11">Agency</TableHead>
                                    <TableHead className="text-slate-500 text-[13px] font-semibold uppercase tracking-wider h-11">Date</TableHead>
                                    <TableHead className="text-slate-500 text-[13px] font-semibold uppercase tracking-wider h-11">Status</TableHead>
                                    <TableHead className="text-slate-500 text-[13px] font-semibold uppercase tracking-wider h-11 text-right pr-6">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {[
                                    { creator: "Sarah Jenkins", agency: "Elite Talent", date: "Oct 24, 2023", status: "Active", statusColor: "bg-[#ecfdf3] text-[#027a48]" },
                                    { creator: "Marcus Rivera", agency: "NextGen Media", date: "Oct 23, 2023", status: "Pending", statusColor: "bg-[#fff6ed] text-[#c4320a]" },
                                    { creator: "Emily Chen", agency: "Independent", date: "Oct 21, 2023", status: "Active", statusColor: "bg-[#ecfdf3] text-[#027a48]" },
                                    { creator: "David Kim", agency: "Viral Ventures", date: "Oct 20, 2023", status: "Expired", statusColor: "bg-[#f1f5f9] text-[#475569]" },
                                ].map((activity, i) => (
                                    <TableRow key={`${activity.creator}-${activity.date}`} className="hover:bg-slate-50 border-slate-100 transition-colors">
                                        <TableCell className="py-4 pl-6">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-10 w-10 border border-slate-200">
                                                    <AvatarImage src={`https://i.pravatar.cc/150?u=${i + 1}a042581f4e29026704d`} alt={activity.creator} className="object-cover" />
                                                    <AvatarFallback className="bg-slate-100 text-slate-600 font-medium text-sm">
                                                        {activity.creator.split(" ").map(n => n[0]).join("")}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <span className="font-medium text-[15px] text-slate-900">{activity.creator}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-4 text-[15px] text-slate-600 font-medium">{activity.agency}</TableCell>
                                        <TableCell className="py-4 text-[15px] text-slate-600 font-medium">{activity.date}</TableCell>
                                        <TableCell className="py-4">
                                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${activity.statusColor}`}>
                                                {activity.status}
                                            </span>
                                        </TableCell>
                                        <TableCell className="py-4 text-right pr-6">
                                            <span className="text-[#4338ca] hover:text-[#3730a3] font-semibold cursor-pointer text-[15px]">View</span>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </Card>
            </div>
        </div>
    );
}
