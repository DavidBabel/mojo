export function whereQueryId(objectId?: string) {
  return {
    skip: !objectId,
    variables: { where: { id: { equals: objectId } } },
  };
}

export function whereMutationId(objectId?: string) {
  return {
    variables: { where: { id: objectId } },
  };
}
