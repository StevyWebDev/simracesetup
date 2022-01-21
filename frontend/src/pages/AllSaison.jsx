/* eslint-disable react/no-array-index-key */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function AllSaison() {
    const saisons = useSelector((state) => state.list.saison);
    const navigate = useNavigate();
    return (
        <main className="main__saison">
            <nav>
                {saisons?.length > 0 &&
                    saisons.map((value, index) => (
                        <div
                            key={index}
                            tabIndex={0}
                            role="button"
                            onClick={() => navigate(`/setup/${value.year}`)}
                            onKeyDown={() => navigate()}
                        >
                            <img
                                src={`http://localhost:3001/${value.image}`}
                                alt={value.year}
                            />
                        </div>
                    ))}
            </nav>
        </main>
    );
}
