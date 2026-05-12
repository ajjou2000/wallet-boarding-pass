import {
  Barcode,
  Megaphone,
  MoreVertical,
  Plus,
  Tag,
} from 'lucide-react'
import BoardingPassCard from './BoardingPassCard'

const bottomNavItems = [
  { label: '혜택', active: false },
  { label: '빠른 실행', active: true },
  { label: '전체', active: false },
] as const

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-5 pt-2 text-[0.72rem] font-semibold text-black">
      <span>8:20</span>
      <div className="flex items-center gap-1.5">
        <span className="rounded-sm border border-black/70 px-1 py-0.5 text-[0.58rem] leading-none">
          U+
        </span>
        <span>5G</span>
        <span className="flex items-center gap-1">
          <span className="h-2.5 w-4 rounded-[2px] border border-black/70" />
          68%
        </span>
      </div>
    </div>
  )
}

function AndroidNavBar() {
  return (
    <div className="flex items-center justify-between px-10 pb-2 pt-1 text-black">
      <span className="text-lg leading-none">|||</span>
      <span className="h-4 w-4 rounded-sm border-2 border-black" />
      <span className="text-lg leading-none">‹</span>
    </div>
  )
}

export default function SamsungWalletScreen() {
  return (
    <div className="mx-auto flex min-h-svh w-full max-w-[390px] flex-col bg-[#f2f2f2] text-black">
      <StatusBar />

      <header className="flex items-center justify-between px-5 pb-3 pt-1">
        <h1 className="text-[1.35rem] font-bold tracking-tight">Samsung Wallet</h1>
        <div className="flex items-center gap-4">
          <button type="button" aria-label="추가" className="text-black">
            <Plus className="h-6 w-6" strokeWidth={2.2} />
          </button>
          <button
            type="button"
            aria-label="알림"
            className="relative text-black"
          >
            <Megaphone className="h-6 w-6" strokeWidth={2.2} />
            <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-[#f7941d]" />
          </button>
          <button type="button" aria-label="메뉴" className="text-black">
            <MoreVertical className="h-6 w-6" strokeWidth={2.2} />
          </button>
        </div>
      </header>

      <div className="flex min-h-0 flex-1 flex-col justify-center">
        <div className="flex flex-col">
          <div className="flex justify-end gap-3 px-5 pb-4 text-[0.78rem] font-medium text-black/80">
            <button type="button" className="flex items-center gap-1.5">
              <Tag className="h-4 w-4 text-[#f7941d]" strokeWidth={2.2} />
              <span>매장쿠폰</span>
            </button>
            <span className="text-black/20">|</span>
            <button type="button" className="flex items-center gap-1.5">
              <Barcode className="h-4 w-4 text-[#f06292]" strokeWidth={2.2} />
              <span>멤버십</span>
            </button>
          </div>

          <main className="px-4">
            <BoardingPassCard />
          </main>
        </div>
      </div>

      <nav className="border-t border-black/5 bg-[#f2f2f2] px-6 pb-1 pt-3">
        <div className="grid grid-cols-3 items-end gap-2">
          {bottomNavItems.map((item) => (
            <button
              key={item.label}
              type="button"
              className={`pb-2 text-center text-[0.95rem] ${
                item.active
                  ? 'font-bold text-black'
                  : 'font-medium text-black/45'
              }`}
            >
              {item.label}
              {item.active ? (
                <span className="mx-auto mt-2 block h-[3px] w-10 rounded-full bg-black" />
              ) : null}
            </button>
          ))}
        </div>
      </nav>

      <AndroidNavBar />
    </div>
  )
}
