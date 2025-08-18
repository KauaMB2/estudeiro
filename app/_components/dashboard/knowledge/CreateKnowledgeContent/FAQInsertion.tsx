import { FAQ } from '@/src/utils/models/faq';
import { Label } from '../../../ui/label';
import FAQComponent from '../FAQ';
import { FAQInsertionProps } from '../interfaces/interfaces';
import { Button } from '@/app/_components/ui/button';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { AIKnowledges } from '@/src/utils/models/ai_knowledge';

export const URLsBlank: URLsProps = {
  websiteURL: '',
  youtubeURL: '',
};

export interface CheckboxesProps {
  allRoutes: boolean;
  pdfRoutes: boolean;
}

export interface URLsProps {
  websiteURL: string;
  youtubeURL: string;
}

export const checkboxesBlank: CheckboxesProps = { allRoutes: false, pdfRoutes: false };

export const blankFAQList: FAQ[] = [{ question: '', answer: '' }];

export const blankAIKnowledge: AIKnowledges = {
  aiAgentId: -1,
  type: '',
  reference: '',
  size: -1,
  status: -1,
};


const FAQInsertion = ({ setExtractedText }: FAQInsertionProps) => {
  const [FAQs, setFAQs] = useState<FAQ[]>(blankFAQList);
  const [resultError, setResultError] = useState('');
  const handleFAQSubmit = () => {
    const hasEmptyFields = FAQs.some((filter: FAQ) => {
      return filter.question === '' || filter.answer === '';
    });
    if (hasEmptyFields) {
      setResultError('Nenhuma informação do FAQ pode estar vazia.');
      return;
    }

    let extractedText: string = 'FAQ - DÚVIDAS FREQUENTES: \n\n';
    FAQs.forEach((faq: FAQ, index: number) => {
      extractedText += `Pergunta ${index + 1}: ${faq.question}\nResposta ${index + 1}: ${faq.answer}\n\n`;
    });

    setResultError('');

    setExtractedText(extractedText);
  };
  return (
    <div className="flex w-2/3 flex-col gap-4">
      <div className="flex justify-between">
        <Label htmlFor="FAQ-list" className="text-left">
          Lista de perguntas frequentes (FAQ):
        </Label>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => {
              setFAQs((prev: FAQ[]) => {
                setResultError('');
                return [...prev, { question: '', answer: '' }];
              });
            }}
            className="text-white bg-slate-400 hover:bg-green-400 p-1 rounded-md"
          >
            <Plus size={14} absoluteStrokeWidth />
          </button>
        </div>
      </div>
      <div className="max-h-[240px] overflow-y-auto">
        {FAQs.map((_: FAQ, index: number) => (
          <FAQComponent
            key={index}
            index={index}
            FAQs={FAQs}
            setFAQs={setFAQs}
            handleDeleteButtonClick={() => {
              setFAQs((prev: FAQ[]) => prev.filter((_, key) => index !== key));
              setResultError('');
            }}
          />
        ))}
      </div>
      {resultError && <p className="text-red-500 text-sm">{resultError}</p>}
      <Button
        className="w-36 text-white bg-slate-400 hover:bg-green-400 p-2 rounded-md"
        onClick={handleFAQSubmit}
      >
        Extrair FAQ
      </Button>
    </div>
  );
};

export default FAQInsertion;
