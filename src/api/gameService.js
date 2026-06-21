import axios from "axios"

const API_URL = "http://localhost:3001/games"

export async function getGames() {
  const response = await axios.get(API_URL)
  return response.data
}

export async function getGameById(id) {
  const response = await axios.get(
    `${API_URL}/${id}`
  )

  return response.data
}

export async function createGame(game) {
  const response = await axios.post(
    API_URL,
    game
  )

  return response.data
}

export async function updateGame(
  id,
  game
) {
  const response = await axios.put(
    `${API_URL}/${id}`,
    game
  )

  return response.data
}

export async function deleteGame(id) {
  await axios.delete(
    `${API_URL}/${id}`
  )
}