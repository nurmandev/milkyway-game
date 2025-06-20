"use client";
import React, { useEffect, useState } from "react";
import { CarouselItem } from "./ui/carousel";
import FeaturedGameCard from "./FeaturedGameCard";
import GameCard from "./GameCard";
import GameModal from "./ui/GameModal";

const GamesGrid = ({ data }) => {
  const [featuredGames, setFeaturedGames] = useState([]);
  const [unfeaturedGames, setUnfeaturedGames] = useState([]);
  const [currentGame, setCurrentGame] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gameLoaded, setGameLoaded] = useState(false);

  useEffect(() => {
    if (Array.isArray(data)) {
      const newFeaturedGames = data.filter((game) => game.type === "featured");
      const newUnfeaturedGames = data.filter((game) => game.type !== "featured");

      setFeaturedGames(newFeaturedGames);
      setUnfeaturedGames(newUnfeaturedGames);
    }
  }, [data]);

  const closeModalHandler = () => {
    setGameLoaded(false);
    setIsModalOpen(false);
  };

  useEffect(() => {
    console.log("Is Game Loaded : ", gameLoaded);
  }, [gameLoaded]);

  // ✅ Fixes for iOS Safari layout bugs (no visual changes)
  useEffect(() => {
    const isIOS =
      typeof window !== "undefined" &&
      /iPad|iPhone|iPod/.test(navigator.userAgent) &&
      !window.MSStream;

    if (isIOS) {
      document.body.style.webkitOverflowScrolling = "touch";
      document.body.style.overscrollBehaviorY = "contain";
    }

    return () => {
      if (isIOS) {
        document.body.style.webkitOverflowScrolling = "";
        document.body.style.overscrollBehaviorY = "";
      }
    };
  }, []);

  return (
    <>
      {unfeaturedGames.length > 0 ? (
        unfeaturedGames
          .reduce((chunks, _, index) => {
            if (index === 0) {
              chunks.push(unfeaturedGames.slice(0, 6));
            } else if ((index - 6) % 8 === 0) {
              chunks.push(unfeaturedGames.slice(index - 6, index + 2));
            }
            return chunks;
          }, [])
          .map((chunk, chunkIndex) => (
            <React.Fragment key={chunkIndex}>
              {chunk.length === 6 ? (
                <CarouselItem className="flex justify-center m-auto w-[80%]">
                  {featuredGames.length > 0 && (
                    <FeaturedGameCard data={featuredGames[0]} />
                  )}
                  <div className="grid grid-cols-3 gap-[2vw] w-[65%] lg:h-[70vh] py-[3%]">
                    {chunk.map((game, index) => (
                      <GameCard
                        key={index}
                        src={game}
                        type={game.type}
                        setCurrentGame={setCurrentGame}
                        setIsModalOpen={setIsModalOpen}
                      />
                    ))}
                  </div>
                </CarouselItem>
              ) : (
                <CarouselItem>
                  <div className="grid grid-cols-4 gap-[2vw] w-[85%] lg:h-[5vh] py-[3%] m-auto">
                    {chunk.map((game, index) => (
                      <GameCard key={index} src={game} type={game.type} />
                    ))}
                  </div>
                </CarouselItem>
              )}
            </React.Fragment>
          ))
      ) : (
        <p>No games available</p>
      )}

      <GameModal
        show={isModalOpen}
        onClose={closeModalHandler}
        src={currentGame}
        gameLoaded={gameLoaded}
        setGameLoaded={setGameLoaded}
      />
    </>
  );
};

export default GamesGrid;
