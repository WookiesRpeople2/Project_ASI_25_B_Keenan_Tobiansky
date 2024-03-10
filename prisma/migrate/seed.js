import { Seed } from "./utils.js"
import {
  typeOfCuisine,
  artisticMovements,
  artTypes,
  typesOfBars,
  parkTypes,
} from "./data.js"

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
    stars: Seed.randn(MAX_STARS * MIN_STARS) + MIN_STARS,
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
    isPublic: Seed.randn(2) ? true : false,
    freeOrPaid: price(),
  },
})

;(async () => {
  for (let i = 0; i < MAX_ITER; i++) {
    const { id, type } = await Seed.prepareData(types)
    await Seed.typeOfPlace(id, type, typeObj())
  }
})()
