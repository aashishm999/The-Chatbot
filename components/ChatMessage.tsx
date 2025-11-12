
import React, { useState } from 'react';
import { ChatMessage, MessageRole } from '../types';
import { UserIcon, AiIcon, CopyIcon, CheckIcon } from './Icons';

interface ChatMessageProps {
  message: ChatMessage;
  isLoading?: boolean;
}

const ChatMessageComponent: React.FC<ChatMessageProps> = ({ message, isLoading = false }) => {
  const [isCopied, setIsCopied] = useState(false);
  const isUser = message.role === MessageRole.USER;

  const containerClasses = `group relative flex items-start gap-4 p-4 ${
    isUser ? '' : 'bg-gray-100 dark:bg-gray-800/50'
  }`;
  
  const avatarContainerClasses = `flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
    isUser ? 'bg-indigo-500 text-white' : 'bg-teal-500 text-white'
  }`;

  const textClasses = "text-gray-800 dark:text-gray-200 whitespace-pre-wrap leading-relaxed";

  const handleCopy = () => {
    if (isCopied) return;
    navigator.clipboard.writeText(message.text).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };

  // A simple markdown-like renderer for newlines and bolding
  const renderText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }
      return part.split('\n').map((line, lineIndex) => (
        <React.Fragment key={`${index}-${lineIndex}`}>
          {line}
          {lineIndex < part.split('\n').length - 1 && <br />}
        </React.Fragment>
      ));
    });
  };

  return (
    <div className={containerClasses}>
      <div className={avatarContainerClasses}>
        {isUser ? (
          <UserIcon className="w-5 h-5" />
        ) : (
          <AiIcon className="w-5 h-5" />
        )}
      </div>
      <div className="flex-grow pt-0.5">
        {!isUser && isLoading && !message.text ? (
            <div className="flex items-center gap-2 pt-1.5">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0s'}}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
            </div>
        ) : (
            <p className={textClasses}>
              {renderText(message.text)}
            </p>
        )}
      </div>
       {!isUser && message.text && (
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 p-1.5 rounded-md bg-gray-200/50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 hover:bg-gray-300/70 dark:hover:bg-gray-600/70 hover:text-gray-800 dark:hover:text-white transition-opacity opacity-0 group-hover:opacity-100 focus:opacity-100"
          aria-label={isCopied ? 'Copied!' : 'Copy to clipboard'}
        >
          {isCopied ? <CheckIcon className="w-4 h-4 text-green-500 dark:text-green-400" /> : <CopyIcon className="w-4 h-4" />}
        </button>
      )}
    </div>
  );
};

export default ChatMessageComponent;