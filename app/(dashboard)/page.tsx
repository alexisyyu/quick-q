import FormGenerator from "@/components/form-generator/form-generator";
import { Separator } from "@/components/ui/separator";
import { db } from "@/db/db";
import { forms } from "@/db/schema";

export default async function Home() {
  const formsData = await db.select().from(forms);
  console.log(formsData);
  return (
    <div className="container pt-4">
      <Separator className="my-6" />
      <h2>Your Forms</h2>
      <Separator className="my-6" />
      <FormGenerator />
    </div>
  );
}

function CardStatsWraper() {}
