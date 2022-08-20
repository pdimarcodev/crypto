export const getOptions = (type: any) =>
  (Object.keys(type) as (keyof typeof type)[]).map(key => ({
    label: key,
    value: key,
  }));
