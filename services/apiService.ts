import { ChatSession } from '../types';

const getSessionsKey = (username: string) => `chat-sessions-${username}`;

// This service simulates API calls. In a real application, these functions
// would use `fetch` to communicate with a backend server, which would then
// interact with the MongoDB database. The localStorage usage here is a placeholder.

/**
 * Fetches all chat sessions from storage for a specific user.
 */
export const getSessions = async (username: string): Promise<ChatSession[]> => {
  console.log(`API_SERVICE: Fetching all sessions for user "${username}".`);
  const SESSIONS_KEY = getSessionsKey(username);
  const savedSessions = localStorage.getItem(SESSIONS_KEY);
  // Ensure sessions are sorted with the most recent first, simulating a DB query
  const sessions: ChatSession[] = savedSessions ? JSON.parse(savedSessions) : [];
  return sessions.sort((a, b) => parseInt(b.id.split('-')[1]) - parseInt(a.id.split('-')[1]));
};

/**
 * Persists an array of sessions to storage for a specific user.
 */
const saveAllSessions = async (username: string, sessions: ChatSession[]): Promise<void> => {
    console.log(`API_SERVICE: Persisting all sessions for user "${username}".`);
    const SESSIONS_KEY = getSessionsKey(username);
    if (sessions.length > 0) {
        localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
    } else {
        localStorage.removeItem(SESSIONS_KEY);
    }
};

/**
 * Creates a new session for a user and returns their updated list of all sessions.
 */
export const createSession = async (username: string, newSession: ChatSession): Promise<ChatSession[]> => {
    console.log(`API_SERVICE: Creating a new session for user "${username}".`);
    const sessions = await getSessions(username);
    const updatedSessions = [newSession, ...sessions];
    await saveAllSessions(username, updatedSessions);
    return updatedSessions;
};

/**
 * Updates a specific session for a user and returns their updated list of all sessions.
 */
export const updateSession = async (username: string, updatedSession: ChatSession): Promise<ChatSession[]> => {
    console.log(`API_SERVICE: Updating session ${updatedSession.id} for user "${username}".`);
    const sessions = await getSessions(username);
    const sessionIndex = sessions.findIndex(s => s.id === updatedSession.id);
    if (sessionIndex === -1) {
      return sessions;
    }
    const updatedSessions = [...sessions];
    updatedSessions[sessionIndex] = updatedSession;
    await saveAllSessions(username, updatedSessions);
    return updatedSessions;
};

/**
 * Deletes a session by its ID for a user and returns their updated list of all sessions.
 */
export const deleteSession = async (username: string, sessionId: string): Promise<ChatSession[]> => {
    console.log(`API_SERVICE: Deleting session ${sessionId} for user "${username}".`);
    const sessions = await getSessions(username);
    const updatedSessions = sessions.filter(s => s.id !== sessionId);
    await saveAllSessions(username, updatedSessions);
    return updatedSessions;
};
