import React from "react"
import { CardFileStyles, CloseStyles } from "./card-file.styles"
import WordIMG from "../../assets/img/icons/icon-word.png"
import PdfIMG from "../../assets/img/icons/icon-pdf.png"
import ImageIMG from "../../assets/img/icons/icon-image.png"
import PowerPointIMG from "../../assets/img/icons/icon-powerpoint.png"
import ExcelIMG from "../../assets/img/icons/icon-excel.png"
import OtherArchiveIMG from "../../assets/img/icons/icon-archive.png"
import { Close } from "styled-icons/evaicons-solid"
interface IOwnProps {
  file: File
  onDeleteFile: () => void
}

const formatFileSize = (size: number): string => {
  const kb = 1024
  const mb = kb * 1024
  const gb = mb * 1024

  if (size < kb) {
    return `${size} B`
  } else if (size < mb) {
    return `${(size / kb).toFixed(2)} KB`
  } else if (size < gb) {
    return `${(size / mb).toFixed(2)} MB`
  } else {
    return `${(size / gb).toFixed(2)} GB`
  }
}

const CardFile: React.FC<IOwnProps> = ({ file, onDeleteFile }) => {
  let iconSrc

  switch (file.type) {
    case "application/pdf":
      iconSrc = PdfIMG
      break
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    case "application/msword":
      iconSrc = WordIMG
      break
    case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
    case "application/vnd.ms-excel":
      iconSrc = ExcelIMG
      break
    case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
    case "application/vnd.ms-powerpoint":
      iconSrc = PowerPointIMG
      break
    case "image/png":
    case "image/jpeg":
    case "image/jpg":
      iconSrc = ImageIMG
      break
    default:
      iconSrc = OtherArchiveIMG
  }

  return (
    <CardFileStyles>
      <div>
        <img src={iconSrc} alt="icon" />
      </div>
      <div>
        <span>{file.name}</span>
        <span>{formatFileSize(file.size)}</span>{" "}
        {/* Usar la función para mostrar el tamaño */}
      </div>
      <CloseStyles>
        <Close onClick={onDeleteFile} />
      </CloseStyles>
      {/* <p>{file.type}</p> */}
      {/* <p>{file.lastModified}</p> */}
      {/* <p>{file.webkitRelativePath}</p> */}
    </CardFileStyles>
  )
}
export default CardFile
