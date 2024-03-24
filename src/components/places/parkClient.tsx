import React from "react"

type ParkClientProps = {
  parkType: string
  isPublic: boolean
  freeOrPaid: number
}

export const ParkClient: React.FC<ParkClientProps> = ({
  parkType,
  isPublic,
  freeOrPaid,
}) => (
  <>
    <h3>Park type: {parkType}</h3>
    <h3>Public park: {isPublic ? "public park" : "closed to the public"}</h3>
    <h3>Free or Paid: {freeOrPaid === 0 ? "Free" : `$${freeOrPaid}`}</h3>
  </>
)
