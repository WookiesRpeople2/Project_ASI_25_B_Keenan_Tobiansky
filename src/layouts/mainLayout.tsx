import { Nav } from "@/components/nav"
import { PropsWithChildren } from "react"

export const MainLayout: React.FC<PropsWithChildren> = ({ children }) => (
  <>
    <Nav />
    <main>{children}</main>
  </>
)
