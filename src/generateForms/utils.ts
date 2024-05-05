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
