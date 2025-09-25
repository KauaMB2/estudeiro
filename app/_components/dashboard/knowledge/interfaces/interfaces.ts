import { AIAgent } from '@/src/utils/models/ai_agent';
import { AIKnowledges } from '@/src/utils/models/ai_knowledge';
import { ColumnDef } from '@tanstack/react-table';
import { Dispatch, JSX, SetStateAction } from 'react';

export type ActiveTab = 'files' | 'website' | 'youtube' | 'FAQ';

export interface CustomFile {
  name: string;
  type: string;
  size: number;
}

export interface DataTableProps<TData extends AIKnowledges, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  allAIAgents: AIAgent[];
}

export interface CheckboxesProps {
  allRoutes: boolean;
  pdfRoutes: boolean;
}

export interface URLsProps {
  websiteURL: string;
  youtubeURL: string;
}

export interface CreateKnowledgeOptionsProps {
  setActiveTab: Dispatch<SetStateAction<ActiveTab>>;
  tabContent: Record<string, JSX.Element>;
  activeTab: string;
}

export interface FileInsertionProps {
  setExtractorLoading: Dispatch<SetStateAction<boolean>>;
  setExtractedText: Dispatch<SetStateAction<string>>;
  setFileName: Dispatch<SetStateAction<string>>;
}

export interface FAQInsertionProps {
  setExtractedText: Dispatch<SetStateAction<string>>;
}

export interface WebsiteInsertionProps {
  urlsText: URLsProps;
  setURLsText: Dispatch<SetStateAction<URLsProps>>;
  setExtractorLoading: Dispatch<SetStateAction<boolean>>;
  setExtractedText: Dispatch<SetStateAction<string>>;
}

export interface YoutubeInsertionProps {
  setURLsText: Dispatch<SetStateAction<URLsProps>>;
  urlsText: URLsProps;
  setExtractorLoading: Dispatch<SetStateAction<boolean>>;
  setExtractedText: Dispatch<SetStateAction<string>>;
}
