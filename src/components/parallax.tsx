import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { cn } from "@/lib/utils"

type ImageUrl = [dynamicImage: string, staticImage: string]

type ParallaxProps = {
  text?: string
  imageUrl: ImageUrl
  className?: string
}

export const Parallax: React.FC<ParallaxProps> = ({
  text,
  className,
  imageUrl,
}) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "200%"])

  return (
    <div
      ref={ref}
      className={cn(
        "overflow-hidden relative grid place-items-center",
        className,
      )}
    >
      {text && (
        <motion.h1
          style={{ y: textY }}
          className="font-bold text-white text-7xl md:text-9xl relative z-30"
        >
          {text}
        </motion.h1>
      )}

      <motion.div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${imageUrl[0]})`,
          backgroundPosition: "bottom",
          backgroundSize: "cover",
          y: backgroundY,
        }}
      />

      <div
        className="absolute inset-0 z-20"
        style={{
          backgroundImage: `url(${imageUrl[1]})`,
          backgroundPosition: "bottom",
          backgroundSize: "cover",
        }}
      />
    </div>
  )
}
