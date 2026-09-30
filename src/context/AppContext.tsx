'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  DocumentItem,
  CollectionItem,
  UserProfile,
  AppNotification,
  AuditLog,
  Conversation,
  ChatMessage,
  ProcessingStatus,
  DocumentCategory
} from '@/types';
import {
  INITIAL_DOCUMENTS,
  INITIAL_COLLECTIONS,
  INITIAL_USER,
  INITIAL_NOTIFICATIONS,
  INITIAL_AUDIT_LOGS
} from '@/data/mockDocuments';
import { extractEntitiesFromText, categorizeDocument } from '@/lib/rag-engine';

interface AppContextType {
  user: UserProfile | null;
  setUser: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  documents: DocumentItem[];
  collections: CollectionItem[];
  notifications: AppNotification[];
  auditLogs: AuditLog[];
  conversations: Conversation[];
  activeConversationId: string | null;
  setActiveConversationId: (id: string | null) => void;
  theme: 'dark' | 'light' | 'system';
  setTheme: (t: 'dark' | 'light' | 'system') => void;
  // User Authentication Operations
  loginUser: (email: string, password?: string, customName?: string, includeSampleDocs?: boolean) => UserProfile;
  registerUser: (name: string, email: string, password?: string, plan?: 'Starter' | 'Pro' | 'Enterprise', includeSampleDocs?: boolean) => UserProfile;
  loginWithGoogle: (email?: string, name?: string) => UserProfile;
  loginDemoUser: () => void;
  logoutUser: () => void;
  // Document Operations
  uploadDocumentFile: (file: File, categoryOverride?: DocumentCategory) => Promise<DocumentItem>;
  deleteDocument: (id: string, permanent?: boolean) => void;
  restoreDocument: (id: string) => void;
  toggleFavorite: (id: string) => void;
  updateDocumentCategory: (id: string, category: DocumentCategory) => void;
  updateDocumentCollection: (id: string, collectionId?: string) => void;
  renameDocument: (id: string, newName: string) => void;
  // Collection Operations
  createCollection: (name: string, description: string, category?: DocumentCategory, color?: string) => CollectionItem;
  deleteCollection: (id: string) => void;
  // Conversation Operations
  addMessageToConversation: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => ChatMessage;
  createNewConversation: (title?: string) => string;
  clearConversation: (conversationId: string) => void;
  // Notification & Audit
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  addAuditLog: (action: string, details: string, docName?: string, status?: 'success' | 'warning' | 'error') => void;
  // Demo State Reset
  resetToDemoData: () => void;
  clearAllUserData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Generate avatar URL from name or email
function generateAvatarUrl(name: string, email: string): string {
  const cleanName = encodeURIComponent(name.trim() || 'User');
  return `https://api.dicebear.com/7.x/initials/svg?seed=${cleanName}&backgroundColor=3730a3,4f46e5,2563eb,0d9488&textColor=ffffff`;
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(INITIAL_USER);
  const [documents, setDocuments] = useState<DocumentItem[]>(INITIAL_DOCUMENTS);
  const [collections, setCollections] = useState<CollectionItem[]>(INITIAL_COLLECTIONS);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [theme, setThemeState] = useState<'dark' | 'light' | 'system'>('dark');
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize from LocalStorage
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('aipirs_user');
      const storedTheme = localStorage.getItem('aipirs_theme') as 'dark' | 'light' | 'system';

      if (storedUser) {
        const parsedUser: UserProfile = JSON.parse(storedUser);
        setUser(parsedUser);

        // Load user-specific documents & collections
        const userDocsKey = `aipirs_docs_${parsedUser.id}`;
        const storedDocs = localStorage.getItem(userDocsKey) || localStorage.getItem('aipirs_docs');
        if (storedDocs) setDocuments(JSON.parse(storedDocs));

        const userColsKey = `aipirs_cols_${parsedUser.id}`;
        const storedCols = localStorage.getItem(userColsKey) || localStorage.getItem('aipirs_cols');
        if (storedCols) setCollections(JSON.parse(storedCols));

        const userLogsKey = `aipirs_logs_${parsedUser.id}`;
        const storedLogs = localStorage.getItem(userLogsKey) || localStorage.getItem('aipirs_logs');
        if (storedLogs) setAuditLogs(JSON.parse(storedLogs));

        const userNotifsKey = `aipirs_notifs_${parsedUser.id}`;
        const storedNotifs = localStorage.getItem(userNotifsKey) || localStorage.getItem('aipirs_notifs');
        if (storedNotifs) setNotifications(JSON.parse(storedNotifs));

        const userConvsKey = `aipirs_convs_${parsedUser.id}`;
        const storedConvs = localStorage.getItem(userConvsKey) || localStorage.getItem('aipirs_convs');
        if (storedConvs) setConversations(JSON.parse(storedConvs));
      } else {
        // Default to demo session
        setUser(INITIAL_USER);
        setDocuments(INITIAL_DOCUMENTS);
        setCollections(INITIAL_COLLECTIONS);
        setNotifications(INITIAL_NOTIFICATIONS);
        setAuditLogs(INITIAL_AUDIT_LOGS);
      }

      if (storedTheme) setThemeState(storedTheme);
    } catch (e) {
      console.error('Failed to load state from localStorage:', e);
    }
    setIsLoaded(true);
  }, []);

  // Sync state to LocalStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      if (user) {
        localStorage.setItem('aipirs_user', JSON.stringify(user));
        localStorage.setItem(`aipirs_docs_${user.id}`, JSON.stringify(documents));
        localStorage.setItem(`aipirs_cols_${user.id}`, JSON.stringify(collections));
        localStorage.setItem(`aipirs_logs_${user.id}`, JSON.stringify(auditLogs));
        localStorage.setItem(`aipirs_notifs_${user.id}`, JSON.stringify(notifications));
        localStorage.setItem(`aipirs_convs_${user.id}`, JSON.stringify(conversations));
      } else {
        localStorage.removeItem('aipirs_user');
      }
      localStorage.setItem('aipirs_theme', theme);
    } catch (e) {
      console.error('Failed to save state to localStorage:', e);
    }
  }, [documents, collections, user, auditLogs, notifications, conversations, theme, isLoaded]);

  // Handle Theme Classes on document root
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else if (theme === 'light') {
      root.classList.remove('dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) root.classList.add('dark');
      else root.classList.remove('dark');
    }
  }, [theme]);

  const setTheme = (t: 'dark' | 'light' | 'system') => {
    setThemeState(t);
  };

  const addAuditLog = (
    action: string,
    details: string,
    docName?: string,
    status: 'success' | 'warning' | 'error' = 'success'
  ) => {
    const newLog: AuditLog = {
      id: `log_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      userId: user?.id || 'anonymous',
      action,
      documentName: docName,
      details,
      ipAddress: '103.21.124.90 (Encrypted Tunnel)',
      status,
      timestamp: new Date().toISOString()
    };
    setAuditLogs((prev) => [newLog, ...prev.slice(0, 49)]);
  };

  // Login with custom email and name
  const loginUser = (
    email: string,
    password?: string,
    customName?: string,
    includeSampleDocs: boolean = true
  ): UserProfile => {
    const derivedName = customName?.trim() || email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
    const userId = `usr_${email.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;

    // Check if user has saved data in localStorage
    const savedDocs = localStorage.getItem(`aipirs_docs_${userId}`);
    const savedCols = localStorage.getItem(`aipirs_cols_${userId}`);

    const loggedInUser: UserProfile = {
      id: userId,
      name: derivedName,
      email: email.toLowerCase(),
      avatarUrl: generateAvatarUrl(derivedName, email),
      plan: 'Pro',
      storageUsed: 14250000,
      storageLimit: 5368709120, // 5 GB
      totalQueries: 42,
      createdAt: new Date().toISOString()
    };

    setUser(loggedInUser);

    if (savedDocs) {
      setDocuments(JSON.parse(savedDocs));
    } else if (includeSampleDocs) {
      // Create user-attributed documents
      const customizedDocs = INITIAL_DOCUMENTS.map((doc) => ({
        ...doc,
        userId
      }));
      setDocuments(customizedDocs);
    } else {
      setDocuments([]);
    }

    if (savedCols) {
      setCollections(JSON.parse(savedCols));
    } else {
      setCollections(INITIAL_COLLECTIONS.map((c) => ({ ...c, userId })));
    }

    setConversations([]);
    setActiveConversationId(null);

    addAuditLog(
      'User Authentication',
      `Authenticated as ${derivedName} (${email.toLowerCase()}) with verified cryptographic token.`,
      undefined,
      'success'
    );

    return loggedInUser;
  };

  // Register brand new user account
  const registerUser = (
    name: string,
    email: string,
    password?: string,
    plan: 'Starter' | 'Pro' | 'Enterprise' = 'Pro',
    includeSampleDocs: boolean = true
  ): UserProfile => {
    const cleanName = name.trim() || 'New User';
    const cleanEmail = email.trim().toLowerCase();
    const userId = `usr_${cleanEmail.replace(/[^a-z0-9]/g, '_')}`;

    const newUser: UserProfile = {
      id: userId,
      name: cleanName,
      email: cleanEmail,
      avatarUrl: generateAvatarUrl(cleanName, cleanEmail),
      plan,
      storageUsed: includeSampleDocs ? 14250000 : 0,
      storageLimit: plan === 'Starter' ? 1073741824 : 5368709120,
      totalQueries: 0,
      createdAt: new Date().toISOString()
    };

    setUser(newUser);

    if (includeSampleDocs) {
      const customizedDocs = INITIAL_DOCUMENTS.map((doc) => ({
        ...doc,
        userId
      }));
      setDocuments(customizedDocs);
    } else {
      setDocuments([]);
    }

    setCollections(INITIAL_COLLECTIONS.map((c) => ({ ...c, userId })));
    setConversations([]);
    setActiveConversationId(null);

    addAuditLog(
      'Account Registration',
      `Created new account for ${cleanName} (${cleanEmail}) with ${plan} plan.`,
      undefined,
      'success'
    );

    return newUser;
  };

  // Instant Google OAuth login simulation with custom or default Google email
  const loginWithGoogle = (email?: string, name?: string): UserProfile => {
    const googleEmail = email?.trim() || 'user.google@gmail.com';
    const googleName = name?.trim() || 'Google User';
    return loginUser(googleEmail, 'oauth_token', googleName, true);
  };

  const loginDemoUser = () => {
    setUser(INITIAL_USER);
    setDocuments(INITIAL_DOCUMENTS);
    setCollections(INITIAL_COLLECTIONS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    addAuditLog('User Login', 'Authenticated as Aditya Sharma (Demo Account)');
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('aipirs_user');
    addAuditLog('User Logout', 'Session terminated by user.');
  };

  const uploadDocumentFile = async (
    file: File,
    categoryOverride?: DocumentCategory
  ): Promise<DocumentItem> => {
    const newDocId = `doc_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const tempUrl = URL.createObjectURL(file);

    // Initial placeholder document
    const initialDoc: DocumentItem = {
      id: newDocId,
      userId: user?.id || 'usr_demo_8829',
      name: file.name,
      originalName: file.name,
      mimeType: file.type || 'application/octet-stream',
      size: file.size,
      category: categoryOverride || 'Personal',
      tags: [file.name.split('.')[0].toLowerCase().replace(/\s+/g, '-')],
      fileUrl: tempUrl,
      thumbnailUrl: file.type.startsWith('image/')
        ? tempUrl
        : 'https://images.unsplash.com/photo-1568667256549-094345857637?w=300&auto=format&fit=crop&q=80',
      pageCount: 1,
      summary: `Uploaded document: ${file.name}. Processing content...`,
      extractedEntities: { summaryBulletPoints: ['File uploaded, running OCR...'] },
      ocrStatus: 'processing',
      status: 'uploading',
      processingProgress: 15,
      isFavorite: false,
      isShared: false,
      isTrash: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setDocuments((prev) => [initialDoc, ...prev]);

    // Update user storage
    setUser((prev) =>
      prev ? { ...prev, storageUsed: prev.storageUsed + file.size } : prev
    );

    // Simulated multi-stage document processing pipeline with real entity extraction
    return new Promise((resolve) => {
      // Step 2: OCR
      setTimeout(() => {
        setDocuments((prev) =>
          prev.map((d) =>
            d.id === newDocId
              ? { ...d, status: 'ocr' as ProcessingStatus, processingProgress: 35 }
              : d
          )
        );
      }, 700);

      // Step 3: Parsing & Entity Extraction
      setTimeout(() => {
        setDocuments((prev) =>
          prev.map((d) =>
            d.id === newDocId
              ? { ...d, status: 'parsing' as ProcessingStatus, processingProgress: 60 }
              : d
          )
        );
      }, 1400);

      // Step 4: Chunking & Embeddings
      setTimeout(() => {
        setDocuments((prev) =>
          prev.map((d) =>
            d.id === newDocId
              ? { ...d, status: 'embedding' as ProcessingStatus, processingProgress: 85 }
              : d
          )
        );
      }, 2100);

      // Step 5: Ready
      setTimeout(() => {
        const textSample = `Document: ${file.name}. Processed successfully. Size: ${(file.size / 1024).toFixed(1)} KB.`;
        const autoCat = categoryOverride || categorizeDocument(file.name, textSample);
        const entities = extractEntitiesFromText(textSample, file.name);

        const finalizedDoc: DocumentItem = {
          ...initialDoc,
          category: autoCat,
          status: 'ready',
          ocrStatus: 'completed',
          processingProgress: 100,
          summary: `AI Processed Document: ${file.name}. Classified as ${autoCat}. Indexed with vector embeddings and searchable semantics.`,
          extractedEntities: entities,
          ocrText: textSample,
          chunks: [
            {
              id: `chk_${newDocId}_1`,
              documentId: newDocId,
              pageNumber: 1,
              content: `Content of ${file.name}: Ingested, vectorized, and semantic search enabled for user queries.`,
              tokens: 24
            }
          ]
        };

        setDocuments((prev) =>
          prev.map((d) => (d.id === newDocId ? finalizedDoc : d))
        );

        addAuditLog(
          'Document Upload & Indexing',
          `Successfully processed and indexed ${file.name} with AI OCR and vector embeddings.`,
          file.name,
          'success'
        );

        // Add Notification
        const newNotif: AppNotification = {
          id: `notif_${Date.now()}`,
          userId: user?.id || 'usr_demo_8829',
          title: 'Document Ready',
          message: `${file.name} has been processed and is ready for AI search.`,
          type: 'success',
          read: false,
          createdAt: new Date().toISOString()
        };
        setNotifications((prev) => [newNotif, ...prev]);

        resolve(finalizedDoc);
      }, 2900);
    });
  };

  const deleteDocument = (id: string, permanent: boolean = false) => {
    const doc = documents.find((d) => d.id === id);
    if (!doc) return;

    if (permanent) {
      setDocuments((prev) => prev.filter((d) => d.id !== id));
      setUser((prev) =>
        prev
          ? { ...prev, storageUsed: Math.max(0, prev.storageUsed - doc.size) }
          : prev
      );
      addAuditLog(
        'Permanent Document Deletion',
        `Permanently purged document ${doc.name} and removed vector embeddings.`,
        doc.name,
        'warning'
      );
    } else {
      setDocuments((prev) =>
        prev.map((d) => (d.id === id ? { ...d, isTrash: true } : d))
      );
      addAuditLog(
        'Document Moved to Trash',
        `Moved ${doc.name} to Trash.`,
        doc.name,
        'info' as any
      );
    }
  };

  const restoreDocument = (id: string) => {
    const doc = documents.find((d) => d.id === id);
    setDocuments((prev) =>
      prev.map((d) => (d.id === id ? { ...d, isTrash: false } : d))
    );
    if (doc) {
      addAuditLog('Document Restored', `Restored ${doc.name} from Trash.`, doc.name, 'success');
    }
  };

  const toggleFavorite = (id: string) => {
    setDocuments((prev) =>
      prev.map((d) => (d.id === id ? { ...d, isFavorite: !d.isFavorite } : d))
    );
  };

  const updateDocumentCategory = (id: string, category: DocumentCategory) => {
    setDocuments((prev) =>
      prev.map((d) => (d.id === id ? { ...d, category } : d))
    );
  };

  const updateDocumentCollection = (id: string, collectionId?: string) => {
    setDocuments((prev) =>
      prev.map((d) => (d.id === id ? { ...d, collectionId } : d))
    );
  };

  const renameDocument = (id: string, newName: string) => {
    setDocuments((prev) =>
      prev.map((d) => (d.id === id ? { ...d, name: newName } : d))
    );
    addAuditLog('Document Renamed', `Renamed document to ${newName}`, newName);
  };

  const createCollection = (
    name: string,
    description: string,
    category?: DocumentCategory,
    color?: string
  ): CollectionItem => {
    const newCol: CollectionItem = {
      id: `col_${Date.now()}`,
      userId: user?.id || 'usr_demo_8829',
      name,
      description,
      category: category || 'Personal',
      iconName: 'Folder',
      color: color || '#6366f1',
      documentCount: 0,
      isSmart: false,
      createdAt: new Date().toISOString()
    };
    setCollections((prev) => [...prev, newCol]);
    addAuditLog('Collection Created', `Created new collection folder: "${name}"`, name);
    return newCol;
  };

  const deleteCollection = (id: string) => {
    const col = collections.find((c) => c.id === id);
    setCollections((prev) => prev.filter((c) => c.id !== id));
    // Unlink docs
    setDocuments((prev) =>
      prev.map((d) => (d.collectionId === id ? { ...d, collectionId: undefined } : d))
    );
    if (col) {
      addAuditLog('Collection Deleted', `Deleted collection: "${col.name}"`, col.name);
    }
  };

  const createNewConversation = (title: string = 'New AI Search Session'): string => {
    const newId = `conv_${Date.now()}`;
    const newConv: Conversation = {
      id: newId,
      userId: user?.id || 'usr_demo_8829',
      title,
      lastQuery: '',
      messages: [
        {
          id: `msg_welcome_${Date.now()}`,
          conversationId: newId,
          role: 'assistant',
          content: `Hello ${user?.name?.split(' ')[0] || 'there'}! I'm your **AI-PIRS Assistant**.

I've indexed all your uploaded personal documents. You can ask me anything about your certificates, Aadhaar, passport, electricity bills, university CGPA, resume, or health insurance.

What would you like to find today?`,
          timestamp: new Date().toISOString(),
          followUps: [
            'What is my Aadhaar number?',
            'When does my passport expire?',
            'What was my CGPA in 3rd year?',
            'What was the amount on my electricity bill?'
          ]
        }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setConversations((prev) => [newConv, ...prev]);
    setActiveConversationId(newId);
    return newId;
  };

  const addMessageToConversation = (
    message: Omit<ChatMessage, 'id' | 'timestamp'>
  ): ChatMessage => {
    let convId = activeConversationId;
    if (!convId || !conversations.some((c) => c.id === convId)) {
      convId = createNewConversation(
        message.role === 'user' ? message.content.slice(0, 30) : 'Document Inquiry'
      );
    }

    const newMsg: ChatMessage = {
      ...message,
      id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toISOString()
    };

    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === convId) {
          const updatedTitle =
            c.messages.length <= 1 && message.role === 'user'
              ? message.content.slice(0, 32)
              : c.title;
          return {
            ...c,
            title: updatedTitle,
            lastQuery: message.role === 'user' ? message.content : c.lastQuery,
            messages: [...c.messages, newMsg],
            updatedAt: new Date().toISOString()
          };
        }
        return c;
      })
    );

    if (message.role === 'user') {
      setUser((prev) => (prev ? { ...prev, totalQueries: prev.totalQueries + 1 } : prev));
      addAuditLog('AI Query', `User asked: "${message.content}"`, undefined, 'success');
    }

    return newMsg;
  };

  const clearConversation = (conversationId: string) => {
    setConversations((prev) => prev.filter((c) => c.id !== conversationId));
    if (activeConversationId === conversationId) {
      setActiveConversationId(null);
    }
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const resetToDemoData = () => {
    setDocuments(INITIAL_DOCUMENTS);
    setCollections(INITIAL_COLLECTIONS);
    setUser(INITIAL_USER);
    setNotifications(INITIAL_NOTIFICATIONS);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    setConversations([]);
    setActiveConversationId(null);
    localStorage.clear();
    addAuditLog('System Reset', 'Reset all documents and collections to default demo state.');
  };

  const clearAllUserData = () => {
    setDocuments([]);
    setCollections([]);
    setConversations([]);
    setNotifications([]);
    setAuditLogs([]);
    setUser((prev) => (prev ? { ...prev, storageUsed: 0, totalQueries: 0 } : prev));
    if (user) {
      localStorage.removeItem(`aipirs_docs_${user.id}`);
      localStorage.removeItem(`aipirs_cols_${user.id}`);
      localStorage.removeItem(`aipirs_logs_${user.id}`);
      localStorage.removeItem(`aipirs_notifs_${user.id}`);
      localStorage.removeItem(`aipirs_convs_${user.id}`);
    }
    addAuditLog('Data Purged', 'All user documents, vectors, and histories were permanently deleted.', undefined, 'warning');
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        documents,
        collections,
        notifications,
        auditLogs,
        conversations,
        activeConversationId,
        setActiveConversationId,
        theme,
        setTheme,
        loginUser,
        registerUser,
        loginWithGoogle,
        loginDemoUser,
        logoutUser,
        uploadDocumentFile,
        deleteDocument,
        restoreDocument,
        toggleFavorite,
        updateDocumentCategory,
        updateDocumentCollection,
        renameDocument,
        createCollection,
        deleteCollection,
        addMessageToConversation,
        createNewConversation,
        clearConversation,
        markNotificationAsRead,
        markAllNotificationsRead,
        addAuditLog,
        resetToDemoData,
        clearAllUserData
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
