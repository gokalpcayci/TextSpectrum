"use client";
import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "./ui/button";
import { formSchema } from "@/lib/schemas";
import { toast } from "@/components/ui/use-toast";
import { Textarea } from "./ui/textarea";
import { Icons } from "./icons";
import { Check } from "lucide-react";

async function query(data: any) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/SamLowe/roberta-base-go_emotions",
    {
      headers: {
        Authorization: `Bearer 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`,
      },
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  const result = await response.json();
  return result;
}

type Props = {
  setValue: React.Dispatch<React.SetStateAction<never[]>>;
};

function StatementForm({ setValue }: Props) {
  const [isLoading, setIsLoading] = React.useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true);
    toast({
      title: "sentence submitted succesfully",
      description: <Icons.check className="w-6 h-6 text-green-500" />,
    });

    query({ inputs: `${data.sentence}` }).then((response) => {
      setValue(response[0]);
    });
    setIsLoading(false);
  }

  return (
    <div>
      <Card className="min-w-[20rem]">
        <CardHeader className="flex flex-col items-start">
          <CardTitle>Text Classification</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="py-3 flex flex-col items-center"></div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-6"
            >
              <FormField
                control={form.control}
                name="sentence"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Enter your sentence here"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={isLoading} type="submit">
                {" "}
                {isLoading ? "Loading..." : "Compute"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}

export default StatementForm;
