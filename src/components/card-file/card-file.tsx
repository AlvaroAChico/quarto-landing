import React, { useEffect, useState } from "react"
import { CardFileStyles, OverlayFile, PrincipalTag } from "./card-file.styles"
import IconRemoveIMG from "../../assets/img/icons/icon_remove_file.png"

interface IOwnProps {
  file: File
  onDeleteFile: () => void
}

const CardFile: React.FC<IOwnProps> = ({ file, onDeleteFile }) => {
  const [fileImage, setFileImage] = React.useState<string | ArrayBuffer | null>(
    null,
  )
  React.useEffect(() => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      setFileImage(reader.result)
    }
  }, [file])

  return (
    <CardFileStyles>
      <img
        src={typeof fileImage === "string" ? fileImage : undefined}
        alt="icon"
      />
      <OverlayFile>
        <span onClick={onDeleteFile}>
          <img src={IconRemoveIMG} />
          Eliminar
        </span>
      </OverlayFile>
    </CardFileStyles>
  )
}
export default CardFile
