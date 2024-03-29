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

export type FormValues = z.infer<typeof formSchema>;

type Props = {
  onSignIn: (values: FormValues) => Promise<void>;
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

export default function SignInWithCredentialsForm({ onSignIn }: Props) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phoneNumber: "",
    },
  });

  async function onSubmit(values: FormValues) {
    await onSignIn(values);
  }

  return (
    <Card className="w-5/12">
      <CardHeader>
        <CardTitle>Sign in with your phone number</CardTitle>
        <CardDescription>An OTP will be sent to your number</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone number</FormLabel>

                  <div className="flex items-center space-x-2">
                    <span>+63</span>
                    <FormControl>
                      <Input placeholder="xxx xxx xxxx" {...field} />
                    </FormControl>
                  </div>

                  <FormDescription>
                    Enter your Philippine cellphone number.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Button
          type="submit"
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
