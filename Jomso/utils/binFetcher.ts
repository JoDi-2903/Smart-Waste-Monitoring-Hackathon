/** @format */

// utils/binFetcher.ts
export async function fetchBins() {
  const response = await fetch("https://yourdomain.com/mockBins.json"); // OR a GitHub raw link
  return await response.json();
}
