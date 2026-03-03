import Link from "next/link";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search } from "lucide-react";
import { creatorService } from "@/lib/services/creator.service";
import { AddCreatorDialog } from "@/components/molecules/AddCreatorDialog";
import { SearchInput } from "@/components/atoms/SearchInput";

interface PageProps {
    searchParams: Promise<{ page?: string; search?: string }>;
}

export default async function CreatorListingPage({ searchParams }: PageProps) {
    const params = await searchParams;
    const page = Number(params.page) || 1;
    const search = params.search || undefined;

    const { creators, total, pageSize } = await creatorService.getCreators({
        page,
        pageSize: 10,
        search,
    });

    const totalPages = Math.ceil(total / pageSize);
    const hasPrev = page > 1;
    const hasNext = page < totalPages;

    function buildHref(newPage: number, currentSearch?: string) {
        const p = new URLSearchParams();
        p.set("page", String(newPage));
        if (currentSearch) p.set("search", currentSearch);
        return `/creators?${p.toString()}`;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                    Creators
                    {total > 0 && (
                        <span className="ml-2 text-sm font-normal text-slate-400">({total})</span>
                    )}
                </h1>
                <AddCreatorDialog />
            </div>

            {/* Search */}
            <div className="flex items-center gap-2">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <SearchInput
                        defaultValue={search}
                        className="pl-9 bg-white border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-500 text-black"
                        placeholder="Search creators..."
                    />
                </div>
            </div>

            {/* Table */}
            <div className="border border-slate-200 rounded-xl bg-white shadow-sm overflow-hidden">
                <Table>
                    <TableHeader className="bg-slate-50">
                        <TableRow className="border-slate-200 hover:bg-slate-50">
                            <TableHead className="text-slate-500 font-medium">Name</TableHead>
                            <TableHead className="text-slate-500 font-medium">Username</TableHead>
                            <TableHead className="text-slate-500 font-medium">Location</TableHead>
                            <TableHead className="text-slate-500 font-medium">Agency</TableHead>
                            <TableHead className="text-right text-slate-500 font-medium">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {creators.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-12 text-slate-400">
                                    {search
                                        ? `No creators found matching "${search}"`
                                        : "No creators yet. Add your first creator!"}
                                </TableCell>
                            </TableRow>
                        ) : (
                            creators.map((creator) => {
                                const location = [creator.city, creator.country]
                                    .filter(Boolean)
                                    .join(", ");
                                return (
                                    <TableRow key={creator.id} className="border-slate-200 hover:bg-slate-50">
                                        <TableCell className="font-medium">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-9 w-9 border border-slate-200">
                                                    <AvatarFallback className="bg-slate-100 text-slate-600 font-medium">
                                                        {creator.name.charAt(0).toUpperCase()}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <span className="text-slate-900 font-medium">{creator.name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-slate-600">{creator.tiktok_username}</TableCell>
                                        <TableCell className="text-slate-600">
                                            {location || <span className="text-slate-400 italic">—</span>}
                                        </TableCell>
                                        <TableCell className="text-slate-600">
                                            {creator.agency?.name || <span className="text-slate-400 italic">—</span>}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Link href={`/creators/${creator.id}`}>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 font-medium"
                                                >
                                                    View
                                                </Button>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between text-sm text-slate-500">
                <span>
                    {total === 0
                        ? "No results"
                        : `Showing ${(page - 1) * pageSize + 1}–${Math.min(page * pageSize, total)} of ${total}`}
                </span>
                <div className="flex items-center space-x-2">
                    <Link href={buildHref(page - 1, search)} aria-disabled={!hasPrev}>
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={!hasPrev}
                            className="border-slate-200 text-slate-500 disabled:opacity-50"
                        >
                            Previous
                        </Button>
                    </Link>
                    <span className="text-slate-400 text-xs">
                        Page {page} of {Math.max(totalPages, 1)}
                    </span>
                    <Link href={buildHref(page + 1, search)} aria-disabled={!hasNext}>
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={!hasNext}
                            className="border-slate-200 text-slate-700 hover:bg-slate-50 bg-white"
                        >
                            Next
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
