import TaskForm from "@/components/TaskForm";

export default function CampaignTaskPage({ params }) {
  return (
    <div>
      <TaskForm campaignId={params.campaignId} />
    </div>
  );
}