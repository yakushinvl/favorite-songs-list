import React from 'react';
import './FilterButtons.css';

function FilterButtons({ currentFilter, onFilterChange, favoritesCount, totalCount }) {
    return (
        <div className="filter-buttons">
            <h3 className="filter-title">Фильтр песен</h3>
            <div className="filter-options">
                <button
                    className={`filter-button ${currentFilter === 'all' ? 'active' : ''}`}
                    onClick={() => onFilterChange('all')}
                >
                    <span className="filter-icon">🎵</span>
                    <span className="filter-text">Все песни</span>
                    <span className="filter-count">{totalCount}</span>
                </button>

                <button
                    className={`filter-button ${currentFilter === 'favorites' ? 'active' : ''}`}
                    onClick={() => onFilterChange('favorites')}
                >
                    <span className="filter-icon">⭐</span>
                    <span className="filter-text">Избранные</span>
                    <span className="filter-count">{favoritesCount}</span>
                </button>
            </div>
        </div>
    );
}

export default FilterButtons;