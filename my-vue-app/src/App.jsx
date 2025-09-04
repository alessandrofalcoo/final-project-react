import { BrowserRouter } from "react-router-dom"
import Games from "./pages/Games"
import SingleGame from "./pages/SingleGame"



function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Games />} />
        <Route path="/games/:id" element={<SingleGame />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
