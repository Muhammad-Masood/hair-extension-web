"use client"
import { categoryForm } from "@/components/ui/formSchema"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Category } from "@prisma/client"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react";
import { Button } from "@/components/ui/button"
import { toast } from "react-hot-toast"
import axios from "axios"
import { usePathname, useRouter } from "next/navigation"
import prismadb from "@/lib/prismadb"


interface CategoryFormProps {
  data: Category | null
}

export const CategoryForm = () => {

  const form = useForm<z.infer<typeof categoryForm>>({
    resolver: zodResolver(categoryForm),
    defaultValues: {
      name: ""
    }
  });

  const title = "Create category";
  const desc = "Add a new category";
  const toastMessage = "Category created.";
  const action = "Create";
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (value: z.infer<typeof categoryForm>) => {
    try {
      setLoading(true);

      // await axios.get('/api/findcategory');
      await axios.post('/api/categories',value);
      toast.success(toastMessage);
      router.push('/dashboard/categories');
      // }
      // else{
      //   toast.error("Category already exist.");
      // }
    } catch (error) {
      toast.error('Something went wrong.');
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Heading title={title} desc={desc} />

      <Separator />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Category name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </div>
  )
} 