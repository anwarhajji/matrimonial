// utils/matchCalculator.ts

export function generateFixedMatchPercentage(
  user1Id: string,
  user2Id: string
): number {
  // Combine the two user IDs
  const combinedId = user1Id < user2Id ? user1Id + user2Id : user2Id + user1Id

  // Create a hash of the combined ID
  let hash = 0
  for (let i = 0; i < combinedId.length; i++) {
    const char = combinedId.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32-bit integer
  }

  // Use the hash to generate a percentage between 60 and 95
  const percentage = 60 + (Math.abs(hash) % 36)

  return percentage
}
