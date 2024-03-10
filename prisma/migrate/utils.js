import { randAddress } from "@ngneat/falso"
import { randCompanyName } from "@ngneat/falso"

import prismaDb from "../../src/lib/prisma.js"

/**
 *
 * @description class that holds all of the utilaty funtions for seeding the db
 */
export const Seed = class {
  /**
   *
   * @param {Number} max the limit of the random number we want to generate ex: 4 = 0,1,2,3
   * @returns {Number}
   */
  static randn = (max) => Math.floor(Math.random() * max)

  /**
   *
   * @param {Array<String>} types the types of places we want to seed in our database
   * @returns {Promise<object>} response
   */
  static prepareData = async (types) => {
    const { street, ...rand } = randAddress({
      includeCountry: true,
      includeCounty: false,
    })
    const name = randCompanyName()
    const typeIndex = this.randn(types.length)

    const location = {
      type: types[typeIndex],
      name,
      address: street,
      ...rand,
    }

    const res = await prismaDb.location.create({
      data: {
        ...location,
      },
    })
    return res
  }

  /**
   *
   * @param {String} type the type of place ex: Restaurant
   * @param {String} id the id returented from the created location
   * @param {{}} typeObj an object containing the filds for the place
   */
  static typeOfPlace = async (id, type, typeObj) => {
    const place = { locationId: id, ...typeObj[type] }
    const db = type.toLowerCase()

    await prismaDb[db].create({ data: place })
  }
}
