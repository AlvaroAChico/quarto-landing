import React from "react"
import { useDropzone } from "react-dropzone"
import { toast } from "sonner"
import {
  ContainerDragAndDropAvatar,
  CustomWrapperInputAvatar,
  ContainerImageAvatar,
} from "../../config/theme/global-styles"
import { CardImage, Trash } from "@styled-icons/bootstrap"
import { UseFormSetValue } from "react-hook-form"
import {
  UpdateUserForm,
  UpdateUserSchema,
} from "../../core/models/schemas/user-schema"

interface FileUploadProps {
  title?: string
  imageUrl: string | null
  keyValue: keyof UpdateUserForm
  isActiveChange?: boolean
  setImageUrl: (url: string | null) => void
  setValueBinary: (key: keyof UpdateUserForm | any, file: any) => void
}

const FileUpload: React.FC<FileUploadProps> = ({
  title = "",
  imageUrl,
  isActiveChange = false,
  keyValue,
  setImageUrl,
  setValueBinary,
}) => {
  const handleDeletePictureUser = () => {
    setImageUrl(null)
  }

  const onDrop = React.useCallback(
    (acceptedFiles: any, rejectedFiles: any) => {
      if (acceptedFiles.length > 0) {
        if (acceptedFiles.length > 1) {
          toast.error("Solo se permite un archivo.")
          return
        }
        const file = acceptedFiles[0]
        setValueBinary(keyValue, file)

        const reader = new FileReader()

        reader.onabort = () => toast.error("File reading was aborted")
        reader.onerror = () => toast.error("File reading has failed")
        reader.onload = () => {
          const binaryStr = reader.result
          if (binaryStr instanceof ArrayBuffer) {
            const blob = new Blob([binaryStr], { type: file.type })
            const imageUrl = URL.createObjectURL(blob)
            setImageUrl(imageUrl)
          } else {
            toast.error("Error al leer el archivo.")
          }
        }
        reader.readAsArrayBuffer(file)
      }

      if (rejectedFiles.length > 0) {
        toast.error(
          'Solo se permite un archivo y debe ser de tipo "PNG", "JPG" o "JPEG".',
        )
      }
    },
    [setImageUrl],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
    },
    maxFiles: 1,
  })

  return (
    <CustomWrapperInputAvatar>
      {title && <label htmlFor="picture-create-project">{title}</label>}
      <div>
        {imageUrl ? (
          <ContainerImageAvatar>
            <img src={imageUrl} alt="Uploaded" />
            {isActiveChange && (
              <div onClick={handleDeletePictureUser}>
                <Trash />
              </div>
            )}
          </ContainerImageAvatar>
        ) : (
          <ContainerDragAndDropAvatar
            {...getRootProps()}
            isDragActive={isDragActive}
          >
            <CardImage />
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Suelta la imagen aquí</p>
            ) : (
              <p>Arrastra o haz clic para cargar una imagen</p>
            )}
          </ContainerDragAndDropAvatar>
        )}
      </div>
    </CustomWrapperInputAvatar>
  )
}

export default FileUpload
