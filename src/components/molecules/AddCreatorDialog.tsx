"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormData {
  name: string;
  tiktok_username: string;
  tiktok_profile_url: string;
  city: string;
  country: string;
}

const initialForm: FormData = {
  name: "",
  tiktok_username: "",
  tiktok_profile_url: "",
  city: "",
  country: "",
};

export function AddCreatorDialog() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>(initialForm);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/creators", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const json = await res.json();

      if (!res.ok) {
        setError(json?.error?.message || "Failed to add creator");
        return;
      }

      setForm(initialForm);
      setOpen(false);
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white border-none shadow-sm gap-2">
          <Plus className="h-4 w-4" />
          Add Creator
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px] border-slate-200 bg-white">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-slate-900">Add Creator</DialogTitle>
            <DialogDescription className="text-slate-500">
              Fill in the details below to register a new KOL creator.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-5">
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-slate-700 font-medium">
                Full Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="e.g. Budi Santoso"
                value={form.name}
                onChange={handleChange}
                required
                className="border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20 text-black"
              />
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="tiktok_username"
                className="text-slate-700 font-medium"
              >
                TikTok Username <span className="text-red-500">*</span>
              </Label>
              <Input
                id="tiktok_username"
                name="tiktok_username"
                placeholder="e.g. @budisantoso"
                value={form.tiktok_username}
                onChange={handleChange}
                required
                className="border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20 text-black"
              />
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="tiktok_profile_url"
                className="text-slate-700 font-medium"
              >
                TikTok Profile URL <span className="text-red-500">*</span>
              </Label>
              <Input
                id="tiktok_profile_url"
                name="tiktok_profile_url"
                placeholder="e.g. https://www.tiktok.com/@budisantoso"
                value={form.tiktok_profile_url}
                onChange={handleChange}
                required
                className="border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20 text-black"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="city" className="text-slate-700 font-medium">
                  City
                </Label>
                <Input
                  id="city"
                  name="city"
                  placeholder="e.g. Jakarta"
                  value={form.city}
                  onChange={handleChange}
                  className="border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20 text-black"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="country" className="text-slate-700 font-medium">
                  Country
                </Label>
                <Input
                  id="country"
                  name="country"
                  placeholder="e.g. Indonesia"
                  value={form.country}
                  onChange={handleChange}
                  className="border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20 text-black"
                />
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-md px-3 py-2">
                {error}
              </p>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="border-slate-200 text-slate-700 bg-white hover:bg-slate-50"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              {loading ? "Saving..." : "Save Creator"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
