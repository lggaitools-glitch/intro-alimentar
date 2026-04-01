export function calculateAgeInMonths(dob: string): number {
  const birth = new Date(dob);
  const now = new Date();
  const months = (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth());
  const dayDiff = now.getDate() - birth.getDate();
  return dayDiff < 0 ? months - 1 : months;
}

export function calculateAgeInWeeks(dob: string): number {
  const birth = new Date(dob);
  const now = new Date();
  const diff = now.getTime() - birth.getTime();
  return Math.floor(diff / (7 * 24 * 60 * 60 * 1000));
}

export function calculateWeekOfIntroduction(startDate: string): number {
  const start = new Date(startDate);
  const now = new Date();
  const diff = now.getTime() - start.getTime();
  return Math.max(1, Math.floor(diff / (7 * 24 * 60 * 60 * 1000)) + 1);
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
