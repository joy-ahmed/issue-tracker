import React from "react";

import { Skeleton } from "@/components/ui/skeleton";

const LoadingDetailsPage = () => {
  return (
    <div className="container mx-auto">
      <div className="border p-4 rounded">
        <div>
          <Skeleton className="h-5 w-32" />
          <div className="flex items-center space-x-2 my-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-32" />
          </div>
        </div>
        <hr className="py-2" />
        <div className="prose">
          <Skeleton className="h-5 w-32 mb-4" />
          <Skeleton className="h-5 w-32 mb-4" />
          <Skeleton className="h-5 w-32" />
        </div>
      </div>
    </div>
  );
};

export default LoadingDetailsPage;
