import httpClient from "../http-client"

/**
 * Función para obtener ciudades desde el servidor.
 * @param params Parámetros opcionales para búsqueda/paginación.
 * @param signal Señal para abortar la solicitud si es necesario.
 * @returns Una promesa que resuelve con los datos de las ciudades.
 */
export async function getCities(
  params?: { search?: string; page?: number; limit?: number },
  signal?: AbortSignal,
) {
  try {
    const response = await httpClient.get("/cities", {
      params,
      signal,
    })
    return response.data
  } catch (error) {
    console.error("Error fetching cities:", error)
    throw error
  }
}
