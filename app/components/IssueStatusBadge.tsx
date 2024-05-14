import { Status } from '@prisma/client'
import React from 'react'

import { Badge } from "@/components/ui/badge"

const statusMap: Record<Status, {label: string, color: string}> = {
    OPEN: {label: "Open", color: "bg-red-500"},
    IN_PROGRESS: {label: "In Progress", color: "bg-yellow-500"},
    CLOSED: {label: "Closed", color: "bg-green-500"},
}

const IssueStatusBadge = ({status}: {status: Status}) => {
  return (
    <Badge className={statusMap[status].color}>
        {statusMap[status].label}
    </Badge>
  )
}

export default IssueStatusBadge