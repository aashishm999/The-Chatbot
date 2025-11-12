import React, { useState, useEffect, useRef } from 'react';
import { Chat } from '@google/genai';
import { ChatMessage, MessageRole, ChatSession } from './types';
import { createChat } from './services/geminiService';
import * as apiService from './services/apiService';
import ChatMessageComponent from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import { AiIcon, MenuIcon, SunIcon, MoonIcon, UserIcon, LogoutIcon } from './components/Icons';
import Sidebar from './components/Sidebar';
import Login from './components/Login';

const MODELS = {
  'gemini-2.5-flash': 'Gemini 2.5 Flash',
  'gemini-2.5-pro': 'Gemini 2.5 Pro',
};

type Theme = 'light' | 'dark';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [model, setModel] = useState<string>('gemini-2.5-flash');
  const [chat, setChat] = useState<Chat | null>(null);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tempApiKey, setTempApiKey] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(localStorage.getItem('sidebar-open') === 'true');
  const [theme, setTheme] = useState<Theme>('dark');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const activeSession = sessions.find(s => s.id === activeSessionId);
  const messages = activeSession?.messages ?? [];

  // Attempt to load current user from localStorage on initial render
  useEffect(() => {
    const user = localStorage.getItem('current-user');
    if (user) {
      handleLogin(user);
    }
  }, []);

  // Initialize theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
  }, []);

  // Apply theme changes to DOM and localStorage
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  // Load sessions from API service when a user is logged in
  useEffect(() => {
    if (apiKey && currentUser) {
      const loadData = async () => {
        const loadedSessions = await apiService.getSessions(currentUser);
        if (loadedSessions.length > 0) {
            setSessions(loadedSessions);
            const lastActiveId = localStorage.getItem(`last-active-session-id-${currentUser}`);
            if (lastActiveId && loadedSessions.some(s => s.id === lastActiveId)) {
                setActiveSessionId(lastActiveId);
            } else {
                setActiveSessionId(loadedSessions[0].id);
            }
        } else {
            handleNewChat();
        }
      };
      loadData();
    }
  }, [apiKey, currentUser]);
  
  // Save active session ID per user
  useEffect(() => {
    if (activeSessionId && currentUser) {
      localStorage.setItem(`last-active-session-id-${currentUser}`, activeSessionId);
    }
  }, [activeSessionId, currentUser]);
  
  // Save sidebar state
  useEffect(() => {
    localStorage.setItem('sidebar-open', String(isSidebarOpen));
  }, [isSidebarOpen]);

  // Re-initialize chat when API key or active session changes
  useEffect(() => {
    if (apiKey && activeSession) {
      try {
        const newChat = createChat(apiKey, activeSession.model, activeSession.messages);
        setChat(newChat);
        setError(null);
      } catch (e) {
        console.error("Failed to initialize chat:", e);
        setError("Failed to initialize chat. Please check your API key.");
        setApiKey(null);
        if(currentUser) localStorage.removeItem(`gemini-api-key-${currentUser}`);
        setShowApiKeyInput(true);
      }
    }
  }, [apiKey, activeSession]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleLogin = (username: string) => {
    const userApiKey = localStorage.getItem(`gemini-api-key-${username}`);
    const userModel = localStorage.getItem(`gemini-model-${username}`) || 'gemini-2.5-flash';
    
    setCurrentUser(username);
    localStorage.setItem('current-user', username);
    
    setApiKey(userApiKey);
    setModel(userModel);
    setShowApiKeyInput(!userApiKey);
    
    // Reset session state for the new user
    setSessions([]);
    setActiveSessionId(null);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setApiKey(null);
    setChat(null);
    setSessions([]);
    setActiveSessionId(null);
    setError(null);
    localStorage.removeItem('current-user');
  };

  const handleNewChat = async () => {
    if (!currentUser) return;
    const newSession: ChatSession = {
      id: `chat-${Date.now()}`,
      title: 'New Chat',
      model: model,
      messages: [{
        role: MessageRole.AI,
        text: "Hello! I'm Eon, your AI assistant. How can I help you today?",
      }],
    };
    const updatedSessions = await apiService.createSession(currentUser, newSession);
    setSessions(updatedSessions);
    setActiveSessionId(newSession.id);
  };

  const handleSelectChat = (sessionId: string) => {
    setActiveSessionId(sessionId);
  };
  
  const handleRenameChat = async (sessionId: string, newTitle: string) => {
    if (!currentUser) return;
    const sessionToUpdate = sessions.find(s => s.id === sessionId);
    if (sessionToUpdate) {
        const updatedSession = { ...sessionToUpdate, title: newTitle };
        const updatedSessions = await apiService.updateSession(currentUser, updatedSession);
        setSessions(updatedSessions);
    }
  };

  const handleDeleteChat = async (sessionId: string) => {
    if (!currentUser) return;
    const updatedSessions = await apiService.deleteSession(currentUser, sessionId);
    setSessions(updatedSessions);
    
    if (activeSessionId === sessionId) {
      if (updatedSessions.length > 0) {
        setActiveSessionId(updatedSessions[0].id);
      } else {
        handleNewChat(); 
      }
    }
    if (updatedSessions.length === 0) {
        localStorage.removeItem(`last-active-session-id-${currentUser}`);
    }
  };

  const handleSendMessage = async (userMessage: string) => {
    if (!chat || isLoading || !activeSessionId || !activeSession || !currentUser) return;

    const newUserMessage: ChatMessage = { role: MessageRole.USER, text: userMessage };
    
    const isFirstUserMessage = activeSession.messages.filter(m => m.role === MessageRole.USER).length === 0;
    const newTitle = isFirstUserMessage ? userMessage.substring(0, 40) + (userMessage.length > 40 ? '...' : '') : activeSession.title;

    const sessionWithUserMessage = {
        ...activeSession,
        title: newTitle,
        messages: [...activeSession.messages, newUserMessage],
    };
    
    setSessions(prev => prev.map(s => s.id === activeSessionId ? sessionWithUserMessage : s));
    setIsLoading(true);
    setError(null);

    try {
      const stream = await chat.sendMessageStream({ message: userMessage });
      let accumulatedText = '';
      
      for await (const chunk of stream) {
        accumulatedText += chunk.text;
        setSessions(prev => prev.map(s => 
            s.id === activeSessionId 
            ? { ...s, messages: [...sessionWithUserMessage.messages, { role: MessageRole.AI, text: accumulatedText }] } 
            : s
        ));
      }
      
      const finalSessionState = {
        ...sessionWithUserMessage,
        messages: [...sessionWithUserMessage.messages, { role: MessageRole.AI, text: accumulatedText }]
      };
      await apiService.updateSession(currentUser, finalSessionState);

    } catch (e) {
      console.error('Error sending message:', e);
      const errorMessage = 'Sorry, something went wrong. Please check your API Key or try again.';
      setError(errorMessage);
       const sessionWithError = {
           ...sessionWithUserMessage,
           messages: [...sessionWithUserMessage.messages, { role: MessageRole.AI, text: errorMessage }]
       };
       setSessions(prev => prev.map(s => s.id === activeSessionId ? sessionWithError : s));
       await apiService.updateSession(currentUser, sessionWithError);

    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveApiKey = () => {
    if (tempApiKey.trim() && currentUser) {
      const key = tempApiKey.trim();
      localStorage.setItem(`gemini-api-key-${currentUser}`, key);
      setApiKey(key);
      setShowApiKeyInput(false);
      setError(null);
    }
  };
  
  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!currentUser) return;
    const newModel = e.target.value;
    setModel(newModel);
    localStorage.setItem(`gemini-model-${currentUser}`, newModel);
  }

  if (!currentUser) {
    return <Login onLogin={handleLogin} />;
  }

  if (showApiKeyInput) {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
            <div className="text-center bg-white dark:bg-gray-800 p-8 rounded-lg shadow-2xl max-w-md w-full">
                <AiIcon className="w-16 h-16 mx-auto mb-4 text-teal-500 dark:text-teal-400"/>
                <h1 className="text-2xl font-bold mb-2">Welcome, {currentUser}!</h1>
                <p className="text-gray-600 dark:text-gray-400 mb-6">Please enter your Google Gemini API key to begin.</p>
                <input
                    type="password"
                    value={tempApiKey}
                    onChange={(e) => setTempApiKey(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSaveApiKey()}
                    className="w-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white p-3 rounded-md mb-4 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    placeholder="Enter your API Key"
                />
                <button
                    onClick={handleSaveApiKey}
                    className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-500 transition-colors duration-200"
                >
                    Save and Start Chatting
                </button>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-4">
                    You can get your key from {' '}
                    <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-indigo-500 dark:text-indigo-400 hover:underline">
                        Google AI Studio
                    </a>.
                </p>
                 {error && <p className="text-red-500 dark:text-red-400 mt-4">{error}</p>}
            </div>
        </div>
    );
  }

  return (
    <div className="flex h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-sans">
      <Sidebar 
        isOpen={isSidebarOpen}
        sessions={sessions}
        activeSessionId={activeSessionId}
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
        onDeleteChat={handleDeleteChat}
        onRenameChat={handleRenameChat}
      />
      <div className="flex-1 flex flex-col transition-all duration-300">
        <header className="bg-white/80 dark:bg-gray-800/70 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 p-4 sticky top-0 z-10">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-3">
                  <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
                      <MenuIcon className="w-6 h-6"/>
                  </button>
                  <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100 hidden sm:block">AI Chat Assistant</h1>
              </div>
              <div className="flex items-center gap-4">
                   <button onClick={handleToggleTheme} className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700" aria-label="Toggle theme">
                        {theme === 'light' ? <MoonIcon className="w-5 h-5"/> : <SunIcon className="w-5 h-5"/>}
                   </button>
                   <select 
                      value={model} 
                      onChange={handleModelChange}
                      className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white text-sm rounded-md p-2 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      aria-label="Select AI model"
                  >
                      {Object.entries(MODELS).map(([key, name]) => (
                          <option key={key} value={key}>{name}</option>
                      ))}
                  </select>
                  <div className="flex items-center gap-2 bg-gray-200 dark:bg-gray-700 rounded-full pr-1 pl-3 py-1">
                      <UserIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                      <span className="font-medium text-sm">{currentUser}</span>
                      <button onClick={handleLogout} className="p-1.5 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600" aria-label="Logout">
                          <LogoutIcon className="w-5 h-5" />
                      </button>
                  </div>
              </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            {messages.map((msg, index) => (
              <ChatMessageComponent
                key={`${activeSessionId}-${index}`}
                message={msg}
                isLoading={isLoading && msg.role === MessageRole.AI && index === messages.length - 1}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
        </main>

        <footer className="sticky bottom-0">
          <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
           {error && <div className="text-center p-2 bg-red-100 dark:bg-red-800/50 text-red-700 dark:text-red-300 text-sm">{error}</div>}
        </footer>
      </div>
    </div>
  );
};

export default App;
