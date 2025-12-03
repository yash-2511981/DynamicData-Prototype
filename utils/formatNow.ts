export const formatNow = () =>
  new Intl.DateTimeFormat("en", {
    hour: "numeric",
    minute: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date());
