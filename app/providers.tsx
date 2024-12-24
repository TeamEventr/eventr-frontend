"use client";

import { ReactNode, useEffect } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { RecoilRoot, useSetRecoilState } from "recoil";
import NavBar from "./_components/nav-bar";
import Footer from "./_components/footer";
import Login from "./_components/login-modal";
import { authState } from "@/api/atoms";
import secureLocalStorage from "react-secure-storage";

export default function Provider({ children }: { children: ReactNode }) {

  function AuthInitializer() {
    const setAuth = useSetRecoilState(authState);
  
    useEffect(() => {
      const token = secureLocalStorage.getItem("authToken");
      if (token) {
        setAuth(true);
      }
    }, [setAuth]);
  
    return null;
  }



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
        <AuthInitializer />
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
