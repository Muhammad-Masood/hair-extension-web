"use client"
import { lengthForm } from "@/components/ui/formSchema"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Length } from "@prisma/client"
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


interface LengthFormProps {
  initialData: Length | null
}

export const LengthForm:React.FC<LengthFormProps>= ({
  initialData
}) => {

  const form = useForm<z.infer<typeof lengthForm>>({
    resolver: zodResolver(lengthForm),
    defaultValues: {
      name: 0,
    }
  });

  const title = initialData?"Edit Length" : "Create length";
  const desc = initialData?"Edit exislting length" : "Add a new length";
  const toastMessage = initialData?"Length updated." : "Length created.";
  const action = initialData?"Save Changes" : "Create";
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (value: z.infer<typeof lengthForm>) => {
    try {
      setLoading(true);
      if(initialData){
        await axios.patch(`/api/lengths/${initialData.id}`,value);
      }
      else{
      await axios.post('/api/lengths',value);
      }
      toast.success(toastMessage);
      router.push('/dashboard/lengths');
      router.refresh();
    } catch (error) {
      toast.error('Length already exists.');
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="mb-3">
      <Heading title={title} desc={desc}/>
      </div>
      <Separator />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <div className="md:grid md:grid-cols-3 gap-8 mt-1">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Length name" {...field} />
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