import React from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingIssues = () => {
  const issues = [1, 2, 3, 4, 5];
  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-end mb-5">
        <Skeleton className="h-10 w-32" />
      </div>
      <Table className="border">
        <TableCaption>A list of your recent issues.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold">Issue</TableHead>
            <TableHead className="font-bold hidden md:table-cell">
              Status
            </TableHead>
            <TableHead className="text-right font-bold hidden md:table-cell">
              created
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {issues.map((issue) => (
            <TableRow key={issue}>
              <TableCell className="font-medium">
                <Skeleton className="h-5 w-32" />
                <div className="block md:hidden">
                  <Skeleton className="h-5 w-20" />
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Skeleton className="h-5 w-20" />
              </TableCell>
              <TableCell className="text-right hidden md:table-cell">
                <Skeleton className="h-5 w-20" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default LoadingIssues;
