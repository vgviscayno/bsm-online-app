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
import { useForm } from "react-hook-form";
import { z } from "zod";

export type formValues = z.infer<typeof formSchema>;

export type Props = {
  onVerifyCode: (values: formValues) => Promise<void>;
};

const formSchema = z.object({
  code: z
    .string()
    .refine((val) => val.length === 6, "Code must contain 6 characters"),
});

export default function VerifyCodeForm({}: Props) {
  const form = useForm<formValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
    },
  });

  async function onSubmit(values: formValues) {
    console.log({ values });
  }

  return (
    <Card className="p-2">
      <CardHeader>
        <CardTitle>Enter the code to verify your phone number</CardTitle>
        <CardDescription>
          A verification code has been sent to your number for verification
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <div className="space-y-2">
                    <FormLabel>Verification code</FormLabel>
                    <FormControl>
                      <Input
                        className="flex-1"
                        placeholder="xxxxxx"
                        {...field}
                      />
                    </FormControl>

                    <FormDescription>
                      Enter the verification code that you have received
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
          onClick={form.handleSubmit(onSubmit)}
          className="w-full"
        >
          Submit code
        </Button>
      </CardFooter>
    </Card>
  );
}
