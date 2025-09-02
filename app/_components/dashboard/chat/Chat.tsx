'use client';
import { useState, FormEvent } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/app/_components/ui/dialog';
import TeacherPicture from "@/src/assets/teacher.jpg";
import Image from 'next/image';

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'ai';
};

interface ChatProps {
  id: string;
};

const Chat: React.FC<ChatProps> = ({ id }) => {
  const initialMessages: Message[] =
  id === "1"
  ? [
      {
        id: 1,
        text: "👩‍🏫 BUG NO SISTEMA. 😊",
        sender: "ai",
      },
      {
        id: 2,
        text: "👩‍🏫 Professora Adaiana: Sou a professora Adaiana e estou aqui para te acompanhar nessa jornada de aprendizado.",
        sender: "ai",
      },
      {
        id: 3,
        text: "👩‍🏫 Professora Adaiana: Me conta uma coisa: quais são as suas maiores dificuldades nos estudos no momento?",
        sender: "ai",
      },
      {
        id: 4,
        text: "👨‍🎓 Estudante: Acho que tenho mais dificuldade em entender alguns conceitos abstratos, sabe? Tipo quando a matéria é muito teórica.",
        sender: "user",
      },
      {
        id: 5,
        text: "👩‍🏫 Professora Adaiana: Entendi! E como você gostaria que eu te ajudasse? Prefere explicações passo a passo, resumos, desafios...?",
        sender: "ai",
      },
      {
        id: 6,
        text: "👨‍🎓 Estudante: Gosto bastante de explicações com exemplos simples, tipo do dia a dia, e às vezes uns desafios também ajudam.",
        sender: "user",
      },
      {
        id: 7,
        text: "👩‍🏫 Professora Adaiana: Perfeito! Vamos usar isso a nosso favor pra tornar o aprendizado mais leve e eficiente. 🚀",
        sender: "ai",
      }
    ]
    : id === "2"
    ? [
        {
          id: 1,
          text: "👩‍🏫 Professora Adaiana: Oi de novo! Agora quero saber uma coisa importante pra te ajudar melhor. 😊",
          sender: "ai",
        },
        {
          id: 2,
          text: "👩‍🏫 Professora Adaiana: Como você gostaria que fosse meu jeito de falar com você? Prefere um tom mais descontraído, formal, motivador, engraçado...? E minha personalidade, mais séria, divertida, calma, animada?",
          sender: "ai",
        },
        {
          id: 3,
          text: "👨‍🎓 Estudante: Acho que prefiro um tom leve e animado, mas que também me incentive a aprender. Tipo alguém que explica bem, mas não deixa a conversa chata.",
          sender: "user",
        },
        {
          id: 4,
          text: "👩‍🏫 Professora Adaiana: Perfeito! Vou caprichar nas explicações com leveza, bom humor e energia positiva. Bora aprender com estilo! 😄✨",
          sender: "ai",
        }
      ]  
    : id === "3"
    ? [
        {
          id: 1,
          text: "Oi, Ana! Vi que a profª Carla mandou um PDF sobre fotossíntese. Bora revisar juntos? 🌱",
          sender: "ai",
        },
        {
          id: 2,
          text: "Simm, eu não entendi direito aquele esquema de luz e glicose 😩",
          sender: "user",
        },
        {
          id: 3,
          text: `Beleza! A fotossíntese é como se a planta “cozinhasse” sua comida usando luz 🌞
Ela usa luz + água + CO₂ → pra gerar glicose (a comida da planta) 🍞`,
          sender: "ai",
        },
        {
          id: 4,
          text: "Quer tentar um desafio rápido pra ver se entendeu? 🎯",
          sender: "ai",
        },
        {
          id: 5,
          text: "✅ Sim, bora!\n❌ Não, quero continuar lendo",
          sender: "ai",
        },
        {
          id: 6,
          text: "✅ Sim, bora!",
          sender: "user",
        },
        {
          id: 7,
          text: `O que a planta precisa pra fazer fotossíntese?

a) Água, luz e oxigênio  
b) Luz, gás carbônico e água  
c) Açúcar, luz e sal`,
          sender: "ai",
        },
        {
          id: 8,
          text: "b) Luz, gás carbônico e água 🌊",
          sender: "user",
        },
        {
          id: 9,
          text: `ACERTOU! Você tá mandando muito bem 👏
Quer ver um vídeo curto agora ou seguir pro resumo?

📽 Ver vídeo  
📝 Ler resumo`,
          sender: "ai",
        },
      ]
    : [
        {
          id: Number(id),
          text: `Olá!! Sou a professora Débora e estou aqui para tirar suas dúvidas sobre a última aula de processos estocásticos.`,
          sender: "ai",
        },
      ];

  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [agentBehavior, setAgentBehavior] = useState('Comportamento padrão');
  const [selectedAgent, setSelectedAgent] = useState('1');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: Date.now(),
      text: input,
      sender: 'user',
    };
    setMessages((prev) => [...prev, userMessage]);
    
    setTimeout(() => {
      const aiMessage: Message = {
        id: Date.now() + 1,
        text: `I received for chat ${id}: "${input}"`,
        sender: 'ai',
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);

    setInput('');
  };

  const handleAgentUpdate = () => {
    console.log('Novo comportamento:', agentBehavior);
    console.log('Agente selecionado:', selectedAgent);
    setIsDialogOpen(false);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-white shadow p-4 relative">
        <h1 className="text-xl font-bold">Chat Interface - ID: {id}</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <button 
              className="absolute top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
            >
              Configurações
            </button>
          </DialogTrigger>
          
          <DialogContent className="sm:max-w-[500px] bg-white">
            <DialogHeader>
              <DialogTitle>Modificar Comportamento do Agente</DialogTitle>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="agent" className="text-right">
                  Agente
                </label>
                <select
                  id="agent"
                  value={selectedAgent}
                  onChange={(e) => setSelectedAgent(e.target.value)}
                  className="col-span-3 p-2 border rounded-lg"
                >
                  <option value="1">Agente 1</option>
                  <option value="2">Agente 2</option>
                  <option value="3">Agente 3</option>
                </select>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="behavior" className="text-right">
                  Comportamento
                </label>
                <textarea
                  id="behavior"
                  value={agentBehavior}
                  onChange={(e) => setAgentBehavior(e.target.value)}
                  className="col-span-3 p-2 border rounded-lg h-32"
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-2">
              <button 
                onClick={() => setIsDialogOpen(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Cancelar
              </button>
              <button
                onClick={handleAgentUpdate}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Salvar Alterações
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </header>
      
      <main className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-2 ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {msg.sender === 'ai' && (
              <Image 
                src={TeacherPicture}
                alt="Teacher"
                className="w-10 h-10 rounded-full border border-gray-300"
              />
            )}
            <div
              className={`p-4 rounded-lg max-w-md ${
                msg.sender === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </main>
      
      <footer className="bg-white p-4 border-t">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            placeholder="Digite sua mensagem..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg
                     hover:bg-blue-600 transition-colors duration-200"
          >
            Enviar
          </button>
        </form>
      </footer>
    </div>
  );
};

export default Chat;
