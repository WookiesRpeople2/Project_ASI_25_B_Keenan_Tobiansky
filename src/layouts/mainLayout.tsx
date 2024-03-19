import { Footer } from "@/components/footer"
import { Nav } from "@/components/nav"
import React, { PropsWithChildren } from "react"

export const MainLayout: React.FC<PropsWithChildren> = ({ children }) => (
  <>
    <Nav />
    <main>{children}</main>
    <Footer />
  </>
)
