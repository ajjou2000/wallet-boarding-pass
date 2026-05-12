import type { FlightStatus } from '../types/flightSummary'

const statusLabels: Record<FlightStatus, string> = {
  on_time: '정시',
  delayed: '지연',
  arrived: '도착',
}

const statusStyles: Record<FlightStatus, string> = {
  on_time: 'bg-emerald-100 text-emerald-800',
  delayed: 'bg-amber-100 text-amber-900',
  arrived: 'bg-sky-100 text-sky-900',
}

export function getFlightStatusLabel(status: FlightStatus) {
  return statusLabels[status]
}

export function getFlightStatusStyle(status: FlightStatus) {
  return statusStyles[status]
}

export function formatFlightDateTime(value: string) {
  return new Intl.DateTimeFormat('ko-KR', {
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(new Date(value))
}

export function formatLastUpdated(value: string) {
  return new Intl.DateTimeFormat('ko-KR', {
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(new Date(value))
}
