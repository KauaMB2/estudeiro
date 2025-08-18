import { useRef, useEffect, useState, useCallback, ChangeEvent, SetStateAction, Dispatch } from 'react';
import { LucideHardDriveUpload, FileArchiveIcon } from 'lucide-react';
import Image from 'next/image';
import { CustomFile } from '../account/knowledge/interfaces/interfaces';

export interface CustomDragAndDropProps {
  ownerLicense: CustomFile[];
  onUpload: (uploadedFiles: File[]) => void;
  onDelete: (index: number) => void;
  count: number;
  formats: string[];
  fileIcon?: string;
  showIcon?: boolean;
  clickText?: string;
  nonClickText?: string;
  setResultError: Dispatch<SetStateAction<string>>;
  setFileName?: Dispatch<SetStateAction<string>>;
}

export default function CustomDragAndDropInput({
  ownerLicense,
  count,
  formats,
  onUpload,
  onDelete,
  setResultError,
  fileIcon,
  showIcon = true,
  clickText,
  nonClickText,
  setFileName,
}: CustomDragAndDropProps) {
  const dropContainer = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback(
    (e: ChangeEvent<HTMLInputElement> | DragEvent, type: string) => {
      e.preventDefault();
      e.stopPropagation();

      let files: File[] = [];
      if (type === 'inputFile') {
        files = Array.from((e.target as HTMLInputElement).files || []);
      } else {
        setDragging(false);
        const dataTransferFiles = (e as DragEvent).dataTransfer?.files;
        files = Array.from(dataTransferFiles || []);
      }

      // Check if any of the files already exist in the ownerLicense array
      let fileName = ''; // Variable to hold the name of the duplicate file
      const duplicateFile = files.some((file) => {
        const isDuplicate = ownerLicense.some((existingFile) => existingFile.name === file.name);
        if (isDuplicate) {
          fileName = file.name;
        }
        return isDuplicate;
      });

      if (duplicateFile) {
        setResultError(`A inserção foi ignorada, pois arquivo de nome ${fileName} já foi inserido.`);
        return;
      }

      const allFilesValid = files.every((file) =>
        formats.some((format) => file.name.toLowerCase().endsWith(`.${format}`)),
      );

      // Verify if it exceding the maximum number of files when clicked in the button or when it is dropped
      if (ownerLicense.length >= count || (count && count < files.length)) {
        setResultError(
          `Somente é possível adicionar ${count === 1 ? '1 arquivo por vez' : `${count} arquivos por vez`}.`,
        );
        return;
      }

      if (!allFilesValid) {
        setResultError('Há 1 ou mais arquivos irregulares. Verifique a extensão do(s) arquivo(s).');
        return;
      }

      if (files.length > 0) {
        onUpload(files);
        setResultError('');
        if (setFileName) {
          setFileName(files[0].name);
        }
      }
    },
    [count, formats, onUpload, ownerLicense, setFileName, setResultError],
  );

  useEffect(() => {
    const container = dropContainer.current;

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragging(true);
    };

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragging(false);
    };

    const handleDropEvent = (e: DragEvent) => handleDrop(e, 'dragDrop');

    if (container) {
      container.addEventListener('dragover', handleDragOver);
      container.addEventListener('dragleave', handleDragLeave);
      container.addEventListener('drop', handleDropEvent);
    }

    return () => {
      if (container) {
        container.removeEventListener('dragover', handleDragOver);
        container.removeEventListener('dragleave', handleDragLeave);
        container.removeEventListener('drop', handleDropEvent);
      }
    };
  }, [handleDrop]);

  function handleDelete(index: number) {
    onDelete(index);

    // Reset the file input value to allow re-selection of the same file
    if (fileRef.current) {
      fileRef.current.value = '';
    }
    setResultError('');
  }

  return (
    <div className="w-full flex flex-col justify-start">
      <div className="flex flex-col py-3">
        <div
          className={`${
            dragging ? 'border border-[#2B92EC] bg-[#EDF2FF]' : 'border-dashed border-[#e0e0e0]'
          } text-center border-2 rounded-md mt-4 px-3 py-5 w-[100%]`}
          ref={dropContainer}
        >
          <div className="flex-1 flex flex-col">
            <div className="mx-auto text-gray-400 mb-2">
              {showIcon &&
                (fileIcon ? (
                  <Image src={fileIcon} alt="File Icon" width={80} height={80} />
                ) : (
                  <LucideHardDriveUpload size={80} />
                ))}
            </div>
            <div className="text-[12px] font-normal text-gray-500 text-lg">
              <input
                className="opacity-0 hidden"
                type="file"
                multiple
                accept={formats.map((format) => `.${format}`).join(', ')}
                ref={fileRef}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleDrop(e, 'inputFile')}
              />
              <span
                className="text-[#4070f4] cursor-pointer"
                onClick={() => {
                  fileRef.current?.click();
                }}
              >
                {clickText || 'Clique aqui para carregar o arquivo '}
              </span>
              {nonClickText || 'ou arraste e solte na área demarcada'}
            </div>
            <div className="text-[10px] font-normal text-gray-500 text-base">
              Somente arquivos{' '}
              {formats.map((format, index) => format + (index !== formats.length - 1 ? ', ' : ' '))}
              são aceitos
            </div>
          </div>
        </div>

        {ownerLicense.length > 0 && (
          <>
            <div className="mt-4 gap-y-4 gap-x-4 max-h-[300px] overflow-y-auto">
              {ownerLicense.map((file, index) => (
                <div key={index} className="w-full px-3 py-3.5 rounded-md my-3 bg-slate-200 space-y-3">
                  <div className="flex justify-between">
                    <div className="w-[70%] flex justify-start items-center space-x-2">
                      <div className="text-[#5E62FF] text-[37px] cursor-pointer">
                        <FileArchiveIcon size={44} />
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs font-medium text-gray-500">{file.name}</div>
                        <div className="text-[10px] font-medium text-gray-400">{`${Math.floor(
                          file.size / 1024,
                        )} KB`}</div>
                      </div>
                    </div>
                    <div className="flex-1 flex justify-end">
                      <div className="space-y-1">
                        <div
                          className="text-gray-500 text-[17px] cursor-pointer"
                          onClick={() => handleDelete(index)}
                        >
                          X
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
