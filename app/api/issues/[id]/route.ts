import { schema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(request: NextRequest, { params }: { params: { id: string }}) {
    const issue = await prisma.issue.findUnique({
        where: {
            id: params.id
        }
    })
    return NextResponse.json(issue)
}

export async function PUT(request: NextRequest, { params }: { params: { id: string }}) {
    const session = await getServerSession(authOptions);
    if(!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
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


export async function DELETE(request: NextRequest, { params }: { params: { id: string }}) {
    const session = await getServerSession(authOptions);
    if(!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    const issue = await prisma.issue.findUnique({
        where: {
            id: params.id
        }
    })
    if (!issue) notFound();
    const deleteIssue = await prisma.issue.delete({
        where: {
            id: params.id
        }
    })
    return NextResponse.json(deleteIssue, { status: 200 })
}