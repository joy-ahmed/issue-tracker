import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React from "react";

const IssuesPage = () => {
  return (
    <div>
      <h1>Issues</h1>
      <Button className="bg-emerald-500 hover:bg-emerald-600">
        <Plus className="w-4 h-4 mr-2" />
        New Issue
      </Button>
    </div>
  );
};

export default IssuesPage;
