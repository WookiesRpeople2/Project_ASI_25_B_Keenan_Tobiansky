import React from "react"
import { UpdateLocationForm } from "@/components/forms/updateLocationForm"
import { Title } from "@/components/title"
import prismaDb from "@/lib/prisma"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { LocationsTogether } from "@/types"
import { useTranslations } from "use-intl"

export type Prisma = {
  [x: string]: never
  [x: number]: never
} & {
  id: string
  type: string
  name: string
  address: string
  city: string
  zipCode: string
  country: string
  coordinates: number[]
}

export const getServerSideProps = (async ({ params, locale }) => {
  const prisma = (await prismaDb.location.findFirst({
    where: {
      id: params?.locationId as string,
    },
    include: {
      [params?.type as string]: true,
    },
  })) as Prisma

  return {
    props: {
      prisma,
      messages: (await import(`../../../../messages/${locale}.json`)).default,
    },
  }
}) satisfies GetServerSideProps<{ prisma: Prisma }>

type EditPageProps = InferGetServerSidePropsType<typeof getServerSideProps>

const EditPage: React.FC<EditPageProps> = ({ prisma }) => {
  const location = prisma as LocationsTogether
  const t = useTranslations()

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Title title={t("Edit.title")} />
      <UpdateLocationForm location={location} />
    </div>
  )
}

export default EditPage
