"use client"
import { textureForm, videoForm } from "@/components/ui/formSchema"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Training } from "@prisma/client"
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


interface VideoFormProps {
  initialData: Training | null
}

export const VideoForm:React.FC<VideoFormProps>= ({
  initialData
}) => {

  const form = useForm<z.infer<typeof videoForm>>({
    resolver: zodResolver(videoForm),
    defaultValues: {
      url: "",
      price:0
    }
  });

  const title = initialData?"Edit Video" : "Create video";
  const desc = initialData?"Edit existing video" : "Add a new video";
  const toastMessage = initialData?"Video updated." : "Video created.";
  const action = initialData?"Save Changes" : "Create";
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (value: z.infer<typeof videoForm>) => {
    try {
      setLoading(true);
      if(initialData){
        await axios.patch(`/api/trainings/${initialData.id}`,value);
      }
      else{
      await axios.post('/api/trainings',value);
      }
      toast.success(toastMessage);
      router.push('/dashboard/videos');
      router.refresh();
    } catch (error) {
      toast.error('Video already exists.');
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
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Url</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Video url" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Video price" {...field} />
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