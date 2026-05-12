const FLIGHT_SHARE_URL = 'https://www.flightaware.com/live/flight/KAL1234'

const sharePayload = {
  title: 'KE1234 실시간 항공편 현황',
  text: 'KE1234 항공편의 실시간 운항 현황을 확인하세요.',
  url: FLIGHT_SHARE_URL,
} as const

export type ShareFlightResult = 'shared' | 'copied'

function canUseWebShare() {
  return typeof navigator !== 'undefined' && typeof navigator.share === 'function'
}

async function copyShareUrl() {
  await navigator.clipboard.writeText(FLIGHT_SHARE_URL)
}

export async function shareFlightStatus(): Promise<ShareFlightResult> {
  if (canUseWebShare()) {
    await navigator.share({ ...sharePayload })
    return 'shared'
  }

  await copyShareUrl()
  return 'copied'
}
