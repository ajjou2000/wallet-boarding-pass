import { useEffect } from 'react'
import type { ShareOption, ShareOptionId } from '../utils/shareFlightStatus'

type ShareBottomSheetProps = {
  open: boolean
  options: ShareOption[]
  onClose: () => void
  onSelect: (optionId: ShareOptionId) => void
}

function ShareOptionButton({
  option,
  onSelect,
}: {
  option: ShareOption
  onSelect: (optionId: ShareOptionId) => void
}) {
  return (
    <button
      type="button"
      onClick={() => {
        onSelect(option.id)
      }}
      className="w-full rounded-2xl border border-black/6 bg-[#f7f7f7] px-4 py-4 text-left transition-colors hover:bg-[#efefef] active:bg-[#e8e8e8]"
    >
      <p className="text-base font-semibold text-black">{option.title}</p>
      <p className="mt-2 text-sm leading-6 text-black/60">{option.description}</p>
      <p className="mt-3 truncate text-xs font-medium text-[#003399]">
        {option.link}
      </p>
    </button>
  )
}

export default function ShareBottomSheet({
  open,
  options,
  onClose,
  onSelect,
}: ShareBottomSheetProps) {
  useEffect(() => {
    if (!open) {
      return
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, onClose])

  if (!open) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <button
        type="button"
        aria-label="공유 옵션 닫기"
        className="absolute inset-0 bg-black/45"
        onClick={onClose}
      />

      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="share-sheet-title"
        className="relative w-full max-w-[390px] rounded-t-[1.75rem] bg-white px-4 pb-6 pt-3 shadow-[0_-12px_40px_rgba(0,0,0,0.18)]"
      >
        <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-black/12" />

        <div className="mb-4 flex items-center justify-between">
          <h2 id="share-sheet-title" className="text-lg font-bold text-black">
            공유 방법 선택
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full px-3 py-1 text-sm font-medium text-black/55 transition-colors hover:bg-black/5"
          >
            닫기
          </button>
        </div>

        <div className="space-y-3">
          {options.map((option) => (
            <ShareOptionButton
              key={option.id}
              option={option}
              onSelect={onSelect}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
