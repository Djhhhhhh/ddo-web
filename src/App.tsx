import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Nav } from './components/layout/Nav/Nav'
import { Footer } from './components/layout/Footer/Footer'
import { Home } from './routes/Home'
import { CodeFlow } from './routes/products/CodeFlow'

export default function App() {
  return (
    <BrowserRouter>
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/code-flow" element={<CodeFlow />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}
