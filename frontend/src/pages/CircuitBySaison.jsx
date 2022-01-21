/* eslint-disable react/prop-types */
/* eslint-disable radix */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function CircuitBySaison() {
    const listSaisons = useSelector((state) => state.list.saison);
    const [circuits, setCircuits] = useState();
    const { year } = useParams();
    const navigate = useNavigate();
    const saisons = listSaisons.find(
        (saison) => saison.year === parseInt(year)
    );

    return (
        <main className="main__circuit">
            <nav>
                {saisons &&
                    saisons.circuits.map((value) => (
                        <div
                            key={value._id}
                            tabIndex={0}
                            role="button"
                            onClick={() =>
                                navigate(
                                    `/setup/${year}/circuit/${value.name.replace(
                                        ' ',
                                        '_'
                                    )}`,
                                    {
                                        state: {
                                            saison: saisons,
                                            circuitId: value._id,
                                        },
                                    }
                                )
                            }
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
