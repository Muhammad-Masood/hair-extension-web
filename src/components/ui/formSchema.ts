"use client"

import Link from "next/link"
import * as z from "zod"

export const signUpSchema = z.object({
  name: z.string().min(2).max(20),
  email: z.string().email(),
  password: z.string(),
});

export const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(5).max(15),
});
