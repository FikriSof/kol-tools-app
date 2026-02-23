import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Filter, Search } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function CreatorListingPage() {
    const creators = [
        {
            id: "1",
            name: "Alice Smith",
            username: "@alicesmith",
            location: "New York, USA",
            agency: "Creative Agency",
            status: "Active",
        },
        {
            id: "2",
            name: "Bob Jones",
            username: "@bobbyj",
            location: "Los Angeles, USA",
            agency: "Viral Talents",
            status: "Active",
        },
        {
            id: "3",
            name: "Charlie Brown",
            username: "@charlie_b",
            location: "London, UK",
            agency: "Global Influence",
            status: "Inactive",
        },
        {
            id: "4",
            name: "Diana Prince",
            username: "@wonder_d",
            location: "Paris, France",
            agency: "Elite Creators",
            status: "Active",
        },
        {
            id: "5",
            name: "Evan Wright",
            username: "@evan_w",
            location: "Toronto, Canada",
            agency: "North Stars",
            status: "Pending",
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">Creators</h1>
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white border-none shadow-sm">
                    Add Creator
                </Button>
            </div>

            <div className="flex items-center gap-2">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <Input
                        placeholder="Search creators..."
                        className="pl-9 bg-white border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-500 text-black"
                    />
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="gap-2 border-slate-200 text-slate-700 hover:bg-slate-50 bg-white">
                            <Filter className="h-4 w-4" />
                            Filter
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="border-slate-200 bg-white">
                        <DropdownMenuLabel className="text-slate-900">Filter by</DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-slate-100" />
                        <DropdownMenuItem className="text-slate-700 focus:bg-slate-50 focus:text-indigo-600">Status</DropdownMenuItem>
                        <DropdownMenuItem className="text-slate-700 focus:bg-slate-50 focus:text-indigo-600">Location</DropdownMenuItem>
                        <DropdownMenuItem className="text-slate-700 focus:bg-slate-50 focus:text-indigo-600">Agency</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="border border-slate-200 rounded-xl bg-white shadow-sm overflow-hidden">
                <Table>
                    <TableHeader className="bg-slate-50">
                        <TableRow className="border-slate-200 hover:bg-slate-50">
                            <TableHead className="text-slate-500 font-medium">Name</TableHead>
                            <TableHead className="text-slate-500 font-medium">Username</TableHead>
                            <TableHead className="text-slate-500 font-medium">Location</TableHead>
                            <TableHead className="text-slate-500 font-medium">Agency</TableHead>
                            <TableHead className="text-slate-500 font-medium">Status</TableHead>
                            <TableHead className="text-right text-slate-500 font-medium">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {creators.map((creator) => (
                            <TableRow key={creator.id} className="border-slate-200 hover:bg-slate-50">
                                <TableCell className="font-medium">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-9 w-9 border border-slate-200">
                                            <AvatarImage
                                                src={`/avatars/${creator.id}.png`}
                                                alt={creator.name}
                                            />
                                            <AvatarFallback className="bg-slate-100 text-slate-600 font-medium">
                                                {creator.name.charAt(0)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <span className="text-slate-900 font-medium">{creator.name}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-slate-600">{creator.username}</TableCell>
                                <TableCell className="text-slate-600">{creator.location}</TableCell>
                                <TableCell className="text-slate-600">{creator.agency}</TableCell>
                                <TableCell>
                                    <Badge
                                        variant="outline"
                                        className={
                                            creator.status === 'Active' ? "bg-green-50 text-green-700 border-green-200" :
                                                creator.status === 'Pending' ? "bg-amber-50 text-amber-700 border-amber-200" :
                                                    "bg-slate-100 text-slate-600 border-slate-200"
                                        }
                                    >
                                        {creator.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Link href={`/dashboard/creators/${creator.id}`}>
                                        <Button variant="ghost" size="sm" className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 font-medium">
                                            View
                                        </Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-end space-x-2">
                <Button variant="outline" size="sm" disabled className="border-slate-200 text-slate-500 disabled:opacity-50">
                    Previous
                </Button>
                <Button variant="outline" size="sm" className="border-slate-200 text-slate-700 hover:bg-slate-50 bg-white">
                    Next
                </Button>
            </div>
        </div>
    );
}
