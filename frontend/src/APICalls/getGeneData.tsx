import type { Gene } from '../contexts/DataContext'

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://127.0.0.1:5000'

export async function getGene(gene: string): Promise<Gene[]> {
  const params = new URLSearchParams({ gene })
  const response = await fetch(`${API_BASE}/api/get_genes?${params}`)

  if (!response.ok) {
    throw new Error(`Get gene request failed: ${response.status}`)
  }

  return response.json()
}
