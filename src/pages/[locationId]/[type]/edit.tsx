import { UpdateLocationForm } from "@/components/forms/updateLocationForm"
import { Title } from "@/components/title"
import prismaDb from "@/lib/prisma"
import { fetchios } from "@/lib/utils"
import { Bar, Location, Museum, Park, Restaurant } from "@prisma/client"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { ParsedUrlQuery } from "querystring"

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

export const getServerSideProps: GetServerSideProps<{
  prisma: Prisma
}> = async ({ params }: { params?: ParsedUrlQuery }) => {
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
    },
  }
}

type EditPageProps = InferGetServerSidePropsType<typeof getServerSideProps>

const EditPage: React.FC<EditPageProps> = ({ prisma }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Title title="Update a location" />
      <UpdateLocationForm location={prisma} />
    </div>
  )
}

export default EditPage
