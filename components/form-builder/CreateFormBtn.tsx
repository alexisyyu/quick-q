"use client";
import {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogContent,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import React from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { formSchema, formSchemaType } from "@/schemas/form";
import { CreateForm } from "@/action/form";
import { FileUser } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CreateFormBtn() {
  const router = useRouter();
  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  async function onSubmit(data: formSchemaType) {
    try {
      const formId = await CreateForm(data);
      toast("Form submitted successfully: form " + formId);
      router.push(`/builder/${formId}`);
    } catch (error) {
      toast("Something went wrong: " + error);
    }
  }
  function SubmitButton({
    variant,
    content,
  }: {
    variant?: React.ComponentProps<typeof Button>["variant"];
    content?: string;
  }) {
    const loading = form.formState.isSubmitting;
    return (
      <Button
        onClick={form.handleSubmit(onSubmit)}
        disabled={loading}
        variant={variant}
      >
        {loading ? "Generating..." : content}
      </Button>
    );
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="group border-2 border-primary/20 h-48 items-center justify-center flex flex-col hover:border-primary hover:cursor-pointer border-dashed gap-4 rounded-xl"
        >
          <FileUser className="size-12 text-muted-foreground group-hover:text-primary" />
          <p className="font-bold text-xl text-muted-foreground group-hover:text-primary">
            Create Questionnaire
          </p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Questionnaire</DialogTitle>
          <DialogDescription>
            Create a new questionnaire to collect data from users.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Questionnaire Name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={5}
                      {...field}
                      placeholder="Questionnaire Description"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <SubmitButton content="AI Generate" />
          <SubmitButton variant="secondary" content="Create Manually" />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
