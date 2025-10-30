// import { useState } from "react"

import { useActionState } from "react"

import { z, ZodError } from "zod"
import { AxiosError } from "axios"
import { useNavigate } from "react-router"

import { api } from "../services/api"

import { Input } from "../components/Input"
import { Button } from "../components/Button"

const signUpSchema = z.object({
  name: z.string().trim().min(2, { message: "Informe o nome corretamente!" }),
  email: z.email({ message: "E-mail inválido" }),
  password: z.string().min(6, { message: "Senha deve ter pelo menos 6 dígitos." }),
  passwordConfirm: z.string({ message: "Confirme a senha" }),
}).refine((data) => data.password === data.passwordConfirm, {
  message: "As senhas não são iguais",
  path: ["passwordConfirm"]
})

export function SignUp() {
  // const [name, setName] = useState("")
  // const [email, setEmail] = useState("")
  // const [password, setPassword] = useState("")
  // const [passwordConfirm, setPasswordConfirm] = useState("")
  // const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const [state, formAction, isLoading] = useActionState(signUp, null)

  async function signUp(_prevState: any, formData: FormData) {
    try {
      const data = signUpSchema.parse({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
        passwordConfirm: formData.get("passwordConfirm")
      })

      await api.post("/users", data)

      if (confirm("Cadastrado com sucesso. Deseja ir para tela de ínicio?")) {
        navigate("/")
      }

    } catch (error) {
      console.log(error)

      if (error instanceof AxiosError) {
        return { message: error.response?.data.message }
      }

      if (error instanceof ZodError) {
        return { message: error.issues[0].message }
      }

      return { message: "Erro ao cadastrar" }
    }
  }

  return (
    <form action={formAction} className="w-full flex flex-col gap-4">

      <Input
        name="name"
        required
        legend="nome"
        type="text"
        placeholder="Digite seu nome"
      />

      <Input
        name="email"
        required
        legend="E-mail"
        type="email"
        placeholder="seu@email.com"
      />

      <Input
        name="password"
        required
        legend="Senha"
        type="password"
        placeholder="Digite sua senha"
      />

      <Input
        name="passwordConfirm"
        required
        legend="Confirme a Senha"
        type="password"
        placeholder="Digite sua senha"
      />

      <p className="text-[11px] text-red-500 mt-1 text-left">
        {state?.message}
      </p>

      <Button type="submit" isLoading={isLoading}>Cadastrar</Button>

      <a href="/" className="text-sm font-semibold text-gray-100 mt-10 mb-4 text-center hover:text-green-800 transition ease">Já tenho uma conta</a>

    </form>
  )
}