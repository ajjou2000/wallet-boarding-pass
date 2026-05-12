import { useEffect, useState } from 'react'
import { Plane } from 'lucide-react'
import Toast from './Toast'
import { shareFlightStatus } from '../utils/shareFlightStatus'

const flightDetails = [
  { label: '편명', value: 'SE701' },
  { label: '터미널', value: '1' },
  { label: '탑승구', value: '1' },
  { label: '탑승순서', value: '-' },
  { label: '좌석', value: '2A' },
] as const

const qrPattern = [
  '11100111',
  '10101010',
  '11100111',
  '00011100',
  '11010011',
  '10111010',
  '11100011',
  '10010111',
]

function QrCodePlaceholder() {
  return (
    <div
      aria-hidden="true"
      className="mx-auto w-[min(100%,13.5rem)] rounded-[1.1rem] bg-white px-4 py-2"
    >
      <div className="grid grid-cols-8 gap-[2px]">
        {qrPattern.flatMap((row, rowIndex) =>
          row.split('').map((cell, columnIndex) => (
            <span
              key={`${rowIndex}-${columnIndex}`}
              className={`aspect-square rounded-[1px] ${cell === '1' ? 'bg-black' : 'bg-white'}`}
            />
          )),
        )}
      </div>
    </div>
  )
}

export default function BoardingPassCard() {
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  useEffect(() => {
    if (!toastMessage) {
      return
    }

    const timeoutId = window.setTimeout(() => {
      setToastMessage(null)
    }, 2500)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [toastMessage])

  const handleShare = async () => {
    try {
      const result = await shareFlightStatus()

      if (result === 'copied') {
        setToastMessage('링크가 복사되었습니다.')
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return
      }
    }
  }

  return (
    <>
      <article className="w-full rounded-[1.75rem] bg-[#003399] px-5 pb-3 pt-5 text-white shadow-[0_18px_40px_rgba(0,0,0,0.18)]">
      <div className="grid grid-cols-[1fr_auto_1fr] items-start gap-3">
        <div>
          <p className="text-[0.62rem] font-medium tracking-[0.08em] text-white/85">
            SEOUL/INCHEON
          </p>
          <p className="mt-1 text-[2.35rem] font-bold leading-none tracking-tight">
            ICN
          </p>
        </div>

        <div className="flex min-w-[4.75rem] flex-col items-center justify-center pt-6">
          <div className="flex w-full items-center gap-1">
            <span className="h-px flex-1 border-t border-dotted border-white/80" />
            <Plane
              className="h-4 w-4 shrink-0 -rotate-45 text-white"
              strokeWidth={2.2}
            />
            <span className="h-px flex-1 border-t border-dotted border-white/80" />
          </div>
        </div>

        <div className="text-right">
          <p className="text-[0.62rem] font-medium tracking-[0.08em] text-white/85">
            SAN FRANCISCO
          </p>
          <p className="mt-1 text-[2.35rem] font-bold leading-none tracking-tight">
            SFO
          </p>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-[1fr_auto_1fr] gap-3">
        <p className="text-[0.82rem] font-medium text-white/95">
          12월 31일 / 오전 9:00
        </p>
        <span />
        <p className="text-right text-[0.82rem] font-medium text-white/95">
          12월 31일 / 오후 8:00
        </p>
      </div>

      <p className="mt-4 text-[1.05rem] font-semibold tracking-tight">
        Mr. Taehyuk Kim
      </p>

      <div className="mt-5 grid grid-cols-5 gap-2">
        {flightDetails.map((detail) => (
          <div key={detail.label} className="min-w-0 text-center">
            <p className="text-[0.62rem] font-medium text-white/70">
              {detail.label}
            </p>
            <p className="mt-1 text-[0.95rem] font-bold leading-none">
              {detail.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-5 flex gap-2">
        <button
          type="button"
          className="flex-1 rounded-full bg-white/18 px-3 py-3 text-[0.95rem] font-semibold text-white transition-colors hover:bg-white/24"
        >
          수하물 위치 확인
        </button>
        <button
          type="button"
          onClick={() => {
            void handleShare()
          }}
          className="flex-1 rounded-full bg-white/18 px-3 py-3 text-[0.95rem] font-semibold text-white transition-colors hover:bg-white/24"
        >
          공유 하기
        </button>
      </div>

      <div className="mt-4">
        <QrCodePlaceholder />
      </div>
      </article>

      {toastMessage ? <Toast message={toastMessage} /> : null}
    </>
  )
}
