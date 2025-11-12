export enum MessageRole {
  USER = 'user',
  AI = 'ai',
}

export interface ChatMessage {
  role: MessageRole;
  text: string;
}

export interface ChatSession {
  id: string;
  title: string;
  model: string;
  messages: ChatMessage[];
}
