"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { isValidPhoneNumber } from "libphonenumber-js";
import { SendHorizontal } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export type formValues = z.infer<typeof formSchema>;

export type Props = {
  onEnterCredentials: (values: formValues) => Promise<void>;
};

const formSchema = z.object({
  //+63 9178929391
  phoneNumber: z
    .string()
    .refine((val) => val !== "", "Phone number is required")
    .refine((val) => val.length === 10, "Phone number must contain 10 digits")
    .refine(
      (val) => val.match(/^\d+$/),
      "Phone number must only contain digits"
    )
    .refine(
      (val) => isValidPhoneNumber(val, "PH"),
      "Phone number nust be a valid Philippines cellphone number"
    ),
});

export default function EnterCredentialsForm({ onEnterCredentials }: Props) {
  const form = useForm<formValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phoneNumber: "",
    },
  });

  async function onSubmit(values: formValues) {
    onEnterCredentials(values);
  }

  return (
    <Card className="p-2">
      <CardHeader>
        <CardTitle>Sign up with your phone number</CardTitle>
        <CardDescription>
          An OTP will be sent to your number for verification
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <div className="space-y-2">
                    <FormLabel>Phone Number</FormLabel>
                    <div className="flex space-x-2 items-center">
                      <span>+63</span>
                      <FormControl>
                        <Input
                          className="flex-1"
                          placeholder="xxx xxx xxxx"
                          type="tel"
                          {...field}
                        />
                      </FormControl>
                    </div>

                    <FormDescription>
                      Enter your Philippine cellphone number.
                    </FormDescription>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          aria-disabled={form.formState.isSubmitting}
          onClick={form.handleSubmit(onSubmit)}
          className="w-full"
        >
          <SendHorizontal className="mr-3" />
          Send OTP
        </Button>
      </CardFooter>
    </Card>
  );
}
