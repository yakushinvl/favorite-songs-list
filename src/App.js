import React, { useState, useEffect } from 'react';
import SongList from './components/SongList';
import SongForm from './components/SongForm';
import FilterButtons from './components/FilterButtons';
import './App.css';

function App() {
    const [songs, setSongs] = useState([]);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        const savedSongs = localStorage.getItem('musicAppSongs');
        if (savedSongs) {
            setSongs(JSON.parse(savedSongs));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('musicAppSongs', JSON.stringify(songs));
    }, [songs]);

    const addSong = (newSong) => {
        setSongs([...songs, {
            ...newSong,
            id: Date.now(),
            favorite: false
        }]);
    };

    const deleteSong = (id) => {
        setSongs(songs.filter(song => song.id !== id));
    };

    const toggleFavorite = (id) => {
        setSongs(songs.map(song =>
            song.id === id ? { ...song, favorite: !song.favorite } : song
        ));
    };

    const filteredSongs = filter === 'favorites'
        ? songs.filter(song => song.favorite)
        : songs;

    return (
        <div className="app">
            <header className="app-header">
                <h1>Мои любимые песни</h1>
            </header>

            <main className="app-main">
                <div className="app-container">
                    <div className="left-panel">
                        <SongForm onAddSong={addSong} />
                        <FilterButtons
                            currentFilter={filter}
                            onFilterChange={setFilter}
                            favoritesCount={songs.filter(s => s.favorite).length}
                            totalCount={songs.length}
                        />
                    </div>

                    <div className="right-panel">
                        <SongList
                            songs={filteredSongs}
                            onDeleteSong={deleteSong}
                            onToggleFavorite={toggleFavorite}
                            filter={filter}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}

export default App;