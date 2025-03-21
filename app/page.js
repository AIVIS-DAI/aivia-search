"use client";
import { useState } from "react";

export default function HomePage() {
  const [query, setQuery] = useState(""); // Храним запрос пользователя
  const [results, setResults] = useState([]); // Храним результаты поиска
  const [loading, setLoading] = useState(false); // Показываем загрузку

  // Функция обработки поиска
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return; // Если пустой запрос — ничего не делаем

    setLoading(true);
    try {
      const response = await fetch(`/api/search?q=${query}`); // Запрос к API
      const data = await response.json();
      setResults(data.results); // Записываем результаты поиска
    } catch (error) {
      console.error("Ошибка поиска:", error);
    }
    setLoading(false);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">AIVIA</h1>
      <p>Добро пожаловать введите ваш запрос</p>
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Введите запрос..."
          className="border p-2 rounded-md w-80"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Искать
        </button>
      </form>

      {loading && <p className="mt-4">Загрузка...</p>}

      <ul className="mt-4">
        {results.map((result, index) => (
          <li key={index} className="border p-2 mt-2">
            {result}
          </li>
        ))}
      </ul>
    </main>
  );
}