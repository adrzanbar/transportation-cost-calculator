"use server";

import { formSchema, FormData } from "@/app/validation";
import prisma from "@/lib/prisma";

export async function calculateServiceCost(formData: FormData) {
    console.log("formData", formData);
    const validation = formSchema.safeParse(formData);
    console.log(validation);
}
