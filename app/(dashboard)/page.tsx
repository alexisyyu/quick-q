import CreateFormBtn from "@/components/form-builder/CreateFormBtn";
import FormGenerator from "@/components/form-generator/form-generator";
import { Separator } from "@/components/ui/separator";
import { db } from "@/db/db";
import { forms } from "@/db/schema";
import { GetForms } from "@/action/form";
import { Form } from "@/schemas/form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense, use } from "react";
import { Badge } from "@/components/ui/badge";
import { formatDistance } from "date-fns";
import { zhCN } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Archive, ArrowRight, Eye, SquarePen } from "lucide-react";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Welcome from "@/components/welcome/Welcome";

export default async function Home() {
  const user = await currentUser();
  if (!user) {
    return <Welcome />;
  }
  const formsData = await db.select().from(forms);
  console.log(formsData);
  return (
    <>
      <Separator className="my-4" />
      <h2 className="text-2xl font-bold px-12">Your Questionnaire</h2>
      <Separator className="my-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-4 lg:px-8 px-1 gap-1">
        <CreateFormBtn />
        <Suspense
          fallback={Array(4)
            .fill(0)
            .map((_, i) => (
              <FormCardSkeleton key={i} />
            ))}
        >
          <FormCards />
        </Suspense>
      </div>
    </>
  );
}

function CardStatsWraper() {}

function StatsCards() {}

function StatsCard() {}

function FormCardSkeleton() {
  return (
    <Skeleton className="border-2 rounded-xl border-primary-/20 h-48 w-full" />
  );
}

async function FormCards() {
  const forms = await GetForms();
  return (
    <>
      {forms.map((form) => (
        <FormCard key={form.id} form={form} />
      ))}
    </>
  );
}

function FormCard({ form }: { form: Form }) {
  return (
    <Card className="h-48">
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-2">
          <span className="truncate font-bold">{form.name}</span>
          {form.published ? (
            <Badge>Published</Badge>
          ) : (
            <Badge variant="destructive">Draft</Badge>
          )}
        </CardTitle>
        <CardDescription className="flex items-center justify-between">
          <span>
            {formatDistance(form.updatedAt, new Date(), {
              addSuffix: true,
              // locale: zhCN,
            })}
          </span>
          {form.published && (
            <span className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Eye className="size-4" />
                <span>{form.visits.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <Archive className="size-4" />
                <span>{form.responses.toLocaleString()}</span>
              </div>
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 truncate">
        {form.description || "No description"}
      </CardContent>
      <CardFooter>
        {form.published ? (
          <Button asChild className="w-full mt-2 text-md gap-4">
            <Link href={`/response/${form.id}`}>
              View Responses <ArrowRight />
            </Link>
          </Button>
        ) : (
          <Button
            asChild
            variant={"secondary"}
            className="w-full mt-2 text-md gap-4"
          >
            <Link href={`/builder/${form.id}`}>
              Edit Questionnaire <SquarePen />
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
