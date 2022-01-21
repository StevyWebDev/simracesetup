/* eslint-disable react/no-array-index-key */
/* eslint-disable radix */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
// noinspection ES6CheckImport
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import createSetup from '../services/setupService';
import { findOneSetupSaisonByCircuit } from '../services/saisonService';

export default function Setups() {
    const navigate = useNavigate();
    const [setup, setSetup] = useState({ formulaOne: null, formulaTwo: null });
    const [setupList, setSetupList] = useState({});
    const { year, circuit } = useParams();
    const saison = useSelector((state) => state.list.saison).find(
        (saisonSelector) => saisonSelector.year === parseInt(year)
    );
    const userId = useSelector((state) => state.user.userId);
    const circuitVerify =
        saison !== undefined &&
        Object.values(saison.circuits).filter(
            ({ name }) => name === circuit.replace('_', ' ')
        ).length;

    if (circuitVerify === 0) {
        navigate('/');
    }

    useEffect(() => {
        if (circuitVerify > 0) {
            const defaultSetup = {};
            saison.entitySetups.forEach((value) => {
                defaultSetup[value.name.replace(' ', '_')] = value.max
                    ? value.max / 2
                    : value.textList.length > 0 && value.textList[0];
            });
            setSetup({
                ...setup,
                user: userId,
                circuit: Object.values(saison.circuits).filter(
                    ({ name }) => name === circuit.replace('_', ' ')
                )[0]._id,
                data: defaultSetup,
            });
            findOneSetupSaisonByCircuit(
                saison._id,
                Object.values(saison.circuits).filter(
                    ({ name }) => name === circuit.replace('_', ' ')
                )[0]._id
            ).then((res) => setSetupList(res.data.setups));
        }
    }, [setSetup, saison, userId, setSetupList]);

    const onSubmitSetup = (e) => {
        e.preventDefault();
        if (setup.formulaOne || setup.formulaTwo) {
            createSetup(
                setup,
                saison._id,
                Object.values(saison.circuits).filter(
                    ({ name }) => name === circuit.replace('_', ' ')
                )[0]._id
            ).then((res) => setSetupList(res.data.setups));
        } else {
            console.log('pas ok');
        }
    };

    return (
        <main className="main__setup">
            {saison !== undefined && (
                <>
                    <form onSubmit={(e) => onSubmitSetup(e)}>
                        {saison.formulaOneTeams?.length > 0 && (
                            <select
                                name="formulaOne"
                                id="formulaOne"
                                onChange={(e) =>
                                    setSetup({
                                        ...setup,
                                        formulaOne: e.target.value,
                                    })
                                }
                            >
                                <option value="">
                                    Veuillez choisir une écurie
                                </option>
                                {saison.formulaOneTeams.map((value) => (
                                    <option key={value._id} value={value._id}>
                                        {value.name}
                                    </option>
                                ))}
                            </select>
                        )}

                        {saison.formulaTwoTeams?.length > 0 && (
                            <select
                                name="formulaTwo"
                                id="formulaTwo"
                                onChange={(e) =>
                                    setSetup({
                                        ...setup,
                                        formulaTwo: e.target.value,
                                    })
                                }
                            >
                                {saison.formulaTwoTeams.map((value) => (
                                    <option key={value._id} value={value._id}>
                                        {value.name}
                                    </option>
                                ))}
                            </select>
                        )}

                        {saison.entitySetups.map((value) => (
                            <div className="block__input" key={value._id}>
                                {value.min && (
                                    <>
                                        <p>
                                            {setup[value.name]
                                                ? setup[value.name]
                                                : value.max / 2}
                                        </p>
                                        <span>{value.min}</span>
                                        <input
                                            className="range__custom"
                                            type="range"
                                            name={value.name}
                                            id=""
                                            min={value.min}
                                            max={value.max}
                                            step={value.inteval}
                                            defaultValue={value.max / 2}
                                            onChange={(e) =>
                                                setSetup({
                                                    ...setup,
                                                    data: {
                                                        ...setup.data,
                                                        [value.name.replace(
                                                            ' ',
                                                            '_'
                                                        )]: e.target.value,
                                                    },
                                                })
                                            }
                                        />
                                        <span>{value.max}</span>
                                    </>
                                )}
                                {value.textList?.length > 0 && (
                                    <select
                                        name=""
                                        id=""
                                        defaultValue={(e) => e.target.value}
                                        onChange={(e) =>
                                            setSetup({
                                                ...setup,
                                                data: {
                                                    ...setup.data,
                                                    [value.name]:
                                                        e.target.value,
                                                },
                                            })
                                        }
                                    >
                                        {value.textList.map((text, index) => (
                                            <option key={index} value={text}>
                                                {text}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            </div>
                        ))}

                        <button type="submit">envoyer</button>
                    </form>
                    <section className="block__listSetup">
                        {setupList?.length > 0 &&
                            setupList.map((value) => (
                                <section
                                    key={value._id}
                                    className="block__setup"
                                >
                                    <p>{value.user.pseudo}</p>
                                    {saison.entitySetups.map((entity) => {
                                        const { name, min, max } = entity;
                                        const keyEntity = name.replace(
                                            ' ',
                                            '_'
                                        );
                                        return (
                                            <div key={keyEntity}>
                                                <label htmlFor={keyEntity}>
                                                    {name}
                                                </label>
                                                {max ? (
                                                    <input
                                                        disabled="disabled"
                                                        type="range"
                                                        name={keyEntity}
                                                        id={keyEntity}
                                                        min={min}
                                                        max={max}
                                                        defaultValue={
                                                            value.data[
                                                                keyEntity
                                                            ]
                                                        }
                                                        className="range__custom__disabled"
                                                    />
                                                ) : (
                                                    <span>
                                                        {value.data[keyEntity]}
                                                    </span>
                                                )}
                                            </div>
                                        );
                                    })}
                                </section>
                            ))}
                    </section>
                </>
            )}
        </main>
    );
}
