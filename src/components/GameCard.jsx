import { Link } from "react-router-dom"

function GameCard({
  game,
  removeGame,
  index
}) {
  return (
    <div className="card">

      <img
        src={game.imagem}
        alt={game.nome}
      />

      <h3>{game.nome}</h3>

      <p>{game.genero}</p>

      <span>{game.status}</span>

      <div className="card-actions">

  <Link
    to={`/editar/${game.id}`}
    className="edit-button"
  >
    Editar
  </Link>

  <button
    className="delete-button"
    onClick={() =>
      removeGame(game.id)
    }
  >
    Remover
  </button>

</div>

    </div>
  )
}

export default GameCard