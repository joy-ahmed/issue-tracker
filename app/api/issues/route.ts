import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { schema } from "../../validationSchema";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validated = schema.safeParse(body);
  if (!validated.success)
    return NextResponse.json(validated.error.errors, { status: 400 });

  const { title, description } = validated.data;

  const issue = await prisma.issue.create({
    data: {
      title,
      description,
    },
  });

  return NextResponse.json(issue, { status: 201 });
}

//get all issues
export async function GET() {
  const issues = await prisma.issue.findMany();
  return NextResponse.json(issues);
}
