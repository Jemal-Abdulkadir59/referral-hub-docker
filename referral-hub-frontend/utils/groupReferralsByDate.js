export function groupReferralsByDate(referrals) {
  const counts = {}

  referrals?.forEach(referral => {
    const dateOnly = new Date(referral?.referralDate).toISOString().split('T')[0]

    if (counts[dateOnly]) {
      counts[dateOnly]++
    } else {
      counts[dateOnly] = 1
    }
  })

  // Convert object to array for chart
  return Object.entries(counts)?.map(([date, referrals]) => ({ date, referrals }))
}
