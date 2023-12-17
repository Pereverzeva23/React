import './App.css';
import React, { useState, useEffect } from 'react';
import MovieForm from './MovieForm';

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    const response = await fetch('http://localhost:3001/movies');
	
    if (!response.ok) {
      console.error('Не найдено');
      return;
    }
	
    const moviesData = await response.json();
    setMovies(moviesData);
  };

  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
    setShowCreateForm(true);
  };

  const handleCreateMovie = () => {
    setSelectedMovie(null);
    setShowCreateForm(true);
  };

  const handleSave = async (movie) => {
    if (selectedMovie) {
      // Обновление выбранного фильма
      await fetch(`http://localhost:3001/movies/${selectedMovie.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(movie),
      });
    } else {
      // Создание нового фильма
      await fetch('http://localhost:3001/movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(movie),
      });
    }

    fetchMovies();
    setSelectedMovie(null);
    setShowCreateForm(false);
  };

  const handleCancel = () => {
    setSelectedMovie(null);
    setShowCreateForm(false);
  };

  //Удаление по id
  const handleDelete = async (id) => {
    await fetch(`http://localhost:3001/movies/${id}`, {
      method: 'DELETE',
    });

    fetchMovies();
    setSelectedMovie(null);
    setShowCreateForm(false);
  };

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  //Фильтрация фильмов по тексту
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2 style={{textAlign: 'center'}}>Админка фильмотеки</h2>
      <div style={{ display: 'flex'}}>
        <div style={{ flex: '1', marginLeft: '20px', maxWidth: '50%'}}>
          
          <button onClick={handleCreateMovie}>Создать фильм</button>
          <input
            type="text"
            placeholder="Поиск"
            value={searchTerm}
            onChange={handleSearchTermChange}
          />
          <ul>
            {filteredMovies.map((movie) => (
              <li key={movie.id} onClick={() => handleSelectMovie(movie)}>
                {movie.title}
                <br/>
                <h6 style={{margin: "0px"}}>{movie.year} | {movie.genres}</h6>
              </li>
            ))}
          </ul>
        </div>
        <div style={{ flex: '1', marginLeft: '20px', marginRight: '20px' }}>
          {showCreateForm && (
            <MovieForm onSave={handleSave} onCancel={handleCancel} movie={selectedMovie} onDelete={handleDelete} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
