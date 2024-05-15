import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";
import ReactMarkdown from "react-markdown";


import IssueStatusBadge from "@/app/components/IssueStatusBadge";

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
    <div className="container mx-auto">
      <div className="border p-4 rounded">
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
    </div>
  );
};

export default IssueDetailsPage;
