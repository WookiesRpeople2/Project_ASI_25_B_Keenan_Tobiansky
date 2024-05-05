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
