import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SamsungWalletScreen from './components/SamsungWalletScreen'
import FlightSummaryPage from './pages/FlightSummaryPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SamsungWalletScreen />} />
        <Route path="/flight/:flightNumber" element={<FlightSummaryPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
