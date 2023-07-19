"use client"
import { textureForm } from "@/components/ui/formSchema"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Texture } from "@prisma/client"
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


interface TextureFormProps {
  initialData: Texture | null
}

export const CategoryForm:React.FC<TextureFormProps>= ({
  initialData
}) => {

  const form = useForm<z.infer<typeof textureForm>>({
    resolver: zodResolver(textureForm),
    defaultValues: {
      name: ""
    }
  });

  const title = initialData?"Edit Texture" : "Create texture";
  const desc = initialData?"Edit existing texture" : "Add a new texture";
  const toastMessage = initialData?"Texture updated." : "Texture created.";
  const action = initialData?"Save Changes" : "Create";
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (value: z.infer<typeof textureForm>) => {
    try {
      setLoading(true);
      if(initialData){
        await axios.patch(`/api/textures/${initialData.id}`,value);
      }
      else{
      await axios.post('/api/textures',value);
      }
      toast.success(toastMessage);
      router.push('/dashboard/textures');
      router.refresh();
    } catch (error) {
      toast.error('Texture already exists.');
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
                    <Input disabled={loading} placeholder="Texture name" {...field} />
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