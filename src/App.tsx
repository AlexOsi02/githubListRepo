import React, {useEffect, useState} from 'react';
import axios from "axios";

interface IRepo {
    id: number;
    html_url: string;
    stargazers_count: number;
    forks: number;
    name: string;
}

const App = () => {
  const [repositories, setRepositories] = useState<IRepo[]>([]);

  useEffect(() => {
      const getRepositories = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_API_URL as string);
        setRepositories(response.data);
      } catch (error) {
        console.error('Ошибка при запросе данных с GitHub API', error);
      }
    };

    getRepositories();
  }, [])
  return (
      <div>
        <h1>Список репозиториев Facebook</h1>
        <ul>
          {repositories.map((repo, index) => (
              <li key={repo.id}>
                {++index} - <a href={repo.html_url} target="_blank" rel="noopener noreferrer">{repo.name}</a> -
                Звезд: {repo.stargazers_count} - Форков: {repo.forks}
              </li>
          ))}
        </ul>
      </div>
  );
}

export default App;
