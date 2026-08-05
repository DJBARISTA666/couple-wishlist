import React from "react";

export default function AppContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#F7F3EE] px-5 py-8 pb-32 text-[#1C1C1E]">
      <div className="mx-auto max-w-md">
        {children}
      </div>
    </main>
  );
}