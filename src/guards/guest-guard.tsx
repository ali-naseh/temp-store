"use client";
import { ROUTES } from "@/constants/routes";
import { useAuth } from "@/hooks/use-auth";
import { LucideLoader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export function GuestGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const { isAuthenticated, isLoading } = useAuth();

  console.log(isAuthenticated);

  const [checked, setChecked] = useState(false);

  const check = useCallback(() => {
    if (!isAuthenticated) {
      router.replace(ROUTES.auth.login);
    } else {
      setChecked(true);
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (!isLoading) {
      check();
    }
  }, [isLoading]);

  if (!checked) {
    return (
      <div>
        <LucideLoader />
      </div>
    );
  }

  return <>{children}</>;
}
