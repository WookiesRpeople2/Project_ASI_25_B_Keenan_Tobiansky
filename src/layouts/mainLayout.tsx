import { Footer } from "@/components/footer"
import { Nav } from "@/components/nav"
import React, { PropsWithChildren } from "react"
import { Toaster } from "react-hot-toast"

export const MainLayout: React.FC<PropsWithChildren> = ({ children }) => (
  <>
    <Nav />
    <Toaster />
    <main>{children}</main>
    <Footer />
  </>
)
