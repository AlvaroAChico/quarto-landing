import React from "react"
import {
  BodyProfile,
  CloseImage,
  ColumnItemProfile,
  ContainerImage,
  ContainerImages,
  ContainerInfoUp,
  ContainerProfile,
  HeaderProfile,
  ItemImage,
  OptionsProfile,
  PassportContainer,
} from "./profile.styles"
import useDataUser from "../../utils/use-data-user"
import { MeDTO, UserDTO } from "../../core/models/interfaces/user-model"
import {
  ContainerDragAndDropAvatar,
  ContainerImageAvatar,
  CustomWrapperInputAvatar,
  ErrorMessage,
  WrapperInput,
} from "../../config/theme/global-styles"
import Input from "../../components/input/input"
import Button from "../../components/button/button"
import { palette } from "../../config/theme/theme"
import { Close } from "styled-icons/evaicons-solid"
import { toast } from "sonner"
import { useDropzone } from "react-dropzone"
import { CardImage, Trash } from "@styled-icons/bootstrap"
import FileUpload from "../../components/file-upload/file-upload"
import { useForm } from "react-hook-form"
import {
  UpdateUserForm,
  UpdateUserSchema,
} from "../../core/models/schemas/user-schema"
import { yupResolver } from "@hookform/resolvers/yup"
import { MessageResponsedDTO } from "../../core/models/interfaces/general-model"
import { userRepository } from "../../api/repositories/user-repository"
import { authRepository } from "../../api/repositories/auth-repository"
import Cookies from "js-cookie"
import { COOKIES_APP } from "../../constants/app"

const Profile: React.FC = () => {
  const { handleGetUser } = useDataUser()
  const [dataUser, setDataUser] = React.useState<UserDTO>(handleGetUser())
  const [isEdit, setIsEdit] = React.useState<boolean>(false)
  const [isSubmitUserUpdate, setIsSubmitUserUpdate] =
    React.useState<boolean>(false)

  const fakePassport =
    "https://imagenes.20minutos.es/files/image_990_556/uploads/imagenes/2024/05/04/pasaporte-alien.jpeg"
  const fakeProfile =
    "https://disneyconnect.com/app/uploads/2023/12/mickey-mouse-cinderella-castle-1024x683.jpg"
  const [imgFrontPassport, setImgFrontPassport] = React.useState<any>(
    dataUser.photo || fakePassport,
  )
  const [imgBackPassport, setImgBackPassport] = React.useState<any>(
    dataUser.photo || fakePassport,
  )
  const [imgProfile, setImgProfile] = React.useState<any>(
    dataUser.photo || fakeProfile,
  )

  const methods = useForm<UpdateUserForm>({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      contact_number: "",
      document_type: "",
      document_number: "",
    },
  })

  const {
    handleSubmit: submitWrapper,
    formState: { errors },
    register,
    reset,
    setValue,
  } = methods

  const handleSubmit = async (data: any) => {
    setIsSubmitUserUpdate(true)
    try {
      const formData = new FormData()
      for (const key in data) {
        if (
          data.hasOwnProperty(key) &&
          data[key] !== undefined &&
          data[key] !== null &&
          data[key] !== ""
        ) {
          formData.append(key, data[key])
        }
      }

      if (formData.entries().next().done) {
        false
        toast.warning("No se encontraron registros")
        return
      }

      formData.append("_method", "PATCH")

      const response: MeDTO = (await userRepository.updateById(
        dataUser?.id,
        formData,
      )) as MeDTO
      if (!!response) {
        toast.success("Datos actualizados satisfactoriamente")
        reset()
        refreshDataMe()
      }
    } finally {
      setIsSubmitUserUpdate(false)
    }
  }

  const refreshDataMe = async () => {
    try {
      const response: MeDTO = (await authRepository.getMe()) as MeDTO
      if (!!response && !!response.id) {
        const expiration = {
          expires: 7,
        }
        const { roles, ...meUser } = response
        Cookies.set(COOKIES_APP.USER_RES, JSON.stringify(meUser), expiration)
        Cookies.set(COOKIES_APP.ROLES_APP, JSON.stringify(roles), expiration)
      }
    } finally {
      setDataUser(handleGetUser())
      setIsEdit(false)
    }
  }

  return (
    <ContainerProfile>
      <OptionsProfile>
        <Button
          onClick={
            isEdit
              ? () => {
                  reset()
                  setImgFrontPassport(dataUser.photo || fakePassport)
                  setImgBackPassport(dataUser.photo || fakePassport)
                  setImgProfile(dataUser.photo || fakeProfile)
                  setIsEdit(false)
                }
              : () => setIsEdit(true)
          }
          text={isEdit ? "Cancelar" : "Editar"}
          customStyles={`
            ${isEdit && "background: #ff7b71;"}
          `}
        />
        {isEdit && (
          <Button
            onClick={submitWrapper(handleSubmit)}
            text="Guardar"
            isLoading={isSubmitUserUpdate}
          />
        )}
      </OptionsProfile>
      <HeaderProfile>
        <ContainerImage>
          <FileUpload
            imageUrl={imgProfile}
            setImageUrl={url => setImgProfile(url)}
            isActiveChange={isEdit}
            setValueBinary={setValue}
            keyValue="picture"
          />
        </ContainerImage>
        <ContainerInfoUp>
          {!isEdit && (
            <p>
              <span>{dataUser.username || ""}</span>
            </p>
          )}
          <p>
            {!isEdit ? (
              <span>
                {dataUser.firstName || "Sonia"} {dataUser.lastName || "Alayo"}
              </span>
            ) : (
              <>
                <WrapperInput>
                  <label htmlFor="Username-create-project">Nombre</label>
                  <Input
                    id="Username-create-project"
                    placeholder="Enter firstname"
                    type="text"
                    register={register("first_name")}
                    disabled={isSubmitUserUpdate}
                  />
                </WrapperInput>
                <WrapperInput>
                  <label htmlFor="Username-create-project">Apellido</label>
                  <Input
                    id="Username-create-project"
                    placeholder="Enter last name"
                    type="text"
                    disabled={isSubmitUserUpdate}
                    register={register("last_name")}
                  />
                </WrapperInput>
              </>
            )}
          </p>
        </ContainerInfoUp>
      </HeaderProfile>
      <BodyProfile>
        <ColumnItemProfile>
          <p>
            {!isEdit ? (
              <>
                <strong>Tlf.:</strong>{" "}
                <span>{dataUser.contactNumber || "-"}</span>
              </>
            ) : (
              <WrapperInput>
                <label htmlFor="Username-create-project">Telefono</label>
                <Input
                  id="telefono-create-project"
                  placeholder="Enter telefono"
                  type="number"
                  register={register("contact_number")}
                />
              </WrapperInput>
            )}
          </p>
          {!isEdit && (
            <p>
              <strong>Email:</strong> <span>{dataUser.email || "-"}</span>
            </p>
          )}
        </ColumnItemProfile>
        <ColumnItemProfile>
          <p>
            {!isEdit ? (
              <>
                <strong>Tipo Documento:</strong>{" "}
                <span>{dataUser.documentType || "-"}</span>
              </>
            ) : (
              <WrapperInput>
                <label htmlFor="typedocument-create-project">
                  Tipo de Documento
                </label>
                <Input
                  id="typedocument-create-project"
                  placeholder="Enter telefono"
                  type="text"
                  register={register("document_type")}
                />
              </WrapperInput>
            )}
          </p>
          <p>
            {!isEdit ? (
              <>
                <strong># Documento:</strong>{" "}
                <span>{dataUser.documentNumber || "-"}</span>
              </>
            ) : (
              <WrapperInput>
                <label htmlFor="Username-create-project"># Documento</label>
                <Input
                  id="documento-create-project"
                  placeholder="Enter documento"
                  type="number"
                  register={register("document_number")}
                />
              </WrapperInput>
            )}
          </p>
        </ColumnItemProfile>
        <PassportContainer>
          <p>
            <strong>Documentos:</strong>
          </p>
          <ContainerImages>
            <ItemImage>
              <FileUpload
                imageUrl={imgFrontPassport}
                setImageUrl={url => setImgFrontPassport(url)}
                isActiveChange={isEdit}
                setValueBinary={setValue}
                keyValue="picture"
              />
            </ItemImage>
            <ItemImage>
              <FileUpload
                imageUrl={imgBackPassport}
                setImageUrl={url => setImgBackPassport(url)}
                isActiveChange={isEdit}
                setValueBinary={setValue}
                keyValue="picture"
              />
            </ItemImage>
          </ContainerImages>
        </PassportContainer>
      </BodyProfile>
    </ContainerProfile>
  )
}

export default Profile
