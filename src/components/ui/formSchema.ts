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

export const categoryForm = z.object({
  name:z.string().min(2)
});

export const colorForm = z.object({
  name:z.string().min(2)
});
export const lengthForm = z.object({
  name:z.number().min(1)
});
export const methodForm = z.object({
  name:z.string().min(2)
});
export const textureForm = z.object({
  name:z.string().min(2)
});

export const videoForm = z.object({
  title:z.string().min(3),
  video:z.object({url:z.string()})
});

export const productForm = z.object({
  title:z.string().min(2),
  desc: z.string().min(20),
  images: z.object({url: z.string()}).array().min(1),
  price: z.coerce.number().min(1),
  categoryId: z.number(),
  colorId: z.number(),
  textureId: z.number(),
  methodId: z.number(),
  lengthId: z.number(),
  isFeatured: z.boolean().default(false).optional(),
});