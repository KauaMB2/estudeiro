'use client';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/app/_components/ui/select';
import React, { JSX, useEffect, useState } from 'react';
import { Button } from '../../ui/button';
import { Label } from '../../ui/label';
// import { ActiveTab, URLsProps } from './interfaces/interfaces';
// import { URLsBlank } from './blankValues/blankValues';
import Link from 'next/link';
import Image from 'next/image';
import loadingGif from '@/src/assets/icons8-loading-circle.gif';
import { AIAgent } from '@/src/utils/models/ai_agent';
// import { getAllAIAgent } from '../agents/actions/GetAllAIAgent';
import FileInsertion from './CreateKnowledgeContent/FileInsertion';
import CreateKnowledgeOptions, { ActiveTab } from './CreateKnowledgeContent/CreateKnowledgeOptions';
import YoutubeInsertion from './CreateKnowledgeContent/YoutubeInsertion';
import FAQInsertion, { URLsBlank } from './CreateKnowledgeContent/FAQInsertion';
// import { createAIKnowledge } from './actions/CreateKnowledge';
import { useRouter } from 'next/navigation';
import WebsiteInsertion from './CreateKnowledgeContent/WebsiteInsertion';

export interface URLsProps {
  websiteURL: string;
  youtubeURL: string;
}

const CreateAIKnowledge = () => {
  // State to track the files
  const [urlsText, setURLsText] = useState<URLsProps>(URLsBlank);
  const [resultError, setResultError] = useState<string>('');
  const [extractorLoading, setExtractorLoading] = useState<boolean>(false);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [extractedText, setExtractedText] = useState<string>('');
  const [allAIAgent, setAllAIAgent] = useState<AIAgent[]>([]);
  const [aiAgentId, setAIAgentId] = useState<number>(-1);
  const [activeTab, setActiveTab] = useState<ActiveTab>('files');
  const [fileName, setFileName] = useState<string>('');

  const router = useRouter();

  useEffect(() => {
    const fetchAgentList = async () => {
      // const allAIAgent: AIAgent[] = await getAllAIAgent();
      const allAIAgent: AIAgent[] = [];
      setAllAIAgent(allAIAgent);
    };
    fetchAgentList();
  }, []);

  const tabContent: Record<string, JSX.Element> = {
    files: (
      <FileInsertion
        setExtractorLoading={setExtractorLoading}
        setExtractedText={setExtractedText}
        setFileName={setFileName}
      />
    ),
    website: (
      <WebsiteInsertion
        urlsText={urlsText}
        setExtractorLoading={setExtractorLoading}
        setExtractedText={setExtractedText}
        setURLsText={setURLsText}
      />
    ),
    youtube: (
      <YoutubeInsertion
        setURLsText={setURLsText}
        urlsText={urlsText}
        setExtractorLoading={setExtractorLoading}
        setExtractedText={setExtractedText}
      />
    ),
    FAQ: <FAQInsertion setExtractedText={setExtractedText} />,
  };

  const handleKnowledgeSubmit = async () => {
    if (aiAgentId === -1 || !extractedText) {
      setResultError('Por favor, selecione um agente e insira algum conhecimento.');
      return;
    }

    // Determine the type of the knowledge based on the active tab
    let type: string;
    let reference: string;
    switch (activeTab) {
      case 'files': {
        const fileExtension = fileName.toLowerCase().split('.').pop();
        if (fileExtension === 'pdf') {
          type = 'PDF';
        } else if (fileExtension === 'doc' || fileExtension === 'docx') {
          type = 'Word';
        } else {
          type = 'Arquivo';
        }
        reference = fileName;
        break;
      }
      case 'website':
        type = 'Website';
        reference = urlsText.websiteURL || '';
        break;
      case 'youtube':
        type = 'Youtube';
        reference = urlsText.youtubeURL || '';
        break;
      case 'FAQ':
        type = 'FAQ';
        reference = 'FAQ';
        break;
      default:
        type = 'unknown';
        reference = '';
    }

    const createAIKnowledgeObj = {
      aiAgentId,
      type,
      reference,
      extractedText,
    };

    try {
      // Send the data to the backend
      setSubmitLoading(true);
      // const result = await createAIKnowledge(createAIKnowledgeObj);
      const result="S";
      if (result) {
        router.push('./');
      } else {
        setSubmitLoading(false);
        setResultError('Houve um erro na inserção do conhecimento. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao enviar conhecimento:', error);
      setSubmitLoading(false);
      alert('Ocorreu um erro ao enviar o conhecimento.');
    }
  };

  return (
    <>
      <div className="p-5 border-b-[1px] w-full flex justify-start items-center">
        <div className="text-lg font-bold">Criar novo conhecimento do agente</div>
      </div>
      <div className="mx-auto text-center bg-white rounded-lg px-8">
        <CreateKnowledgeOptions setActiveTab={setActiveTab} tabContent={tabContent} activeTab={activeTab} />
        <div className="flex flex-col items-start mt-10 gap-4">
          <Label htmlFor="ai-agent">Agente:</Label>
          <Select
            value={aiAgentId ? aiAgentId.toString() : '-1'}
            onValueChange={(value) => setAIAgentId(parseInt(value))}
          >
            <SelectTrigger id="channel" className="w-64">
              <SelectValue placeholder={aiAgentId ? aiAgentId.toString() : 'Selecione um canal'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem key={-1} value={'-1'} className="w-full text-left p-2 hover:bg-gray-100">
                Nenhum
              </SelectItem>
              {allAIAgent?.map((user: AIAgent) => (
                <SelectItem
                  key={user.id}
                  value={user.id?.toString() || ''}
                  className="w-full text-left p-2 hover:bg-gray-100"
                >
                  {user.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div
          id="text-output"
          className="h-60 p-4 border border-gray-300 rounded-lg overflow-y-auto bg-gray-50 my-6"
        >
          {extractorLoading ? (
            <div className="flex justify-center items-center h-full">
              <Image width={24} height={24} src={loadingGif} alt="Loading extraction..." />
            </div>
          ) : (
            <p
              dangerouslySetInnerHTML={{
                __html: extractedText.replace(/\n/g, '<br/>'),
              }}
            />
          )}
        </div>
      </div>
      {resultError && <p className="text-red-500 text-sm">{resultError}</p>}
      <div className="flex justify-end items-center h-20 gap-5 pr-8">
        <Link
          href="./"
          className="h-10 px-4 py-2 text-white bg-slate-400 hover:bg-purple-400 p-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 float"
        >
          Voltar
        </Link>

        {submitLoading ? (
          <div className="flex justify-center items-center h-full">
            <Image width={24} height={24} src={loadingGif} alt="Loading submit..." />
          </div>
        ) : (
          <Button
            className="w-42 text-white bg-slate-400 hover:bg-green-400 p-2 rounded-md float-right"
            onClick={handleKnowledgeSubmit}
          >
            Inserir conhecimento
          </Button>
        )}
      </div>
    </>
  );
};

export default CreateAIKnowledge;
