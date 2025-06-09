import { AuthGuard } from "@/guards/auth-guard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | SignUp",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AuthGuard>{children}</AuthGuard>;
}
