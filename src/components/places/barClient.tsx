import React from "react"

type BarClientProps = {
  barType: string
  avgPrice: number
}

export const BarClient: React.FC<BarClientProps> = ({ barType, avgPrice }) => {
  return (
    <div>
      <h3>Bar type: {barType}</h3>
      <h3>Average price: {avgPrice}</h3>
    </div>
  )
}
