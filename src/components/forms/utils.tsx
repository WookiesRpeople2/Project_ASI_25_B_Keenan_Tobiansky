import { BarForm } from "./places/BarForm"
import { MuseumForm } from "./places/MuseumFrom"
import { ParkForm } from "./places/ParkForm"
import { RestaurantForm } from "./places/RestaurantForm"

export const getFormFields = (type: string, form: any) => {
  switch (type) {
    case "Restaurant":
      return <RestaurantForm form={form} />

    case "Museum":
      return <MuseumForm form={form} />

    case "Park":
      return <ParkForm form={form} />

    case "Bar":
      return <BarForm form={form} />

    default:
      return null
  }
}
