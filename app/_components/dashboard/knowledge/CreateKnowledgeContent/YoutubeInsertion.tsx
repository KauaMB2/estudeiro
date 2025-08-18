import { ChangeEvent, useState } from 'react';
import { URLsProps, YoutubeInsertionProps } from '../interfaces/interfaces';
import { Label } from '@/app/_components/ui/label';
import { Input } from '@/app/_components/ui/input';
import { Button } from '@/app/_components/ui/button';
// import { ExtractTextFromYoutubeVideo } from '../actions/ExtractTextFromYoutubeVideo';

const YoutubeInsertion = ({
  setURLsText,
  urlsText,
  setExtractorLoading,
  setExtractedText,
}: YoutubeInsertionProps) => {
  const [resultError, setResultError] = useState('');
  const handleYoutubeSubmit = async () => {
    if (urlsText.youtubeURL === '') {
      setResultError('A URL não pode estar vazia.');
      return;
    }

    // Regular expression to validate YouTube URLs
    const youtubeUrlRegex =
      /^(https?:\/\/)?(www\.)?(youtube|youtu|youtube-nocookie)\.(com|be)\/(?:watch\?v=|.*\/)([a-zA-Z0-9_-]{11})(\S+)?$/;
    // Validate the YouTube URL
    if (!youtubeUrlRegex.test(urlsText.youtubeURL)) {
      setResultError('A URL não é uma URL válido para vídeo do Youtube.');
      return;
    }

    setExtractorLoading(true);
    setExtractedText('');
    // const response = await ExtractTextFromYoutubeVideo(urlsText.youtubeURL);
    const response = "";
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
    <div id="youtube-url-container" className="mb-6 flex flex-col items-start gap-3">
      <Label htmlFor="youtube-url-input" className="text-sm font-medium text-gray-700">
        Extrator de conhecimento de vídeo do YouTube:
      </Label>
      <div className="flex items-center gap-5 w-full">
        <Input
          type="text"
          id="youtube-url-input"
          className="w-[60%] border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Informe a URL do vídeo"
          value={urlsText?.youtubeURL}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setURLsText((prev: URLsProps | undefined) => {
              return {
                youtubeURL: e.target.value,
                websiteURL: prev?.websiteURL ?? '',
              };
            });
          }}
        />
        <Button
          onClick={handleYoutubeSubmit}
          id="youtube-scrape-button"
          className="text-white bg-slate-400 hover:bg-green-400 p-2 rounded-md"
        >
          Extrair conhecimento do vídeo
        </Button>
      </div>
      {resultError && <p className="text-red-500 text-sm">{resultError}</p>}
    </div>
  );
};

export default YoutubeInsertion;
