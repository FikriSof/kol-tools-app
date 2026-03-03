import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Users, Lock, TrendingUp } from "lucide-react";

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-slate-200 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">Total Creators</CardTitle>
                        <Users className="h-4 w-4 text-slate-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-900">1,234</div>
                        <p className="text-xs text-slate-500">+20.1% from last month</p>
                    </CardContent>
                </Card>
                <Card className="border-slate-200 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">Total Unlocks</CardTitle>
                        <Lock className="h-4 w-4 text-slate-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-900">425</div>
                        <p className="text-xs text-slate-500">+15% from last month</p>
                    </CardContent>
                </Card>
                <Card className="border-slate-200 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">This Month Unlocks</CardTitle>
                        <TrendingUp className="h-4 w-4 text-slate-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-900">89</div>
                        <p className="text-xs text-slate-500">+7% from last week</p>
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-4">
                <h2 className="text-lg font-semibold tracking-tight text-slate-900">
                    Recent Unlock Activity
                </h2>
                <Card className="border-slate-200 shadow-sm overflow-hidden">
                    <Table>
                        <TableHeader className="bg-slate-50">
                            <TableRow className="hover:bg-slate-50 border-slate-200">
                                <TableHead className="text-slate-500">Creator</TableHead>
                                <TableHead className="text-slate-500">Platform</TableHead>
                                <TableHead className="text-slate-500">Unlock Date</TableHead>
                                <TableHead className="text-right text-slate-500">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {[
                                { creator: "Alice Smith", platform: "TikTok", date: "2024-02-14" },
                                { creator: "Bob Jones", platform: "Instagram", date: "2024-02-13" },
                                { creator: "Charlie Brown", platform: "TikTok", date: "2024-02-13" },
                                { creator: "Diana Prince", platform: "YouTube", date: "2024-02-12" },
                            ].map((activity) => (
                                <TableRow key={`${activity.creator}-${activity.platform}-${activity.date}`} className="hover:bg-slate-50 border-slate-200">
                                    <TableCell className="font-medium text-slate-900">{activity.creator}</TableCell>
                                    <TableCell className="text-slate-600">{activity.platform}</TableCell>
                                    <TableCell className="text-slate-600">{activity.date}</TableCell>
                                    <TableCell className="text-right">
                                        <span className="text-indigo-600 hover:text-indigo-700 font-medium cursor-pointer text-sm">View</span>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            </div>
        </div>
    );
}
