import { Construction } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-120px)]">
      <Card className="w-full max-w-md border-slate-200 shadow-sm text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 rounded-full bg-indigo-50 flex items-center justify-center">
              <Construction className="h-6 w-6 text-indigo-600" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-slate-900">
            Coming Soon
          </CardTitle>
          <CardDescription className="text-slate-500">
            This feature is currently under development.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-500">
            We're working hard to bring you powerful settings controls. Stay
            tuned for updates!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
