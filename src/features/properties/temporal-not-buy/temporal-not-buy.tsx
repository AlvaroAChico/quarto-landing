import React, { FC } from "react"
import BigHandIMG from "../../../assets/img/big_hands_venta.png"
import { WrapperInput } from "../../../config/theme/global-styles"
import Input from "../../../components/input/input"
import { SignInWithGoogle } from "../../register/register.styles"
import { ContainerComponentNotBuy } from "./temporal-not-buy.styles"

const TemporalNotBuy: FC = () => {
  return (
    <ContainerComponentNotBuy>
      <div>
        <span>Regresar</span>
        <h2>La venta de inmuebles estará disponible próximamente</h2>
        <span>
          Deja tu correo y te avisaremos tan pronto como esté disponible.
        </span>
        <WrapperInput>
          <label htmlFor="email-create-project">Correo electrónico</label>
          <Input
            id="address-create-project"
            placeholder="Enter address"
            // register={register("address")}
          />
          {/* {!!(errors.address as any)?.message && (
            <ErrorMessage>{(errors.address as any)?.message}</ErrorMessage>
          )} */}
        </WrapperInput>
        <SignInWithGoogle>Crear Alerta</SignInWithGoogle>
      </div>
      <div>
        <img src={BigHandIMG} />
      </div>
    </ContainerComponentNotBuy>
  )
}

export default TemporalNotBuy
