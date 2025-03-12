"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useSession } from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

// Define the form schema using Zod
const formSchema = z.object({
  name: z.string().min(2, "Campaign name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  duration: z.enum(["30", "90", "ongoing"]),
  status: z.boolean(),
  rewardType: z.enum(["instant", "conversion"]),
  rewardFormat: z.enum(["discount", "cash"]),
  discountValue: z.enum(["20", "15", "25"]),
  additionalNotes: z.array(z.string()),
  aiOptimization: z.boolean(),
  message: z.string().optional(),
  selectedMessage: z.number(),
});

// Message suggestions
const messageSuggestions = [
  "Get 20% off on your first purchase!",
  "Refer a friend and earn rewards!",
  "Exclusive discount for our loyal customers!",
];

export default function CampaignCreator() {
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const { data: session, status } = useSession(); // Get the admin session

  // Initialize the form with react-hook-form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      duration: "30", // Default duration
      status: true,
      rewardType: "instant",
      rewardFormat: "discount",
      discountValue: "20",
      additionalNotes: [],
      aiOptimization: true,
      selectedMessage: 0,
    },
  });

  // Handle form submission
  const onSubmit = async (values) => {
    try {
      // Check if session exists and user is authenticated
      if (!session || !session.user) {
        throw new Error("User not authenticated");
      }

      // Add the admin ID to the campaign data
      const campaignData = { ...values, createdBy: session.user.id };

      // Save the campaign to the database
      const response = await fetch("/api/admin/campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(campaignData),
      });

      const responseData = await response.json(); // Parse the response
      console.log("API Response:", responseData);

      if (response.ok) {
        console.log("Campaign created successfully");
        setOpen(false);
        form.reset();
        setCurrentStep(1);
      } else {
        console.error("Failed to create campaign:", responseData.message || "Unknown error");
      }
    } catch (error) {
      console.error("Failed to create campaign:", error);
    }
  };

  // Handle moving to the next step
  const handleNext = async () => {
    const fieldsToValidate = {
      1: ["name", "description", "duration"],
      2: ["rewardType", "rewardFormat", "discountValue"],
      3: ["aiOptimization", "selectedMessage"],
    }[currentStep];

    const isValid = await form.trigger(fieldsToValidate);
    if (isValid && currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  // Handle message suggestion click
  const handleMessageClick = (message) => {
    form.setValue("message", message); // Update the message field
  };

  // Handle sending chat messages
  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setChatMessages([...chatMessages, { text: inputMessage, sender: "user" }]);
      setInputMessage("");
      // Simulate a bot response (to be replaced with AI integration)
      setTimeout(() => {
        setChatMessages((prev) => [
          ...prev,
          { text: "How can I assist you further?", sender: "bot" },
        ]);
      }, 1000);
    }
  };

  return (
    <div className="relative min-h-screen p-6 bg-gray-50">
      {/* Create Campaign Button */}
      <div className="fixed top-6 right-6">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 relative top-28 right-28  hover:bg-blue-700 text-white shadow-lg">
              + Create Campaign
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Campaign</DialogTitle>
              <div className="flex justify-between items-center pt-4">
                <Progress value={(currentStep / 4) * 100} className="h-2" />
                <span className="text-sm text-muted-foreground">
                  Step {currentStep} of 4
                </span>
              </div>
            </DialogHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Step 1: Campaign Basics */}
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Campaign Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Summer Referral Special" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe your campaign..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="duration"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Duration</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              value={field.value}
                              className="grid grid-cols-3 gap-4"
                            >
                              {/* 30 Days */}
                              <Card
                                className={`p-4 cursor-pointer transition-all ${
                                  field.value === "30" ? "bg-primary/10 border-2 border-primary" : ""
                                }`}
                              >
                                <label className="space-y-2 cursor-pointer">
                                  <RadioGroupItem value="30" className="sr-only" />
                                  <h4 className="font-medium">30 Days</h4>
                                  <p className="text-sm text-muted-foreground">Recommended</p>
                                </label>
                              </Card>

                              {/* 90 Days */}
                              <Card
                                className={`p-4 cursor-pointer transition-all ${
                                  field.value === "90" ? "bg-primary/10 border-2 border-primary" : ""
                                }`}
                              >
                                <label className="space-y-2 cursor-pointer">
                                  <RadioGroupItem value="90" className="sr-only" />
                                  <h4 className="font-medium">90 Days</h4>
                                  <p className="text-sm text-muted-foreground">Seasonal</p>
                                </label>
                              </Card>

                              {/* Ongoing */}
                              <Card
                                className={`p-4 cursor-pointer transition-all ${
                                  field.value === "ongoing" ? "bg-primary/10 border-2 border-primary" : ""
                                }`}
                              >
                                <label className="space-y-2 cursor-pointer">
                                  <RadioGroupItem value="ongoing" className="sr-only" />
                                  <h4 className="font-medium">Ongoing</h4>
                                  <p className="text-sm text-muted-foreground">No end date</p>
                                </label>
                              </Card>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {/* Step 2: Reward Setup */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="rewardType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Reward Type</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="space-y-3"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="instant" />
                                </FormControl>
                                <FormLabel>Instant Reward</FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="conversion" />
                                </FormControl>
                                <FormLabel>Conversion-based</FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="rewardFormat"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Reward Format</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="grid grid-cols-2 gap-4"
                            >
                              {["discount", "cash"].map((format) => (
                                <Card key={format} className="p-4">
                                  <FormItem className="flex items-center space-x-3">
                                    <FormControl>
                                      <RadioGroupItem value={format} />
                                    </FormControl>
                                    <FormLabel className="capitalize">
                                      {format}
                                    </FormLabel>
                                  </FormItem>
                                </Card>
                              ))}
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="discountValue"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Discount Value</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="grid grid-cols-3 gap-4"
                            >
                              {["20", "15", "25"].map((value) => (
                                <Card key={value} className="p-4">
                                  <FormItem className="flex items-center space-x-3">
                                    <FormControl>
                                      <RadioGroupItem value={value} />
                                    </FormControl>
                                    <FormLabel>{value}% off</FormLabel>
                                  </FormItem>
                                </Card>
                              ))}
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {/* Step 3: Messaging */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="aiOptimization"
                      render={({ field }) => (
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel>Enable AI Optimization</FormLabel>
                        </FormItem>
                      )}
                    />
                    <div className="space-y-4">
                      {messageSuggestions.map((message, index) => (
                        <Card
                          key={index}
                          className={`p-4 cursor-pointer ${
                            form.watch("selectedMessage") === index
                              ? "border-primary"
                              : ""
                          }`}
                          onClick={() => handleMessageClick(message)} // Add this line
                        >
                          {message}
                        </Card>
                      ))}
                    </div>
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Custom Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter your custom message..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {/* Step 4: Review */}
                {currentStep === 4 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Name</p>
                        <p>{form.watch("name")}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Status</p>
                        <p>{form.watch("status") ? "Active" : "Inactive"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Reward Type</p>
                        <p>{form.watch("rewardType")}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Reward Value</p>
                        <p>{form.watch("discountValue")}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">AI Optimization</p>
                        <p>{form.watch("aiOptimization") ? "Enabled" : "Disabled"}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() =>
                      currentStep > 1
                        ? setCurrentStep((prev) => prev - 1)
                        : setOpen(false)
                    }
                  >
                    {currentStep > 1 ? "Back" : "Cancel"}
                  </Button>
                  <Button
                    type="button"
                    onClick={
                      currentStep === 4
                        ? form.handleSubmit(onSubmit)
                        : handleNext
                    }
                  >
                    {currentStep === 4 ? "Launch Campaign" : "Next"}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Middle Content */}
      <div className="flex flex-col items-center justify-center h-[calc(100vh-12rem)] text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to Campaign Manager
        </h1>
        <p className="text-lg text-gray-600">
          Create, manage, and optimize your marketing campaigns with ease.
        </p>
      </div>

      {/* Chat Button */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-lg"
      >
        💬
      </button>

      {/* Chat Box */}
      {chatOpen && (
        <div className="fixed bottom-20 right-6 w-80 bg-white rounded-lg shadow-lg p-4">
          <div className="space-y-4">
            <p className="font-medium">Chat with us</p>
            <div className="h-48 overflow-y-auto space-y-2">
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-2 rounded-lg ${
                    msg.sender === "user"
                      ? "bg-blue-100 text-blue-800 ml-auto w-3/4"
                      : "bg-gray-100 text-gray-800 w-3/4"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>
            <div className="flex space-x-2">
              <Input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1"
              />
              <Button onClick={handleSendMessage} className="bg-green-600 hover:bg-green-700">
                Send
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}