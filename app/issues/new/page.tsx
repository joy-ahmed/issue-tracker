"use client";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import axios from "axios";
import { AlertCircle } from "lucide-react";
import SimpleMDE from "react-simplemde-editor";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import "easymde/dist/easymde.min.css";
import { schema } from "@/app/validationSchema";

type IssueForm =z.infer<typeof schema>;
const NewIssuePage = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const { handleSubmit, register, control, formState: { touchedFields, errors } } = useForm<IssueForm>({
    resolver: zodResolver(schema),
  });
  const formSubmit = async (data: IssueForm) => {
    try {
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
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
          <AlertDescription>
            {error}
          </AlertDescription>
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
        {errors.title && touchedFields.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
        
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
        {errors.description && touchedFields.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}
        <Button className="bg-emerald-500 hover:bg-emerald-600">Submit</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
