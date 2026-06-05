import { useState } from 'react'
import { fetchHello } from './APICalls/hello'
import searchGear from './assets/search-gear.svg'
import './App.css'

function App() {
  // const [count, setCount] = useState(0)
  const [query, setQuery] = useState('')

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

          <div id="patient-gene-organ-selector" className="patient-gene-organ-selector">
            <p>Select Search Type</p>
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

        <div id="search-results">

        </div>

        <div id="footer">

        </div>

      </section>

    </>
  )
}

export default App
