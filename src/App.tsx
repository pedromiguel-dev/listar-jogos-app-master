import windows_logo from "./assets/microsoft-windows-22-logo-svgrepo-com.svg";
import React from "react";
import Skeleton from "./components/skeleton_cards";
import { ResoladButton, Spining } from "./components/utils";

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

  React.useEffect(() => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
      setError("O servidor demorou para responder, tente mais tarde.");
      console.log("Fetch request timed out");
    }, 5000);
    const signal = controller.signal;

    const fetchData = async () => {
      try {
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
        clearTimeout(timeoutId);
        const result = await response.json();
        setGames(result);
      } catch (error: unknown) {
        console.info(error);
      }
    };

    fetchData();

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, []);

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
      <GameList games={games} err={error} />
    </div>
  );
}

type GameListProps = {
  games: game[] | null;
  err: string | null;
};

export function GameList({ games, err }: GameListProps) {
  const formatDate = (string: string) => {
    const date = new Date(string);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();

    return `${day}/${month}/${year}`;
  };

  if (err) {
    return <div className=" text-center text-2xl font-semibold m-10 p-10 bg-white rounded-lg shadow-md flex justify-center">{err}...</div>;
  }
  return (
    <ul
      style={{ gridTemplateColumns: " repeat(auto-fill, minmax(270px, 1fr))" }}
      className="grid gap-5 w-full max-w-7xl mb-20"
    >
      {games === null ? (
        <Skeleton />
      ) : (
        games.map((game) => (
          <li
            key={game.id}
            className=" hover:scale-95 md:hover:scale-105 transition-all duration-300"
          >
            <div className="flex flex-col bg-white shadow-md rounded-lg p-4 w-full h-full max">
              <img
                src={game.thumbnail}
                alt={game.title}
                loading="lazy"
                className="object-cover object-center rounded-md mb-4 aspect-video"
              />
              <div
                className="
                  flex flex-col align-center mb-3
                  w-full h-full 
                "
              >
                <h2 className="text-2xl font-black text-gray-900">
                  {game.title}
                </h2>
                <p className="text ">
                  {game.short_description} Released on{" "}
                  {formatDate(game.release_date)}.
                </p>
              </div>
              <p className="font-light uppercase text-sm px-1">{game.genre}</p>
              <div className="flex flex-row justify-between pb-3 pt-0 px-1">
                <p className="font-bold from-neutral-800 text-base">
                  By {game.publisher}
                </p>
                {game.platform === "PC (Windows)" ? (
                  <img
                    src={windows_logo}
                    alt="windows logo"
                    className="inline-block w-6 h-6"
                  />
                ) : (
                  <></>
                )}
              </div>
              <a
                href={game.freetogame_profile_url}
                className="
                    bg-blue-500 px-6 py-3 rounded-lg text-center text-white font-bold
                    shadow-md
                    hover:bg-blue-600
                    hover:border-blue-600
                    transition-colors duration-300
                  "
              >
                More info
              </a>
            </div>
          </li>
        ))
      )}
    </ul>
  );
}
