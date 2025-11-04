"use client";

import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoaded, isSignedIn, user } = useUser();
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      if (!isSignedIn) {
        setRedirecting(true);
        setTimeout(() => redirect("/sign-in"), 500);
      } else if (user?.username !== "admin") {
        setRedirecting(true);
        setTimeout(() => redirect("/unauthorized"), 500);
      }
    }
  }, [isLoaded, isSignedIn, user]);

  if (!isLoaded || redirecting) {
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
