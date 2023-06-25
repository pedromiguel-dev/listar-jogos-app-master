import React from "react";
import { ReoladButton, Spining } from "./components/utils";
import Card from "./components/Card";
import PillFilter from "./components/PillFilter";

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
  const inputQuery = React.useRef<HTMLInputElement>(null);

  const [error, setError] = React.useState<string | null>(null);
  const [games, setGames] = React.useState<game[] | null>(null);
  const [filteredGames, setFilteredGames] = React.useState<game[] | null>(null);
  const [filteredGenre, setFilteredGenre] = React.useState<string | null>(null);
  const [genres, setGenres] = React.useState<Set<string> | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  const setQueriedGames = (query = "") => {
    let gamesByQuery: game[];

    if (query === "" || games === null) {
      setGenre(null);
      setFilteredGames(null);
      return;
    }

    if (filteredGames === null || filteredGenre === null) {
      gamesByQuery = games?.filter((game) => {
        return game.title.toLowerCase().includes(query.toLowerCase());
      });
    } else {
        const games = setGenre(filteredGenre);
        if (games === undefined || games === null) {
          return;
        }
        gamesByQuery = games?.filter((game) => {
        return game.title.toLowerCase().includes(query.toLowerCase());
      });
    }

    setFilteredGames(gamesByQuery);
  };

  const setGenre = (genre: string | null) => {
    if (inputQuery.current?.value && filteredGenre !== genre) {
      inputQuery.current.value = "";
    }
    if (genre === null) {
      setFilteredGenre(null);
      if (inputQuery.current) {
        inputQuery.current.value = "";
      }
      return setFilteredGames(games);
    }
    setFilteredGenre(genre);

    const gamesByGenre = games?.filter((game) => game.genre === genre);
    if (gamesByGenre === undefined) {
      return;
    }
    inputQuery.current?.focus();
    setFilteredGames(gamesByGenre);

    return gamesByGenre;
  };

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
    return (
      <div className=" text-center text-2xl font-semibold m-10 p-10 bg-white rounded-lg shadow-md flex justify-center">
        {error}...
      </div>
    );
  };
  return (
    <div className="min-h-screen overflow-y-auto flex flex-col items-center w-full px-5">
      <div className="w-full h-min max-w-7xl flex items-center justify-between gap-5 flex-col md:flex-row my-10 md:my-0">
        <h1 className=" text-6xl font-black text-gray-800 my-5 md:my-10 ">
          Games
        </h1>
        <div className="flex gap-5 w-full justify-center md:justify-end">
          {games === null && !error ? <Spining /> : <ReoladButton />}
          <form className="flex flex-row items-center">
            <input
              ref={inputQuery}
              type="text"
              onChange={(e) => setQueriedGames(e.target.value)}
              placeholder="Search"
              className="border-1 border-gray-300 bg-white px-5 pr-16 h-full rounded-3xl shadow-sm text-sm focus:outline-none  w-full"
            />
          </form>
        </div>
      </div>
      <div className="w-full h-min max-w-7xl flex items-center justify-between gap-5">
        {error ? (
          <></>
        ) : (
          <PillFilter
            loading={loading}
            filteredGames={filteredGames}
            genres={genres || new Set<string>(" ")}
            filteredGenre={filteredGenre || ""}
            setGenre={setGenre}
          />
        )}
      </div>
      {error ? (
        <ErroMessage />
      ) : (
        <Card loading={loading} games={games} filteredGames={filteredGames} />
      )}
    </div>
  );
}
