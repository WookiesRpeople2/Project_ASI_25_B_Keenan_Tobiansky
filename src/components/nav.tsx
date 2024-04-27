import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Separator } from "@radix-ui/react-separator"
import { Search } from "./search"

export const Nav = () => {
  const pathname = usePathname()
  const links = [
    { label: "Home", link: "/", active: pathname === "/" },
    { label: "Add", link: "/create", active: pathname === "/create" },
  ]

  return (
    <nav>
      <div className="fixed flex justify-start items-center p-4 z-50 bg-white bg-opacity-50 backdrop-blur-sm w-full">
        {links.map(({ label, link, active }) => (
          <Link
            key={label}
            href={link}
            className={cn(
              "text-xl px-4 hover:underline font-thin",
              active ? "opacity-100 first:opacity-100" : "opacity-45",
            )}
          >
            {label}
          </Link>
        ))}
        <Search />
      </div>
      <Separator />
    </nav>
  )
}
