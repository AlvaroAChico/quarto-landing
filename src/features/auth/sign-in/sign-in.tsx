import React from "react"
import {
  ContainerSignIn,
  ContentLeftContainer,
  FormContainer,
  LeftContainer,
  RightContainer,
} from "./sign-in.styles"
import CustomButton from "../../../components/custom-button/custom-button"
import Input from "../../../components/custom-input/custom-input"
import ImgHeader from "../../../assets/img/img_signin.webp"
import ImgLogo from "../../../assets/img/logo.webp"
import { useNavigate } from "react-router-dom"
import { User } from "@styled-icons/boxicons-solid/User"
import { Password } from "@styled-icons/material-twotone/Password"
import { EyeFill, EyeSlashFill } from "@styled-icons/bootstrap"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { UserForm, UserSchema } from "../../../core/models/user-model"
import axios from "axios"
import { toast } from "sonner"
import Cookies from "js-cookie"

const SignIn: React.FC = () => {
  const [isSubmitLogin, setIsSubmitLogin] = React.useState<boolean>(false)
  const navigate = useNavigate()

  const methods = useForm<UserForm>({
    resolver: yupResolver(UserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const {
    handleSubmit: submitWrapper,
    formState: { errors },
    register,
  } = methods

  const handleSubmit = React.useCallback((data: any) => {
    setIsSubmitLogin(true)
    axios
      .post("http://localhost:3000/auth/login", {
        email: data.email,
        password: data.password,
      })
      .then(response => {
        // Manejo de la respuesta exitosa
        setIsSubmitLogin(false)
        // Convertir el objeto a una cadena JSON y guardar en cookies
        Cookies.set("userData", JSON.stringify(response.data), { expires: 7 }) // Expira en 7 días
        navigate("/dashboard")
        // console.log("Data Axios -> ", response.data)
      })
      .catch(err => {
        // Manejo de errores
        // setError(err) // Descomentar si estás usando para manejar el estado de un error
        setIsSubmitLogin(false)
        toast.error("Failed to authenticate")
        console.log("Error Axios -> ", err.response ? err.response.data : err)
      })
  }, [])

  return (
    <ContainerSignIn>
      <LeftContainer imgHeader={ImgHeader}>
        <ContentLeftContainer>
          <div>
            <img src={ImgLogo} />
          </div>
          {/* <div>Bienvenido</div> */}
          {/* <div>Copyright</div> */}
        </ContentLeftContainer>
      </LeftContainer>
      <RightContainer>
        <FormContainer>
          <h1>Sign In</h1>
          <div>
            <div className="div-with-margin">
              <label className="label" htmlFor="email-signin">
                Your email
              </label>
              <Input
                placeholder="Your Email"
                icon={User}
                props={register("email")}
              />
              {!!(errors.email as any)?.message && (
                <>{(errors.email as any)?.message}</>
              )}
            </div>
            <div className="div-without-margin">
              <label className="label" htmlFor="password-signin">
                Your password
              </label>
              <Input
                placeholder="Your Password"
                icon={Password}
                type="password"
                toggleIcon={{ Show: EyeFill, Hide: EyeSlashFill }}
                props={register("password")}
              />
              {/* <input {...register("email")} />
              <input {...register("password")} /> */}
              {!!(errors.password as any)?.message && (
                <>{(errors.password as any)?.message}</>
              )}
            </div>
          </div>
          <CustomButton
            onClick={submitWrapper(handleSubmit)}
            text="Sign In"
            isLoading={isSubmitLogin}
          />
        </FormContainer>
      </RightContainer>
    </ContainerSignIn>
  )
}

export default SignIn
