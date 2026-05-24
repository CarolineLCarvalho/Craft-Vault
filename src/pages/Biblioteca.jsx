import { useEffect, useState } from "react"

import { Link } from "react-router-dom"

import Header from "../components/Header"
import GameList from "../components/GameList"

function Biblioteca() {
  const [games, setGames] = useState([])

  useEffect(() => {
    const jogosSalvos =
      JSON.parse(localStorage.getItem("games"))
      || []

    const ordenados = jogosSalvos.sort(
      (a, b) =>
        a.nome.localeCompare(b.nome)
    )

    setGames(ordenados)
  }, [])

  // FUNÇÃO DE REMOVER O JOGOOOOOO
  function removeGame(indexToRemove) {

    // cria novo array sem o item clicado
    const updatedGames = games.filter(
      (_, index) =>
        index !== indexToRemove
    )

    // atualiza state
    setGames(updatedGames)

    // atualiza localStorage
    localStorage.setItem(
      "games",
      JSON.stringify(updatedGames)
    )
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

        {/* ENVIA removeGame VIA PROP */}
        <GameList
          games={games}
          removeGame={removeGame}
        />

      </main>
    </div>
  )
}

export default Biblioteca