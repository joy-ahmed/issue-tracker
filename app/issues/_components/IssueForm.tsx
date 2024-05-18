"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { AlertCircle, LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import { z } from "zod";

import ErrorMessage from "@/app/components/ErrorMessage";
import { schema } from "@/app/validationSchema";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Issue } from "@prisma/client";
import "easymde/dist/easymde.min.css";

type IssueFormData = z.infer<typeof schema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(schema),
  });
  const formSubmit = async (data: IssueFormData) => {
    try {
      setIsSubmitting(true);
      if (issue) {
        await axios.put(`/api/issues/${issue.id}`, data);
        router.push("/issues");
        router.refresh();
        return;
      }
      await axios.post("/api/issues", data);
      router.push("/issues");
      router.refresh();
    } catch (error) {
      setIsSubmitting(false);
      setError("An unexpected error occurred.");
    }
  };
  return (
    <div className="p-5 max-w-3xl mx-auto">
      <h1 className="text-3xl font-semibold text-center mb-5">Add New Issue</h1>
      {error && (
        <Alert variant="destructive" className="mb-5">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <form
        onSubmit={handleSubmit(formSubmit)}
        className="grid w-full items-center gap-2"
      >
        <Label htmlFor="title">Title</Label>
        <Input
          {...register("title")}
          type="text"
          id="title"
          placeholder="what is the issue?"
          defaultValue={issue?.title}
        />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        <Label htmlFor="message">Define the issue:</Label>

        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE
              {...field}
              placeholder="Type your issues details here."
            />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting} className="bg-emerald-500 hover:bg-emerald-600 font-medium">
          {issue ? "Update" : "Submit"}
          {isSubmitting && (
            <>
              <LoaderCircle className="w-5 h-5 ml-2 animate-spin duration-700" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
