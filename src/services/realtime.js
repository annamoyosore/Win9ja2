import { client, CONFIG } from "../appwrite/config.js";

export function subscribeToLobby(callback) {
  return client.subscribe(
    `databases.${CONFIG.databaseId}.collections.${CONFIG.collections.lobby}.documents`,
    (response) => {
      callback(response);
    }
  );
}

export function subscribeToMatch(matchId, callback) {
  return client.subscribe(
    `databases.${CONFIG.databaseId}.collections.${CONFIG.collections.matches}.documents.${matchId}`,
    (response) => {
      callback(response.payload);
    }
  );
}