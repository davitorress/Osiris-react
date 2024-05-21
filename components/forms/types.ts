import { z } from "zod"

export const loginSchema = z.object({
  email: z
    .string({ required_error: "O email é obrigatório!" })
    .min(1, "O email é obrigatório!")
    .email("Insira um email válido!")
    .transform((email) => email.trim()),
  password: z
    .string({ required_error: "A senha é obrigatória!" })
    .min(1, "A senha é obrigatória!")
    .min(3, "A senha deve ter no mínimo 3 caracteres!")
    .transform((password) => password.trim()),
})

export type LoginData = z.infer<typeof loginSchema>

export const registerSchema = z
  .object({
    name: z
      .string({ required_error: "O nome é obrigatório!" })
      .min(1, "O nome é obrigatório!")
      .transform((name) => name.trim()),
    email: z
      .string({ required_error: "O email é obrigatório!" })
      .min(1, "O email é obrigatório!")
      .email("Insira um email válido!")
      .transform((email) => email.trim()),
    password: z
      .string({ required_error: "A senha é obrigatória!" })
      .min(1, "A senha é obrigatória!")
      .min(3, "A senha deve ter no mínimo 3 caracteres!")
      .transform((password) => password.trim()),
    confirmPassword: z
      .string({ required_error: "A confirmação de senha é obrigatória!" })
      .min(1, "A confirmação de senha é obrigatória!")
      .min(3, "A confirmação de senha deve ter no mínimo 3 caracteres!")
      .transform((confirmPassword) => confirmPassword.trim()),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "As senhas não coincidem!",
    path: ["confirmPassword"],
  })

export type RegisterData = z.infer<typeof registerSchema>

export const recipeSchema = z
  .object({
    id: z.string().optional(),
    name: z
      .string({ required_error: "O nome da receita é obrigatório!" })
      .min(1, "O nome da receita é obrigatório!")
      .transform((name) => name.trim()),
    description: z
      .string({ required_error: "A descrição da receita é obrigatória!" })
      .min(1, "A descrição da receita é obrigatória!")
      .max(120, "A descrição da receita deve ter no máximo 120 caracteres!")
      .transform((description) => description.trim()),
    pancs: z.array(z.string()).min(1, "A receita deve ter pelo menos uma panc!"),
    ingredients: z.array(z.string()).min(1, "A receita deve ter pelo menos um ingrediente!"),
    preparation: z.array(z.string()).min(1, "A receita deve ter pelo menos um modo de preparo!"),
  })
  .refine(({ ingredients }) => ingredients[0].length > 0, {
    message: "A receita deve ter pelo menos um ingrediente!",
    path: ["ingredients"],
  })
  .refine(({ preparation }) => preparation[0].length > 0, {
    message: "A receita deve ter pelo menos um modo de preparo!",
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
  email: z.string().email("Insira um email válido!"),
  newPassword: z
    .string()
    .min(3, "A senha deve ter no mínimo 3 caracteres!")
    .transform((password) => password.trim())
    .optional(),
})

export type EditUserData = z.infer<typeof editUserSchema>
