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
