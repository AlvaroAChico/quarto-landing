export const routeWithReplaceId = (route: string, id: string) =>
  route.replace(":id", id.toString())
