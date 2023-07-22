"use client"
import { colorForm } from "@/components/ui/formSchema"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Color } from "@prisma/client"
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

interface ColorFormProps {
  initialData: Color | null
}

export const ColorForm:React.FC<ColorFormProps>= ({
  initialData
}) => {

  const form = useForm<z.infer<typeof colorForm>>({
    resolver: zodResolver(colorForm),
    defaultValues: {
      name: ""
    }
  });

  const title = initialData?"Edit Color" : "Create color";
  const desc = initialData?"Edit exislting color" : "Add a new color";
  const toastMessage = initialData?"Color updated." : "Color created.";
  const action = initialData?"Save Changes" : "Create";
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (value: z.infer<typeof colorForm>) => {
    try {
      setLoading(true);
      if(initialData){
        await axios.patch(`/api/attributes/colors/${initialData.id}`,value);
      }
      else{
      await axios.post('/api/attributes/colors',value);
      }
      toast.success(toastMessage);
      router.push('/dashboard/colors');
      router.refresh();
    } catch (error) {
      toast.error('Color already exists.');
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
                    <Input disabled={loading} placeholder="Color name" {...field} />
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