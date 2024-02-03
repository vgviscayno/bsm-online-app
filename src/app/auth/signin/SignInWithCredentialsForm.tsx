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
import { SendHorizontal } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

export type SignInWithCredentialsFormValues = z.infer<typeof formSchema>;

type SignInWithCredentialsFormProps = {
  onSignIn: (values: SignInWithCredentialsFormValues) => Promise<void>;
};

const formSchema = z.object({
  //+63 9178929391
  phoneNumber: z
    .string()
    // .regex(/^\d+$/, "Phone number must only contain digits")
    .refine((val) => val !== "", "Phone number is required")
    .refine((val) => val.length === 10, "Phone number must contain 10 digits")
    .refine(
      (val) => val.match(/^\d+$/),
      "Phone number must only contain digits"
    ),
});

export default function SignInWithCredentialsForm({
  onSignIn,
}: SignInWithCredentialsFormProps) {
  const form = useForm<SignInWithCredentialsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phoneNumber: "",
    },
  });

  async function onSubmit(values: SignInWithCredentialsFormValues) {
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

                  <div className="flex items-center space-x-3">
                    <p>+63</p>
                    <FormControl>
                      <Input placeholder="xxx xxx xxxx" {...field} />
                    </FormControl>
                  </div>

                  <FormDescription>
                    Enter your Philippine phone number.
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
