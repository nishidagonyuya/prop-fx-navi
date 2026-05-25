const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

export const url = (path: string): string => {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${BASE}${p}`;
};
