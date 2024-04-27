import { TextSearch } from "lucide-react"
import { Model } from "./model"

import { SearchBox } from "./searchBox"

export const Search = () => (
  <Model
    trigger={<TextSearch />}
    title="Search :"
    description="Search for a place"
  >
    <SearchBox />
  </Model>
)
