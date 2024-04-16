import React from "react"

type MuseumClientProps = {
  artisticMovement: string
  artType: string
  freeOrPaid: number
}

export const MuseumClient: React.FC<MuseumClientProps> = ({
  artisticMovement,
  artType,
  freeOrPaid,
}) => (
  <>
    <h3>Artistic movement: {artisticMovement}</h3>
    <h3>Art type: {artType}</h3>
    <h3>Free or Paid: {freeOrPaid === 0 ? "Free" : `$${freeOrPaid}`}</h3>
  </>
)
