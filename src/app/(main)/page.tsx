"use client";
import { Icons } from "@/components/icons";
import React from "react";
import StatementForm from "@/components/statement-form";
import ClassificationTable from "@/components/classification-table";
import { useState } from "react";
import { ModeToggle } from "@/components/toggle-mode";
export default function Home() {
  const [value, setValue] = useState([]);
  return (
    <div className="min-h-screen z-20 relative container ">
      <div className="absolute z-40 top-6 right-6">
        <ModeToggle />
      </div>
      <section>
        <div className="flex flex-col items-center justify-center w-full h-full py-20 gap-y-8">
          <div className="relative">
            <Icons.activity
              color="#ff6251"
              className="w-32 h-32 text-primary stroke-2"
            />
            <div className="absolute inset-0 right-0 -z-10 w-32 h-32 bg-gradient-to-br rounded-full from-[#ff6251]/80 to-[#dc9251] blur-2xl"></div>
          </div>

          <div className="flex flex-col items-center gap-4">
            <h1 className="text-5xl md:text-5xl  lg:text-6xl font-bold text-center ">
              TextSpectrum
            </h1>
            <p className="text-lg max-w-md text-center text-secondary-foreground leading-5">
              This is a text classification app built with Next.js, Tailwind
              CSS, TypeScript and Huggingface.
            </p>
          </div>
        </div>
      </section>
      <section className="py-12 flex flex-col justify-center  gap-12 md:gap-4  md:flex-row md:justify-evenly items-center md:items-start">
        <StatementForm setValue={setValue} />
        {value.length ? <ClassificationTable value={value} /> : null}
      </section>
    </div>
  );
}
