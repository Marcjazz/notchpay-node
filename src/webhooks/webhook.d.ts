export type NotchPayCallback<T> = (
  eventId: string,
  data: T
) => Promise<void> | void
