import type { Patient } from '../contexts/DataContext'

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://127.0.0.1:5000'

export async function getPatientData(patient: string): Promise<Patient[]> {
  const params = new URLSearchParams({ patient })
  const response = await fetch(`${API_BASE}/api/get_patients?${params}`)

  if (!response.ok) {
    throw new Error(`Get patient request failed: ${response.status}`)
  }

  return response.json()
}
