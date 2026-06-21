function GameCard({
  game,
  removeGame
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

      {/* BOTÃO */}
      <button
  className="delete-button"
  onClick={() =>
    removeGame(game.id)
  }
  >
    Remover
   </button>

    </div>
  )
}

export default GameCard