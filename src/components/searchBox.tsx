import { Input } from "@/components/ui/input"
import { fetchios } from "@/lib/utils"
import { useRouter } from "next/router"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"

type Inputs = {
  search: string
}

export const SearchBox = () => {
  const { handleSubmit, register } = useForm<Inputs>()
  const [_error, setError] = useState("")
  const router = useRouter()
  const onSubmit: SubmitHandler<Inputs> = async ({ search }) => {
    try {
      const res = await fetchios.post("search", {
        body: JSON.stringify(search),
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (res.statusCode === 200) {
        router.push("/search")
      }
    } catch (error: any) {
      setError(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input placeholder="search for a location" {...register("search")} />
      {_error && <p className="text-red-700">{_error}</p>}
    </form>
  )
}
