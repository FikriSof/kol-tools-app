import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    MapPin,
    Building,
    ExternalLink,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { creatorService } from "@/lib/services/creator.service";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function CreatorDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    let creator: Awaited<ReturnType<typeof creatorService.getCreatorById>>;
    try {
        creator = await creatorService.getCreatorById(id);
    } catch {
        notFound();
    }

    const location = [creator.city, creator.country].filter(Boolean).join(", ");

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-6">
                    <Avatar className="h-24 w-24 border-4 border-white shadow-sm ring-1 ring-slate-200">
                        <AvatarFallback className="bg-slate-100 text-slate-500 text-3xl font-bold">
                            {creator.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold text-slate-900">{creator.name}</h1>
                        <p className="text-lg text-slate-500 font-medium">{creator.tiktok_username}</p>
                        <div className="flex items-center gap-4 text-sm text-slate-500 pt-2">
                            {location && (
                                <div className="flex items-center gap-1.5">
                                    <MapPin className="h-4 w-4 text-slate-400" />
                                    {location}
                                </div>
                            )}
                            {creator.agency && (
                                <div className="flex items-center gap-1.5">
                                    <Building className="h-4 w-4 text-slate-400" />
                                    {creator.agency.name}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <Link href={creator.tiktok_profile_url} target="_blank" rel="noopener noreferrer">
                    <Button
                        variant="outline"
                        size="sm"
                        className="gap-2 border-slate-200 text-slate-700 hover:bg-slate-50 bg-white"
                    >
                        <ExternalLink className="h-4 w-4" />
                        View TikTok
                    </Button>
                </Link>
            </div>

            <Separator className="bg-slate-200" />

            {/* Info cards */}
            <div className="grid gap-6 md:grid-cols-2">
                {/* Creator Info */}
                <Card className="border-slate-200 shadow-sm rounded-xl">
                    <CardHeader>
                        <CardTitle className="text-slate-900">Creator Info</CardTitle>
                        <CardDescription className="text-slate-500">
                            Profile details for this creator
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm">
                        <div className="flex justify-between border-b border-slate-100 pb-2">
                            <span className="text-slate-500">TikTok Username</span>
                            <span className="text-slate-900 font-medium">{creator.tiktok_username}</span>
                        </div>
                        {creator.content_language && (
                            <div className="flex justify-between border-b border-slate-100 pb-2">
                                <span className="text-slate-500">Content Language</span>
                                <span className="text-slate-900 font-medium">{creator.content_language}</span>
                            </div>
                        )}
                        <div className="flex justify-between border-b border-slate-100 pb-2">
                            <span className="text-slate-500">City</span>
                            <span className="text-slate-900 font-medium">{creator.city || "—"}</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-100 pb-2">
                            <span className="text-slate-500">Country</span>
                            <span className="text-slate-900 font-medium">{creator.country || "—"}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-500">Agency</span>
                            <span className="text-slate-900 font-medium">{creator.agency?.name || "—"}</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Contact Information */}
                <Card className="border-slate-200 shadow-sm rounded-xl">
                    <CardHeader>
                        <CardTitle className="text-slate-900">Contact Information</CardTitle>
                        <CardDescription className="text-slate-500">
                            Unlock to view full contact details
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {creator.creator_contact ? (
                            <>
                                {creator.creator_contact.email_encrypted && (
                                    <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg bg-slate-50">
                                        <span className="font-mono text-slate-600 font-medium text-sm">
                                            Email: •••••••••@•••.com
                                        </span>
                                        <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm border-0">
                                            Unlock
                                        </Button>
                                    </div>
                                )}
                                {creator.creator_contact.whatsapp_encrypted && (
                                    <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg bg-slate-50">
                                        <span className="font-mono text-slate-600 font-medium text-sm">
                                            WhatsApp: +62 ••• •••• ••••
                                        </span>
                                        <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm border-0">
                                            Unlock
                                        </Button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <p className="text-sm text-slate-400 italic">
                                No contact information registered yet.
                            </p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
