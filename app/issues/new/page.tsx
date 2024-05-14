"use client";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import axios from "axios";
import { AlertCircle, LoaderCircle } from "lucide-react";
import SimpleMDE from "react-simplemde-editor";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import "easymde/dist/easymde.min.css";
import { schema } from "@/app/validationSchema";
import ErrorMessage from "@/app/components/ErrorMessage";

type IssueForm = z.infer<typeof schema>;
const NewIssuePage = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(schema),
  });
  const formSubmit = async (data: IssueForm) => {
    try {
      setIsSubmitting(true);
      await axios.post("/api/issues", data);
      router.push("/issues");
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
        />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        <Label htmlFor="message">Define the issue:</Label>

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE
              {...field}
              placeholder="Type your issues details here."
            />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting} className="bg-emerald-500 hover:bg-emerald-600 font-medium">
          Submit
          {isSubmitting && (
            <>
              ing
              <LoaderCircle className="w-5 h-5 ml-2 animate-spin duration-700" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
