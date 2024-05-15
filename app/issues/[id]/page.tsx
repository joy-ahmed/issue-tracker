import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";
import ReactMarkdown from "react-markdown";


import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";

interface Props {
  params: { id: string };
}

const IssueDetailsPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: {
      id: params.id,
    },
  });
  if (!issue) notFound();

  return (
    <div className="container mx-auto flex flex-col md:flex-row gap-5 justify-between">
      <div className="border p-4 rounded flex-grow">
        <div>
          <h1 className="text-3xl font-semibold">{issue.title}</h1>
          <div className="flex items-center space-x-2 my-2">
            <IssueStatusBadge status={issue.status} />
            <p className="text-sm text-slate-500">
              {issue.createdAt.toDateString()}
            </p>
          </div>
        </div>
        <hr className="py-2" />
        <div className="prose">
          <ReactMarkdown>
            {issue.description}
          </ReactMarkdown>
        </div>
      </div>
      <div className="">
        <Link href="#">
          <Button className="bg-emerald-500 hover:bg-emerald-600">
            <Edit className="w-4 h-4 mr-2" />
            Edit Issue
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default IssueDetailsPage;
