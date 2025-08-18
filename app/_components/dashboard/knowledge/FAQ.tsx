import React, { Dispatch, SetStateAction } from 'react';
import { Input } from '@/app/_components/ui/input';
import { X } from 'lucide-react';
import { FAQ } from '@/src/utils/models/faq';

interface FAQListProps {
  index: number;
  FAQs: FAQ[];
  setFAQs: Dispatch<SetStateAction<FAQ[]>>;
  handleDeleteButtonClick: (index: number) => void;
}

const FAQComponent = ({ index, FAQs, setFAQs, handleDeleteButtonClick }: FAQListProps) => {
  return (
    <div key={index} className="flex justify-between">
      <div className="flex justify-start w-5/6 gap-3 my-1">
        <Input
          onChange={(e) => {
            setFAQs((prev) => {
              const updateFAQs = [...prev];
              updateFAQs[index] = {
                ...updateFAQs[index],
                question: e.target.value,
              };
              return updateFAQs;
            });
          }}
          value={FAQs[index].question}
          id="question"
          className="flex-grow max-h-[32px] ml-2"
          placeholder="Pergunta"
          required
        />
        <Input
          onChange={(e) => {
            setFAQs((prev) => {
              const updateFAQs = [...prev];
              updateFAQs[index] = {
                ...updateFAQs[index],
                answer: e.target.value,
              };
              return updateFAQs;
            });
          }}
          value={FAQs[index].answer}
          id="answer"
          className="flex-grow max-h-[32px]"
          placeholder="Resposta"
          required
        />
      </div>
      <div className="flex items-center">
        <button
          onClick={() => {
            handleDeleteButtonClick(index);
          }}
          className="text-white bg-slate-400 hover:bg-red-400 p-1 rounded-md"
        >
          <X size={14} absoluteStrokeWidth />
        </button>
      </div>
    </div>
  );
};

export default FAQComponent;
