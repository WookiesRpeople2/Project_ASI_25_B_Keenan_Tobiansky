import React from "react"

type RestaurantClientProps = {
  cuisine: string
  stars: number
  avgPrice: number
}

export const RestaurantClient: React.FC<RestaurantClientProps> = ({
  cuisine,
  stars,
  avgPrice,
}) => (
  <>
    <h3>Speciality: {cuisine}</h3>
    <h3>Stars: {stars}</h3>
    <h3>Average price: {avgPrice}</h3>
  </>
)
