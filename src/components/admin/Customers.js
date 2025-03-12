// "use client";

// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import {Input} from "@/components/ui/input"
// export default function Customers() {
//   // Sample customer data
//   const customers = [
//     { name: "Emily Davis", referralCount: 15, conversionRate: 82 },
//     { name: "John Smith", referralCount: 12, conversionRate: 68 },
//     { name: "Sarah Johnson", referralCount: 8, conversionRate: 75 },
//     { name: "Lisa Anderson", referralCount: 10, conversionRate: 70 },
//     { name: "Janase Taylor", referralCount: 7, conversionRate: 57, date: "Feb. 9, 2024", revenue: "$2,800" },
//   ];

//   return (
//     <div className="container mx-auto p-8">
//       <h1 className="text-3xl font-bold mb-8">Customers</h1>
//       <p className="text-muted-foreground mb-8">
//         Manage and monitor your customer referral activities
//       </p>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//         <Card>
//           <CardHeader>
//             <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-2xl font-bold">123</p>
//             <p className="text-sm text-muted-foreground">+12% vs last month</p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader>
//             <CardTitle className="text-sm font-medium">New Customers</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-2xl font-bold">23</p>
//             <p className="text-sm text-muted-foreground">+8% vs last month</p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader>
//             <CardTitle className="text-sm font-medium">Average Conversion Rate</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-2xl font-bold">72%</p>
//             <p className="text-sm text-muted-foreground">+5% vs last month</p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader>
//             <CardTitle className="text-sm font-medium">Total Revenue Generated</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-2xl font-bold">$23,900</p>
//             <p className="text-sm text-muted-foreground">+15% vs last month</p>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Customer Table */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Customer Referral Analytics</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Customer Name</TableHead>
//                 <TableHead>Referral Count</TableHead>
//                 <TableHead>Conversion Rate</TableHead>
//                 <TableHead>Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {customers.map((customer, index) => (
//                 <TableRow key={index}>
//                   <TableCell>{customer.name}</TableCell>
//                   <TableCell>{customer.referralCount}</TableCell>
//                   <TableCell>{customer.conversionRate}%</TableCell>
//                   <TableCell>
//                     <Button variant="outline" size="sm">
//                       View Details
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>

//       {/* AI Assistant Section */}
//       <Card className="mt-8">
//         <CardHeader>
//           <CardTitle>Referral AI Assistant</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <p className="text-muted-foreground mb-4">
//             Looking at customer data? I can help you identify growth opportunities.
//           </p>
//           <div className="flex flex-wrap gap-4">
//             <Button variant="outline">Invite a customer to join</Button>
//             <Button variant="outline">Analyze customer behavior</Button>
//             <Button variant="outline">View referral analytics</Button>
//             <Button variant="outline">Export customer data</Button>
//           </div>
//           <div className="mt-4">
//             <Input placeholder="Ask me anything..." />
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }





"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users from the database
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/admin/users");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <p>Loading users...</p>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">All Users</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <Card key={user._id}>
            <CardHeader>
              <CardTitle>{user.name}</CardTitle>
              <CardDescription>{user.email}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Role: {user.role}</p>
              <p>Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}