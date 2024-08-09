import React from "react"
import CustomButton from "../../components/custom-button/custom-button"
import { useNavigate } from "react-router-dom"

const Roles: React.FC = () => {
  const navigate = useNavigate()

  const handleClick = React.useCallback(() => {
    navigate("/roles/create")
  }, [])

  return (
    <div>
      <div>Roles</div>
      <div>
        <CustomButton text="Create" onClick={handleClick} />
      </div>
    </div>
  )
}

export default Roles
