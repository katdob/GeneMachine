import { useState } from 'react'
import { fetchHello } from './APICalls/hello'
import searchGear from './assets/search-gear.svg'
import './App.css'

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function App() {

  const [query, setQuery] = useState('search for...');
  const [showPatientGeneOrganSelectorOptions, setshowPatientGeneOrganSelectorOptions] = useState(false);
  const [searchCategoryTitle, setSearchCategoryTitle] = useState('Select Search Type');
  const [searchCategory, setSearchCategory] = useState('');
  const [searchParam, setSearchParam] = useState('');
  const [patientResults, setPatientResults] = useState([
    {
      "first_name": "John",
      "last_name": "Smith",
      "gender": "M",
      "street_address": "123 Main St",
      "city": "Boston",
      "state": "MA",
      "zip_code": "02101",
      "phone": "555-1234"
    }
  ]);
  const [geneResults, setGeneResults] = useState([
    {
      "gene": "BCD",
      "gene_description": "BCD gene description"
    }
  ]);
  const [organResults, setOrganResults] = useState([
    {
      "organ": "Liver",
      "organ_description": "Liver description"
    }
  ]);

  const handleReactLogoClick = () => {
    fetchHello()
      .then((data) => console.log(data.message))
      .catch((err) => console.error(err))
  }

  const getSearchResults = async () => {
    setTimeout(() => 2000);
    const results = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/search?category=${searchCategory}&param=${searchParam}`)
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
    console.log(results);
  }

  return (
    <>
      <section id="center" className="center">

        <div id="header" className="header">

          <div id="header-inner" className="header-inner">

            <img 
              className="gene-machine"
              src={searchGear} 
              alt="search-gear-icon" 
              onClick={handleReactLogoClick}
            />

            <div className="header-text">
              <p className="gene-machine-title">GeneMachine</p>
              <p className="gene-machine-description">Search for patients, genes, and diagnosis-related organs.</p>
            </div>

          </div>
        
        </div>

        <div id="search-bar" className="search-bar">

          <div 
            id="patient-gene-organ-selector" 
            className="patient-gene-organ-selector"
            onClick={() => {
              setshowPatientGeneOrganSelectorOptions(!showPatientGeneOrganSelectorOptions);
            }}
          >
            <p className="patient-gene-organ-selector-text">{searchCategoryTitle}</p>
          </div>

          <input
            type="text"
            name="search"
            id="search-bar-input"
            className="search-bar-input"
            placeholder="Search for..."
            onChange={(e) => {
              setSearchParam(e.target.value);
              if (searchCategory && searchParam) {
                getSearchResults();
              }
            }}
          />

        </div>

        { showPatientGeneOrganSelectorOptions == true &&
        <>

          <div
            className="patient-gene-organ-selector-options"
            id="patient-gene-organ-selector-options"
          >
          
            <p className="search-category"
              onClick={() => {
                setSearchCategory('Patient');
                setSearchCategoryTitle('Select Search Type: Patient');
                setshowPatientGeneOrganSelectorOptions(false);
              }}
            >
              Patient
              </p>
            <p 
              className="search-category"
              onClick={() => {
                setSearchCategory('Gene');
                setSearchCategoryTitle('Select Search Type: Gene');
                setshowPatientGeneOrganSelectorOptions(false);
              }}>
                Gene
            </p>
            <p className="search-category"
              onClick={() => {
                setSearchCategory('Organ');
                setSearchCategoryTitle('Select Search Type: Organ');
                setshowPatientGeneOrganSelectorOptions(false);
              }}>
              Organ
            </p>
          
          </div>
      
        </>
        }

        <div id="search-results">

          {searchCategory === 'Patient' &&
            <div id="patient-results" className="patient-results">
              {patientResults.map((p, index) => (  
                <div key={index} className="patient-result-item">

                  <div className="patient-result-item-details">

                    <div className="patient-result-item-name">
                      <p>Name:</p>
                      <p>{p.first_name} {p.last_name}</p>
                    </div>

                    <div className="patient-result-item-gender">
                      <p>Gender:</p>
                      <p>{p.gender}</p>
                    </div>

                  </div>

                  <div className="patient-result-item-details">
                    <div className="patient-result-item-street-address">
                      <p>Street Address:</p>
                      <p>{p.street_address}</p>
                    </div>

                    <div className="patient-result-item-city">
                      <p>City:</p>
                      <p>{p.city}</p>
                    </div>

                    <div className="patient-result-item-state">
                      <p>State:</p>
                      <p>{p.state}</p>
                    </div>

                    <div className="patient-result-item-zip-code">
                      <p>Zip Code:</p>
                      <p>{p.zip_code}</p>
                    </div>

                    <div className="patient-result-item-phone">
                      <p>Phone:</p>
                      <p>{p.phone}</p>
                    </div>

                  </div>

                </div>
              ))}
            </div>
          }
          {searchCategory === 'Gene' &&
            <div id="gene-results">
              {geneResults.map((g) => (  
                <div id="gene-result-item">
                  <p>{g.gene}</p>
                  <p>{g.gene_description}</p>
                </div>
              ))}
            </div>
          }
          {searchCategory === 'Organ' &&
            <div id="organ-results">
              {organResults.map((o) => (  
                <div id="organ-result-item">
                  <p>{o.organ}</p>
                  <p>{o.organ_description}</p>
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
