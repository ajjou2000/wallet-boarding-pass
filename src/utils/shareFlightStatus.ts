export type ShareOptionId = 'detailed' | 'summary'

export type ShareOption = {
  id: ShareOptionId
  title: string
  description: string
  link: string
  message: string
}

const DETAILED_FLIGHT_AWARE_URL =
  'https://www.flightaware.com/live/flight/KAL23'
const SUMMARY_PAGE_URL = 'https://your-demo-domain.com/flight/KE023'

export const shareOptions: ShareOption[] = [
  {
    id: 'detailed',
    title: '실시간 상세 정보 공유',
    description:
      'FlightAware에서 항공편의 상세 운항 정보를 확인할 수 있는 링크를 공유합니다.',
    link: DETAILED_FLIGHT_AWARE_URL,
    message: `[실시간 항공편 정보]
KE023 인천 → 샌프란시스코
상세 운항 현황:
${DETAILED_FLIGHT_AWARE_URL}`,
  },
  {
    id: 'summary',
    title: '간단한 도착 현황 공유',
    description:
      '가족이나 픽업하는 사람이 보기 쉬운 Wallet-style 요약 페이지를 공유합니다.',
    link: SUMMARY_PAGE_URL,
    message: `[삼성월렛 항공편 공유]
KE023 인천 → 샌프란시스코
도착 예정 시간과 지연 여부를 확인하세요:
${SUMMARY_PAGE_URL}`,
  },
]

export type ShareFlightResult = 'shared' | 'copied'

function canUseWebShare() {
  return typeof navigator !== 'undefined' && typeof navigator.share === 'function'
}

function getShareOption(optionId: ShareOptionId) {
  const option = shareOptions.find((item) => item.id === optionId)

  if (!option) {
    throw new Error(`Unknown share option: ${optionId}`)
  }

  return option
}

async function copyShareMessage(message: string) {
  await navigator.clipboard.writeText(message)
}

export async function shareFlightMessage(
  optionId: ShareOptionId,
): Promise<ShareFlightResult> {
  const option = getShareOption(optionId)

  if (canUseWebShare()) {
    await navigator.share({
      title: option.title,
      text: option.message,
    })
    return 'shared'
  }

  await copyShareMessage(option.message)
  return 'copied'
}
