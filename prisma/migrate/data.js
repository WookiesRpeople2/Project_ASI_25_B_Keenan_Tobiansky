import { Seed } from "./utils.js"

const randElement = (arr) => arr[Seed.randn(arr.length)]

export const typeOfCuisine = () =>
  randElement(["French", "Chinese", "Japanese", "Italian", "south-african"])

export const artisticMovements = () =>
  randElement([
    "High Renaissance",
    "Mannerism",
    "Baroque",
    "Rococo",
    "Neoclassicism",
    "Romanticism",
    "Realism",
  ])

export const artTypes = () =>
  randElement([
    "Painting",
    "Sculpture",
    "Drawing",
    "Printmaking",
    "Photography",
    "Installation Art",
    "Performance Art",
    "Digital Art",
  ])

export const typesOfBars = () =>
  randElement([
    "Sports Bar",
    "Cocktail Bar",
    "Wine Bar",
    "Dive Bar",
    "Pub",
    "Brewery",
    "Tiki Bar",
  ])

export const parkTypes = () =>
  randElement([
    "National Park",
    "City Park",
    "Botanical Garden",
    "Wildlife Sanctuary",
    "Amusement Park",
    "Water Park",
    "State Park",
  ])
