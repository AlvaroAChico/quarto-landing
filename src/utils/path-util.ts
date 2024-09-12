export const routeWithReplaceId = (route: string, id: string) =>
  route.replace(":id", id.toString())

export const routeWithCustomReplace = (route: string, params: [string, string][]) => {
  params.forEach(([key, value]) => {
    route = route.replace(`:${key}`, value);
  });
  return route;
};