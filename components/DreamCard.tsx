"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function DreamCard({
  icon,
  title,
  subtitle,
  link,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  link: string;
}) {

  const router = useRouter();

  return (
    <button
      onClick={() => router.push(link)}
      className="
        flex w-full items-center gap-4
        rounded-[32px]
        bg-white
        p-6
        text-left
        shadow-[0_10px_30px_rgba(0,0,0,0.05)]
        transition
        hover:scale-[1.02]
        active:scale-[0.98]
      "
    >

      <div
        className="
          flex h-14 w-14 items-center justify-center
          rounded-2xl
          bg-[#F7F3EE]
        "
      >
        {icon}
      </div>


      <div>
        <h2 className="text-lg font-semibold">
          {title}
        </h2>

        <p className="text-sm text-neutral-500">
          {subtitle}
        </p>
      </div>

    </button>
  );
}