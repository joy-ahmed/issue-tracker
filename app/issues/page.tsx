import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

const IssuesPage = () => {
  return (
    <div>
      <h1>Issues</h1>
      <Link href="/issues/new">
        <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600">
          <Plus className="w-4 h-4 mr-2" />
          New Issue
        </Button>
      </Link>
    </div>
  );
};

export default IssuesPage;
