import { LocationForm } from "@/components/forms/locationForm"
import { Title } from "@/components/title"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"

const Create = () => {
  const types = ["Restaurant", "Museum", "Park", "Bar"]
  const [activeTab, setActiveTab] = useState<
    "Restaurant" | "Museum" | "Park" | "Bar"
  >("Restaurant")

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Title title="Create a location" />
      <Tabs
        onValueChange={(value) =>
          setActiveTab(value as "Restaurant" | "Museum" | "Park" | "Bar")
        }
        defaultValue="Restaurant"
        className="w-2/4"
      >
        <TabsList className="flex justify-center items-center">
          {types.map((type, index) => (
            <TabsTrigger key={index} value={type}>
              {type}
            </TabsTrigger>
          ))}
        </TabsList>
        <LocationForm type={activeTab} />
      </Tabs>
    </div>
  )
}

export default Create
