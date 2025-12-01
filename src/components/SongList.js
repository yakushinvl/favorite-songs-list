import React from 'react';
import './SongList.css';

function SongList({ songs, onDeleteSong, onToggleFavorite, filter }) {
    const handlePlay = (url) => {
        window.open(url, '_blank');
    };

    if (songs.length === 0) {
        return (
            <div className="song-list empty">
                <div className="empty-list">
                    <h3>{filter === 'favorites' ? 'Нет избранных песен' : 'Список песен пуст'}</h3>
                </div>
            </div>
        );
    }

    return (
        <div className="song-list">
            <div className="list-header">
                <h2>{filter === 'favorites' ? 'Избранные песни' : 'Все песни'}</h2>
                <span className="song-count">{songs.length}</span>
            </div>

            <div className="songs-container">
                {songs.map(song => (
                    <div key={song.id} className={`song-item ${song.favorite ? 'favorite' : ''}`}>
                        <div className="song-info">
                            <div className="song-main">
                                <h3 className="song-title">{song.title}</h3>
                                <p className="song-artist">{song.artist}</p>
                                <a
                                    href={song.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="song-url"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handlePlay(song.url);
                                    }}
                                >
                                    {new URL(song.url).hostname}
                                </a>
                            </div>

                            <div className="song-actions">
                                <button
                                    className={`favorite-button ${song.favorite ? 'active' : ''}`}
                                    onClick={() => onToggleFavorite(song.id)}
                                    title={song.favorite ? 'Убрать из избранного' : 'Добавить в избранное'}
                                >
                                    <span className="heart-icon">{song.favorite ? '❤️' : '🤍'}</span>
                                </button>

                                <button
                                    className="delete-button"
                                    onClick={() => onDeleteSong(song.id)}
                                    title="Удалить"
                                >
                                    🗑️
                                </button>
                            </div>
                        </div>

                        {song.favorite && (
                            <div className="favorite-badge">
                                <span>⭐ Избранная</span>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SongList;