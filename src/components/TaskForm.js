"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function TaskForm({ campaignId }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [discountCode, setDiscountCode] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/campaigns/${campaignId}/complete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      if (response.ok) {
        const data = await response.json();
        setDiscountCode(data.discountCode); // Set the discount code
      } else {
        throw new Error("Failed to complete the task");
      }
    } catch (error) {
      console.error("Failed to complete the task:", error);
      alert("Failed to complete the task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Complete the Task</h1>
      {discountCode ? (
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>🎉 Congratulations!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg mb-4">
              Your discount code is:{" "}
              <span className="font-bold text-primary">{discountCode}</span>
            </p>
            <Button onClick={() => router.push("/user/rewards")}>
              View Rewards
            </Button>
          </CardContent>
        </Card>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
          <Input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </form>
      )}
    </div>
  );
}