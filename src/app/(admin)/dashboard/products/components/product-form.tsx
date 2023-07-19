"use client"
import { productForm } from "@/components/ui/formSchema"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Image, Product,Category,Length,Color, Texture,Method } from "@prisma/client"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
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
import {ImageUpload} from "@/components/admin/ui/image-upload"

interface ProductFormProps {
  initialData: Product & {
    images: Image[]
  } | null;
  categories: Category[];
  colors: Color[];
  textures: Texture[];
  methods: Method[];
  lengths: Length[];
}

export const ProductForm:React.FC<ProductFormProps>= ({
  initialData,
  categories,
  colors,
  methods,
  lengths,
  textures,
}) => {

  const form = useForm<z.infer<typeof productForm>>({
    resolver: zodResolver(productForm),
    defaultValues: initialData ? {
      ...initialData,
      price: parseFloat(String(initialData?.price)),
    } : {
      title: "",
      images: [],
      price: 0,
      categoryId:0,
      colorId:0,
      textureId:0,
      methodId:0,
      lengthId:0
    }
  });

  const title = initialData?"Edit Product" : "Create Product";
  const desc = initialData?"Edit exislting product" : "Add a new product";
  const toastMessage = initialData?"Product updated." : "Product created.";
  const action = initialData?"Save Changes" : "Create";
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (value: z.infer<typeof productForm>) => {
    try {
      setLoading(true);
      if(initialData){
        await axios.patch(`/api/products/${initialData.id}`,value);
      }
      else{
      await axios.post('/api/products',value);
      }
      toast.success(toastMessage);
      router.push('/dashboard/products');
      router.refresh();
    } catch (error) {
      toast.error('Product already exists.');
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
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Images</FormLabel>
                  <FormControl>
                    <ImageUpload disabled={loading} value={field.value.map((image)=> image.url )}
                    onChange={(url) => field.onChange([...field.value, {url}])}
                    onRemove={(url) => field.onChange([...field.value.filter((current) => current.url !== url)])}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Product title" {...field} />
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
                    <Input type="number" disabled={loading} placeholder="9.99" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

              <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select disabled={loading} onValueChange={field.onChange.toString} value={field.value.toString()} defaultValue={field.value.toString()}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories? (categories.map((category) => (
                        <SelectItem key={category.id} value={category.id.toString()}>{category.name}</SelectItem>
                      ))) : (<p>No category found.</p>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="colorId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <Select disabled={loading} onValueChange={field.onChange.toString} value={field.value.toString()} defaultValue={field.value.toString()}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} placeholder="Select a color" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {colors?(colors.map((color) => (
                        <SelectItem key={color.id} value={color.id.toString()}>{color.name}</SelectItem>
                      ))):<p>No colors found</p>}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

              <FormField
              control={form.control}
              name="lengthId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Length</FormLabel>
                  <Select
                   disabled={loading}  onValueChange = {field.onChange.toString} value={field.value.toString()} defaultValue={field.value.toString()}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} placeholder="Select a length" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {lengths?(lengths.map((length) => (
                        <SelectItem key={length.id} value={length.id.toString()}>{length.name}</SelectItem>
                      ))):<p>No length found</p>}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

              <FormField
              control={form.control}
              name="methodId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Method</FormLabel>
                  <Select
                   disabled={loading}  onValueChange = {field.onChange.toString} value={field.value.toString()} defaultValue={field.value.toString()}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} placeholder="Select a length" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {methods?(methods.map((method) => (
                        <SelectItem key={method.id} value={method.id.toString()}>{method.name}</SelectItem>
                      ))):<p>No method found</p>}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

              <FormField
              control={form.control}
              name="textureId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Texture</FormLabel>
                  <Select
                   disabled={loading}  onValueChange = {field.onChange.toString} value={field.value.toString()} defaultValue={field.value.toString()}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} placeholder="Select a texture" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {textures?(methods.map((texture) => (
                        <SelectItem key={texture.id} value={texture.id.toString()}>{texture.name}</SelectItem>
                      ))):<p>No texture found</p>}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isFeatured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      // @ts-ignore
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Featured
                    </FormLabel>
                    <FormDescription>
                      This product will appear on the home page
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name="isArchived"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      // @ts-ignore
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Archived
                    </FormLabel>
                    <FormDescription>
                      This product will not appear anywhere in the store.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            /> */}

            <FormField
            control={form.control}
            name="desc"
            render={({ field }) => (
              <FormItem className="">
                <FormControl>
                <div className="grid w-full gap-1.5">
                <Label htmlFor="message-2">Description</Label>
                <Textarea placeholder="Type your description here." id="message-2" {...field} />
                <p className="text-sm text-muted-foreground">
                Help your customers in understanding your product.
                </p>
                </div>
                </FormControl>
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