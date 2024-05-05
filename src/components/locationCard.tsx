import { Location } from "@prisma/client"
import { Badge } from "@/components/ui/badge"
import React from "react"
import { Button } from "./ui/button"
import { Pencil, Trash2 } from "lucide-react"
import { fetchios } from "@/lib/utils"
import Link from "next/link"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"
import { useTranslations } from "use-intl"

type LocationCardProps = {
  location: Location
}

export const LocationCard: React.FC<LocationCardProps> = ({
  location: { id, name, type, address, city, country, zipCode },
}) => {
  const router = useRouter()
  const t = useTranslations()
  const handleOnClick = async () => {
    try {
      const res = await fetchios.delete(`/locations/${id}`)

      if (res.statusCode === 200) {
        toast.success(t("Delete.successfully"))
        router.refresh()
      }
    } catch (error: any) {
      toast.error(t("Delete.errorMessage"))
    }
  }

  return (
    <div className="transition-transform transform hover:scale-125">
      <div className="h-full w-full rounded-md backdrop-filter backdrop-blur-sm bg-white p-8 shadow-lg">
        <Link href={`/${id}/${type.toLowerCase()}/read`}>
          <h1 className="text-2xl font-bold mb-4">{name}</h1>
          <h2>{address}</h2>
          <h3>{city}</h3>
          <h4>{country}</h4>
          <h5>{zipCode}</h5>
        </Link>
        <div className="flex justify-between">
          <Badge className="mt-2">{type}</Badge>
          <div className="space-x-4">
            <Button size="icon" variant="destructive" onClick={handleOnClick}>
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="outline">
              <Link href={`/${id}/${type.toLowerCase()}/edit`}>
                <Pencil className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
