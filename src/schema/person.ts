import { object, string, number, array, TypeOf } from "yup";

export const personSchema = object({
  name: string().required().min(2).max(30),
  age: number().required().positive(),
  email: string().required().email(),
  personalWebsite: string().optional().url(),
  nationalities: array(
    object({
      country: string().required(),
      observation: string().optional().max(5000),
    })
  )
    .required()
    .min(1),
});

export type Person = TypeOf<typeof personSchema>
