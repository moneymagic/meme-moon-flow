
import { Rank } from './CommissionTypes';

/**
 * Maps rank to maximum commission percentage based on the MemeMoon Flow system
 */
export const rankCommissionPercentages: Record<Rank, number> = {
  'V1': 2,
  'V2': 4,
  'V3': 6,
  'V4': 8,
  'V5': 12,
  'V6': 14,
  'V7': 16,
  'V8': 20,
};

/**
 * Returns the minimum rank required to receive a specific rank's commission
 */
export function getMinimumRankRequired(rank: Rank): Rank {
  return rank;
}

/**
 * Convert string rank to numeric value for comparison
 */
export function rankToNumber(rank: Rank | null): number {
  if (!rank) return 0;
  return parseInt(rank.substring(1), 10);
}

/**
 * Check if a rank qualifies for a specific commission level
 */
export function isRankQualified(userRank: Rank | null, requiredRank: Rank): boolean {
  if (!userRank) return false;
  return rankToNumber(userRank) >= rankToNumber(requiredRank);
}

/**
 * Get the maximum percentage for a given rank
 */
export function getMaxPercentageForRank(rank: Rank | null): number {
  if (!rank) return 0;
  return rankCommissionPercentages[rank];
}
