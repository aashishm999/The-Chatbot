
import React, { useState, useRef, useEffect } from 'react';
import { ChatSession } from '../types';
import { PlusIcon, ChatBubbleIcon, TrashIcon, PencilIcon } from './Icons';

interface SidebarProps {
  isOpen: boolean;
  sessions: ChatSession[];
  activeSessionId: string | null;
  onNewChat: () => void;
  onSelectChat: (sessionId: string) => void;
  onDeleteChat: (sessionId: string) => void;
  onRenameChat: (sessionId: string, newTitle: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, sessions, activeSessionId, onNewChat, onSelectChat, onDeleteChat, onRenameChat }) => {
  const [editingSessionId, setEditingSessionId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (editingSessionId && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editingSessionId]);
  
  const handleStartEditing = (session: ChatSession) => {
    setEditingSessionId(session.id);
    setEditingTitle(session.title);
  };

  const handleSaveRename = () => {
    if (editingSessionId && editingTitle.trim()) {
      onRenameChat(editingSessionId, editingTitle.trim());
    }
    setEditingSessionId(null);
    setEditingTitle('');
  };

  const handleCancelRename = () => {
    setEditingSessionId(null);
    setEditingTitle('');
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSaveRename();
    } else if (e.key === 'Escape') {
      handleCancelRename();
    }
  };

  const handleDelete = (e: React.MouseEvent, sessionId: string) => {
    e.stopPropagation(); // Prevent onSelectChat from firing
    if (window.confirm('Are you sure you want to delete this chat?')) {
        onDeleteChat(sessionId);
    }
  };

  return (
    <aside
      className={`bg-gray-50 dark:bg-gray-800 flex flex-col transition-all duration-300 ease-in-out ${
        isOpen ? 'w-64' : 'w-0'
      } overflow-hidden border-r border-gray-200 dark:border-gray-700`}
    >
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={onNewChat}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 transition-colors"
        >
          <PlusIcon className="w-5 h-5" />
          New Chat
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto p-2 space-y-1">
        {sessions.length > 0 && (
            <h2 className="px-2 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Recent Chats
            </h2>
        )}
        {sessions.map((session) => (
          <a
            key={session.id}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (editingSessionId !== session.id) {
                onSelectChat(session.id);
              }
            }}
            className={`group flex items-center justify-between w-full px-3 py-2 text-sm rounded-md transition-colors ${
              session.id === activeSessionId
                ? 'bg-gray-200 dark:bg-gray-700 text-indigo-600 dark:text-white'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200/50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            {editingSessionId === session.id ? (
              <input
                ref={inputRef}
                type="text"
                value={editingTitle}
                onChange={(e) => setEditingTitle(e.target.value)}
                onKeyDown={handleInputKeyDown}
                onBlur={handleSaveRename}
                className="w-full bg-transparent text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded-sm"
              />
            ) : (
              <>
                <div className="flex items-center gap-3 truncate">
                  <ChatBubbleIcon className="w-5 h-5 flex-shrink-0" />
                  <span className="truncate">{session.title}</span>
                </div>
                <div className="flex items-center flex-shrink-0">
                  <button
                    onClick={(e) => { e.stopPropagation(); handleStartEditing(session); }}
                    className="p-1 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Rename chat"
                  >
                    <PencilIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => handleDelete(e, session.id)}
                    className="p-1 rounded-md text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Delete chat"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}
          </a>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
