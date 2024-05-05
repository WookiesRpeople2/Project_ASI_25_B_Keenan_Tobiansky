import type { ReactElement, ReactNode } from "react"
import type { NextPage } from "next"
import type { AppProps } from "next/app"
import "@/styles/globals.css"
import { MainLayout } from "@/layouts/mainLayout"
import { Provider } from "jotai"
import { useRouter } from "next/router"
import { NextIntlClientProvider } from "next-intl"

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (_page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)
  const router = useRouter()

  return (
    <NextIntlClientProvider
      locale={router.locale}
      messages={pageProps.messages}
      timeZone="Europe/Vienna"
    >
      <MainLayout>
        <Provider>{getLayout(<Component {...pageProps} />)}</Provider>
      </MainLayout>
    </NextIntlClientProvider>
  )
}
