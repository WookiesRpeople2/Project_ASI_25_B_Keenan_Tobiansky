# Les technologies utilsé

Next js
mongo db
tailwind css
prisma
Shad c/n
lucid icons
falso
Framer motion
React leaflet / leaflet js
Open stree map api
jotai
next-intel
ci/cd:
Docker

### Lien a la page github
<https://github.com/WookiesRpeople2/Project_ASI_25_B_Keenan_Tobiansky.git>

Ceci est la documentation de mon projet que j’ai appelé wsg, le but principale de ce projet est de crée un gestionaire d’emplacement, il y a 4 collections dans ma base des données, Location, Park, Bar, Museum, Restaurent

# Comment lancer le projet

vous pouvez lancer le projet sois en passant par github, sois en passant par docker, les étapes sont inclus ci-dessous

<aside>
🔑 Important: il faut lancer la base des données en mode replicaton set, on  peut le mettre en place localement mais c’est plus compliqué a faire c’est pour ça que j’ai mis en place ci-dessous une place une façon de faire avec docker compose, ceci est a cause de prisma, qui peut seulement communiquer avec mongo db en mode replication

</aside>

## Github

```bash
git clone https://github.com/WookiesRpeople2/Project_ASI_25_B_Keenan_Tobiansky.git
```

```bash
cd Project_ASI_25_B_Keenan_Tobiansky/
```

```bash
npm install

```

### windows

cree un ficher .env et rajoute

```
DATABASE_URL="mongodb://place:password@localhost:27018/location?retryWrites=true&w=majority&authSource=admin&directConnection=true"
```

### Linux ou Mac

```bash
touch .env
```

```bash
echo 'DATABASE_URL="mongodb://place:password@localhost:27018/location?retryWrites=true&w=majority&authSource=admin&directConnection=true"' >> .env
```

cette commande peut partiallement échouer si le serveur de mongo db est lancé localement, vous pouvez utilser coter serveur local il va juste falloir le mettre en mode replication

```bash
docker-compose up -d
```

### Si cette commande ne fonctionne pas

```bash
docker-compose down
```

```bash
docker-compose up -d
```
---
```bash
npx prisma generate
```

```bash
npx prisma db push
```

```bash
npx prisma db seed
```

```bash
npm run build
```

```bash
npm run start
```

# Base des Données

### Seed

pour le script de seeding j’ai utilsé une bibliotèque qui s’apple falso, j’ai decider d’utiliser ça parceque falso est **Tree Shakeable ç**a veut dire que les fonctions que l’on n’utilse pas ne sont pas inclus dans la bundle

### Seed.ts

```tsx
import { prepareData, typeOfPlace, randn } from "./utils"
import {
  typeOfCuisine,
  artisticMovements,
  artTypes,
  typesOfBars,
  parkTypes,
} from "./data"
import { Fields, GenericKeyOfType } from "./types"

const MAX_PRICE = 5
const MIN_PRICE = 1
const MIN_STARS = 1
const MAX_ITER = 50
const MAX_STARS = 3

const types = ["Restaurant", "Museum", "Bar", "Park"]

const price = () =>
  parseFloat((Math.random() * (MAX_PRICE - MIN_PRICE) + MIN_PRICE).toFixed(2))

const typeObj = () => ({
  Restaurant: {
    cuisine: typeOfCuisine(),
    stars: randn(MAX_STARS * MIN_STARS) + MIN_STARS,
    avgPrice: price(),
  },
  Museum: {
    artisticMovement: artisticMovements(),
    artType: artTypes(),
    freeOrPaid: price(),
  },
  Bar: {
    barType: typesOfBars(),
    avgPrice: price(),
  },
  Park: {
    parkType: parkTypes(),
    isPublic: randn(2) ? true : false,
    freeOrPaid: price(),
  },
})

;(async () => {
  for (let i = 0; i < MAX_ITER; i++) {
    try {
      const { id, type } = await prepareData(types)
      await typeOfPlace(
        id,
        type as GenericKeyOfType<Fields, keyof Fields>,
        typeObj(),
      )
    } catch (error) {
      continue // in case the name is the same
    }
  }
})()

```

### data.ts

```tsx
import { randn } from "./utils"

const randElement = (arr: Array<string>) => arr[randn(arr.length)]

export const typeOfCuisine = () =>
  randElement(["French", "Chinese", "Japanese", "Italian", "south-african"])

export const artisticMovements = () =>
  randElement([
    "High Renaissance",
    "Mannerism",
    "Baroque",
    "Rococo",
    "Neoclassicism",
    "Romanticism",
    "Realism",
  ])

export const artTypes = () =>
  randElement([
    "Painting",
    "Sculpture",
    "Drawing",
    "Printmaking",
    "Photography",
    "Installation Art",
    "Performance Art",
    "Digital Art",
  ])

export const typesOfBars = () =>
  randElement([
    "Sports Bar",
    "Cocktail Bar",
    "Wine Bar",
    "Dive Bar",
    "Pub",
    "Brewery",
    "Tiki Bar",
  ])

export const parkTypes = () =>
  randElement([
    "National Park",
    "City Park",
    "Botanical Garden",
    "Wildlife Sanctuary",
    "Amusement Park",
    "Water Park",
    "State Park",
  ])

```

### types.ts

```tsx
export type Restaurant = {
  cuisine: string
  stars: number
  avgPrice: number
}

export type Museum = {
  artisticMovement: string
  artType: string
  freeOrPaid: number
}

export type Bar = {
  barType: string
  avgPrice: number
}

export type Park = {
  parkType: string
  isPublic: boolean
  freeOrPaid: number
}

export type Fields = {
  Restaurant: Restaurant
  Museum: Museum
  Bar: Bar
  Park: Park
}

export type GenericKeyOfType<
  T extends Record<string, any>,
  K extends keyof T,
> = K

```

### utils.ts

```tsx
import { randAddress, randLatitude, randLongitude } from "@ngneat/falso"
import { randCompanyName } from "@ngneat/falso"
import prismaDb from "../../src/lib/prisma"
import { Fields, GenericKeyOfType } from "./types"
import { Prisma } from "@prisma/client"

export const randn = (max: number) => Math.floor(Math.random() * max)

export const prepareData = async (types: Array<string>) => {
  const { street, ...info } = randAddress({
    includeCountry: true,
    includeCounty: false,
  })
  const name = randCompanyName()
  const lat = randLatitude()
  const long = randLongitude()
  const coordinates = [lat, long]
  const typeIndex = randn(types.length)

  const location = {
    type: types[typeIndex],
    name,
    address: street,
    coordinates,
    ...info,
  }

  const res = await prismaDb.location.create({
    data: location as Prisma.LocationCreateInput,
  })
  return res
}

export const typeOfPlace = async (
  locationId: string,
  type: GenericKeyOfType<Fields, keyof Fields>,
  typeObj: Fields,
) => {
  const db = type.toLowerCase()
  const location = { locationId, ...typeObj[type] }
  const prismaInstance: { [key: string]: any } = prismaDb

  await prismaInstance[db].create({ data: location })
}

```

### Models

Pour mes models j’ai utiliser mongo db avec prisma, j’ai utilser prisma parce que c’est une ORM donc c’est plus facile de maintenir le code ainsi que de changer la base de données si jamais on en a besoin

### Location

```jsx
model Location {
  id          String  @id @default(auto()) @map("_id") @db.ObjectId
  type        String
  name        String
  address     String
  city        String
  zipCode     String
  country     String
  coordinates Float[]

  restaurant Restaurant?
  museum     Museum?
  bar        Bar?
  park       Park?

  @@unique([name])
}
```

### Restaurant

```tsx
model Restaurant {
  id       String @id @default(auto()) @map("_id") @db.ObjectId
  cuisine  String
  stars    Int
  avgPrice Float

  locationId String   @unique @db.ObjectId
  location   Location @relation(fields: [locationId], references: [id], onDelete: Cascade)
}
```

### Museum

```tsx
model Museum {
  id               String @id @default(auto()) @map("_id") @db.ObjectId
  artisticMovement String
  artType          String
  freeOrPaid       Float

  locationId String   @unique @db.ObjectId
  location   Location @relation(fields: [locationId], references: [id], onDelete: Cascade)
}
```

### Bar

```tsx
model Bar {
  id       String @id @default(auto()) @map("_id") @db.ObjectId
  barType  String
  avgPrice Float

  locationId String   @unique @db.ObjectId
  location   Location @relation(fields: [locationId], references: [id], onDelete: Cascade)
}
```

### Park

```tsx
model Park {
  id         String  @id @default(auto()) @map("_id") @db.ObjectId
  parkType   String
  isPublic   Boolean
  freeOrPaid Float

  locationId String   @unique @db.ObjectId
  location   Location @relation(fields: [locationId], references: [id], onDelete: Cascade)
}
```

# Layout

## Main Layout

```tsx
import { Footer } from "@/components/footer"
import { Nav } from "@/components/nav"
import React, { PropsWithChildren } from "react"
import { Toaster } from "react-hot-toast"

export const MainLayout: React.FC<PropsWithChildren> = ({ children }) => (
  <>
    <Nav />
    <Toaster />
    <main>{children}</main>
    <Footer />
  </>
)

```

## _App

j’avais mis en place per page layout

```tsx
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

```

# Components

## Racine

### Footer

```tsx
export const Footer = () => <footer className="bg-blue-950 py-20 mt-8"></footer>

```

### LocationCard

j’ai decider d’utilser Link ici au lieu de l’utilser sur la page index parce qu’on passe déja toutes les données reçu de la requete sur la page index

```tsx
import { Location } from "@prisma/client"
import { Badge } from "@/components/ui/badge"
import React from "react"
import { Button } from "./ui/button"
import { Pencil, Trash2 } from "lucide-react"
import { fetchios } from "@/lib/utils"
import Link from "next/link"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"
import { useTranslations } from "use-intl"

type LocationCardProps = {
  location: Location
}

export const LocationCard: React.FC<LocationCardProps> = ({
  location: { id, name, type, address, city, country, zipCode },
}) => {
  const router = useRouter()
  const t = useTranslations()
  const handleOnClick = async () => {
    try {
      const res = await fetchios.delete(`/locations/${id}`)

      if (res.statusCode === 200) {
        toast.success(t("Delete.successfully"))
        router.refresh()
      }
    } catch (error: any) {
      toast.error(t("Delete.errorMessage"))
    }
  }

  return (
    <div className="transition-transform transform hover:scale-125">
      <div className="h-full w-full rounded-md backdrop-filter backdrop-blur-sm bg-white p-8 shadow-lg">
        <Link href={`/${id}/${type.toLowerCase()}/read`}>
          <h1 className="text-2xl font-bold mb-4">{name}</h1>
          <h2>{address}</h2>
          <h3>{city}</h3>
          <h4>{country}</h4>
          <h5>{zipCode}</h5>
        </Link>
        <div className="flex justify-between">
          <Badge className="mt-2">{type}</Badge>
          <div className="space-x-4">
            <Button size="icon" variant="destructive" onClick={handleOnClick}>
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="outline">
              <Link href={`/${id}/${type.toLowerCase()}/edit`}>
                <Pencil className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

```

### Nav

```tsx
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Separator } from "@radix-ui/react-separator"
import { useTranslations } from "next-intl"

export const Nav = () => {
  const t = useTranslations()
  const pathname = usePathname()
  const links = [
    { label: "Home", link: "/", active: pathname === "/" },
    { label: t("Nav.add"), link: "/create", active: pathname === "/create" },
  ]

  return (
    <nav>
      <div className="fixed flex justify-start items-center p-4 z-50 bg-white bg-opacity-50 backdrop-blur-sm w-full">
        {links.map(({ label, link, active }) => (
          <Link
            key={label}
            href={link}
            className={cn(
              "text-xl px-4 hover:underline font-thin",
              active ? "opacity-100 first:opacity-100" : "opacity-45",
            )}
          >
            {label}
          </Link>
        ))}
      </div>
      <Separator />
    </nav>
  )
}

```

### Parralax

```tsx
import { motion, useScroll, useTransform } from "framer-motion"
import React, { useRef } from "react"
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
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "500%"])

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

```

### title

```tsx
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import React from "react"

type HeadingProps = {
  title: string
  description?: string
  className?: string
}

export const Title: React.FC<HeadingProps> = ({
  title,
  description,
  className,
}) => (
  <>
    <div className={cn("h-32 space-y-4 mt-6", className)}>
      <h1 className="text-3xl font-bold">{title}</h1>
      {description && (
        <h2 className="text-sm text-muted-foreground">{description}</h2>
      )}
      <Separator />
    </div>
  </>
)

```

## Places

j’ai decider de les morceler en composents, pour que cela sois facile à changer

## Bar Client

```tsx
import React from "react"

type BarClientProps = {
  barType: string
  avgPrice: number
}

export const BarClient: React.FC<BarClientProps> = ({ barType, avgPrice }) => (
  <div>
    <h3>Bar type: {barType}</h3>
    <h3>Average price: {avgPrice}</h3>
  </div>
)

```

### Museum Client

```tsx
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

```

### Park Client

```tsx
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

```

### Restaurent client

```tsx
import React from "react"

type RestaurantClientProps = {
  cuisine: string
  stars: number
  avgPrice: number
}

export const RestaurantClient: React.FC<RestaurantClientProps> = ({
  cuisine,
  stars,
  avgPrice,
}) => (
  <>
    <h3>Speciality: {cuisine}</h3>
    <h3>Stars: {stars}</h3>
    <h3>Average price: {avgPrice}</h3>
  </>
)

```

## Map

j’avais cree cette composantes en utilisant la biblioteque leafleet et open street map

```tsx
import React from "react"
import { LatLngExpression } from "leaflet"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"

type MapProps = {
  name: string
  coordinates: LatLngExpression
}

const Map: React.FC<MapProps> = ({ name, coordinates }) => (
  <MapContainer
    center={coordinates}
    zoom={13}
    scrollWheelZoom={false}
    style={{ height: "28rem" }}
  >
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={coordinates}>
      <Popup>{name}</Popup>
    </Marker>
  </MapContainer>
)

export default Map

```

## Forms

### Utils

les fonctions partagé entre les deux forms

```tsx
import { BarForm } from "./places/BarForm"
import { MuseumForm } from "./places/MuseumFrom"
import { ParkForm } from "./places/ParkForm"
import { RestaurantForm } from "./places/RestaurantForm"

export const getFormFields = (type: string, form: any) => {
  switch (type) {
    case "Restaurant":
      return <RestaurantForm form={form} />

    case "Museum":
      return <MuseumForm form={form} />

    case "Park":
      return <ParkForm form={form} />

    case "Bar":
      return <BarForm form={form} />

    default:
      return null
  }
}

export const types = ["Restaurant", "Museum", "Park", "Bar"]

```

### Update Form

```tsx
import React from "react"
import { fetchios } from "@/lib/utils"
import { typeOfFormSchema } from "@/schemas/zod_schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "../ui/button"
import { Form } from "../ui/form"
import { useRouter } from "next/navigation"
import { CommonFormFields } from "./commonFormFields"
import { toast } from "react-hot-toast"
import { getFormFields } from "./utils"
import { LocationsTogether, TypeOfLocation, TypeOfLocationLower } from "@/types"
import { useTranslations } from "next-intl"

type UpdateLocationFormProps = {
  location: LocationsTogether
}

type FormSchema = z.infer<
  (typeof typeOfFormSchema)[keyof typeof typeOfFormSchema]
>

export const UpdateLocationForm: React.FC<UpdateLocationFormProps> = ({
  location,
}) => {
  const t = useTranslations()
  const type = location.type as TypeOfLocation
  const form = useForm<FormSchema>({
    resolver: zodResolver(typeOfFormSchema[type]),
    defaultValues: {
      type,
      name: location.name,
      address: location.address,
      city: location.city,
      zipCode: location.zipCode,
      country: location.country,
      coordinates: location.coordinates,
      ...location[type.toLowerCase() as TypeOfLocationLower],
    },
  })
  const router = useRouter()
  const onSubmit = async (values: FormSchema) => {
    const res = await fetchios.patch(`locations/${location.id}`, {
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (res.statusCode === 200) {
      router.push("/")
      toast.success(t("UpdateLocationForm.successMessage"))
    } else {
      toast.error(t("UpdateLocationForm.errorMessage"))
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center w-full"
      >
        <div className="grid grid-cols-3 gap-4 w-3/4">
          <CommonFormFields form={form} />
          {getFormFields(type, form)}
          <div className="self-start space-y-4">
            <Button type="submit">Update</Button>
          </div>
        </div>
      </form>
    </Form>
  )
}

```

### Slider Field

```tsx
import { sliderAtom } from "@/atoms/atoms"
import { useAtom } from "jotai"
import { useHydrateAtoms } from "jotai/utils"
import React from "react"
import { Slider } from "../ui/slider"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip"

type SliderFieldProps = {
  maxValue: number
  minValue: number
  defaultValue: number
  onValueChange: (_value: number) => void
}

export const SliderField: React.FC<SliderFieldProps> = ({
  minValue,
  maxValue,
  defaultValue,
  onValueChange,
}) => {
  useHydrateAtoms([[sliderAtom, defaultValue]])
  const [sliderValue, setSliderValue] = useAtom(sliderAtom)

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Slider
              defaultValue={[defaultValue]}
              min={minValue}
              max={maxValue}
              step={1}
              onValueChange={(value) => {
                onValueChange(value[0])
                setSliderValue(value[0])
              }}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>{sliderValue}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  )
}

```

### LocationForm

quand l’utilser change d’onglet on change le valeur de tab

```tsx
import React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { typeOfFormSchema } from "@/schemas/zod_schemas"
import { Form } from "@/components/ui/form"
import { Button } from "../ui/button"
import { fetchios } from "@/lib/utils"
import { TabsContent } from "../ui/tabs"
import { CommonFormFields } from "./commonFormFields"
import { toast } from "react-hot-toast"
import { getFormFields, types } from "./utils"
import { TypeOfLocation } from "@/types"
import { useTranslations } from "next-intl"

type LocationFormProps = {
  type: TypeOfLocation
}

type FormSchema = z.infer<
  (typeof typeOfFormSchema)[keyof typeof typeOfFormSchema]
>

const extraFields = {
  cuisine: "",
  stars: 0,
  avgPrice: 0.1,
  parkType: "",
  isPublic: false,
  freeOrPaid: 0,
  artisticMovement: "",
  artType: "",
  barType: "",
}

export const LocationForm: React.FC<LocationFormProps> = ({ type }) => {
  const router = useRouter()
  const t = useTranslations()
  const form = useForm<FormSchema>({
    resolver: zodResolver(typeOfFormSchema[type]),
    defaultValues: {
      type,
      name: "",
      address: "",
      city: "",
      zipCode: "",
      country: "",
      coordinates: [0, 0],
      ...extraFields,
    },
  })
  const onSubmit = async (values: FormSchema) => {
    const res = await fetchios.post("locations", {
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (res.statusCode === 200) {
      router.push("/")
      toast.success(t("LocationForm.successMessage"))
    } else {
      toast.error(t("LocationForm.errorMessage"))
    }
  }

  return (
    <>
      {types.map((ty, index) => (
        <div key={index}>
          <TabsContent value={ty}>
            <div>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="grid grid-cols-3 gap-4">
                    <CommonFormFields form={form} />
                    {getFormFields(type, form)}
                  </div>
                  <div className="py-8">
                    <Button type="submit">Submit</Button>
                  </div>
                </form>
              </Form>
            </div>
          </TabsContent>
        </div>
      ))}
    </>
  )
}

```

### Common form fields

les champs partagé entre les deux formulaires

```tsx
import React from "react"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useTranslations } from "next-intl"

type CommonFormFieldsProps = {
  form: any
}

export const CommonFormFields: React.FC<CommonFormFieldsProps> = ({ form }) => {
  const t = useTranslations()

  return (
    <>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("LocationForm.fields.name")}</FormLabel>
            <FormControl>
              <Input placeholder="Little Red robin hood" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="country"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("LocationForm.fields.country")}</FormLabel>
            <FormControl>
              <Input placeholder="France" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="city"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("LocationForm.fields.city")}</FormLabel>
            <FormControl>
              <Input placeholder="London" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="address"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("LocationForm.fields.address")}</FormLabel>
            <FormControl>
              <Input placeholder="55 rue ..." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="zipCode"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("LocationForm.fields.zipCode")}</FormLabel>
            <FormControl>
              <Input placeholder="75012" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="coordinates.0"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("LocationForm.fields.coordinates.0")}</FormLabel>
            <FormControl>
              <Input placeholder="0.99" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="coordinates.1"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("LocationForm.fields.coordinates.1")}</FormLabel>
            <FormControl>
              <Input placeholder="0.2" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}

```

### Places

### Bar Form

```tsx
import React from "react"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SliderField } from "../sildeField"
import { useTranslations } from "next-intl"

type BarFormProps = {
  form: any
}

export const BarForm: React.FC<BarFormProps> = ({ form }) => {
  const t = useTranslations()

  return (
    <>
      <FormField
        name="barType"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("LocationForm.fields.barType")}</FormLabel>
            <FormControl>
              <Input
                placeholder={t("LocationForm.fields.barType")}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="avgPrice"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("LocationForm.fields.avgPrice")}</FormLabel>
            <FormControl>
              <SliderField
                maxValue={5}
                minValue={0.1}
                defaultValue={form.watch("avgPrice")}
                onValueChange={(value) => field.onChange(value)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}

```

### Museum Form

```tsx
import React from "react"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SliderField } from "../sildeField"
import { useTranslations } from "next-intl"

type MuseumFormProps = {
  form: any
}

export const MuseumForm: React.FC<MuseumFormProps> = ({ form }) => {
  const t = useTranslations()

  return (
    <>
      <FormField
        name="artisticMovement"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("LocationForm.fields.artisticMovement")}</FormLabel>
            <FormControl>
              <Input
                placeholder={t("LocationForm.fields.artisticMovement")}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="artType"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("LocationForm.fields.artType")}</FormLabel>
            <FormControl>
              <Input
                placeholder={t("LocationForm.fields.artType")}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="freeOrPaid"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("LocationForm.fields.freeOrPaid")}</FormLabel>
            <FormControl>
              <SliderField
                minValue={0}
                maxValue={5}
                defaultValue={form.watch("freeOrPaid")}
                onValueChange={(value) => field.onChange(value)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}

```

### Park Form

```tsx
import React from "react"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { SliderField } from "../sildeField"
import { useTranslations } from "next-intl"

type ParkFormProps = {
  form: any
}

export const ParkForm: React.FC<ParkFormProps> = ({ form }) => {
  const t = useTranslations()

  return (
    <>
      <FormField
        name="parkType"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("LocationForm.fields.parkType")}</FormLabel>
            <FormControl>
              <Input
                placeholder={t("LocationForm.fields.parkType")}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="isPublic"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("LocationForm.fields.isPublic")}</FormLabel>
            <FormControl>
              <Switch onCheckedChange={(checked) => field.onChange(checked)} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="freeOrPaid"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("LocationForm.fields.freeOrPaid")}</FormLabel>
            <FormControl>
              <SliderField
                minValue={0}
                maxValue={5}
                defaultValue={form.watch("freeOrPaid")}
                onValueChange={(value) => field.onChange(value)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}

```

### Restaurent Form

```tsx
import React from "react"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SliderField } from "../sildeField"
import { useTranslations } from "next-intl"

type RestaurantFormProps = {
  form: any
}

export const RestaurantForm: React.FC<RestaurantFormProps> = ({ form }) => {
  const t = useTranslations()

  return (
    <>
      <FormField
        control={form.control}
        name="cuisine"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("LocationForm.fields.cuisine")}</FormLabel>
            <FormControl>
              <Input
                placeholder={t("LocationForm.fields.cuisine")}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="stars"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("LocationForm.fields.stars")}</FormLabel>
            <FormControl>
              <SliderField
                maxValue={3}
                minValue={0}
                defaultValue={form.watch("stars")}
                onValueChange={(value) => field.onChange(value)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="avgPrice"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("LocationForm.fields.avgPrice")}</FormLabel>
            <FormControl>
              <SliderField
                maxValue={5}
                minValue={1}
                defaultValue={form.watch("avgPrice")}
                onValueChange={(value) => field.onChange(value)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}

```

## Combobox

Composants pour crée le combobox

### combobox

```tsx
import React from "react"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SliderField } from "../sildeField"
import { useTranslations } from "next-intl"

type RestaurantFormProps = {
  form: any
}

export const RestaurantForm: React.FC<RestaurantFormProps> = ({ form }) => {
  const t = useTranslations()

  return (
    <>
      <FormField
        control={form.control}
        name="cuisine"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("LocationForm.fields.cuisine")}</FormLabel>
            <FormControl>
              <Input
                placeholder={t("LocationForm.fields.cuisine")}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="stars"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("LocationForm.fields.stars")}</FormLabel>
            <FormControl>
              <SliderField
                maxValue={3}
                minValue={0}
                defaultValue={form.watch("stars")}
                onValueChange={(value) => field.onChange(value)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="avgPrice"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("LocationForm.fields.avgPrice")}</FormLabel>
            <FormControl>
              <SliderField
                maxValue={5}
                minValue={1}
                defaultValue={form.watch("avgPrice")}
                onValueChange={(value) => field.onChange(value)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}

```

### Command

```tsx
import React from "react"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
} from "@/components/ui/command"

export const CommandCustom: React.FC<React.PropsWithChildren> = ({
  children,
}) => (
  <Command>
    <CommandInput placeholder="Search..." className="h-9" />
    <CommandEmpty>No resaults found.</CommandEmpty>
    <CommandGroup>{children}</CommandGroup>
  </Command>
)

```

# Atoms

J’ai decider d’utilser jotai avec atomic programming car c’est plus optimiser que react useState

## atoms

```tsx
import { TypeOfLocation } from "@/types"
import { atom } from "jotai"

export const locationsAtom = atom([
  {
    id: "",
    type: "",
    name: "",
    address: "",
    city: "",
    zipCode: "",
    country: "",
    coordinates: [0],
  },
])

export const tabAtom = atom<TypeOfLocation>("Restaurant")

export const openAtom = atom(false)
export const valueAtom = atom("")

export const sliderAtom = atom<number>(0)

```

# Lib

## Fetchios

### Fetchios

j’ai cree mon propre gestionaire des requetes http et https, je l’ai appelé fetchios

```tsx
import http, { IncomingMessage } from "http"
import https from "https"
import { FetchRequest, FetchResponse } from "./types"
import * as URL from "url"

export class Fetchios {
  private baseUrl?: string

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl
  }

  private static makeRequest = async <T>(
    url: string,
    options: FetchRequest<T>,
  ): Promise<FetchResponse<T>> => {
    const typeOfUrl = url.startsWith("http:") ? http : https

    return await new Promise((resolve, reject) => {
      const request = typeOfUrl.request(
        options,
        (response: IncomingMessage) => {
          let data = ""

          response.on("data", (chunk) => {
            data += chunk
          })

          response.on("end", () => {
            if (response.statusCode && response.statusCode >= 200) {
              const res: FetchResponse<T> = {
                data: JSON.parse(data),
                statusCode: response.statusCode,
                statusMessage: response.statusMessage,
                headers: response.headers,
              }

              resolve(res)
            } else {
              reject(new Error("Bad request"))
            }
          })

          response.on("error", (error) => {
            reject(error)
          })
        },
      )

      if (options.body) {
        request.write(options.body)
      }

      request.end()
    })
  }

  private sendReq = async <T>(
    endPoint: string,
    method: FetchRequest<T>["method"],
    opt?: FetchRequest<T>,
  ) => {
    let url = this.baseUrl || ""

    if (this.baseUrl && !url.endsWith("/")) {
      url += "/"
    }

    url += endPoint
    const uri = URL.parse(url)
    const reqOptions: FetchRequest<T> = {
      hostname: uri.hostname,
      path: uri.path,
      port: uri.port,
      method,
      ...opt,
    }
    const res = await Fetchios.makeRequest<T>(url, reqOptions)

    return res
  }

  public async get<T>(endPoint: string, options?: FetchRequest<T>) {
    return await this.sendReq<T>(endPoint, "GET", options)
  }

  public async post<T>(endPoint: string, options?: FetchRequest<T>) {
    return await this.sendReq<T>(endPoint, "POST", options)
  }

  public async patch<T>(endPoint: string, options?: FetchRequest<T>) {
    return await this.sendReq<T>(endPoint, "PATCH", options)
  }

  public async delete<T>(endPoint: string, options?: FetchRequest<T>) {
    return await this.sendReq<T>(endPoint, "DELETE", options)
  }
}

```

### types

```tsx
import { RequestOptions, IncomingHttpHeaders } from "http"

export interface FetchRequest<T> extends RequestOptions {
  method?: "GET" | "POST" | "PATCH" | "DELETE"
  body?: T
}

export type FetchResponse<T> = {
  data: T
  statusCode?: number
  statusMessage?: string
  headers: IncomingHttpHeaders
}

```

## Prisma

fichier qui nous permet d’utiliser prisma client

```tsx
/* eslint-disable no-var, init-declarations, no-unused-vars */

import { PrismaClient } from "@prisma/client"

declare global {
  var prisma: PrismaClient | undefined
}

const prismaDb = globalThis.prisma || new PrismaClient()

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prismaDb
}

export default prismaDb

```

## utils

```tsx
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Fetchios } from "./fethios/fetchios"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const fetchios = new Fetchios("http://localhost:3000/api/")

```

# Generate Forms

ceci est un generateur de formulaire, ce n’est pas 100% complet mais il génère les formulaire et les ajout a des onglets de Location form

## Generate

```tsx
import { readFileSync } from "fs"
import {
  addCaseToFile,
  addTypeToArray,
  parsePrismaSchema,
  saveTemplateToFile,
} from "./utils"

type Field = {
  name: string
  label: string
  placeholder: string
  int?: {
    maxValue: number
    minValue: number
    defaultValue: string
  }
}

export type Function = {
  fnName: string
  fields: Field[]
}
const generateFormTemplate = (
  form: Function,
  templateString: string,
  fieldTemplateString: string,
) => {
  let template = templateString
  const fieldTemplate = fieldTemplateString
  const hasIntField = form.fields.some((field) => field.int)
  const sliderImport = hasIntField
    ? `import { SliderField } from "../sildeField"`
    : ""
  template = template.replace("{{sliderImport}}", sliderImport)
  template = template.replace(/{{fnName}}/gu, form.fnName)
  let formFields = ""
  form.fields.forEach((field) => {
    let fieldTemplateModified = fieldTemplate.replace(
      "{{fieldName}}",
      field.name,
    )
    fieldTemplateModified = fieldTemplateModified.replace(
      "{{fieldLabel}}",
      field.label,
    )
    fieldTemplateModified = fieldTemplateModified.replace(
      "{{fieldControl}}",
      generateFieldControl(field),
    )
    formFields += fieldTemplateModified
  })
  template = template.replace("{{formFields}}", formFields)

  return template
}
const generateFieldControl = (field: Field) => {
  if (field.int) {
    return `<SliderField
      maxValue={${field.int.maxValue}}
      minValue={${field.int.minValue}}
      defaultValue={form.watch("${field.int.defaultValue}")}
      onValueChange={(value) => field.onChange(value)}
    />`
  }

  return `<Input placeholder="${field.placeholder}" {...field} />`
}
const prisma = parsePrismaSchema("../../prisma/schema.prisma") as Function
addCaseToFile("../components/forms/utils.tsx", prisma.fnName)
addTypeToArray(
  "../components/forms/utils.tsx",
  prisma.fnName.replace("Form", ""),
)
const templateString = readFileSync("functionTemplate.txt", "utf-8")
const fieldTemplateString = readFileSync("fieldsTemplate.txt", "utf-8")
const generatedTemplate: string = generateFormTemplate(
  prisma,
  templateString,
  fieldTemplateString,
)
saveTemplateToFile(
  generatedTemplate,
  `../components/forms/places/${prisma.fnName}.tsx`,
)

```

## Fields Template

```
<FormField
  name="{{fieldName}}"
  control={form.control}
  render={({ field }) => (
    <FormItem>
      <FormLabel>{{fieldLabel}}</FormLabel>
      <FormControl>
        {{fieldControl}}
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

```

## Function Template

```
import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

{{sliderImport}}

type {{fnName}}Props = {
  form: any
}

export const {{fnName}}: React.FC<{{fnName}}Props> = ({form}) => (
  <>
    {{formFields}}
  </>
);

```

### utils

```tsx
/* eslint no-unused-vars: 0 */
/* eslint no-undefined: 0 */
/* eslint consistent-return: 0 */

import { writeFileSync, readFileSync } from "fs"
import { Function } from "./generate"

type FieldObj = {
  type: string
  name: string
}
export const parsePrismaSchema = (schemaPath: string) => {
  const schemaContent = readFileSync(schemaPath, "utf-8")
  const modelPattern = /model\s+(\w+)\s+\{([^}]+)\}/gu
  const fieldPattern = /(\w+)\s+(\w+)(?:\s+@(\w+)(?:\((.*?)\))?)?/gu
  let lastModelMatch = null

  while (modelPattern.exec(schemaContent) !== null) {
    lastModelMatch = modelPattern.exec(schemaContent)
  }

  if (!lastModelMatch) {
    throw new Error("No model found in the Prisma schema file.")
  }

  const modelName = `${lastModelMatch[1]}Form`
  let fieldsString = lastModelMatch[2].trim()
  fieldsString = fieldsString.replace(/.*\bid\b.*\n/u, "")
  const fields: FieldObj[] = []

  while (fieldPattern.exec(fieldsString) !== null) {
    const fieldMatch = fieldPattern.exec(fieldsString)

    if (fieldMatch === null) {
      return
    }

    const [_unused, fieldName, fieldType] = fieldMatch

    if (
      fieldName !== "id" &&
      fieldName !== "locationId" &&
      fieldName !== "location" &&
      fieldName !== "ObjectId"
    ) {
      fields.push({ type: fieldType, name: fieldName })
    }
  }

  const prismaSchema: Function = {
    fnName: modelName,
    fields: fields.map((field) => ({
      name: field.name,
      label: field.name.replace(/^\w/u, (c: string) => c.toUpperCase()),
      placeholder: `Enter your ${field.type}`,
      int: ["Int", "Float", "Number"].includes(field.type)
        ? {
            maxValue: 5,
            minValue: 0,
            defaultValue: field.name,
          }
        : undefined,
    })),
  }

  return prismaSchema
}
export const addCaseToFile = (filePath: string, type: string) => {
  const data = readFileSync(filePath, "utf8")
  const importStatement = `import { ${type} } from "./places/${type}";\n`

  if (data.includes(importStatement)) {
    return
  }

  if (data.includes(`case "${type}":`)) {
    return
  }

  const defaultIndex = data.indexOf("default:")
  const newCase = `  case "${type.replace("Form", "")}":
    return <${type} form={form} />\n`
  const updatedData = `
    ${importStatement}
    ${data.slice(0, defaultIndex).trimEnd()}
    ${newCase}
    ${data.slice(defaultIndex)}`
  writeFileSync(filePath, updatedData, "utf8")
}
export const addTypeToArray = (filePath: string, newType: string) => {
  const data = readFileSync(filePath, "utf8")
  const typesRegex = /uexport const types = \[([^\]]*)\]/u
  const match = data.match(typesRegex)

  if (!match) {
    return
  }

  const typesArray = match[1]
    .trim()
    .split(",")
    .map((type) => type.trim())

  if (typesArray.includes(`"${newType}"`)) {
    return
  }

  typesArray.push(`"${newType}"`)
  const updatedTypesArray = typesArray.join(", ")
  const updatedData = data.replace(
    typesRegex,
    `export const types = [${updatedTypesArray}]`,
  )
  writeFileSync(filePath, updatedData, "utf8")
}
export const saveTemplateToFile = (template: string, filename: string) => {
  writeFileSync(filename, template)
}

```

# Pages

## Racine

### index

```tsx
import { Combobox } from "@/components/combobox/combobox"
import { Title } from "@/components/title"
import { LocationCard } from "@/components/locationCard"
import { Parallax } from "@/components/parallax"
import { fetchios } from "@/lib/utils"
import { useAtom } from "jotai"
import { useHydrateAtoms } from "jotai/utils"
import { locationsAtom } from "@/atoms/atoms"
import React, { useCallback, useEffect } from "react"
import { useTranslations } from "next-intl"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { TypeOfLocation } from "../types"

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const { data } = await fetchios.get("locations")

  return {
    props: {
      data,
      messages: (await import(`../../messages/${locale}.json`)).default,
    },
  }
}

type HomePageProps = InferGetServerSidePropsType<typeof getServerSideProps>

const HomePage: React.FC<HomePageProps> = ({ data }) => {
  useHydrateAtoms([[locationsAtom, data]])
  const [locations, setLocations] = useAtom(locationsAtom)
  useEffect(() => {
    setLocations(data)
  }, [data])
  const t = useTranslations()
  const handleChange = (value: string) => {
    setLocations(filteredLocations(value))
  }
  const filteredLocations = useCallback(
    (filterValue: string) => {
      if (!filterValue) {
        return data
      }

      return data.filter(
        ({ type }: { type: TypeOfLocation }) =>
          type.toLowerCase() === filterValue,
      )
    },

    [data],
  )

  return (
    <>
      <div className="relative">
        <Parallax
          text="WSG"
          className="w-full h-screen"
          imageUrl={[`/HomePageImage.jpg`, `/HomePageImageCut.png`]}
        />
      </div>
      <div className="px-20">
        <Title title={t("Home.title")} description={t("Home.description")} />
        <Combobox onClick={handleChange} />
      </div>
      <div className="grid grid-rows-4 grid-cols-3 gap-20 px-20 py-6">
        {locations.map((location) => (
          <LocationCard key={location.id} location={location} />
        ))}
      </div>
    </>
  )
}

export default HomePage

```

### Create

```tsx
import { tabAtom } from "@/atoms/atoms"
import { LocationForm } from "@/components/forms/locationForm"
import { Title } from "@/components/title"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { types } from "@/components/forms/utils"
import { TypeOfLocation } from "@/types"
import { useAtom } from "jotai"
import { useTranslations } from "next-intl"
import { GetServerSideProps } from "next"

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    messages: (await import(`../../messages/${locale}.json`)).default,
  },
})
const Create = () => {
  const [activeTab, setActiveTab] = useAtom(tabAtom)
  const t = useTranslations()

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Title title={t("Create.title")} />
      <Tabs
        onValueChange={(value) => setActiveTab(value as TypeOfLocation)}
        defaultValue="Restaurant"
        className="w-2/4"
      >
        <TabsList className="flex justify-center items-center">
          {types.map((type, index) => (
            <TabsTrigger key={index} value={type}>
              {t(`Create.tab.${type}`)}
            </TabsTrigger>
          ))}
        </TabsList>
        <LocationForm type={activeTab} />
      </Tabs>
    </div>
  )
}

export default Create

```

## [locationId]/type

### Edit

```tsx
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

```

### Read

```tsx
import React from "react"
import { BarClient } from "@/components/places/barClient"
import { MuseumClient } from "@/components/places/museumClient"
import { ParkClient } from "@/components/places/parkClient"
import { RestaurantClient } from "@/components/places/restaurantClient"
import { fetchios } from "@/lib/utils"
import { Bar, Museum, Park, Restaurant, Location } from "@prisma/client"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { ParsedUrlQuery } from "querystring"

import dynamic from "next/dynamic"
const DynamicMap: any = dynamic(() => import("@/components/map/map"), {
  ssr: false,
})

type InitialValues = Location & {
  restaurant: Restaurant
  bar: Bar
  museum: Museum
  park: Park
}

export const getServerSideProps = (async ({ params, locale }) => {
  const { data }: { data: InitialValues } = await fetchios.get(
    `locations/${params?.locationId}`,
  )

  return {
    props: {
      data,
      params,
      messages: (await import(`../../../../messages/${locale}.json`)).default,
    },
  }
}) satisfies GetServerSideProps<{
  data: InitialValues
  params?: ParsedUrlQuery
}>

type LocationPageProps = InferGetServerSidePropsType<typeof getServerSideProps>

const LocationPage: React.FC<LocationPageProps> = ({ data, params }) => {
  const { name, address, city, country, zipCode, coordinates, ...rest } = data
  const { bar, museum, park, restaurant } = rest
  const getClient = () => {
    switch (params?.type) {
      case "restaurant":
        return (
          <RestaurantClient
            cuisine={restaurant.cuisine}
            stars={restaurant.stars}
            avgPrice={restaurant.avgPrice}
          />
        )

      case "bar":
        return <BarClient barType={bar.barType} avgPrice={bar.avgPrice} />

      case "park":
        return (
          <ParkClient
            parkType={park.parkType}
            freeOrPaid={park.freeOrPaid}
            isPublic={park.isPublic}
          />
        )

      case "museum":
        return (
          <MuseumClient
            artisticMovement={museum.artisticMovement}
            artType={museum.artType}
            freeOrPaid={museum.freeOrPaid}
          />
        )

      default:
        return null
    }
  }

  return (
    <div className="flex justify-center items-center flex-col h-screen">
      <div>
        <h1 className="text-7xl font-bold mb-4">{name}</h1>
        <div className="ml-auto">
          <p className="text-gray-600">{address}</p>
          <p className="text-gray-600">
            {city}, {country}, {zipCode}
          </p>
          {getClient()}
        </div>
      </div>
      <div className="w-7/12 my-10">
        <DynamicMap
          name={name}
          coordinates={[coordinates[0], coordinates[1]]}
        />
      </div>
    </div>
  )
}

export default LocationPage

```

## API

### Racine

```tsx
import prismaDb from "@/lib/prisma"
import { validateZod } from "@/middleware/ValidateZod"
import { serialize } from "@/middleware/serialize"

const handler = validateZod(async (req, res) => {
  if (req.method === "GET") {
    const locations = await prismaDb.location.findMany()

    return res.status(200).json(locations)
  }

  if (req.method === "POST") {
    try {
      const {
        name,
        address,
        city,
        zipCode,
        country,
        coordinates,
        type,
        ...locationData
      } = req.body
      const createdLocation = await prismaDb.location.create({
        data: {
          name,
          address,
          city,
          zipCode,
          country,
          coordinates,
          type,
          [type.toLowerCase()]: {
            create: locationData,
          },
        },
        include: {
          [type.toLowerCase()]: true,
        },
      })

      return res
        .status(200)
        .json(serialize(createdLocation, ["id", "locationId"]))
    } catch (error) {
      return res.status(412).json("This location name already exsists")
    }
  }

  return Promise.resolve()
})

export default handler

```

### [locationId]

```tsx
import prismaDb from "@/lib/prisma"
import { validateZod } from "@/middleware/ValidateZod"
import { serialize } from "@/middleware/serialize"

const handler = validateZod(async (req, res, params) => {
  const location = await prismaDb.location.findFirst({
    where: {
      id: params.locationId,
    },
  })

  if (!location) {
    return res.status(404).json("Not found")
  }

  if (req.method === "GET") {
    const locationWithRelatedData = await prismaDb.location.findFirst({
      where: {
        id: params.locationId,
      },
      include: {
        [location.type.toLowerCase()]: true,
      },
    })

    if (!locationWithRelatedData) {
      return res.status(404).json("Not found")
    }

    return res
      .status(200)
      .json(serialize(locationWithRelatedData, ["locationId", "id"]))
  }

  if (req.method === "PATCH") {
    const {
      name,
      address,
      city,
      zipCode,
      country,
      coordinates,
      type,
      ...locationData
    } = req.body
    const updatedLocation = await prismaDb.location.update({
      where: {
        id: params?.locationId,
      },
      data: {
        name,
        address,
        city,
        zipCode,
        country,
        coordinates,
        type,
        [type.toLowerCase()]: {
          update: locationData,
        },
      },
      include: {
        [type.toLowerCase()]: true,
      },
    })

    if (!updatedLocation) {
      return res.status(500).json("Unable to update")
    }

    return res
      .status(200)
      .json(serialize(updatedLocation, ["locationId", "id"]))
  }

  if (req.method === "DELETE") {
    const deletedLocation = await prismaDb.location.delete({
      where: {
        id: params?.locationId,
      },
    })

    if (!deletedLocation) {
      return res.status(500).json("Unable to delete")
    }

    return res.status(200).json(serialize(deletedLocation, ["id"]))
  }

  return Promise.resolve()
})

export default handler

```

# MiddleWare

## Serialize

serialize l’api pour ne pas donner Id et locationId

```tsx
export const serialize = (
  data: { [key: string]: any },
  unWantedData: string[],
): { [key: string]: any } =>
  Object.fromEntries(
    Object.entries(data).map(([key, value]) => {
      if (typeof value === "object") {
        return [key, serialize(value, unWantedData)]
      }

      return [key, unWantedData.includes(key) ? "" : value]
    }),
  )

```

## ValidateZod

```tsx
import { typeOfSchema } from "@/schemas/zod_schemas"
import { NextApiRequest, NextApiResponse } from "next"

type Params = {
  [key: string]: string
}

export const validateZod =
  (
    handler: (
      _req: NextApiRequest,
      _res: NextApiResponse,
      _params: Params,
    ) => Promise<void>,
  ) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { type } = req.body as {
        type: "Bar" | "Restaurant" | "Museum" | "Park"
      }

      if (req.method === "POST") {
        req.body = await typeOfSchema[type].parseAsync(req.body)
      }

      const params = req.query as Params

      return await handler(req, res, params)
    } catch (error: any) {
      return res.status(400).json(error)
    }
  }

```

# Schemas

## Zod

```tsx
/* eslint-disable camelcase */
import { z } from "zod"

// ***************************
//         Backend
// ***************************

export const LocationApiBody = z.object({
  type: z.string({ required_error: "Please enter a type" }),
  name: z.string({ required_error: "Please enter a name" }),
  address: z.string({ required_error: "Please enter an address" }),
  city: z.string({ required_error: "Please enter a city" }),
  zipCode: z.string({ required_error: "Please enter a zipCode" }),
  country: z.string({ required_error: "Please enter a country" }),
  coordinates: z
    .number({ required_error: "Please enter the coordinates" })
    .array(),
})

export const typeOfSchema = {
  Restaurant: LocationApiBody.extend({
    cuisine: z.string({ required_error: "Cuisine is required" }),
    stars: z.number({ required_error: "Stars are required" }).int(),
    avgPrice: z.number({ required_error: "avgPrice is required" }),
  }),
  Park: LocationApiBody.extend({
    parkType: z.string({ required_error: "Parktype is required" }),
    isPublic: z.boolean({ required_error: "isPublic is required" }),
    freeOrPaid: z.number({ required_error: "FreeOrPaid is required" }),
  }),
  Museum: LocationApiBody.extend({
    artisticMovement: z.string({
      required_error: "ArtisticMovement is required",
    }),
    artType: z.string({ required_error: "artType is required" }),
    freeOrPaid: z.number({ required_error: "FreeOrPaid is required" }),
  }),
  Bar: LocationApiBody.extend({
    barType: z.string(),
    avgPrice: z.number(),
  }),
}

// ***************************
//         FrontEnd
// ***************************

export const LocationFormSchema = z.object({
  type: z.string().nullable(),
  name: z.string().min(1),
  address: z.string().min(1),
  city: z.string().min(1),
  zipCode: z.string().min(1),
  country: z.string().min(1),
  coordinates: z.coerce.number().array().min(1),
})

export const typeOfFormSchema = {
  Restaurant: LocationFormSchema.extend({
    cuisine: z.string().min(1),
    stars: z.coerce.number(),
    avgPrice: z.number().gte(0),
  }),
  Park: LocationFormSchema.extend({
    parkType: z.string().min(1),
    isPublic: z.boolean(),
    freeOrPaid: z.number(),
  }),
  Museum: LocationFormSchema.extend({
    artisticMovement: z.string().min(1),
    artType: z.string().min(1),
    freeOrPaid: z.number(),
  }),
  Bar: LocationFormSchema.extend({
    barType: z.string().min(1),
    avgPrice: z.number(),
  }),
}

```
