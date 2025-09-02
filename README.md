# Estudeiro

O **Estudeiro** é um software educacional que usa Inteligência Artificial para auxiliar os estudos. Ele funciona como uma extensão do seu professor: você pode tirar dúvidas sobre a matéria diretamente com um agente de IA treinado para isso.

Este repositório contém o código-fonte completo do Estudeiro, feito em **Next.js**.

---

## Como rodar em ambiente de desenvolvimento

1. Clone o repositório:
```
git clone https://github.com/KauaMB2/estudeiro
cd estudeiro
```
2. Instale as dependências:
```
npm install
```
3. Inicie o servidor de desenvolvimento:
```
npm run dev
```
4. Acesse o projeto no navegador:
```
http://localhost:3000
```
---

## Como fazer o build para produção

1. Execute o comando:
```
npm run build
```
2. Depois, para rodar o build:
```
npm start
```
---

## Tecnologias usadas

- Next.js
- React
- Node.js

## Explicação do erro no teste unitário:

A [Natália](https://github.com/Natalia-Dias22) havia modificado a conversa de exemplo no arquivo `app\_components\dashboard\chat\Chat.tsx` e o teste unitário exige que a conversa esteja no formato correto. Quando eu rodei `npm run test`, foi apontado esse erro e, após isso, o problema foi corrigido para esse componente passar no teste.
