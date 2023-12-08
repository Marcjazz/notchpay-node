export type NotchPayCallback = (
  eventId: string,
  data: T
) => Promise<void> | void
