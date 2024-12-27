export interface MessageResponsedDTO {
  message: string
}

export interface IPaginatedRes<T> {
  currentPage: number
  data: T[]
  firstPageUrl: string
  from: string
  lastPage: number
  lastPageUrl: string
  links: LinksPaginated[]
  nextPageUrl: string
  path: string
  perPage: number
  prevPageUrl: string
  to: string
  total: number
}

export interface LinksPaginated {
  url: string
  label: string
  active: boolean
}

export interface IRequestPaginated {
  page: number
}
