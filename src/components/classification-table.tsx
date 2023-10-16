"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type valueProps = {
  label: string;
  score: number;
};

type Props = {
  value: valueProps[];
};
import { Progress } from "@/components/ui/progress";

function ClassificationTable({ value }: Props) {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(0.1), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Card className="min-w-[20rem]">
      <CardHeader></CardHeader>
      <CardContent>
        <div className="flex flex-col gap-1 items-start">
          {value.map((item, index) => (
            <div
              className="grid grid-cols-2 items-center justify-center gap-2"
              key={index}
            >
              <p>{item.label}</p>
              <Progress
                value={parseFloat((item.score * 100).toFixed(20))}
                className="w-[10rem] "
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default ClassificationTable;
