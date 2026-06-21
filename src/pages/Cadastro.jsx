import { useEffect, useState } from "react"

import {
  useNavigate,
  useParams
} from "react-router-dom"

import Header from "../components/Header"

import {
  createGame,
  getGameById,
  updateGame
} from "../api/gameService"

function Cadastro() {

  const navigate = useNavigate()
  const { id } = useParams()

  const [gamesApi, setGamesApi] =
    useState([])

  const [formData, setFormData] =
    useState({
      nome: "",
      genero: "",
      imagem: "",
      status: "Jogando"
    })

  // Busca jogos da RAWG
  useEffect(() => {

    fetch(
      `https://api.rawg.io/api/games?key=${import.meta.env.VITE_RAWG_KEY}`
    )
      .then(response => response.json())
      .then(data => {
        setGamesApi(data.results)
      })

  }, [])

  // Carrega jogo para edição
  useEffect(() => {

    if (!id) return

    async function loadGame() {

      const game =
        await getGameById(id)

      setFormData(game)
    }

    loadGame()

  }, [id])

  // Seleciona jogo da RAWG
  function handleGameSelect(e) {

    const selectedGame =
      gamesApi.find(
        game =>
          game.name === e.target.value
      )

    setFormData({

      ...formData,

      nome:
        selectedGame.name,

      genero:
        selectedGame.genres[0]?.name
        || "Sem gênero",

      imagem:
        selectedGame.background_image

    })
  }

  // Atualiza status
  function handleChange(e) {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value

    })
  }

  // Salva
  async function handleSubmit(e) {

    e.preventDefault()

    if (id) {

      await updateGame(
        id,
        formData
      )

    } else {

      await createGame(
        formData
      )

    }

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
            {id
              ? "Editar Jogo"
              : "Cadastrar Jogo"}
          </h2>

          <select
            name="nome"
            value={formData.nome}
            onChange={handleGameSelect}
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