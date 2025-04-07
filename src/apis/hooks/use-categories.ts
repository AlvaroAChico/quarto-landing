import { useQuery } from "@tanstack/react-query"
import { getCategories } from "../repositories/category.repository"

/**
 * Hook personalizado para obtener ciudades usando React Query.
 * Soporta parámetros opcionales para búsqueda/paginación.
 * Utiliza la señal AbortSignal proporcionada por React Query para cancelar la petición si el componente se desmonta
 * o la consulta se invalida&#8203;:contentReference[oaicite:0]{index=0}.
 */
export function useCategories(params?: {
  search?: string
  page?: number
  limit?: number
}) {
  // useQuery ejecutará la petición al montarse el componente que use este hook.
  // queryKey incluye 'categories' y los parámetros, de forma que los datos se almacenan en caché diferenciados por estos valores.
  return useQuery({
    queryKey: ["categories", params],
    queryFn: ({ signal }) => getCategories(params, signal),
    // TanStack Query provee un AbortSignal automáticamente a la función queryFn,
    // por lo que `getCategories` recibirá esa señal y cancelará la solicitud si la query se aborta.
  })
}
