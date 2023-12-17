// MovieForm.js
import React, { useState, useEffect } from 'react';

const MovieForm = ({ onSave, onDelete, onCancel, movie }) => {
  const [title, setTitle] = useState(movie ? movie.title : '');
  const [description, setDescription] = useState(movie ? movie.description : '');
  const [director, setDirector] = useState(movie ? movie.director : '');
  const [actors, setActors] = useState(movie ? movie.actors : '');
  const [year, setYear] = useState(movie ? movie.year : '');
  const [genres, setGenres] = useState(movie ? movie.genres : '');
  const [posterUrl, setPosterUrl] = useState(movie ? movie.posterUrl : '');

  useEffect(() => {
    setTitle(movie ? movie.title : '');
    setDescription(movie ? movie.description : '');
    setDirector(movie ? movie.director : '');
    setActors(actors ? movie.actors : '');
    setYear(year ? movie.year : '');
    setGenres(genres ? movie.genres : '');
    setPosterUrl(posterUrl ? movie.posterUrl : '');
  }, [movie]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleDirectorChange = (e) => {
    setDirector(e.target.value);
  };

  const handleActorsChange = (e) => {
    setActors(e.target.value);
  };

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const handleGenresChange = (e) => {
    setGenres(e.target.value);
  };

  const handlePosterUrlChange = (e) => {
    setPosterUrl(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ id: movie ? movie.id : Date.now(), title, description, director, actors, year, genres, posterUrl });
  };

  const handleDelete = () => {
    onDelete(movie.id);
  };

  const handleCopyId = () => {
    navigator.clipboard.writeText(movie.id);
  };

  return (
    <div>
      <img src={posterUrl} alt="Poster" style={{display: 'block', marginLeft: 'auto', marginRight: 'auto'}}></img>

      <form onSubmit={handleSubmit}>
        <label>
          Название фильма
          <input type="text" value={title} onChange={handleTitleChange} required />
        </label>
        <label>
          Режиссер
          <input type="text" value={director} onChange={handleDirectorChange} />
        </label>
        <label>
          Актеры
          <textarea value={actors} onChange={handleActorsChange} />
        </label>
        <label>
          Описание
          <textarea value={description} onChange={handleDescriptionChange} />
        </label>
        <label>
          Год выпуска
          <input type="text" value={year} onChange={handleYearChange} required/>
        </label>
        <label>
          Жанр
          <textarea value={genres} onChange={handleGenresChange} required/>
        </label>
        <label>
          Ссылка на обложку:
          <input type="url" value={posterUrl} onChange={handlePosterUrlChange} />
        </label>

        <button type="submit">{movie ? 'Обновить' : 'Создать'}</button>

        {movie && (
          <button type="button" onClick={handleDelete} style={{ marginLeft: '10px'}}>
            Delete
          </button>
        )}
        {movie && (
          <button onClick={handleCopyId} style={{ marginLeft: '10px'}}>
            Копировать ID
          </button>
        )}
      </form>
    </div>
  );
};

export default MovieForm;
