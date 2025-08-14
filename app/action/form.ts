"use server";

import { currentUser } from "@clerk/nextjs/server";

export async function GetFormStats() {
  const user = await currentUser();
  if (user == null) {
    throw new Error("User not found");
  }
}
