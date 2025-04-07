import { FC, useEffect, useState } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import {
  AccordionContentPerson,
  AccordionTitlePerson,
  AccordionWrapperPerson,
  AlertStyles,
  ContainerButtonAddPeople,
  ContainerComponent,
  ContinueExploreContainer,
  FinishButton,
  FormComponent,
  NextStepButton,
  PersonListWrapper,
} from "./schedule-property.styles"
import { ErrorMessage, WrapperInput } from "../../../config/theme/global-styles"
// import Input from "../../../components/input/input"
import SearchVisitIMG from "../../../assets/img/search-agent-loading.png"
import { useNavigate } from "react-router-dom"
import { pathRoutes } from "../../../config/routes/paths"
import InfoICON from "../../../assets/img/icons/icon_info.png"
import { useAppSelector } from "../../../app/hooks"
import { getModeSearch } from "../../../core/store/app-store/appSlice"
import { ETypeModeSearch } from "../../../constants/app"
import {
  HeaderWrapper,
  LogoWrapper,
  NavigationItem,
  NavigationList,
} from "../../../components/empty-layout/header/header.styles"
import ArrowForwardIconIMG from "../../../assets/img/icons/icon_arrow_register.png"
import {
  ItemBoxOptions,
  ItemCheckbox,
} from "../functionalities/create-property/create-property.styles"
import { Accordion } from "react-accordion-ts"
import { ArrowDown, Plus } from "styled-icons/evaicons-solid"
import Button from "../../../components/button/button"
import {
  FormControl,
  FormLabel,
  Input,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material"
import {
  ScheduleVisitForm,
  ScheduleVisitSchema,
} from "../../../core/models/schemas/visit-schema"

// Tipado para cada persona y para el formulario completo
interface PersonForm {
  profesion: string
  trabajoActual: string
  ingresos: string
}

interface FormValues {
  persons?: PersonForm[]
}

const ScheduleProperty: FC = () => {
  const [activeCheckMode, setActiveCheckMode] = useState<number>(1)
  const [stepForm, setStepForm] = useState(1)
  const navigate = useNavigate()
  const modeSearch = useAppSelector(getModeSearch)

  // Funciones para cambiar de paso
  const handleToBuy = () => {
    if (modeSearch === ETypeModeSearch.VENTA) {
      setStepForm(3)
    } else {
      setStepForm(stepForm + 1)
    }
  }
  const handleChangeStep = () => setStepForm(stepForm + 1)
  const handleExplore = () => navigate(pathRoutes.PROPERTY.to)
  const handleToHistoryStep = () => {
    if (stepForm > 1) {
      setStepForm(stepForm - 1)
    } else {
      navigate(-1)
    }
  }

  // Configuración de react-hook-form con Yup
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm<ScheduleVisitForm>({
    resolver: yupResolver(ScheduleVisitSchema),
  })

  // useFieldArray para manejar el arreglo de personas
  const { fields, append } = useFieldArray({
    control,
    name: "persons",
  })

  useEffect(() => {
    if (fields.length === 0) {
      append({ profesion: "", trabajoActual: "", ingresos: "" })
    }
  }, [])

  // Agrega una nueva persona vacía
  const handleAddPerson = () => {
    append({ profesion: "", trabajoActual: "", ingresos: "" })
  }

  // Función al enviar el formulario del paso 2
  const onSubmit = (data: FormValues) => {
    console.log("Datos del formulario:", data)
    setStepForm(3)
  }

  // Configuración del accordion con cada item dinámico
  const itemsPersons = fields.map((field, index) => ({
    title: (
      <AccordionTitlePerson
        key={field.id}
        isValid={
          !errors.persons?.[index]?.profesion &&
          !errors.persons?.[index]?.trabajoActual &&
          !errors.persons?.[index]?.ingresos &&
          !!getValues(`persons.${index}.profesion`) &&
          !!getValues(`persons.${index}.trabajoActual`) &&
          !!getValues(`persons.${index}.ingresos`)
        }
      >
        <li>
          <h3>Persona {index + 1}</h3>
          <ArrowDown />
        </li>
      </AccordionTitlePerson>
    ),
    content: (
      <AccordionContentPerson>
        <FormComponent>
          <FormControl fullWidth>
            <FormLabel style={{ fontWeight: 400, marginBottom: 10 }}>
              ¿Cuál es su profesión?
            </FormLabel>
            <TextField
              id={`persons.${index}.profesion`}
              placeholder="Profesión"
              style={{ borderRadius: 20 }}
              helperText={
                <span style={{ color: "red", marginLeft: 0 }}>
                  {errors.persons?.[index]?.ingresos?.message ||
                    "Ingrese un valor válido."}
                </span>
              }
              {...register(`persons.${index}.profesion`)}
            />
          </FormControl>

          <FormControl fullWidth>
            <FormLabel style={{ fontWeight: 400, marginBottom: 10 }}>
              ¿Cuál es su trabajo actual?
            </FormLabel>
            <Select
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              value={getValues(`persons.${index}.ingresos`) || ""}
              onChange={e => {
                const value = e.target.value
                register(`persons.${index}.ingresos`).onChange(e)
                setValue(`persons.${index}.ingresos`, value)
              }}
            >
              <MenuItem disabled value="">
                <em>Seleccionar</em>
              </MenuItem>
              <MenuItem key={1} value={1}>
                Empleado (Empresa Pública)
              </MenuItem>
              <MenuItem key={2} value={2}>
                Empleado (Empresa Privada)
              </MenuItem>
              <MenuItem key={3} value={3}>
                Empresario
              </MenuItem>
              <MenuItem key={4} value={4}>
                Emprendedor
              </MenuItem>
              <MenuItem key={5} value={5}>
                Trabajador intependiente
              </MenuItem>
              <MenuItem key={6} value={6}>
                Jubilado / Pensionado
              </MenuItem>
            </Select>
            {errors.persons?.[index]?.ingresos && (
              <ErrorMessage>
                {errors.persons[index].ingresos?.message}
              </ErrorMessage>
            )}
          </FormControl>

          <FormControl fullWidth>
            <FormLabel style={{ fontWeight: 400, marginBottom: 10 }}>
              ¿Cómo suele recibir sus ingresos?
            </FormLabel>
            <Select
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              value={getValues(`persons.${index}.ingresos`) || ""}
              onChange={e => {
                const value = e.target.value
                register(`persons.${index}.ingresos`).onChange(e)
              }}
            >
              <MenuItem disabled value="">
                <em>Seleccionar</em>
              </MenuItem>
              <MenuItem key={1} value={1}>
                Efectivo en divisas
              </MenuItem>
              <MenuItem key={2} value={2}>
                Transferencia digital en divisas
              </MenuItem>
              <MenuItem key={3} value={3}>
                Transferencia moneda nacional
              </MenuItem>
              <MenuItem key={4} value={4}>
                Transferencia moneda nacional
              </MenuItem>
              <MenuItem key={5} value={5}>
                Otro
              </MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <FormLabel style={{ fontWeight: 400, marginBottom: 10 }}>
              ¿Cuál es su ingreso mensual bruto en dólares?
            </FormLabel>
            <TextField
              id={`persons.${index}.ingresos`}
              placeholder="Ingreso en dólares"
              style={{ borderRadius: 20 }}
              helperText={
                <span style={{ color: "red" }}>
                  {errors.persons?.[index]?.ingresos?.message ||
                    "Ingrese un valor válido."}
                </span>
              }
              {...register(`persons.${index}.ingresos`)}
            />
          </FormControl>
        </FormComponent>
      </AccordionContentPerson>
    ),
  }))

  return (
    <>
      <HeaderWrapper>
        <NavigationList>
          <NavigationItem onClick={handleToHistoryStep}>
            <div>
              <img src={ArrowForwardIconIMG} alt="Regresar" />
            </div>
            Regresar
          </NavigationItem>
        </NavigationList>
        <LogoWrapper>
          {/* <img src={LogoIMG} alt="Logo Quarto" /> */}
        </LogoWrapper>
      </HeaderWrapper>

      {stepForm === 1 && (
        <ContainerComponent>
          <Typography variant="h4" fontWeight={700}>
            Cuéntanos un poco de ti
          </Typography>
          <Typography
            variant="body1"
            fontSize={16}
            fontWeight={400}
            color="#676767"
          >
            Para este pre chequeo necesitamos la información de la persona que
            eventualmente será el titular del contrato.
          </Typography>
          <AlertStyles>
            <img src={InfoICON} alt="Info" />
            <p>
              Déjanos saber si estás llenando este pre-chequeo para ti mismo o
              para alguien más, así podremos brindarte una mejor experiencia.
            </p>
          </AlertStyles>
          <p>¿Quién será el titular del contrato?</p>
          <ItemBoxOptions>
            <ItemCheckbox
              active={activeCheckMode === 1}
              onClick={() => setActiveCheckMode(1)}
            >
              <div>
                <span />
                Estoy completando esto para mí.
              </div>
            </ItemCheckbox>
            <ItemCheckbox
              active={activeCheckMode === 2}
              onClick={() => setActiveCheckMode(2)}
            >
              <div>
                <span />
                Estoy completando esto para alguien más.
              </div>
            </ItemCheckbox>
          </ItemBoxOptions>
          <NextStepButton onClick={handleToBuy}>Siguiente</NextStepButton>
        </ContainerComponent>
      )}

      {stepForm === 2 && (
        <ContainerComponent>
          <Typography variant="h2" fontSize={35} fontWeight={600}>
            Evaluación financiera
          </Typography>
          <Typography
            variant="body1"
            fontSize={16}
            fontWeight={400}
            color="#676767"
            padding={"10px 0 20px"}
          >
            Deberás confirmar estos datos mediante el envío de documentación
            cuando se complete la negociación del inmueble.
          </Typography>
          <AlertStyles>
            <img src={InfoICON} alt="Info" />
            <p>
              Si el valor del inmueble cambia, el valor de los ingresos a
              comprobar también puede cambiar.
            </p>
          </AlertStyles>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              marginBottom: 10,
            }}
          >
            <Typography
              variant="h4"
              fontSize={16}
              fontWeight={700}
              padding={"10px 0"}
            >
              Agrega la información de todas las personas que serán responsables
              de pagar el alquiler.
            </Typography>
            <Typography
              variant="body1"
              fontSize={16}
              fontWeight={400}
              color="#676767"
            >
              Hasta 5 personas pueden ser responsables para cubrir el alquiler.
              Deben sumar un ingreso mínimo entre x2.0 - x2.5 veces el valor del
              alquiler mensual.
            </Typography>
            <Typography
              variant="body1"
              fontSize={16}
              fontWeight={400}
              color="#676767"
            >
              No necesitan vivir en el inmueble ni en la misma ciudad pero{" "}
              <strong>
                tendrán que firmar el contrato de alquilarse la propiedad.
              </strong>
            </Typography>
          </div>
          <PersonListWrapper>
            <AccordionWrapperPerson>
              <Accordion items={itemsPersons} duration={300} multiple={false} />
            </AccordionWrapperPerson>
          </PersonListWrapper>
          <ContainerButtonAddPeople>
            <button onClick={handleAddPerson}>
              <Plus /> Agregar persona
            </button>
          </ContainerButtonAddPeople>
          {/* Al hacer clic en Finalizar se validará el formulario y si es correcto se pasa al paso 3 */}
          <FinishButton onClick={handleSubmit(onSubmit)}>
            Finalizar
          </FinishButton>
        </ContainerComponent>
      )}

      {stepForm === 3 && (
        <ContainerComponent>
          <ContinueExploreContainer>
            <div>
              <h2>
                ¡Recibimos tu solicitud! Estás a un paso más cerca de tu nueva
                vida.
              </h2>
              <p>En breve nuestro equipo te estará contactando por Whatsapp.</p>
              <FinishButton onClick={handleExplore}>
                Seguir explorando
              </FinishButton>
            </div>
            <div>
              <img src={SearchVisitIMG} alt="Search Visit" />
            </div>
          </ContinueExploreContainer>
        </ContainerComponent>
      )}
    </>
  )
}

export default ScheduleProperty
