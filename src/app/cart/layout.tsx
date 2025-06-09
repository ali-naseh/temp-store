import { GuestGuard } from "@/guards/guest-guard";
import { Footer, Header } from "@/layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>
        <GuestGuard>{children}</GuestGuard>
      </main>
      <Footer />
    </>
  );
}
