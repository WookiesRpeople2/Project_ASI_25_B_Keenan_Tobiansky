import { useNominatim } from "@/hooks/useNominatim"
import { Resault } from "@/lib/types"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Input } from "./ui/input"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDown } from "lucide-react"
import { Separator } from "./ui/separator"

type SearchAdresseProps = {
  defaultValue?: string
  onChange: (vlaue: Resault) => void
}

type FormValues = {
  search: string
}

export const SearchAdresse: React.FC<SearchAdresseProps> = ({
  defaultValue,
  onChange,
}) => {
  const { register, handleSubmit, setValue } = useForm<FormValues>({
    defaultValues: {
      search: defaultValue ? defaultValue : "",
    },
  })
  const [open, setOpen] = useState(false)
  const [results, setResults] = useState<Resault[]>([])

  const onSubmit = async ({ search }: { search: string }) => {
    const data = (await useNominatim(search)) as Resault[]
    if (data.length > 0) {
      setResults(data)
      onChange(data[0])
      setValue("search", data[0].display_name)
    }
    setOpen(true)
  }

  const handleResultClick = (result: Resault) => {
    setValue("search", result.display_name)
    onChange(result)
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <Collapsible open={open} onOpenChange={setOpen}>
            <label className="font-medium">Search</label>
            <div className="flex items-center">
              <Input
                placeholder="Type a command or search..."
                {...register("search")}
                className="max-w-lg mt-2"
              />
              <CollapsibleTrigger>
                <ChevronsUpDown className="w-4 h-4" />
              </CollapsibleTrigger>
            </div>
            {results.map((result) => (
              <CollapsibleContent
                key={result.place_id}
                onClick={() => handleResultClick(result)}
                className="flex flex-col cursor-pointer"
              >
                {result.display_name}
                <Separator />
              </CollapsibleContent>
            ))}
          </Collapsible>
        </form>
      </div>
      <div className="mt-2 text-gray-400 text-sm">
        Data © OpenStreetMap contributors, ODbL 1.0.
        <a href="http://osm.org/copyright"> http://osm.org/copyright</a>
      </div>
    </div>
  )
}
