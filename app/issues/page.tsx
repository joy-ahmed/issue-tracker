import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";


import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import prisma from "@/prisma/client";
import IssueStatusBadge from "../components/IssueStatusBadge";

const IssuesPage = async () => {
  const issues = await prisma.issue.findMany();
  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-end mb-5">
        <Link href="/issues/new">
          <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600">
            <Plus className="w-4 h-4 mr-2" />
            New Issue
          </Button>
        </Link>
      </div>
      <div className="">
        <Table className="border">
          <TableCaption>A list of your recent issues.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold">Issue</TableHead>
              <TableHead className="font-bold hidden md:table-cell">Status</TableHead>
              <TableHead className="text-right font-bold hidden md:table-cell">created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {issues.map((issue) => (
              <TableRow key={issue.id}>
                <TableCell className="font-medium">
                    <Link href={`/issues/${issue.id}`}>
                        {issue.title}
                    </Link>
                    <div className="block md:hidden">{issue.status}</div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                    <IssueStatusBadge status={issue.status} />
                </TableCell>
                <TableCell className="text-right hidden md:table-cell">
                  {issue.createdAt.toDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default IssuesPage;
