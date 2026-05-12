import type { FlightSummary } from '../types/flightSummary'

const mockFlights: Record<string, FlightSummary> = {
  KE023: {
    flightNumber: 'KE023',
    route: {
      origin: 'Seoul/Incheon',
      destination: 'San Francisco',
    },
    status: 'on_time',
    departureTime: '2026-12-31T09:00:00+09:00',
    estimatedArrival: '2026-12-31T20:05:00-08:00',
    arrivalTerminal: 'International Terminal',
    baggageClaim: 'Carousel 4',
    lastUpdated: '2026-12-31T18:42:00-08:00',
    flightAwareUrl: 'https://www.flightaware.com/live/flight/KAL23',
  },
}

function normalizeFlightNumber(flightNumber: string) {
  return flightNumber.trim().toUpperCase()
}

export async function fetchFlightSummary(
  flightNumber: string,
): Promise<FlightSummary | null> {
  const normalizedFlightNumber = normalizeFlightNumber(flightNumber)
  const flight = mockFlights[normalizedFlightNumber]

  if (!flight) {
    return null
  }

  return { ...flight }
}
