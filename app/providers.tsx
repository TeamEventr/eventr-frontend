// In Next.js, this file would be called: app/providers.tsx
"use client";

import { ReactNode } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { RecoilRoot } from "recoil";
import NavBar from "./_components/nav-bar";
import Footer from "./_components/footer";
import Login from "./_components/login-modal";
import { AnimatePresence } from "motion/react";

export default function Provider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 6,
            refetchInterval: 1000 * 6,
          },
        },
      })
  );
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <NavBar/>
        <div className="relative w-full">
          <Login/>
        </div>
        {children}
        <Footer/>
      </QueryClientProvider>
    </RecoilRoot>
  );
}
