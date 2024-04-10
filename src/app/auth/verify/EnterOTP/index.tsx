"use client";
import { verifyOTP, verifyPhoneNumber } from "@/app/auth/verify/action";
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, SendHorizontal } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export type FormValues = z.infer<typeof formSchema>;

type Props = {
  phoneNumberToBeVerified: string | null;
  setPhoneNumberToBeVerifiedIsNullWhileHandleEnterOTPIsRunning: React.Dispatch<
    React.SetStateAction<boolean>
  >;
};

const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

const formSchema = z.object({
  otp: z
    .string()
    .refine((val) => {
      console.log(val);
      return val.length !== 0;
    }, "OTP is required")
    .refine((val) => val.length === 6, "OTP must be 6 characters"),
});

// auto focus on otp input on render
export default function EnterPhoneNumberForm({
  phoneNumberToBeVerified,
  setPhoneNumberToBeVerifiedIsNullWhileHandleEnterOTPIsRunning,
}: Props) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  const { setError, reset } = form;

  // timer
  const [duration, setDuration] = React.useState(60 * 3 - 5);
  React.useEffect(() => {
    if (duration === 0) {
      console.log("time's up!");
    }
  }, [duration]);

  React.useEffect(() => {
    const timer = window.setTimeout(() => {
      console.log("I'm running");
      setDuration((currentTime) => {
        if (currentTime > 0) {
          return currentTime - 1;
        }

        return currentTime;
      });
    }, 1000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [duration]);

  const [isResendButtonDisabled, setIsResetButtonDisabled] =
    React.useState(false);

  async function handleResendOTP() {
    setIsResetButtonDisabled(true);
    reset();
    if (!phoneNumberToBeVerified) {
      setPhoneNumberToBeVerifiedIsNullWhileHandleEnterOTPIsRunning(true);
      return;
    }

    const result = await verifyPhoneNumber({
      phoneNumber: phoneNumberToBeVerified,
    });
    console.log({ result });

    if (!result) {
      setIsResetButtonDisabled(false);
      setDuration(60 * 3 - 5);
    } else {
      setError("root", {
        message: result.error,
        type: "400",
      });
    }
  }

  async function onSubmit(values: FormValues) {
    console.log({ values });

    if (!phoneNumberToBeVerified) {
      setPhoneNumberToBeVerifiedIsNullWhileHandleEnterOTPIsRunning(true);
      return;
    }

    // start timer

    const result = await verifyOTP(phoneNumberToBeVerified, values.otp);

    console.log({ result });
    if (!result) {
      // success
    } else {
      if (result.root) {
        setError("root", {
          message: result.root,
        });
      }

      if (result.reload) {
        // reload page
      }

      if (result.resend) {
        // enable resend button
        setIsResetButtonDisabled(false);
      }
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Verification via One-Time Password (OTP)</CardTitle>
        <CardDescription>
          A one-time password has been sent to your phone number for
          verification. Please enter it before the 3 minutes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Time remaining before OTP expires: {formatTime(duration)}</p>
        {duration === 0 && (
          <Button
            disabled={isResendButtonDisabled}
            aria-disabled={isResendButtonDisabled}
            onClick={handleResendOTP}
            variant="link"
          >
            Resend OTP
          </Button>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>One-time password</FormLabel>
                  <FormControl>
                    <InputOTP
                      maxLength={6}
                      render={({ slots }) => (
                        <InputOTPGroup>
                          {slots.map((slot, index) => (
                            <InputOTPSlot key={index} {...slot} />
                          ))}
                        </InputOTPGroup>
                      )}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Enter the OTP</FormDescription>
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
          Submit OTP
        </Button>
      </CardFooter>
    </Card>
  );
}
