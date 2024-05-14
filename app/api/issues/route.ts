import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client";


const schema = z.object({
  title: z.string().min(1, "Title is required.").max(255),
  description: z.string().min(1, "Description is required."),
});

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
