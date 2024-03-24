import { Input } from "@/components/ui/input"
import { fetchios } from "@/lib/utils"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"

type Inputs = {
  search: string
}

export const SearchBox = () => {
  const { handleSubmit, register } = useForm<Inputs>()
  const [error, setError] = useState("")
  const onSubmit: SubmitHandler<Inputs> = async ({ search }) => {
    try {
      const res = await fetchios.post("search", {
        body: JSON.stringify(search),
        headers: {
          "Content-Type": "application/json",
        },
      })
    } catch (error: any) {
      setError(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input placeholder="search for a location" {...register("search")} />
      {error && <p className="text-red-700">{error}</p>}
    </form>
  )
}
