/**
 * Repository para gestionar las operaciones CRUD de propiedades.
 * Utiliza una instancia de Axios preconfigurada para realizar las peticiones HTTP.
 */

import { MessageResponsedDTO } from "../../core/models/interfaces/general-model"
import { PropertyDTO } from "../../core/models/interfaces/property-model"
import httpClient from "../http-client" // Importa el cliente HTTP (Axios) con configuración global

// Interfaz para definir los parámetros de consulta: paginación y búsqueda
export interface GetPropertiesParams {
  page?: number
  size?: number
  search?: string
  filter?: Record<string, any>
}

class PropertyRepository {
  /**
   * Obtiene una lista de propiedades con parámetros opcionales de paginación y búsqueda.
   * @param params Parámetros de consulta.
   * @param signal Opcional: AbortSignal para cancelar la petición si es necesario.
   * @returns Promesa que resuelve en un arreglo de PropertyDTO.
   */
  async getProperties(
    params: GetPropertiesParams = {},
    signal?: AbortSignal,
  ): Promise<PropertyDTO[]> {
    const response = await httpClient.get(`/properties`, {
      params, // Envía los parámetros en la query
      signal, // Permite la cancelación de la petición mediante AbortController
    })
    return response.data // Retorna los datos de la respuesta
  }

  /**
   * Obtiene una propiedad específica por su ID.
   * @param id Identificador único de la propiedad.
   * @param signal Opcional: AbortSignal para cancelar la petición.
   * @returns Promesa que resuelve en un objeto PropertyDTO.
   */
  async getPropertyById(
    id: number,
    signal?: AbortSignal,
  ): Promise<PropertyDTO> {
    const response = await httpClient.get(`/properties/${id}`, { signal })
    return response.data
  }

  /**
   * Crea una nueva propiedad.
   * @param property Objeto parcial con la información de la propiedad a crear.
   * @returns Promesa que resuelve en el PropertyDTO creado.
   */
  async createProperty(property: Partial<PropertyDTO>): Promise<PropertyDTO> {
    const response = await httpClient.post("/properties", property)
    return response.data
  }

  /**
   * Actualiza una propiedad existente.
   * @param id Identificador de la propiedad a actualizar.
   * @param property Objeto parcial con los campos a actualizar.
   * @returns Promesa que resuelve en el PropertyDTO actualizado.
   */
  async updateProperty(
    id: number,
    property: Partial<PropertyDTO>,
  ): Promise<PropertyDTO> {
    const response = await httpClient.patch(`/properties/${id}`, property)
    return response.data
  }

  /**
   * Elimina una propiedad por su ID.
   * @param id Identificador de la propiedad a eliminar.
   * @returns Promesa que se resuelve cuando la eliminación se completa.
   */
  async deleteProperty(id: number): Promise<void> {
    await httpClient.delete(`/properties/${id}`)
  }
  /**
   * Crea una nueva propiedad utilizando FormData.
   * @param formData Objeto FormData con la información de la propiedad a crear.
   * @returns Promesa que resuelve en el PropertyDTO creado.
   */
  async createPropertyFromFormData(
    formData: FormData,
  ): Promise<MessageResponsedDTO> {
    const response = await httpClient.post("/properties", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return response.data
  }
}

// Se exporta una instancia singleton del repositorio para usar en toda la aplicación.
export default new PropertyRepository()
