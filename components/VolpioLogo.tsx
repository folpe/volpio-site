import Image from "next/image"
import React from "react"

import VolpioLogoSvg from "@/assets/Volpio_logo-white.svg"

export const VolpioLogo = ({ className = "" }: { className?: string }) => {
  return <Image src={VolpioLogoSvg} alt="Volpio Logo" className={className} />
}
