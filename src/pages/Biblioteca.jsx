import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import Header from "../components/Header"
import GameList from "../components/GameList"

import {
  getGames,
  deleteGame
} from "../api/gameService"

function Biblioteca() {
  const [games, setGames] = useState([])

  useEffect(() => {
    loadGames()
  }, [])

  async function loadGames() {
    const data = await getGames()

    const ordenados = data.sort(
      (a, b) =>
        a.nome.localeCompare(b.nome)
    )

    setGames(ordenados)
  }

  async function removeGame(id) {

    const confirmar = window.confirm(
      "Deseja remover este jogo?"
    )

    if (!confirmar) return

    await deleteGame(id)

    loadGames()
  }

  return (
    <div>
      <Header />

      <main className="container">

        <div className="top-bar">
          <h2>Minha Biblioteca</h2>

          <Link
            to="/"
            className="back-button"
          >
            + Novo Jogo
          </Link>
        </div>

        <GameList
          games={games}
          removeGame={removeGame}
        />

      </main>
    </div>
  )
}

export default Biblioteca