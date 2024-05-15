import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";

import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
      <Card>
        <CardHeader>
          <CardTitle>{issue.title}</CardTitle>
          <CardDescription>
          <div className="flex space-x-2 my-2">
        <IssueStatusBadge status={issue.status} />
        <p className="text-sm text-slate-500">
          {issue.createdAt.toDateString()}
        </p>
      </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>{issue.description}</p>
        </CardContent>
        <CardFooter>
          <p>...</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default IssueDetailsPage;
