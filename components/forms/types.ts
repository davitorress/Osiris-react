import { z } from "zod"

export const loginSchema = z.object({
  email: z
    .string({ required_error: "errors.email" })
    .min(1, "errors.email")
    .email("errors.invalidEmail")
    .transform((email) => email.trim()),
  password: z
    .string({ required_error: "errors.password" })
    .min(1, "errors.password")
    .min(3, "errors.passwordLength")
    .transform((password) => password.trim()),
})

export type LoginData = z.infer<typeof loginSchema>

export const registerSchema = z
  .object({
    name: z
      .string({ required_error: "errors.name" })
      .min(1, "erros.name")
      .transform((name) => name.trim()),
    email: z
      .string({ required_error: "errors.email" })
      .min(1, "errors.email")
      .email("errors.invalidEmail")
      .transform((email) => email.trim()),
    password: z
      .string({ required_error: "errors.password" })
      .min(1, "errors.password")
      .min(3, "errors.passwordLength")
      .transform((password) => password.trim()),
    confirmPassword: z
      .string({ required_error: "erros.confirmPassword" })
      .min(1, "errors.password")
      .min(3, "errors.passwordLength")
      .transform((confirmPassword) => confirmPassword.trim()),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "errors.passwordMatch",
    path: ["confirmPassword"],
  })

export type RegisterData = z.infer<typeof registerSchema>

export const recipeSchema = z
  .object({
    name: z
      .string({ required_error: "errors.recipeName" })
      .min(1, "errors.recipeName")
      .transform((name) => name.trim()),
    description: z
      .string({ required_error: "errors.recipeDescription" })
      .min(1, "errors.recipeDescription")
      .max(250, "errors.recipeDescriptionLength")
      .transform((description) => description.trim()),
    pancs: z.array(z.string()).min(1, "errors.recipePancs"),
    ingredients: z.array(z.string()).min(1, "errors.recipeIngredients"),
    preparation: z.array(z.string()).min(1, "errors.recipePreparation"),
  })
  .refine(({ ingredients }) => ingredients[0].length > 0, {
    message: "errors.recipeIngredients",
    path: ["ingredients"],
  })
  .refine(({ preparation }) => preparation[0].length > 0, {
    message: "errors.recipePreparation",
    path: ["preparation"],
  })
  .transform(({ ingredients, preparation, ...rest }) => {
    return {
      ...rest,
      ingredients: ingredients.filter((i) => i.length > 0),
      preparation: preparation.filter((p) => p.length > 0),
    }
  })

export type RecipeData = z.infer<typeof recipeSchema>

export const editUserSchema = z.object({
  name: z.string().transform((name) => name.trim()),
  email: z.string().email("errors.invalidEmail"),
  newPassword: z
    .string()
    .min(3, "errors.passwordLength")
    .transform((password) => password.trim())
    .optional(),
})

export type EditUserData = z.infer<typeof editUserSchema>
