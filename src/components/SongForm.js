import React, { useState } from 'react';
import './SongForm.css';

function SongForm({ onAddSong }) {
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [url, setUrl] = useState('');
    const [error, setError] = useState('');

    const validateUrl = (url) => {
        const pattern = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/;
        return pattern.test(url);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!title.trim() || !artist.trim() || !url.trim()) {
            setError('Все поля обязательны для заполнения');
            return;
        }

        if (!validateUrl(url)) {
            setError('Некорректный URL');
            return;
        }

        let formattedUrl = url;
        if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
            formattedUrl = 'https://' + formattedUrl;
        }

        onAddSong({
            title: title.trim(),
            artist: artist.trim(),
            url: formattedUrl
        });

        setTitle('');
        setArtist('');
        setUrl('');
    };

    return (
        <div className="song-form-container">
            <h2 className="form-title">Добавить новую песню</h2>
            <form className="song-form" onSubmit={handleSubmit}>
                {error && <div className="error-message">{error}</div>}

                <div className="form-group">
                    <label htmlFor="title">Название песни *</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="artist">Исполнитель *</label>
                    <input
                        type="text"
                        id="artist"
                        value={artist}
                        onChange={(e) => setArtist(e.target.value)}
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="url">Ссылка на песню *</label>
                    <input
                        type="text"
                        id="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="form-input"
                    />
                </div>

                <button type="submit" className="submit-button">
                    Добавить песню
                </button>
            </form>
        </div>
    );
}

export default SongForm;