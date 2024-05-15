import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import Link from "next/link";
import React from "react";

const IssueEditButton = ({issueId}: {issueId: string}) => {
  return (
    <div>
      <Link href={`/issues/${issueId}/edit`}>
        <Button className="bg-emerald-500 hover:bg-emerald-600">
          <Edit className="w-4 h-4 mr-2" />
          Edit Issue
        </Button>
      </Link>
    </div>
  );
};

export default IssueEditButton;
