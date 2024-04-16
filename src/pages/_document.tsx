import { Html, Main, NextScript, Head } from "next/document"
import { HEAD } from "@/components/next/head"

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.0.1/dist/leaflet.css"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
