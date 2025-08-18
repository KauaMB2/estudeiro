import { Button } from '../../../ui/button';
import Image from 'next/image';
import YoutubeIcon from '@/src/assets/youtube-svgrepo-com.svg';
import WebsiteIcon from '@/src/assets/web-svgrepo-com.svg';
import FAQIcon from '@/src/assets/faq-svgrepo-com.svg';
import FileIcon from '@/src/assets/file-check-svgrepo-com.svg';
import { Dispatch, JSX, SetStateAction } from 'react';

export type ActiveTab = 'files' | 'website' | 'youtube' | 'FAQ';

export interface CreateKnowledgeOptionsProps {
  setActiveTab: Dispatch<SetStateAction<ActiveTab>>;
  tabContent: Record<string, JSX.Element>;
  activeTab: string;
}

const CreateKnowledgeOptions = ({ setActiveTab, tabContent, activeTab }: CreateKnowledgeOptionsProps) => {

  return (
    <>
      <div className="flex flex-row justify-between w-full mt-5">
        <div className="flex flex-row justify-between w-full mb-4">
          <Button
            className={`text-white ${activeTab === 'files' ? 'bg-blue-300' : 'bg-slate-300'} hover:bg-blue-200 py-2 h-16 w-full rounded-none rounded-l-lg`}
            onClick={() => setActiveTab('files')}
          >
            <Image src={FileIcon} width={56} className="pr-4" alt="personality" />
            <p className="text-lg	text-black font-bold">Arquivos</p>
          </Button>
          <Button
            className={`text-white ${activeTab === 'website' ? 'bg-blue-300' : 'bg-slate-300'} hover:bg-blue-200 py-2 h-16 w-full rounded-none`}
            onClick={() => setActiveTab('website')}
          >
            <Image src={WebsiteIcon} width={56} className="pr-4" alt="knowledge" />
            <p className="text-lg	text-black font-bold">Website</p>
          </Button>
          <Button
            className={`text-white ${activeTab === 'youtube' ? 'bg-blue-300' : 'bg-slate-300'} hover:bg-blue-200 py-2 h-16 w-full rounded-none`}
            onClick={() => setActiveTab('youtube')}
          >
            <Image src={YoutubeIcon} width={56} className="pr-4" alt="skills" />
            <p className="text-lg	text-black font-bold">Youtube</p>
          </Button>
          <Button
            className={`text-white ${activeTab === 'FAQ' ? 'bg-blue-300' : 'bg-slate-300'} hover:bg-blue-200 py-2 h-16 w-full rounded-none rounded-r-lg`}
            onClick={() => setActiveTab('FAQ')}
          >
            <Image src={FAQIcon} width={56} className="pr-4" alt="training" />
            <p className="text-lg	text-black font-bold">FAQ</p>
          </Button>
        </div>
      </div>
      {tabContent[activeTab]}
    </>
  );
};

export default CreateKnowledgeOptions;
