import { schema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string }}) {
    const issue = await prisma.issue.findUnique({
        where: {
            id: params.id
        }
    })
    return NextResponse.json(issue)
}

export async function PUT(request: NextRequest, { params }: { params: { id: string }}) {
    const issue = await prisma.issue.findUnique({
        where: {
            id: params.id
        }
    })
    if (!issue) notFound();
    const body = await request.json();
    const validated = schema.safeParse(body);
    if(!validated.success) return NextResponse.json(validated.error.errors, { status: 400 })
    const { title, description } = validated.data;
    const updatedIssue = await prisma.issue.update({
        where: {
            id: params.id
        },
        data: {
            title,
            description
        }
    })
    return NextResponse.json(updatedIssue, { status: 200 })
}