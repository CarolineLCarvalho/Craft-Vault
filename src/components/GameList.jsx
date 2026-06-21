import GameCard from "./GameCard"

function GameList({
  games,
  removeGame
}) {
  return (
    <section className="games-grid">

      {games.map((game, index) => (

        <GameCard
          key={game.id}

          game={game}
          removeGame={removeGame}

        />

      ))}

    </section>
  )
}

export default GameList