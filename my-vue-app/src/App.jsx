import { BrowserRouter } from "react-router-dom"
import Games from "./pages/Games"
import SingleGame from "./pages/SingleGame"
import { Link } from "react-router-dom"
import { Routes, Route } from "react-router-dom"

function App() {

  return (
    <BrowserRouter>
      <header>
        <nav>
          <Link to="/">Home</Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Games />} />
        <Route path="/games/:id" element={<SingleGame />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
