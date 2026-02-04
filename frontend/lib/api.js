export async function fetchReports() {
  const response = await fetch('/api/reports');
  if (!response.ok) {
    throw new Error('Failed to load reports');
  }
  return response.json();
}
