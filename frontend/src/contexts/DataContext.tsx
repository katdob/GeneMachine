import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from 'react'

export type Patient = {
  patient_id: string
  first_name: string
  last_name: string
  gender: string
  street_address: string
  city: string
  state: string
  zip_code: string
  phone: string
}

export type Gene = {
  patient_id: string
  gene: string
}

export type Diagnosis = {
  patient_id: string
  diagnosis: string
}

type DataContextValue = {
  patientData: Patient[]
  geneData: Gene[]
  diagnosisData: Diagnosis[]
  setPatientData: Dispatch<SetStateAction<Patient[]>>
  setGeneData: Dispatch<SetStateAction<Gene[]>>
  setDiagnosisData: Dispatch<SetStateAction<Diagnosis[]>>
}

const DataContext = createContext<DataContextValue | undefined>(undefined)

type DataProviderProps = {
  children: ReactNode
}

export function DataProvider({ children }: DataProviderProps) {
  const [patientData, setPatientData] = useState<Patient[]>([])
  const [geneData, setGeneData] = useState<Gene[]>([])
  const [diagnosisData, setDiagnosisData] = useState<Diagnosis[]>([])

  return (
    <DataContext.Provider
      value={{
        patientData,
        geneData,
        diagnosisData,
        setPatientData,
        setGeneData,
        setDiagnosisData,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const context = useContext(DataContext)

  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider')
  }

  return context
}
