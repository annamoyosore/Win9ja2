import { db } from "../constants/appwrite";
import { COLLECTIONS, DB_ID } from "../constants/config";

export const createGame = (userId, stake) =>
  db.createDocument(DB_ID, COLLECTIONS.GAMES, "unique()", {
    players: [userId],
    stake,
    round: 1,
    status: "waiting",
    score: {}
  });

export const joinGame = (gameId, userId) =>
  db.updateDocument(DB_ID, COLLECTIONS.GAMES, gameId, {
    players: [userId],
    status: "playing"
  });