"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Dashboard() {
  // Sample data
  const recentReferrals = [
    { name: "John Smith", email: "john@example.com", link: "https://johnsmith.com" },
    { name: "Alice Brown", email: "alice@example.com", link: "https://alice.brown.com" },
    { name: "Mike Johnson", email: "mike@example.com", link: "https://mike.johnson.com" },
    { name: "Sarah Wilson", email: "sarah@example.com", link: "https://sarah.wilson.com" },
  ];

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Welcome back</h1>
      <p className="text-muted-foreground mb-8">
        Here's an overview of your referral campaign performance
      </p>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Total Referrals</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">1,234</p>
            <p className="text-sm text-muted-foreground">+12% vs last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">23.5%</p>
            <p className="text-sm text-muted-foreground">+2.4% vs last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Revenue Impact</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">$12,345</p>
            <p className="text-sm text-muted-foreground">+8.7% vs last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">3</p>
            <p className="text-sm text-muted-foreground">Ongoing</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Referrals */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Recent Referrals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentReferrals.map((referral, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{referral.name}</p>
                  <a
                    href={referral.link}
                    className="text-sm text-muted-foreground hover:underline"
                  >
                    {referral.email}
                  </a>
                </div>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Assistant Section */}
      <Card>
        <CardHeader>
          <CardTitle>Referral AI Assistant</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Would you like to see today’s insights for boosting referrals?
          </p>
          <div className="flex flex-wrap gap-4 mb-4">
            <Button variant="outline">Optimize your referral strategy</Button>
            <Button variant="outline">View performance metrics</Button>
            <Button variant="outline">Schedule a strategy call</Button>
          </div>
          <div className="mt-4">
            <Input placeholder="Ask me anything..." />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}