import { useEffect, useState } from "react"

import { useNavigate } from "react-router-dom"

import Header from "../components/Header"

function Cadastro() {

  const navigate = useNavigate()

  // jogos vindos da API
  const [gamesApi, setGamesApi] =
    useState([])

  // dados do formulário
  const [formData, setFormData] =
    useState({
      nome: "",
      genero: "",
      imagem: "",
      status: "Jogando"
    })

  // busca jogos da RAWG
  useEffect(() => {

    fetch(
      `https://api.rawg.io/api/games?key=${import.meta.env.VITE_RAWG_KEY}`
    )

      .then(response => response.json())

      .then(data => {

        setGamesApi(data.results)

      })

  }, [])

  // quando seleciona jogo
  function handleGameSelect(e) {

    const selectedGame =
      gamesApi.find(
        game =>
          game.name === e.target.value
      )

    setFormData({

      ...formData,

      nome: selectedGame.name,

      genero:
        selectedGame.genres[0]?.name
        || "Sem gênero",

      imagem:
        selectedGame.background_image

    })
  }

  // altera status
  function handleChange(e) {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value

    })
  }

  // salva jogo
  function handleSubmit(e) {

    e.preventDefault()

    const jogosSalvos =
      JSON.parse(
        localStorage.getItem("games")
      ) || []

    localStorage.setItem(

      "games",

      JSON.stringify([
        ...jogosSalvos,
        formData
      ])
    )

    navigate("/biblioteca")
  }

  return (
    <div>

      <Header />

      <main className="container">

        <form
          className="form"
          onSubmit={handleSubmit}
        >

          <h2>
            Cadastrar Jogo
          </h2>

          {/* SELECT DOS JOGOS */}
          <select
            name="nome"
            value={formData.nome}
            onChange={handleGameSelect}
            required
          >

            <option value="">
              Selecione um jogo
            </option>

            {gamesApi.map(game => (

              <option
                key={game.id}
                value={game.name}
              >
                {game.name}
              </option>

            ))}

          </select>

          {/* STATUS */}
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >

            <option>
              Jogando
            </option>

            <option>
              Zerado
            </option>

            <option>
              Wishlist
            </option>

          </select>

          <button type="submit">
            Salvar Jogo
          </button>

        </form>

      </main>

    </div>
  )
}

export default Cadastro