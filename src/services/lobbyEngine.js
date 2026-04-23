import { databases } from "../appwrite/config";

const DB_ID = "YOUR_DB_ID";
const LOBBY = "lobby";

// join lobby
export async function joinLobby(userId, stake) {
  return await databases.createDocument(DB_ID, LOBBY, "unique()", {
    userId,
    stakeAmount: stake,
    status: "waiting"
  });
}

// get active players
export async function getLobby() {
  return await databases.listDocuments(DB_ID, LOBBY);
}

// remove player
export async function leaveLobby(id) {
  return await databases.deleteDocument(DB_ID, LOBBY, id);
}