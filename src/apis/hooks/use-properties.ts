/**
 * Hooks personalizados para gestionar operaciones de propiedades usando TanStack Query.
 * Incluyen manejo de debouncing, cancelación de peticiones, paginación, y error handling.
 */

import { useState, useEffect } from "react"
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryFunctionContext,
  UseQueryOptions,
} from "@tanstack/react-query"
import propertyRepository, { GetPropertiesParams } from "../repositories/property.repository"
import { PropertyDTO } from "../../core/models/interfaces/property-model"

// ─── Hook de Debounce ────────────────────────────────────────────────────────────

/**
 * Hook para debouncing de un valor.
 * Esto es útil para estabilizar entradas de búsqueda y evitar llamadas excesivas a la API.
 * @param value Valor que se desea debounced.
 * @param delay Tiempo de retardo en milisegundos.
 * @returns El valor debounced.
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    // Configura un timeout para actualizar el valor después del delay.
    const handler = setTimeout(() => setDebouncedValue(value), delay)
    // Limpia el timeout si el valor o el delay cambia o si el componente se desmonta.
    return () => clearTimeout(handler)
  }, [value, delay])

  return debouncedValue
}

// ─── Tipos para parámetros de consulta ─────────────────────────────────────────────

// ─── Hook para obtener la lista de propiedades ───────────────────────────────────

/**
 * Hook para obtener la lista de propiedades.
 * Aplica debouncing al parámetro de búsqueda y utiliza el signal de TanStack Query para cancelar peticiones.
 * @param params Parámetros opcionales para paginación y búsqueda.
 * @returns Objeto resultante de useQuery con datos, estado de carga y errores.
 */
export function useProperties(params: GetPropertiesParams = {}) {
  // Se debouncean los cambios en el parámetro de búsqueda para evitar llamadas innecesarias
  const debouncedSearch = useDebounce(params.search ?? "", 300)
  // Se combinan los parámetros originales con el valor debounced
  const effectiveParams: GetPropertiesParams = {
    ...params,
    search: debouncedSearch,
  }

  // Definición explícita de las opciones para useQuery
  const options: UseQueryOptions<
    PropertyDTO[], // Tipo de datos retornados por la consulta
    Error, // Tipo de error
    PropertyDTO[], // Tipo de datos después de alguna transformación (si se aplicase)
    [string, GetPropertiesParams] // Tipo de la queryKey
  > = {
    queryKey: ["properties", effectiveParams],
    // La función de consulta recibe el signal para cancelación
    queryFn: async ({
      signal,
    }: QueryFunctionContext<[string, GetPropertiesParams]>) => {
      return propertyRepository.getProperties(effectiveParams, signal)
    },
    staleTime: 1000 * 60 * 5,
  }

  return useQuery(options)
}

/**
 * Hook para obtener propiedades de forma imperativa usando mutation.
 * Permite múltiples llamadas con diferentes filtros y paginación.
 */
export function usePropertiesMutation() {
  return useMutation<PropertyDTO[], Error, GetPropertiesParams>({
    mutationFn: async (params: GetPropertiesParams) => {
      const controller = new AbortController()
      return await propertyRepository.getProperties(params, controller.signal)
    },
  })
}
// ─── Hook para obtener una propiedad por ID ─────────────────────────────────────────

/**
 * Hook para obtener una propiedad específica dado su ID.
 * La consulta solo se activa si el ID es válido.
 * @param id Identificador de la propiedad.
 * @returns Objeto resultante de useQuery con el dato, estado y error.
 */
export function usePropertyById(id: number) {
  const options: UseQueryOptions<
    PropertyDTO, // Tipo de datos retornados
    Error, // Tipo de error
    PropertyDTO, // Tipo de datos después de transformación
    [string, number] // Tipo de la queryKey
  > = {
    queryKey: ["property", id],
    queryFn: async ({ signal }: QueryFunctionContext<[string, number]>) => {
      return propertyRepository.getPropertyById(id, signal)
    },
    staleTime: 1000 * 60 * 5, // Datos frescos por 5 minutos
    enabled: !!id, // Solo se ejecuta si id es un valor válido (truthy)
    // onError: (error: Error) => {
    //   console.error(
    //     "Error al obtener propiedad:",
    //     (error as any)?.response?.status,
    //     (error as any)?.response?.data,
    //   )
    // },
  }

  return useQuery(options)
}

// ─── Hook para crear una propiedad ───────────────────────────────────────────────

/**
 * Hook para crear una nueva propiedad.
 * Utiliza useMutation para gestionar la operación y actualiza el cache de propiedades al éxito.
 * @returns Objeto de la mutación con funciones y estados.
 */
export function useCreateProperty() {
  const queryClient = useQueryClient() // Se obtiene el queryClient para invalidar el cache
  return useMutation({
    mutationFn: propertyRepository.createProperty,
    onSuccess: () => {
      // Invalida la query de propiedades para que se refresquen los datos al crearse una nueva propiedad.
      queryClient.invalidateQueries({ queryKey: ["properties"] })
    },
    onError: (error: Error) => {
      console.error(
        "Error al crear propiedad:",
        (error as any)?.response?.status,
        (error as any)?.response?.data,
      )
    },
  })
}

/**
 * Hook para crear una nueva propiedad utilizando FormData.
 * Utiliza useMutation para gestionar la operación y actualiza el cache de propiedades al éxito.
 * @returns Objeto de la mutación con funciones y estados.
 */
export function useCreatePropertyFromFormData() {
  const queryClient = useQueryClient() // Se obtiene el queryClient para invalidar el cache
  return useMutation({
    mutationFn: async (formData: FormData) => {
      return propertyRepository.createPropertyFromFormData(formData)
    },
    onSuccess: () => {
      // Invalida la query de propiedades para que se refresquen los datos al crearse una nueva propiedad.
      queryClient.invalidateQueries({ queryKey: ["properties"] })
    },
    onError: (error: Error) => {
      console.error(
        "Error al crear propiedad desde FormData:",
        (error as any)?.response?.status,
        (error as any)?.response?.data,
      )
    },
  })
}
