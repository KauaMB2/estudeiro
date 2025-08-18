import { Input } from '@/app/_components/ui/input';
import { Label } from '../../../ui/label';
import { CheckboxesProps, WebsiteInsertionProps } from '../interfaces/interfaces';
import { ChangeEvent, useState } from 'react';
import { Button } from '@/app/_components/ui/button';
import { Checkbox } from '@/app/_components/ui/checkbox';
import { checkboxesBlank } from './FAQInsertion';
// import { ExtractTextFromWebsite } from '../actions/ExtractTextFromWebsite';

const WebsiteInsertion = ({
  urlsText,
  setExtractorLoading,
  setExtractedText,
  setURLsText,
}: WebsiteInsertionProps) => {
  const [checkboxes, setCheckboxes] = useState<CheckboxesProps>(checkboxesBlank);
  const [resultError, setResultError] = useState('');
  const handleWebsiteSubmit = async () => {
    if (urlsText.websiteURL === '') {
      setResultError('A URL não pode estar vazia.');
      return;
    }

    const httpsRegex = /^https?:\/\//i;

    const url = urlsText.websiteURL;

    if (!httpsRegex.test(url)) {
      setResultError('A URL deve começar com http ou https.');
      return;
    }

    setExtractorLoading(true);
    setExtractedText('');
    // const response = await ExtractTextFromWebsite({ websiteUrl: urlsText.websiteURL, checkboxes });
    const response="";
    setResultError('');

    const textOutputElement = document.getElementById('text-output');
    if (textOutputElement) {
      setExtractedText(response);
    } else {
      console.error("Element with id 'text-output' not found.");
    }

    setExtractorLoading(false);
  };
  return (
    <div id="url-container" className="mb-6 flex flex-col items-start gap-3">
      <Label htmlFor="url-input" className="text-sm font-medium text-gray-700">
        Extrator de conhecimento de website:
      </Label>
      <div className="flex items-center gap-5 w-full">
        <Input
          type="text"
          id="url-input"
          className="w-[60%] border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Informe a URL do website"
          value={urlsText?.websiteURL}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setURLsText((prev) => {
              return {
                youtubeURL: prev?.youtubeURL ?? '',
                websiteURL: e.target.value,
              };
            });
          }}
        />
        <Button
          onClick={handleWebsiteSubmit}
          id="scrape-button"
          className="text-white bg-slate-400 hover:bg-green-400 p-2 rounded-md"
        >
          Extrair conhecimento do website
        </Button>
      </div>
      <div className="flex gap-1 items-center">
        <Checkbox
          id="recursive-function"
          className="ml-2 data-[state=checked]:bg-blue-400 data-[state=checked]:text-black"
          checked={checkboxes.allRoutes}
          onCheckedChange={() => setCheckboxes((prev) => ({ ...prev, allRoutes: !prev.allRoutes }))}
        />
        <Label htmlFor="recursive-function" className="text-sm font-medium text-gray-700">
          Extrair conteúdo de todas as páginas de mesmo domínio recursivamente.
        </Label>
        <div className="relative group">
          <div className="text-gray-500 bg-gray-200 rounded-full w-5 h-5 flex items-center justify-center cursor-pointer">
            ?
          </div>
          <div className="absolute hidden group-hover:block top-full left-0 mt-1 w-64 p-2 bg-gray-200 text-sm text-gray-700 rounded shadow-md z-10">
            Por padrão, é extraído o conteúdo somente da URL especificada, mas caso essa função seja
            habilitado, o extrator de conhecimento irá navegar em todas as rotas possíveis dentro do domínio
            especificado, extraindo o texto de todas elas. Observação: Isso pode levar a um tempo de execução
            consideravelmente maior dependendo da quantidade de rotas presentes no domínio.
          </div>
        </div>
      </div>

      <div className="flex gap-1 items-center">
        <Checkbox
          id="pdf-urls"
          className="ml-2 data-[state=checked]:bg-blue-400 data-[state=checked]:text-black"
          checked={checkboxes.pdfRoutes}
          onCheckedChange={() => setCheckboxes((prev) => ({ ...prev, pdfRoutes: !prev.pdfRoutes }))}
        />
        <Label htmlFor="pdf-urls" className="text-sm font-medium text-gray-700">
          Extrair conhecimento de rotas com conteúdo PDF.
        </Label>
        <div className="relative group">
          <div className="text-gray-500 bg-gray-200 rounded-full w-5 h-5 flex items-center justify-center cursor-pointer">
            ?
          </div>
          <div className="absolute hidden group-hover:block top-full left-0 mt-1 w-64 p-2 bg-gray-200 text-sm text-gray-700 rounded shadow-md z-10">
            Alguns sites possuem conteúdo PDF em algumas de suas rotas, como manuais técnicos, banners e etc.
            Se você também deseja extrair esse conteúdo, marque a opção.
          </div>
        </div>
      </div>

      {resultError && <p className="text-red-500 text-sm">{resultError}</p>}
    </div>
  );
};

export default WebsiteInsertion;
