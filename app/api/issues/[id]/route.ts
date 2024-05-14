import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string }}) {
    const issue = await prisma.issue.findUnique({
        where: {
            id: params.id
        }
    })
    return NextResponse.json(issue)
}