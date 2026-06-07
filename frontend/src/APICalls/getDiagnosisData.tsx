const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://127.0.0.1:5000'

export type Diagnosis = {
  patient_id: string
  diagnosis: string
}

export async function getDiagnosisData(diagnosis: string): Promise<Diagnosis[]> {
  const params = new URLSearchParams({ diagnosis })
  const response = await fetch(`${API_BASE}/api/get_diagnosis?${params}`)

  if (!response.ok) {
    throw new Error(`Get diagnosis request failed: ${response.status}`)
  }

  return response.json()
}
