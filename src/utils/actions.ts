"use server";
import data from "./data";

// Mock user data (you can replace this with any static info you want)
export const getUser = async () => {
  return {
    id: "user_123",
    name: "Demo User",
    email: "demo@example.com",
  };
};

// Use local data and filter by category
export const getGames = async (category: string) => {
  if (category === "all") {
    return data;
  }
  const filteredData = data.filter((game) => game.category === category);
  return filteredData;
};

// Find game by ID from local data
export const getGameById = async (gameId: string) => {
  const game = data.find(
    (item) => item.gameName.toLowerCase() === gameId.toLowerCase()
  );

  if (!game) {
    return {
      game: null,
      status: 500,
    };
  }

  return {
    game,
    status: 200,
  };
};
