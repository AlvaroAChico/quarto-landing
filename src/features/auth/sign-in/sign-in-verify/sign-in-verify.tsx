import { FC, useState } from "react"
import { useEffect } from "react"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { SignInResponse } from "../../../../core/models/interfaces/user-model"
import { useVerifyLoginEmail } from "../../../../apis/hooks/use-auth"
import Cookies from "js-cookie"
import { COOKIES_APP } from "../../../../constants/app"
import useDataUser from "../../../../utils/use-data-user"
import { pathRoutes } from "../../../../config/routes/paths"
import { setErrResponse } from "../../../../utils/erros-util"
import { LoaderStyles } from "../../../../components/button/button.styles"
import styled from "styled-components"
import { palette } from "../../../../config/theme/theme"

const ContainerVerifyEmail = styled.div`
  background: ${palette.primaryColor};
  place-items: center;
  display: grid;
  height: 100vh;
  width: 100%;
`

const SignInVerify: FC = () => {
  const [isSubmitLogin, setIsSubmitLogin] = useState<boolean>(false)
  const { id } = useParams()
  const navigate = useNavigate()

  const { clearAllDataAPP } = useDataUser()
  const { mutateAsync: verifyLoginAsync } = useVerifyLoginEmail()

  const verifyToken = async () => {
    try {
      setIsSubmitLogin(true)
      const response: SignInResponse = await verifyLoginAsync({
        token: `${id}`,
      })
      if (response) {
        clearAllDataAPP()
        Cookies.set(COOKIES_APP.TOKEN_APP, response.token, { expires: 7 })
        Cookies.set(COOKIES_APP.USER_RES, JSON.stringify(response["0"]), {
          expires: 3,
        })
        // navigate(pathRoutes.HOME.to)
      }
      //   setStepForm(EStepRegister.CHECK_EMAIL_SIGNIN)
    } catch (error: any) {
      // Se captura y se maneja el error (puedes implementar una función para mostrar mensajes o notificaciones)
      setErrResponse(error)
    } finally {
      navigate(pathRoutes.HOME.to)
      setIsSubmitLogin(false)
    }
  }

  useEffect(() => {
    const cleanUrl = () => {
      const currentPath = window.location.pathname.split("/")[1]
      window.history.replaceState(null, "", `/${currentPath}`)
    }

    verifyToken()
    cleanUrl()
  }, [])

  return (
    <ContainerVerifyEmail>
      <LoaderStyles />
    </ContainerVerifyEmail>
  )
}

export default SignInVerify
