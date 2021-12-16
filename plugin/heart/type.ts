
export interface ServiceCallback {
  (event: Event): void
}

export interface ServiceEvent {
  // [key: string]: unknown
  // eventname: Record<string, unknown>
  evName: string
  evCallBack: ServiceCallback
}
