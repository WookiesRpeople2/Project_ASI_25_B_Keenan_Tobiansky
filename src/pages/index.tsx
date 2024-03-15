import { Parallax } from "@/components/parallax"
import { MainLayout } from "@/layouts/mainLayout"
import type { ReactElement } from "react"
import type { NextPageWithLayout } from "./_app"

const HomePage: NextPageWithLayout = () => {
  return (
    <>
      <div className="relative">
        <Parallax
          text="WSG"
          className="w-full h-screen"
          imageUrl={[`/HomePageImage.jpg`, `/HomePageImageCut.png`]}
        />
      </div>
    </>
  )
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>
}

export default HomePage
