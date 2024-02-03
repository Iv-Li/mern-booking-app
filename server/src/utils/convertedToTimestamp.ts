export const convertedToTimestamp = (date: string | Date): number => {
  return new Date(date).getTime()
}