import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Mail,
    Phone,
    MapPin,
    Building,
    Unlock,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function CreatorDetailPage({
    params,
}: {
    params: { id: string };
}) {
    const creator = {
        id: params.id,
        name: "Alice Smith",
        username: "@alicesmith",
        location: "New York, USA",
        agency: "Creative Agency",
        email: "a***@example.com",
        phone: "+1 555 *** **88",
        avatar: "/avatars/1.png",
    };

    return (
        <div className="space-y-6">
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-6">
                    <Avatar className="h-24 w-24 border-4 border-white shadow-sm ring-1 ring-slate-200">
                        <AvatarImage src={creator.avatar} />
                        <AvatarFallback className="bg-slate-100 text-slate-500 text-3xl font-bold">{creator.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold text-slate-900">{creator.name}</h1>
                        <p className="text-lg text-slate-500 font-medium">{creator.username}</p>
                        <div className="flex items-center gap-4 text-sm text-slate-500 pt-2">
                            <div className="flex items-center gap-1.5">
                                <MapPin className="h-4 w-4 text-slate-400" />
                                {creator.location}
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Building className="h-4 w-4 text-slate-400" />
                                {creator.agency}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Separator className="bg-slate-200" />

            <div className="grid gap-6 md:grid-cols-2">
                <Card className="border-slate-200 shadow-sm rounded-xl">
                    <CardHeader>
                        <CardTitle className="text-slate-900">Contact Information</CardTitle>
                        <CardDescription className="text-slate-500">
                            Unlock to view full contact details
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg bg-slate-50">
                            <div className="flex items-center gap-3">
                                <Mail className="h-5 w-5 text-slate-400" />
                                <span className="font-mono text-slate-600 font-medium">{creator.email}</span>
                            </div>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm border-0">
                                        <Unlock className="h-4 w-4 mr-2" />
                                        Unlock
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="border-slate-200 bg-white">
                                    <DialogHeader>
                                        <DialogTitle className="text-slate-900">Unlock Contact Information</DialogTitle>
                                        <DialogDescription className="text-slate-500">
                                            Are you sure you want to unlock contact details for{" "}
                                            <span className="font-semibold text-slate-900">
                                                {creator.name}
                                            </span>
                                            ? This action will be logged.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="py-4">
                                        <div className="flex items-center p-4 bg-indigo-50 border border-indigo-100 rounded-md">
                                            <span className="text-sm text-indigo-900">
                                                Balance after unlock: <strong className="font-semibold text-indigo-700">95 Credits</strong>
                                            </span>
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button variant="outline" className="border-slate-200 text-slate-700 bg-white hover:bg-slate-50">Cancel</Button>
                                        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">Confirm Unlock</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                        <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg bg-slate-50">
                            <div className="flex items-center gap-3">
                                <Phone className="h-5 w-5 text-slate-400" />
                                <span className="font-mono text-slate-600 font-medium">{creator.phone}</span>
                            </div>
                            <Button size="sm" variant="secondary" disabled className="bg-slate-200 text-slate-400 opacity-50">
                                <Unlock className="h-4 w-4 mr-2" />
                                Unlock
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-slate-200 shadow-sm rounded-xl overflow-hidden">
                    <CardHeader className="bg-white border-b border-slate-100">
                        <CardTitle className="text-slate-900">Unlock History</CardTitle>
                        <CardDescription className="text-slate-500">
                            Recent unlocks for this creator
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader className="bg-slate-50">
                                <TableRow className="border-slate-200 hover:bg-slate-50">
                                    <TableHead className="text-slate-500 font-medium pl-6">User</TableHead>
                                    <TableHead className="text-slate-500 font-medium">Date</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow className="border-slate-100 hover:bg-slate-50">
                                    <TableCell className="font-medium text-slate-900 pl-6">John Doe</TableCell>
                                    <TableCell className="text-slate-600">2024-01-15 14:30</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
