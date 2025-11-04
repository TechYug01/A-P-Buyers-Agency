"use client";

import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoaded, isSignedIn, user } = useUser();

  useEffect(() => {
    if (isLoaded) {
      if (!isSignedIn) {
        redirect("/sign-in");
      } else if (user?.username !== "admin") {
        redirect("/unauthorized");
      }
    }
  }, [isLoaded, isSignedIn, user]);

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div
          className="
            animate-spin 
            inline-block 
            size-8 
            border-4 
            border-current 
            border-t-transparent 
            text-blue-500 
            rounded-full 
            dark:text-blue-400
          "
          role="status"
          aria-label="loading"
        ></div>
      </div>
    );
  }

  return <>{children}</>;
}
