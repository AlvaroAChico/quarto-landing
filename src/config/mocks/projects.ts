import { Project ,Task} from "../../core/models/project-model";


export const mockProjects: Project[] = [
  {
    id: "1",
    name: "Desarrollo del Sistema de Inventario",
    startDate: new Date(2024, 0, 15),
    endDate: new Date(2024, 5, 30),
    tasks: [
      {
        name: "Revisar requerimientos",
        startDate: new Date(2024, 1, 1),
        endDate: new Date(2024, 1, 10),
      },
      {
        name: "Diseñar base de datos",
        startDate: new Date(2024, 1, 15),
        endDate: new Date(2024, 2, 15),
      },
      {
        name: "Desarrollar API",
        startDate: new Date(2024, 2, 20),
        endDate: new Date(2024, 3, 20),
      },
      {
        name: "Realizar pruebas unitarias",
        startDate: new Date(2024, 4, 1),
        endDate: new Date(2024, 4, 15),
      },
    ],
  },
  {
    id: "2",
    name: "Implementación de Plataforma de E-Commerce",
    startDate: new Date(2024, 2, 1),
    endDate: new Date(2024, 8, 30),
    tasks: [
      {
        name: "Configuración del entorno de desarrollo",
        startDate: new Date(2024, 2, 5),
        endDate: new Date(2024, 2, 10),
      },
      {
        name: "Desarrollo de la interfaz de usuario",
        startDate: new Date(2024, 3, 1),
        endDate: new Date(2024, 5, 15),
      },
      {
        name: "Integración con pasarelas de pago",
        startDate: new Date(2024, 5, 20),
        endDate: new Date(2024, 7, 10),
      },
      {
        name: "Optimización para SEO",
        startDate: new Date(2024, 7, 15),
        endDate: new Date(2024, 8, 10),
      },
      {
        name: "Despliegue y monitorización",
        startDate: new Date(2024, 8, 15),
        endDate: new Date(2024, 8, 30),
      },
    ],
  },
  {
    id: "3",
    name: "Rediseño del Portal Corporativo",
    startDate: new Date(2024, 5, 1),
    endDate: new Date(2024, 11, 15),
    tasks: [
      {
        name: "Análisis de la arquitectura actual",
        startDate: new Date(2024, 5, 10),
        endDate: new Date(2024, 5, 20),
      },
      {
        name: "Prototipo de diseño de interfaz",
        startDate: new Date(2024, 6, 1),
        endDate: new Date(2024, 7, 15),
      },
      {
        name: "Desarrollo de nuevas funcionalidades",
        startDate: new Date(2024, 7, 20),
        endDate: new Date(2024, 9, 5),
      },
      {
        name: "Pruebas de integración",
        startDate: new Date(2024, 10, 1),
        endDate: new Date(2024, 10, 15),
      },
    ],
  },
  {
    id: "4",
    name: "Actualización del Sistema de Gestión de Recursos Humanos",
    startDate: new Date(2024, 7, 1),
    endDate: new Date(2024, 12, 31),
    tasks: [
      {
        name: "Revisión de requisitos legales",
        startDate: new Date(2024, 7, 5),
        endDate: new Date(2024, 7, 15),
      },
      {
        name: "Desarrollo de módulos de informes",
        startDate: new Date(2024, 8, 1),
        endDate: new Date(2024, 10, 30),
      },
      {
        name: "Implementación de nuevas políticas",
        startDate: new Date(2024, 11, 1),
        endDate: new Date(2024, 11, 15),
      },
      {
        name: "Capacitación del personal",
        startDate: new Date(2024, 12, 1),
        endDate: new Date(2024, 12, 20),
      },
    ],
  },
];
