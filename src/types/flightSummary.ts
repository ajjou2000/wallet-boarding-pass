export type FlightStatus = 'on_time' | 'delayed' | 'arrived'

export type FlightSummary = {
  flightNumber: string
  route: {
    origin: string
    destination: string
  }
  status: FlightStatus
  estimatedArrival: string
  departureTime: string
  arrivalTerminal: string | null
  baggageClaim: string | null
  lastUpdated: string
  flightAwareUrl: string
}
