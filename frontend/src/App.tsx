import { useState, useEffect } from 'react'
import { fetchHello } from './APICalls/hello'
import searchGear from './assets/search-gear.svg'
import './App.css'

function App() {

  const [query, setQuery] = useState('')
  const [showPatientGeneOrganSelectorOptions, setshowPatientGeneOrganSelectorOptions] = useState(false);
  const [searchCategoryTitle, setSearchCategoryTitle] = useState('Select Search Type');
  const [searchCategory, setSearchCategory] = useState('');

  const handleReactLogoClick = () => {
    fetchHello()
      .then((data) => console.log(data.message))
      .catch((err) => console.error(err))
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
            placeholder="Search patients..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
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

        </div>

        <div id="footer">

        </div>

      </section>

    </>
  )
}

export default App
