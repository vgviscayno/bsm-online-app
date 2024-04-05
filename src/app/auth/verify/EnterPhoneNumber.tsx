"use client";
import OTPTimer from "@/app/auth/verify/EnterOTP/OTPTimer";
import { verifyPhoneNumber } from "@/app/auth/verify/action";
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
import { addMinutes } from "date-fns";
import { isValidPhoneNumber } from "libphonenumber-js";
import { Loader2, SendHorizontal } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export type FormValues = z.infer<typeof formSchema>;

type Props = {
  setPhoneNumberToBeVerified: React.Dispatch<
    React.SetStateAction<string | null>
  >;
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

export default function EnterPhoneNumber({
  setPhoneNumberToBeVerified,
}: Props) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phoneNumber: "",
    },
  });

  const {
    formState: { errors },
    setError,
  } = form;

  async function onSubmit(values: FormValues) {
    console.log(values);
    const result = await verifyPhoneNumber(values);
    console.log({ result });

    if (!result) {
      setPhoneNumberToBeVerified(values.phoneNumber);
    } else {
      setError("root", {
        message: result.error,
        type: "400",
      });
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign in or Sign up with your phone number</CardTitle>
        <CardDescription>An OTP will be sent to your number</CardDescription>
      </CardHeader>
      <CardContent>
        <OTPTimer targetTime={addMinutes(new Date(), 3)} />
        <Form {...form}>
          {!!errors?.root?.message && (
            <p className="text-sm font-medium text-destructive">
              {errors?.root?.message}
            </p>
          )}
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
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <Loader2 className="mr-3 animate-spin" />
          ) : (
            <SendHorizontal className="mr-3" />
          )}
          Send OTP to your phone number
        </Button>
      </CardFooter>
    </Card>
  );
}
