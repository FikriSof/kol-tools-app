import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Mail } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-[#F6F7FB] p-4">
            <Card className="w-full max-w-[420px] shadow-sm rounded-xl border-slate-200 bg-white">
                <CardHeader className="space-y-1 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="h-12 w-12 rounded-full bg-indigo-50 flex items-center justify-center">
                            {/* Placeholder for Logo */}
                            <div className="h-6 w-6 bg-indigo-600 rounded-md" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">
                        Welcome back
                    </CardTitle>
                    <CardDescription className="text-slate-500">
                        Enter your credentials to manage your creator network
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-slate-700">Email</Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                            <Input
                                id="email"
                                placeholder="name@example.com"
                                type="email"
                                className="pl-9 border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password" className="text-slate-700">Password</Label>
                            <Link
                                href="#"
                                className="text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:underline"
                            >
                                Forgot password?
                            </Link>
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                            <Input id="password" type="password" className="pl-9 border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white" />
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm" size="lg">
                        Sign in
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
