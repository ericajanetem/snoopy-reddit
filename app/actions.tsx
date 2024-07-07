"use client";

import prisma from "./lib/db";
import { Prisma, TypeOfVote } from "@prisma/client";
import { revalidatePath } from "@/node_modules/next/cache";
