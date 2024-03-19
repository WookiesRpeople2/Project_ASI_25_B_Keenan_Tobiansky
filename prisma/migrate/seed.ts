import { prepareData, typeOfPlace, randn } from "./utils"
import {
  typeOfCuisine,
  artisticMovements,
  artTypes,
  typesOfBars,
  parkTypes,
} from "./data"
import { Fields, GenericKeyOfType } from "../../types"

const MAX_PRICE = 5
const MIN_PRICE = 1
const MIN_STARS = 1
const MAX_ITER = 50
const MAX_STARS = 3

const types = ["Restaurant", "Museum", "Bar", "Park"]

const price = () =>
  parseFloat((Math.random() * (MAX_PRICE - MIN_PRICE) + MIN_PRICE).toFixed(2))

const typeObj = () => ({
  Restaurant: {
    cuisine: typeOfCuisine(),
    stars: randn(MAX_STARS * MIN_STARS) + MIN_STARS,
    avgPrice: price(),
  },
  Museum: {
    artisticMovement: artisticMovements(),
    artType: artTypes(),
    freeOrPaid: price(),
  },
  Bar: {
    barType: typesOfBars(),
    avgPrice: price(),
  },
  Park: {
    parkType: parkTypes(),
    isPublic: randn(2) ? true : false,
    freeOrPaid: price(),
  },
})

;(async () => {
  for (let i = 0; i < MAX_ITER; i++) {
    try {
      const { id, type } = await prepareData(types)
      await typeOfPlace(
        id,
        type as GenericKeyOfType<Fields, keyof Fields>,
        typeObj(),
      )
    } catch (error) {
      continue // in case the name is the same
    }
  }
})()
