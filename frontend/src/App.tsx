import { useState } from 'react'
import { getPatientData } from './APICalls/getPatientData'
import { getGene } from './APICalls/getGeneData'
import { getDiagnosisData } from './APICalls/getDiagnosisData'
import { useData } from './contexts/DataContext'
import searchGear from './assets/search-gear.svg'
import './App.css'

function App() {

  const [showPatientGeneDiagnosisSelectorOptions, setShowPatientGeneDiagnosisSelectorOptions] = useState(false);
  const [searchCategoryTitle, setSearchCategoryTitle] = useState('Select Search Type');
  const [searchCategory, setSearchCategory] = useState('');
  // const [searchParam, setSearchParam] = useState('');

  const { patientData, setPatientData } = useData();
  const { geneData, setGeneData } = useData();
  const { diagnosisData, setDiagnosisData } = useData();

  // const getPatientResults = async () => {
  //   if (patientData.length < 1) {
  //     try {
  //       const results = await getPatientData(searchParam)
  //       setPatientData(results)
  //     } catch (err) {
  //       console.error(err)
  //     }
  //   }
  // }

  // const getGeneResults = async () => {
  //   if (geneData.length < 1) {
  //     try {
  //       const results = await getGene(searchParam)
  //       setGeneData(results)
  //     } catch (err) {
  //       console.error(err)
  //     }
  //   }
  // }

  // const getDiagnosisResults = async () => {
  //   if (diagnosisData.length < 1) {
  //     try {
  //       const results = await getDiagnosisData(searchParam)
  //       setDiagnosisData(results)
  //     } catch (err) {
  //       console.error(err)
  //     }
  //   }
  // }

  return (
    <>
      <section id="center" className="center">

        <div id="header" className="header">

          <div id="header-inner" className="header-inner">

            <img 
              className="gene-machine"
              src={searchGear} 
              alt="search-gear-icon"
            />

            <div className="header-text">
              <p className="gene-machine-title">GeneMachine</p>
              <p className="gene-machine-description">Search for patients, genes, and diagnoses.</p>
            </div>

          </div>
        
        </div>

        <div id="search-bar" className="search-bar">

          <div 
            id="patient-gene-diagnosis-selector" 
            className="patient-gene-diagnosis-selector"
            onClick={() => {
              setShowPatientGeneDiagnosisSelectorOptions(!showPatientGeneDiagnosisSelectorOptions);
            }}
          >
            <p className="patient-gene-diagnosis-selector-text">{searchCategoryTitle}</p>
          </div>

          <input
            type="text"
            name="search"
            id="search-bar-input"
            className="search-bar-input"
            placeholder="Search for..."
            // onChange={(e) => {
            //   setSearchParam(e.target.value);
            //   if (searchCategory === 'Patient') {
            //     setTimeout(() => {
            //       getPatientResults();
            //     }, 2000);
            //   } else if (searchCategory === 'Gene') {
            //     setTimeout(() => {
            //       getGeneResults();
            //     }, 2000);
            //   } else if (searchCategory === 'Diagnosis') {
            //     setTimeout(() => {
            //       getDiagnosisResults();
            //     }, 2000);
            //   }
            // 
            onChange={(e) => {
              const value = e.target.value
              // setSearchParam(value)
              if (!value.trim()) return
              if (searchCategory === 'Patient') {
                getPatientData(value).then(setPatientData).catch(console.error)
              } else if (searchCategory === 'Gene') {
                getGene(value).then(setGeneData).catch(console.error)
              } else if (searchCategory === 'Diagnosis') {
                getDiagnosisData(value).then(setDiagnosisData).catch(console.error)
              }
            }}
          />

        </div>

        { showPatientGeneDiagnosisSelectorOptions == true &&
        <>

          <div
            className="patient-gene-diagnosis-selector-options"
            id="patient-gene-diagnosis-selector-options"
          >
          
            <p className="search-category"
              onClick={() => {
                setSearchCategory('Patient');
                setSearchCategoryTitle('Select Search Type: Patient');
                setShowPatientGeneDiagnosisSelectorOptions(false);
              }}
            >
              Patient
              </p>
            <p 
              className="search-category"
              onClick={() => {
                setSearchCategory('Gene');
                setSearchCategoryTitle('Select Search Type: Gene');
                setShowPatientGeneDiagnosisSelectorOptions(false);
              }}>
                Gene
            </p>
            <p className="search-category"
              onClick={() => {
                setSearchCategory('Diagnosis');
                setSearchCategoryTitle('Select Search Type: Diagnosis');
                setShowPatientGeneDiagnosisSelectorOptions(false);
              }}>
              Diagnosis
            </p>
          
          </div>
      
        </>
        }

        <div id="search-results">

          {searchCategory === 'Patient' &&
            <div id="patient-results" className="patient-results">
              {patientData.map((p, index) => (  
                <div key={index} className="patient-result-item">

                  <div className="patient-result-item-details">

                    <div className="patient-result-item-name">
                      <p className="results-label">Name:</p>
                      <p>{p.first_name} {p.last_name}</p>
                    </div>

                    <div className="patient-result-item-gender">
                      <p className="results-label">Gender:</p>
                      <p>{p.gender}</p>
                    </div>

                    <div className="patient-result-item-phone">
                      <p className="results-label">Phone:</p>
                      <p>{p.phone}</p>
                    </div>

                  </div>

                  <div className="patient-result-item-details">
                    <div className="patient-result-item-street-address">
                      <p className="results-label">Street Address:</p>
                      <p>{p.street_address}</p>
                    </div>

                    <div className="patient-result-item-city">
                      <p className="results-label">City:</p>
                      <p>{p.city}</p>
                    </div>

                    <div className="patient-result-item-state">
                      <p className="results-label">State:</p>
                      <p>{p.state}</p>
                    </div>

                    <div className="patient-result-item-zip-code">
                      <p className="results-label">Zip Code:</p>
                      <p>{p.zip_code}</p>
                    </div>

                  </div>

                </div>
              ))}
            </div>
          }

          {searchCategory === 'Gene' &&
            <div id="gene-results">
              {geneData.map((g) => (  
                <div id="gene-result-item" className="gene-result-item">
                  <p>{g.gene}</p>
                  <p>{g.gene_description}</p>
                </div>
              ))}
            </div>
          }

          {searchCategory === 'Diagnosis' &&
            <div id="diagnosis-results">
              {diagnosisData.map((o) => (  
                <div id="diagnosis-result-item" className="diagnosis-result-item">
                  <p>{o.diagnosis}</p>
                </div>
              ))}
            </div>
          }
        </div>

        <div id="footer">

        </div>

      </section>

    </>
  )
}

export default App
