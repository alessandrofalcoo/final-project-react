import { BrowserRouter } from "react-router-dom"
import Games from "./pages/Games"
import Home from "./pages/Home"
import SingleGame from "./pages/SingleGame"
import FilterGames from "./pages/FilterGames"
import { Routes, Route } from "react-router-dom"
import DefaultLayout from "./layouts/DefaultLayout"
import { SearchProvider } from "./contexts/GlobalContext"

function App() {

  return (
    <SearchProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/games" element={<Games />} />
            <Route path="/games/:id" element={<SingleGame />} />
            <Route path="/games/filters" element={<FilterGames />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </SearchProvider>
  )
}

export default App
