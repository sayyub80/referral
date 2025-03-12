"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function CampaignList() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch campaigns from the database
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch("/api/user/campaigns");
        if (!response.ok) {
          throw new Error("Failed to fetch campaigns");
        }
        const data = await response.json();
        setCampaigns(data);
      } catch (error) {
        console.error("Failed to fetch campaigns:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  // Function to share campaign via WhatsApp
  const shareOnWhatsApp = (campaign) => {
    const message = `Check out this campaign: ${campaign.name}\n${campaign.description}\n\nComplete the task and earn a discount: ${window.location.origin}/campaign/${campaign._id}`;
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  // Function to share campaign via Telegram
  const shareOnTelegram = (campaign) => {
    const message = `Check out this campaign: ${campaign.name}\n${campaign.description}\n\nComplete the task and earn a discount: ${window.location.origin}/campaign/${campaign._id}`;
    const url = `https://t.me/share/url?url=${encodeURIComponent(
      window.location.origin
    )}&text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  // Function to share campaign via SMS
  const shareViaSMS = (campaign) => {
    const message = `Check out this campaign: ${campaign.name}\n${campaign.description}\n\nComplete the task and earn a discount: ${window.location.origin}/campaign/${campaign._id}`;
    const url = `sms:?body=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  // Function to share campaign via Email
  const shareViaEmail = (campaign) => {
    const subject = `Check out this campaign: ${campaign.name}`;
    const body = `Hi,\n\nI found this amazing campaign:\n\n${campaign.description}\n\nComplete the task and earn a discount: ${window.location.origin}/campaign/${campaign._id}`;
    const url = `mailto:?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.open(url, "_blank");
  };

  if (loading) {
    return <p>Loading campaigns...</p>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Available Campaigns</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((campaign) => (
          <Card key={campaign._id}>
            <CardHeader>
              <CardTitle>{campaign.name}</CardTitle>
              <CardDescription>{campaign.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Duration: {campaign.duration} days</p>
              <p>Reward: {campaign.discountValue}% off</p>
              <div className="flex space-x-2 mt-4">
                <Button
                  onClick={() => shareOnWhatsApp(campaign)}
                  className="bg-green-500 hover:bg-green-600"
                >
                  WhatsApp
                </Button>
                <Button
                  onClick={() => shareOnTelegram(campaign)}
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  Telegram
                </Button>
                <Button
                  onClick={() => shareViaSMS(campaign)}
                  className="bg-yellow-500 hover:bg-yellow-600"
                >
                  SMS
                </Button>
                <Button
                  onClick={() => shareViaEmail(campaign)}
                  className="bg-red-500 hover:bg-red-600"
                >
                  Email
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}