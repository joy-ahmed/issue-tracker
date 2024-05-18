import React from 'react'

import { Skeleton } from '@/components/ui/skeleton'

const FormLoadingSkeliton = () => {
  return (
    <div className="p-5 max-w-3xl mx-auto">
      <Skeleton className="h-10 w-full" />
      <div
        className="grid w-full items-center gap-2"
      >
        <Skeleton className="h-5 w-full mb-5" />
        <Skeleton className="h-10 w-full mb-5" />

        <Skeleton className="h-5 w-full mb-5" />
        <Skeleton className="h-72 w-full mb-5" />
        <Skeleton className="h-10 w-full mb-5" />
      </div>
    </div>
  )
}

export default FormLoadingSkeliton