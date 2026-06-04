const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://127.0.0.1:5000'

export type HelloResponse = {
  message: string
}

export async function fetchHello(): Promise<HelloResponse> {
  const response = await fetch(`${API_BASE}/api/hello`)
  console.log(response);

  if (!response.ok) {
    throw new Error(`Hello request failed: ${response.status}`)
  }

  return response.json()
}
