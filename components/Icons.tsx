
import React from 'react';

export const UserIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
      clipRule="evenodd"
    />
  </svg>
);

export const AiIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12.75 2.25a.75.75 0 00-1.5 0v2.393a15.32 15.32 0 00-3.37 .436c-1.04.22-1.854.992-2.12 2.007-.265 1.015.111 2.058.8 2.748l.32.289c.28.25.48.577.58.932.102.355.102.737 0 1.092-.1.355-.3.682-.58.932l-.32.289c-.69.69-1.065 1.733-.8 2.748.265 1.015 1.08 1.787 2.12 2.007a15.32 15.32 0 003.37.436v2.393a.75.75 0 001.5 0v-2.393a15.32 15.32 0 003.37-.436c1.04-.22 1.854-.992 2.12-2.007.265-1.015-.111-2.058-.8-2.748l-.32-.289a2.25 2.25 0 01-.58-.932c-.102-.355-.102-.737 0-1.092.1-.355.3-.682.58.932l.32.289c.69-.69 1.065 1.733.8-2.748-.265-1.015-1.08-1.787-2.12-2.007a15.32 15.32 0 00-3.37-.436V2.25z" />
  </svg>
);

export const SendIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
  </svg>
);

export const CopyIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M5.25 6.75a2.25 2.25 0 00-2.25 2.25v10.5a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-1.5a.75.75 0 00-1.5 0v1.5a.75.75 0 01-.75.75h-9a.75.75 0 01-.75-.75V9a.75.75 0 01.75-.75h1.5a.75.75 0 000-1.5h-1.5z" />
        <path d="M8.25 4.5a2.25 2.25 0 012.25-2.25h6a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-6a2.25 2.25 0 01-2.25-2.25V4.5zm.75 0v10.5a.75.75 0 00.75.75h6a.75.75 0 00.75-.75V4.5a.75.75 0 00-.75-.75h-6a.75.75 0 00-.75.75z" />
    </svg>
);

export const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
    </svg>
);

export const MenuIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
  </svg>
);

export const PlusIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
  </svg>
);

export const ChatBubbleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M4.804 21.644A6.707 6.707 0 006 21.75a6.75 6.75 0 006.75-6.75v-2.5a.75.75 0 011.5 0v2.5a8.25 8.25 0 01-8.25 8.25c-1.33 0-2.59-.333-3.724-.932l-.546-.272a.75.75 0 01.272-1.454l.547.272a6.707 6.707 0 002.404-.822zM18.75 6.75A6.75 6.75 0 0012 0a6.75 6.75 0 00-6.75 6.75v2.5a.75.75 0 01-1.5 0v-2.5A8.25 8.25 0 0112 1.5a8.25 8.25 0 018.25 8.25v8.25a.75.75 0 01-1.5 0V9.25a6.75 6.75 0 00-6.75-6.75h-1.5a.75.75 0 010-1.5h1.5A6.75 6.75 0 0018.75 6.75z" clipRule="evenodd" />
    </svg>
);

export const TrashIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M16.5 4.5a.75.75 0 01.75.75v0a.75.75 0 01-.75.75h-9a.75.75 0 01-.75-.75v0a.75.75 0 01.75-.75h9zM5.25 6a.75.75 0 01.75.75v10.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25V6.75a.75.75 0 011.5 0v10.5a3.75 3.75 0 01-3.75 3.75h-7.5a3.75 3.75 0 01-3.75-3.75V6.75a.75.75 0 01.75-.75z" clipRule="evenodd" />
    </svg>
);

export const PencilIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
        <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
    </svg>
);

export const SunIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.106a.75.75 0 010 1.06l-1.591 1.59a.75.75 0 11-1.06-1.06l1.59-1.591a.75.75 0 011.06 0zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.803 17.803a.75.75 0 01-1.06 0l-1.59-1.591a.75.75 0 111.06-1.06l1.59 1.59a.75.75 0 010 1.06zM12 21a.75.75 0 01-.75.75v-2.25a.75.75 0 011.5 0V21A.75.75 0 0112 21zM6.106 18.894a.75.75 0 011.06 0l1.59-1.59a.75.75 0 111.06 1.06l-1.59 1.591a.75.75 0 01-1.06 0zM3 12a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5H3.75A.75.75 0 013 12zM6.197 7.197a.75.75 0 010-1.06l1.59-1.591a.75.75 0 111.06 1.06l-1.59 1.59a.75.75 0 01-1.06 0z" />
    </svg>
);

export const MoonIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 004.472-.69a.75.75 0 01.82.162 12 12 0 01-1.598 15.13L15 19.5l-3.379-3.379a12.025 12.025 0 01-4.5-.865 12 12 0 01-6.32-12.32A12 12 0 019.528 1.718z" clipRule="evenodd" />
    </svg>
);

export const LogoutIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z" clipRule="evenodd" />
  </svg>
);
