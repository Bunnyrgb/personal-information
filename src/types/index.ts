export type DocumentCategory = 
  | 'Education'
  | 'Identity'
  | 'Finance'
  | 'Medical'
  | 'Employment'
  | 'Insurance'
  | 'Government'
  | 'Certificates'
  | 'Bills'
  | 'Personal'
  | 'Other';

export type ProcessingStatus = 'uploading' | 'ocr' | 'parsing' | 'chunking' | 'embedding' | 'indexing' | 'ready' | 'failed';

export interface ExtractedEntities {
  dates?: string[];
  amounts?: string[];
  organizations?: string[];
  people?: string[];
  idNumbers?: string[];
  expiryDate?: string;
  issueDate?: string;
  cgpa?: string;
  percentage?: string;
  accountNumbers?: string[];
  documentNumber?: string;
  summaryBulletPoints?: string[];
}

export interface DocumentChunk {
  id: string;
  documentId: string;
  pageNumber: number;
  content: string;
  tokens?: number;
  boundingBox?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  embedding?: number[];
}

export interface DocumentItem {
  id: string;
  userId: string;
  name: string;
  originalName: string;
  mimeType: string;
  size: number; // in bytes
  category: DocumentCategory;
  collectionId?: string;
  tags: string[];
  fileUrl: string;
  thumbnailUrl?: string;
  pageCount: number;
  summary: string;
  extractedEntities: ExtractedEntities;
  ocrStatus: 'completed' | 'processing' | 'failed' | 'skipped';
  ocrText?: string;
  status: ProcessingStatus;
  processingProgress: number; // 0-100
  isFavorite: boolean;
  isShared: boolean;
  isTrash: boolean;
  isDemo?: boolean;
  createdAt: string;
  updatedAt: string;
  chunks?: DocumentChunk[];
}

export interface CollectionItem {
  id: string;
  userId: string;
  name: string;
  description: string;
  category?: DocumentCategory;
  iconName: string;
  color: string;
  documentCount: number;
  isSmart: boolean;
  filterKeywords?: string[];
  createdAt: string;
}

export interface SourceCitation {
  documentId: string;
  documentName: string;
  category: DocumentCategory;
  pageNumber: number;
  snippet: string;
  score: number; // 0 - 1 confidence
  highlightText?: string;
}

export interface RAGAnswerResponse {
  query: string;
  answer: string;
  confidence: number;
  sources: SourceCitation[];
  intentDetected?: string;
  followUpSuggestions: string[];
  comparisonData?: {
    entities: { label: string; doc1Val: string; doc2Val: string }[];
    docsCompared: string[];
  };
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  sources?: SourceCitation[];
  confidence?: number;
  followUps?: string[];
  timestamp: string;
  feedback?: 'like' | 'dislike';
}

export interface Conversation {
  id: string;
  userId: string;
  title: string;
  lastQuery: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  plan: 'Starter' | 'Pro' | 'Enterprise';
  storageUsed: number; // in bytes
  storageLimit: number; // in bytes
  totalQueries: number;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  documentName?: string;
  details: string;
  ipAddress: string;
  status: 'success' | 'warning' | 'error';
  timestamp: string;
}

export interface AppNotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'security';
  read: boolean;
  actionUrl?: string;
  createdAt: string;
}

export interface SearchFilter {
  query: string;
  category?: DocumentCategory | 'all';
  fileType?: string | 'all';
  collectionId?: string | 'all';
  dateRange?: 'all' | '7d' | '30d' | '1y';
  onlyFavorites?: boolean;
}
