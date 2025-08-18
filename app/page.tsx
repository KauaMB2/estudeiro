'use client';

import Link from 'next/link';
import React, { useState } from 'react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('E-mail:', email);
    console.log('Senha:', password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-red-900!       ">
      <div className="bg-gray-800 p-8 rounded-lg ml-16 shadow-lg w-full max-w-sm">
        <h2 className="text-3xl text-center text-white mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <Link
            type="submit"
            href={"/dashboard"}
            className="w-full px-4 float-right text-center hover:cursor-pointer py-3 bg-blue-500 text-white rounded-md hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Entrar
          </Link>
        </form>
        <div className="mt-4 text-center">
          <p className="text-white">
            Não tem uma conta?{' '}
            <Link href="/register" className="text-blue-500 hover:underline">
              Registre-se
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
