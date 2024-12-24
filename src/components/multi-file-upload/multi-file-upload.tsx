import React from "react"
import { useDropzone } from "react-dropzone"
import { toast } from "sonner"
import {
  ContainerDragAndDropFiles,
  CustomWrapperInputFiles,
} from "../../config/theme/global-styles"
import { Trash } from "@styled-icons/bootstrap"
import CardFile from "../card-file/card-file"
import { ContainerListFiles } from "../../features/properties/functionalities/create-property/create-property.styles"

interface MultipleFileUploadProps {
  title?: string
  files: File[]
  setFiles: (files: File[]) => void
}

const MultipleFileUpload: React.FC<MultipleFileUploadProps> = ({
  title = "",
  files,
  setFiles,
}) => {
  const onDrop = React.useCallback(
    (acceptedFiles: File[], fileRejections: any[], event: any) => {
      // Manejo de archivos aceptados
      if (acceptedFiles.length > 0) {
        const updatedFiles = [...files, ...acceptedFiles]

        // Limitar a un máximo de 5 archivos
        if (updatedFiles.length > 5) {
          toast.error("Se permite un máximo de 5 archivos.")
          return
        }

        setFiles(updatedFiles)
      }

      // Manejo de archivos rechazados
      if (fileRejections.length > 0) {
        toast.error(
          'Solo se permite un archivo y debe ser de tipo "PNG", "JPG" o "JPEG".',
        )
      }
    },
    [files, setFiles],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
    },
    maxFiles: 5,
  })

  return (
    <CustomWrapperInputFiles>
      {title && <label>{title}</label>}
      <ContainerDragAndDropFiles
        {...getRootProps()}
        isDragActive={isDragActive}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Suelta los archivos aquí</p>
        ) : (
          <p>Arrastra o haz clic para cargar imágenes</p>
        )}
      </ContainerDragAndDropFiles>
      <ContainerListFiles>
        {files.map((file, index) => (
          <CardFile
            key={index}
            file={file}
            onDeleteFile={() => {
              const newFiles = files.filter(f => f !== file)
              setFiles(newFiles)
            }}
          />
        ))}
      </ContainerListFiles>
    </CustomWrapperInputFiles>
  )
}

export default MultipleFileUpload
