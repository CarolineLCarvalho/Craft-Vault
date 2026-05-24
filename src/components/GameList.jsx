import GameCard from "./GameCard"

function GameList({
  games,
  removeGame
}) {
  return (
    <section className="games-grid">

      {games.map((game, index) => (

        <GameCard
          key={index}

          game={game}
          
          removeGame={removeGame}

          index={index}
        />

      ))}

    </section>
  )
}

export default GameList