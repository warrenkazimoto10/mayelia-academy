const MONTHS_FR = [
  "janvier", "février", "mars", "avril", "mai", "juin",
  "juillet", "août", "septembre", "octobre", "novembre", "décembre",
];

export function formatFrenchDate(date: Date): string {
  return `${date.getDate()} ${MONTHS_FR[date.getMonth()]} ${date.getFullYear()}`;
}

/**
 * Reproduces the exact phrasing used on the certificate template:
 * - same day: "30 mai 2026"
 * - same month/year: "27 au 29 mai 2026"
 * - different month/year: "27 mai 2026 au 3 juin 2026"
 */
export function formatPeriod(start: Date, end: Date): string {
  const sameDay = start.toDateString() === end.toDateString();
  if (sameDay) return formatFrenchDate(start);

  const sameMonthYear =
    start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear();

  if (sameMonthYear) {
    return `${start.getDate()} au ${end.getDate()} ${MONTHS_FR[end.getMonth()]} ${end.getFullYear()}`;
  }

  return `${formatFrenchDate(start)} au ${formatFrenchDate(end)}`;
}
