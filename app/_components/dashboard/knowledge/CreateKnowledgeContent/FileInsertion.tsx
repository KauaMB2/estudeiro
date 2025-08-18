import { useState } from 'react';
import { FileInsertionProps } from '../interfaces/interfaces';
// import { ExtractTextFromFile } from '../actions/ExtractTextFromFile';
import { Label } from '@/app/_components/ui/label';
import { Button } from '@/app/_components/ui/button';
import CustomDragAndDropInput from '@/app/_components/ui/drag-and-drop-file-input';

const FileInsertion = ({ setExtractorLoading, setExtractedText, setFileName }: FileInsertionProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [resultError, setResultError] = useState('');

  // Handle uploaded Word files
  const handleFileUpload = (uploadedFiles: File[]) => {
    // Process the uploaded files (ensure they're File objects)
    setFiles((prevFiles) => [...prevFiles, ...uploadedFiles]);
  };

  const handleFileSubmit = () => {
    const filesToUpload = files;
    uploadFiles(filesToUpload);
  };

  const uploadFiles = async (files: File[]) => {
    const formData = new FormData();

    // Append the files to FormData
    files.forEach((file) => {
      formData.append('files', file);
    });

    try {
      setExtractorLoading(true);
      setExtractedText('');
      // const response = await ExtractTextFromFile(formData);

      // Display the extracted text in the output container
      const textOutputElement = document.getElementById('text-output');
      if (textOutputElement) {
        const response="";
        setExtractedText(response);
      } else {
        console.error("Element with id 'text-output' not found.");
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setExtractorLoading(false);
    }
  };
  return (
    <>
      <div className="flex flex-col justify-center">
        <Label className="w-[800px] text-left">Extrator de conhecimento em arquivo: </Label>
        <CustomDragAndDropInput
          ownerLicense={files}
          onUpload={handleFileUpload}
          onDelete={(index: number) => setFiles((prev: File[]) => prev.filter((_, i) => i !== index))}
          count={1}
          formats={['pdf', 'doc', 'docx']}
          setResultError={setResultError}
          setFileName={setFileName}
        />
        {files.length > 0 && (
          <div className="flex justify-end mt-2">
            <Button
              id="youtube-scrape-button"
              className="text-white max-w-52 bg-slate-400 hover:bg-green-400 p-2 rounded-md"
              onClick={() => {
                handleFileSubmit();
              }}
            >
              Extrair texto do arquivo
            </Button>
          </div>
        )}
      </div>
      {resultError && <p className="text-red-500 text-sm text-left">{resultError}</p>}
    </>
  );
};

export default FileInsertion;
