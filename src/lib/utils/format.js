import { format } from "date-fns";

export function formatDateLabel(dateValue) {
  return format(new Date(dateValue), "dd MMM yyyy");
}

export function toIsoDate(date) {
  return date.toISOString().split("T")[0];
}

export function buildCanonicalUrl(pathname = "/") {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://www.telukbatik.com.my";
  return new URL(pathname, base).toString();
}
