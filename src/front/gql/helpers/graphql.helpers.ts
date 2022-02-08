/**
 * Transform an Antd form values object into a GraphQL Update {set: value} object
 */
export function objectToGraphqlSet(object: any) {
  return Object.keys(object).reduce((acc, key) => {
    if (object[key]) {
      acc[key] = { set: object[key] };
    }
    return acc;
  }, {} as any);
}
