import { FC, useCallback, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { pathRoutes } from "../../../config/routes/paths"
import {
  ContainerFullComponent,
  OptionsSignIn,
  SignInWithGoogle,
} from "../../register/register.styles"
import { authRepository } from "../../../api/repositories/auth-repository"
import { setErrResponse } from "../../../utils/erros-util"
import { VerifyEmailForm } from "../../../core/models/interfaces/user-model"
import { LoaderStyles } from "../../../components/button/button.styles"
import {
  ContainerFullVerify,
  ContainerLoaderStyle,
} from "./verify-email.styles"

const VerifyEmail: FC = () => {
  const [dataResponse, setDataResponse] = useState("")
  const [isLoadVerify, setIsLoadVerify] = useState(false)
  const [mssVerify, setMssVerify] = useState("")
  const { search } = useLocation()
  const queryParams = new URLSearchParams(search)
  const navigate = useNavigate()

  const handleCheckVerify = useCallback(async () => {
    try {
      setIsLoadVerify(true)
      const response: any = (await authRepository.verifyEmail({
        id: queryParams.get("id") || "",
        hash: queryParams.get("hash") || "",
        expires: queryParams.get("expires") || "",
        signature: queryParams.get("signature") || "",
      } as unknown as VerifyEmailForm)) as any

      console.log("Response => ", response)
      if (!!response) {
        setIsLoadVerify(false)
        setMssVerify(response.message)
        //     Cookies.set(COOKIES_APP.TOKEN_APP, response.token)
        // handleChangeStep(EStepRegister.REGISTER_COMPLETE)()
      }
    } catch (e: any) {
      setMssVerify(e.response.data.message)
      //   setErrResponse(e)
    } finally {
      setIsLoadVerify(false)
    }
  }, [queryParams])

  useEffect(() => {
    handleCheckVerify()
  }, [])

  return (
    <>
      <ContainerFullVerify>
        {isLoadVerify && (
          <ContainerLoaderStyle>
            <LoaderStyles />
          </ContainerLoaderStyle>
        )}
        {!isLoadVerify && (
          <ContainerFullComponent>
            <h2>Bienvenido a Quarto</h2>
            {/* <p>Tu cuenta ha sido registrada exitosamente</p> */}
            {/* <p>{mssVerify}</p> */}
            <p>Tu cuenta ha sido verificada con exito</p>
            <OptionsSignIn>
              <SignInWithGoogle onClick={() => navigate(pathRoutes.HOME.to)}>
                Continuar
              </SignInWithGoogle>
            </OptionsSignIn>
          </ContainerFullComponent>
        )}
      </ContainerFullVerify>
    </>
  )
}

export default VerifyEmail
