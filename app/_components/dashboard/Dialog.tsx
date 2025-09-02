'use client';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/app/_components/ui/dialog';
import { useEffect, useState } from 'react';
import { Button } from '@/app/_components/ui/button';
import { AIAgent } from '@/src/utils/models/ai_agent';
import { Teacher } from '@/src/utils/models/teacher';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/app/_components/ui/select';
import { Checkbox } from '../ui/checkbox';

interface AIAgentDialogProps{
    aiAgent: AIAgent,
    create: boolean,
    allTeachers: Teacher[],
}

const aiAgentBlank: AIAgent = {
    id: 0,
    name: '',
    description: '',
    behavior: '',
    instructions: '',
    personality: '',
    teacher: 0,
    public: false,
    profilePicture: '',
    created: new Date(),
    updated: new Date(),
}
export function AIAgentDialog({
  aiAgent,
  create = false,
  allTeachers,
}: AIAgentDialogProps) {
  const [aiAgentState, setAIAgentState] = useState<AIAgent>(aiAgent || aiAgentBlank);
  const [resultError, setResultError] = useState<string>('');
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!create && aiAgent) {
      setAIAgentState(aiAgent);
    }
  }, [aiAgent, create, setAIAgentState]);

  async function handleSubmit() {
    if (create) {
      // await createAIAgent(aiAgentState);
      setAIAgentState(aiAgent || aiAgentBlank);
      dialogToggleState();
    } else {
    //   await updateTraining({
    //     id: aiAgentState.id as number,
    //     training: aiAgentState.training,
    //   });
    //   await updateNameBehavior({
    //     id: aiAgentState.id as number,
    //     name: aiAgentState.name,
    //     behavior: aiAgentState.behavior,
    //     description: aiAgentState.description,
    //   });
    //   await updateFilters({
    //     id: aiAgentState.id as number,
    //     filterCategoryId: aiAgentState.filterCategoryId === -1 ? null : aiAgentState.filterCategoryId,
    //     filterDepartmentId: aiAgentState.filterDepartmentId === -1 ? null : aiAgentState.filterDepartmentId,
    //     filterPhaseId: aiAgentState.filterPhaseId === -1 ? null : aiAgentState.filterPhaseId,
    //     filterUserId: aiAgentState.filterUserId === -1 ? null : aiAgentState.filterUserId,
    //   });
      setIsDialogOpen((prev) => !prev);
    }
  }

  const dialogToggleState = async () => {
    if (create) {
      setAIAgentState(aiAgentBlank);
    } else {
      setAIAgentState(aiAgent || aiAgentBlank);
    }
    setResultError('');
    setIsDialogOpen((prev) => !prev);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={dialogToggleState}>
      <DialogTrigger asChild>
        {create ? (
          <Button className="text-white bg-slate-400 hover:bg-green-400 p-2 rounded-md hover:cursor-pointer">Novo agente</Button>
        ) : (
          <Button className="text-white bg-slate-400 hover:bg-blue-400 p-2 rounded-md mr-2 hover:cursor-pointer">Editar</Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[94%] bg-white">
      <DialogHeader>
            <DialogTitle>Criar novo agente</DialogTitle>
        </DialogHeader>
      <div className="flex gap-4 py-4">
          <div className="flex flex-col w-full gap-4">
            <Label htmlFor="name" className="text-left">
              Nome
            </Label>
            <Input
              onChange={(e) => setAIAgentState({ ...aiAgentState, name: e.target.value })}
              value={aiAgentState.name}
              id="code"
              className="flex-grow"
              required
            />
            <Label htmlFor="description" className="text-left">
              Descrição
            </Label>
            <Input
              onChange={(e) => setAIAgentState({ ...aiAgentState, description: e.target.value })}
              value={aiAgentState.description}
              id="description"
              className="flex-grow"
              required
            />
            
            <div className='flex gap-1'>
                <Checkbox
                    id="recursive-function"
                    className="ml-2 data-[state=checked]:bg-blue-400 data-[state=checked]:text-black"
                    checked={aiAgentState.public}
                    onCheckedChange={() => setAIAgentState((prev) => ({ ...prev, public: !prev.public }))}
                />
                <Label htmlFor="checkbox" className="text-left">
                    Publicidade
                </Label>
            </div>
            <Label htmlFor="teacher" className="text-left">
                Professor
            </Label>
            <Select
            value={aiAgentState.teacher ? aiAgentState.teacher.toString() : '-1'}
            onValueChange={(value: string) => setAIAgentState({ ...aiAgentState, teacher: Number(value) })}
            >
            <SelectTrigger id="channel">
                <SelectValue
                placeholder={aiAgentState.teacher ? aiAgentState.teacher.toString() : 'Selecione um canal'}
                />
            </SelectTrigger>
            <SelectContent>
                <SelectItem key={-1} value={'-1'} className="w-full text-left p-2 hover:bg-gray-100">
                Nenhum
                </SelectItem>
                {allTeachers?.map((teacher) => (
                <SelectItem
                    key={teacher.id}
                    value={teacher.id?.toString() || ''}
                    className="w-full text-left p-2 hover:bg-gray-100"
                >
                    {teacher.name}
                </SelectItem>
                ))}
            </SelectContent>
            </Select>
          </div>
        </div>
        {resultError && <p className="text-red-500 text-sm">{resultError}</p>}
        <DialogFooter>
          <Button className='text-white bg-slate-400 hover:bg-red-400 p-2 rounded-md hover:cursor-pointer' type="button" onClick={dialogToggleState}>
            Sair
          </Button>
          <Button className='text-white bg-slate-400 hover:bg-green-400 p-2 rounded-md hover:cursor-pointer' type="button" onClick={handleSubmit}>
            {create ? 'Criar' : 'Salvar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
