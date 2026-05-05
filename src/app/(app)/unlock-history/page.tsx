import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function UnlockHistoryPage() {
  const history = [
    {
      id: 1,
      creator: { name: "Alice Smith", avatar: "/avatars/1.png" },
      platform: "TikTok",
      date: "2024-02-14 10:30 AM",
      cost: 5,
      status: "Success",
    },
    {
      id: 2,
      creator: { name: "Bob Jones", avatar: "/avatars/2.png" },
      platform: "Instagram",
      date: "2024-02-13 02:15 PM",
      cost: 5,
      status: "Success",
    },
    {
      id: 3,
      creator: { name: "Charlie Brown", avatar: "/avatars/3.png" },
      platform: "TikTok",
      date: "2024-02-13 09:00 AM",
      cost: 5,
      status: "Success",
    },
    {
      id: 4,
      creator: { name: "Diana Prince", avatar: "/avatars/4.png" },
      platform: "YouTube",
      date: "2024-02-12 04:45 PM",
      cost: 10,
      status: "Success",
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight text-slate-900">
        Unlock History
      </h1>
      <div className="border border-slate-200 rounded-xl bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow className="border-slate-200 hover:bg-slate-50">
              <TableHead className="text-slate-500 font-medium">
                Creator
              </TableHead>
              <TableHead className="text-slate-500 font-medium">
                Platform
              </TableHead>
              <TableHead className="text-slate-500 font-medium">
                Date & Time
              </TableHead>
              <TableHead className="text-slate-500 font-medium">Cost</TableHead>
              <TableHead className="text-slate-500 font-medium">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {history.map((item) => (
              <TableRow
                key={item.id}
                className="border-slate-200 hover:bg-slate-50"
              >
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6 border border-slate-200">
                      <AvatarImage src={item.creator.avatar} />
                      <AvatarFallback className="bg-slate-100 text-slate-600">
                        {item.creator.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-slate-900">{item.creator.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-slate-600">
                  {item.platform}
                </TableCell>
                <TableCell className="text-slate-600">{item.date}</TableCell>
                <TableCell className="text-slate-900 font-medium">
                  {item.cost} Credits
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700 border-green-200"
                  >
                    {item.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
