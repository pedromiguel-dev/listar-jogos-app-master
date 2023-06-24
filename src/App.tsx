import React from "react";
import { SkeletonPills, SkeletonCards} from "./components/SkeletonCards";
import { ResoladButton, Spining } from "./components/utils";
import Card from "./components/Card";

export type game = {
  id: number;
  title: string;
  thumbnail: string;
  short_description: string;
  game_url: string;
  genre: string;
  platform: string;
  publisher: string;
  developer: string;
  release_date: string;
  freetogame_profile_url: string;
};



export default function App() {
  const [error, setError] = React.useState<string | null>(null);
  const [games, setGames] = React.useState<game[] | null>(null);
  const [filteredGames, setFilteredGames] = React.useState<game[] | null>(null);
  const [genres, setGenres] = React.useState<Set<string> | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  const setGenre = (genre: string | null) => {
    if (genre === null) {
      return setFilteredGames(null);
    }

    const gamesByGenre = games?.filter((game) => game.genre === genre);
    if (gamesByGenre === undefined) {
      return;
    }
    setFilteredGames(gamesByGenre);
  }

  React.useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const timeoutId = setTimeout(() => {
      controller.abort();
      setError("O servidor demorou para responder, tente mais tarde.");
      console.log("Fetch request timed out");
    }, 5000);

    const fetchData = async () => {
      try {
        console.log("fetching data", loading);
        
        const response = await fetch(
          "https://games-test-api-81e9fb0d564a.herokuapp.com/api/data",
          {
            signal,
            method: "GET",
            headers: {
              "dev-email-address": "pedro.miguel.e.idk@gmail.com",
            },
          }
        );
        clearTimeout(timeoutId);
        console.log(response);
        if (!response.ok) {
          if (response.status >= 500 && response.status <= 509) {
            clearTimeout(timeoutId);
            setError(
              " O servidor fahou em responder, tente recarregar a página"
            );
            return;
          } else {
            clearTimeout(timeoutId);
            setError(
              "O servidor não conseguirá responder por agora, tente voltar novamente mais tarde"
            );
            return;
          }
        }
        const result = await response.json();

        const genres = result.map((game: game) => game.genre);
        setGenres(() => {
          const uniqueGenres = new Set<string>([...genres]);
          console.log(uniqueGenres);
          return uniqueGenres;
        });
        setGames(result);
        setLoading(false);
      } catch (error: unknown) {
        console.info(error);
        
      }
    };

    fetchData();

    return () => {
      setFilteredGames(null);
      setLoading(true);
      setError(null);
      setGames(null);
      setGenres(null);
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, []);

  const ErroMessage = () => {
    return <div className=" text-center text-2xl font-semibold m-10 p-10 bg-white rounded-lg shadow-md flex justify-center">{error}...</div> 
  }


  return (
    <div className="min-h-screen overflow-y-auto flex flex-col items-center w-full px-5">
      <div className="w-full h-min max-w-7xl flex items-center justify-between gap-5">
        <h1 className="grow_font_size text-6xl font-black text-gray-800 my-10 ">
          Games
        </h1>
        <div role="status" className="scale-90 md:scale-100 bg-white rounded-full p-2 hover:bg-gray-100 transition-all duration-300 cursor-pointer shadow-sm">
          {games === null && !error ? <Spining />: <ResoladButton />}
        </div>
      </div>
      <div className="w-full h-min max-w-7xl flex items-center justify-between gap-5">
        {error ? <></> : genres === null ? (
          <SkeletonPills />
        ) : (
          <div className="flex flex-wrap gap-4 mb-5 pb-1 py-10
          scrollbar-hide justify-center md:justify-start
          ">
            {Array.from(genres).map((genre) => (
              <button
                key={genre}
                onClick={() => {
                  if (filteredGames !== null && filteredGames[0].genre === genre) {
                    setGenre(null);
                    return;
                  }
                  setGenre(genre);
                }}
                className={filteredGames !== null && filteredGames[0].genre === genre ? 
                  "flex flex-row items-center justify-between bg-blue-500 text-white rounded-full min-w-max p-3 hover:bg-blue-600 transition-all duration-300 cursor-pointer shadow-sm" :
                  "flex flex-row items-center justify-between bg-white rounded-full min-w-max p-3 hover:bg-gray-100 transition-all duration-300 cursor-pointer shadow-sm"
                }
                >
                {genre}
                {filteredGames !== null && filteredGames[0].genre === genre ? (
                  <span className=" ml-2 text-white font-bold h-full">
                      <svg 
                      className="fill-current text-red-500 text-bold"
                      xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 16 16" width="24px" >
                        <path 
                        className="
                          stroke-black
                          strike-opacity-100
                          "
                        d="m 3.980469 4 h 1 h 0.03125 c 0.253906 0.011719 0.511719 0.128906 0.6875 0.3125 l 2.28125 2.28125 l 2.3125 -2.28125 c 0.265625 -0.230469 0.445312 -0.304688 0.6875 -0.3125 h 1 v 1 c 0 0.285156 -0.035157 0.550781 -0.25 0.75 l -2.28125 2.28125 l 2.25 2.25 c 0.1875 0.1875 0.28125 0.453125 0.28125 0.71875 v 1 h -1 c -0.265625 0 -0.53125 -0.09375 -0.71875 -0.28125 l -2.28125 -2.28125 l -2.28125 2.28125 c -0.1875 0.1875 -0.453125 0.28125 -0.71875 0.28125 h -1 v -1 c 0 -0.265625 0.09375 -0.53125 0.28125 -0.71875 l 2.28125 -2.25 l -2.28125 -2.28125 c -0.210938 -0.195312 -0.304688 -0.46875 -0.28125 -0.75 z m 0 0"/></svg>
                  </span>
                ) : (
                  <></>
                )}
              </button>
            ))}
          </div>
       )}
      </div>
      {error ? <ErroMessage /> : loading ? (
          <ul
            style={{ gridTemplateColumns: " repeat(auto-fill, minmax(270px, 1fr))" }}
            className="grid gap-5 w-full max-w-7xl mb-20"
            >
            <SkeletonCards />
          </ul>
          ) : (
          <ul
            style={{ gridTemplateColumns: " repeat(auto-fill, minmax(270px, 1fr))" }}
            className="grid gap-5 w-full max-w-7xl mb-20"
            >
            <Card games={games} filteredGames={filteredGames} />
          </ul>
        )}
    </div>
  );
}