import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"

import Cadastro from "./pages/Cadastro"
import Biblioteca from "./pages/Biblioteca"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Cadastro />}
        />

        <Route
          path="/biblioteca"
          element={<Biblioteca />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App