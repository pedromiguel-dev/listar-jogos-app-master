//import reactLogo from './assets/react.svg';
import React from "react"

export type game = {
    id: number,
		title: string,
		thumbnail: string,
		short_description: string,
		game_url: string,
		genre: string,
		platform: string,
		publisher: string,
		developer: string,
		release_date: string,
		freetogame_profile_url: string
}

function App() {
  const [ games , setGames ] = React.useState<game[] | null>(null)

  React.useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch('https://games-test-api-81e9fb0d564a.herokuapp.com/api/data', {
          method: 'GET',
          headers: {
            "dev-email-address" : "pedro.miguel.e.idk@gmail.com"
          },

        });
        const result = await response.json();
        setGames(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="h-screen overflow-auto bg-gray-100
    ">
      <h1>Games</h1>
      <ul className="
          flex flex-wrap
        ">
        {games ? (
          games.map((game) => (
            <li key={game.id} className="
              w-full p-2
              md:w-1/2
              2xl:w-1/4
            ">
              <div className="flex flex-wrap bg-white shadow-md rounded-lg p-4
                w-full h-full ">
                <img src={game.thumbnail} alt={game.title} loading="lazy" 
                  className="
                  object-cover object-center rounded-lg mb-4 
                  md:w-50 md:h-100 md:mr-4
                  md:m-0
                  "
                />
                <div className="side
                  
                  flex flex-col justify-between
                ">
                  <h2 className="text-2xl font-bold text-gray-800">{game.title}</h2>
                  <p className="text">{game.short_description}</p>
                  <p>{game.genre}</p>
                  <p>{game.platform}</p>
                  <p>{game.publisher}</p>
                  <p>{game.developer}</p>
                  <p>{game.release_date}</p>
                  <a href={game.freetogame_profile_url}>More info</a>
                </div>
              </div>
            </li>
          ))
        ) : ( <li>Carregando...</li> )}
      </ul>
    </div>
  )
}

export default App
