import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Plane } from 'lucide-react'
import { fetchFlightSummary } from '../services/flightSummaryService'
import type { FlightSummary } from '../types/flightSummary'
import {
  formatFlightDateTime,
  formatLastUpdated,
  getFlightStatusLabel,
  getFlightStatusStyle,
} from '../utils/flightDisplay'

type SummaryField = {
  label: string
  value: string
}

function SummaryRow({ label, value }: SummaryField) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-black/5 py-4 last:border-b-0">
      <span className="text-sm text-black/55">{label}</span>
      <span className="max-w-[60%] text-right text-sm font-semibold text-black">
        {value}
      </span>
    </div>
  )
}

function FlightSummaryCard({ flight }: { flight: FlightSummary }) {
  const summaryFields: SummaryField[] = [
    { label: '출발 시간', value: formatFlightDateTime(flight.departureTime) },
    {
      label: '도착 예정',
      value: formatFlightDateTime(flight.estimatedArrival),
    },
    {
      label: '도착 터미널',
      value: flight.arrivalTerminal ?? '아직 확인되지 않았어요',
    },
    {
      label: '수하물 벨트',
      value: flight.baggageClaim ?? '아직 확인되지 않았어요',
    },
  ]

  return (
    <article className="overflow-hidden rounded-[1.75rem] bg-white shadow-[0_18px_40px_rgba(0,0,0,0.08)]">
      <div className="bg-[#003399] px-5 pb-6 pt-5 text-white">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm text-white/75">항공편</p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight">
              {flight.flightNumber}
            </h1>
          </div>
          <span
            className={`rounded-full px-3 py-1 text-sm font-semibold ${getFlightStatusStyle(flight.status)}`}
          >
            {getFlightStatusLabel(flight.status)}
          </span>
        </div>

        <div className="mt-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.08em] text-white/75">
              {flight.route.origin}
            </p>
          </div>
          <Plane className="h-5 w-5 -rotate-45 text-white" strokeWidth={2.2} />
          <div className="text-right">
            <p className="text-xs uppercase tracking-[0.08em] text-white/75">
              {flight.route.destination}
            </p>
          </div>
        </div>
      </div>

      <div className="px-5">
        {summaryFields.map((field) => (
          <SummaryRow key={field.label} {...field} />
        ))}
      </div>

      <div className="border-t border-black/5 px-5 py-4 text-center text-xs text-black/45">
        마지막 업데이트 {formatLastUpdated(flight.lastUpdated)}
      </div>
    </article>
  )
}

export default function FlightSummaryPage() {
  const { flightNumber } = useParams()
  const [flight, setFlight] = useState<FlightSummary | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!flightNumber) {
      setFlight(null)
      setIsLoading(false)
      return
    }

    let isActive = true

    fetchFlightSummary(flightNumber)
      .then((summary) => {
        if (isActive) {
          setFlight(summary)
        }
      })
      .finally(() => {
        if (isActive) {
          setIsLoading(false)
        }
      })

    return () => {
      isActive = false
    }
  }, [flightNumber])

  return (
    <div className="mx-auto min-h-svh w-full max-w-[390px] bg-[#f2f2f2] px-4 py-6 text-black">
      <header className="mb-5">
        <Link
          to="/"
          className="text-sm font-medium text-black/55 transition-colors hover:text-black"
        >
          돌아가기
        </Link>
        <h2 className="mt-3 text-2xl font-bold tracking-tight">항공편 안내</h2>
        <p className="mt-2 text-sm leading-6 text-black/60">
          가족이나 마중 나오는 분이 빠르게 확인할 수 있도록 필요한 정보만
          보여드려요.
        </p>
      </header>

      {isLoading ? (
        <p className="rounded-[1.75rem] bg-white px-5 py-8 text-center text-sm text-black/55 shadow-[0_18px_40px_rgba(0,0,0,0.08)]">
          항공편 정보를 불러오는 중이에요.
        </p>
      ) : null}

      {!isLoading && !flight ? (
        <p className="rounded-[1.75rem] bg-white px-5 py-8 text-center text-sm text-black/55 shadow-[0_18px_40px_rgba(0,0,0,0.08)]">
          요청하신 항공편 정보를 찾지 못했어요.
        </p>
      ) : null}

      {!isLoading && flight ? (
        <div className="space-y-4">
          <FlightSummaryCard flight={flight} />
          <a
            href={flight.flightAwareUrl}
            target="_blank"
            rel="noreferrer"
            className="block rounded-full border border-[#003399]/15 bg-white px-4 py-3 text-center text-sm font-semibold text-[#003399] transition-colors hover:bg-[#003399]/5"
          >
            FlightAware에서 상세 보기
          </a>
        </div>
      ) : null}
    </div>
  )
}
