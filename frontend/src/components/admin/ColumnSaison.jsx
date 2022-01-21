/* eslint-disable no-unused-vars */
import FormData from 'form-data';
import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import boolConfig from '../../data/boolAdmin.config';
import { addTasksSaison, createSaison } from '../../services/saisonService';
import { listActions } from '../../slice/listSlice';
import changeClassTabUpdateSaison from '../../utils/changeClassTabUpdateSaison';
import changeValueFile from '../../utils/changeValueFile';
import dropSaison from '../../utils/dropSaison';
import formDataTask from '../../utils/formDataTask';
import BlockTasksList from './BlockTasksList';
import UpdateSaison from './UpdateSaison';

export default function ColumnSaison() {
    const dispatch = useDispatch();
    const list = useSelector((state) => state.list);
    const [task, setTask] = useState();
    const [file, setFile] = useState();
    const [defaulBool, setDefaultBool] = useState(boolConfig);
    const [thisSaison, setThisSaison] = useState();
    const [thisTask, setThisTask] = useState();
    const [listDropSaison, setListDropSaison] = useState();

    const newSaison = (e) => {
        e.preventDefault();
        createSaison(formDataTask(task, new FormData(), file)).then((res) =>
            dispatch(listActions.setSaison(res.data))
        );
    };

    /**
     *  Permet de switcher entre les tasks courantes
     * @param {String} type
     * @param {Object} thisTaskSaison
     */
    const switchTask = (type, thisTaskSaison, taskList) => {
        // task courante à l'affichage du block
        setThisTask(type);

        // list de la task courante soustrait a la task courante de la saison courante
        setListDropSaison(dropSaison(taskList, thisTaskSaison));

        changeClassTabUpdateSaison(
            type,
            document.querySelector('#formulaOneTab'),
            document.querySelector('#circuitTab'),
            document.querySelector('#formulaTwoTab'),
            document.querySelector('#entitySetupTab')
        );
    };

    const activeBlockUpdateSaison = (year) => {
        setDefaultBool({
            ...defaulBool,
            blockUpdateSaison: true,
        });

        // saison courante à l'affichage du block
        setThisSaison(year);
        // switch de task courante
        switchTask('circuit', year.circuits, list.circuit);
    };

    const onClickAddTaskSaison = (e) => {
        e.preventDefault();
        addTasksSaison(
            {
                add: listDropSaison.colums.listTasksSaison.tasksIds,
                delete: listDropSaison.colums.listTasks.tasksIds,
                type: thisTask,
            },
            thisSaison._id
        )
            .then((res) => dispatch(listActions.setSaison(res.data)))
            .catch((err) => console.log(err));
    };

    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const start = listDropSaison.colums[source.droppableId];
        const finish = listDropSaison.colums[destination.droppableId];

        if (start === finish) {
            const column = listDropSaison.colums[source.droppableId];
            const newtasksIds = Array.from(column.tasksIds);
            newtasksIds.splice(source.index, 1);
            newtasksIds.splice(destination.index, 0, draggableId);

            const newColumn = {
                ...column,
                tasksIds: newtasksIds,
            };

            const newState = {
                ...listDropSaison,
                colums: {
                    ...listDropSaison.colums,
                    [column.id]: newColumn,
                },
            };

            setListDropSaison(newState);
            return;
        }

        const starttasksIds = Array.from(start.tasksIds);
        starttasksIds.splice(source.index, 1);
        const newStart = {
            ...start,
            tasksIds: starttasksIds,
        };

        const finishtasksIds = Array.from(finish.tasksIds);
        finishtasksIds.splice(destination.index, 0, draggableId);
        const newFinish = {
            ...finish,
            tasksIds: finishtasksIds,
        };

        const newState = {
            ...listDropSaison,
            colums: {
                ...listDropSaison.colums,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish,
            },
        };

        setListDropSaison(newState);
    };

    return (
        <>
            <section className="block__listSaison">
                <h3>Saison</h3>
                <form
                    onSubmit={(e) => newSaison(e)}
                    encType="multipart/form-data"
                >
                    <input
                        type="number"
                        id="yearSaison"
                        placeholder="Année saison"
                        onChange={(e) => setTask({ year: e.target.value })}
                    />

                    <input
                        type="file"
                        id="imageSaison"
                        className="intput__file"
                        onChange={(e) => {
                            setFile(e.target.files[0]);
                            changeValueFile(
                                e.target.files[0].name,
                                '.block__listSaison form .message__file'
                            );
                        }}
                    />
                    <label htmlFor="imageSaison">
                        <span className="icon__upload"> </span> Choisir une
                        image
                    </label>
                    <p className="message__file">Aucune image...</p>

                    <button type="submit">envoyer</button>
                </form>
                {list.saison?.length > 0 &&
                    list.saison.map((value) => (
                        <section key={value._id} className="block__saison">
                            <div
                                className="block__yearSaison"
                                tabIndex={0}
                                role="button"
                                onClick={() => activeBlockUpdateSaison(value)}
                                onKeyDown={() => activeBlockUpdateSaison(value)}
                            >
                                <img
                                    src={`http://localhost:3001/${value.image}`}
                                    alt={`saison - ${value.year}`}
                                    width="100%"
                                />
                            </div>

                            <BlockTasksList
                                value={value.circuits}
                                title="Ecuries"
                            />

                            <BlockTasksList
                                value={value.formulaOneTeams}
                                title="Formule 1"
                            />

                            <BlockTasksList
                                value={value.formulaTwoTeams}
                                title="Formule 2"
                            />
                        </section>
                    ))}
            </section>

            <DragDropContext onDragEnd={onDragEnd}>
                {defaulBool.blockUpdateSaison === true && (
                    <>
                        <div
                            aria-label="close block update saison"
                            className="saison__overlay"
                            tabIndex={0}
                            role="button"
                            onClick={() =>
                                setDefaultBool({
                                    ...defaulBool,
                                    blockUpdateSaison: false,
                                })
                            }
                            onKeyDown={() =>
                                setDefaultBool({
                                    ...defaulBool,
                                    blockUpdateSaison: false,
                                })
                            }
                        />
                        <div className="block__update">
                            <div className="block__tab">
                                <nav>
                                    <ul>
                                        <li
                                            className="tab__active"
                                            id="circuitTab"
                                        >
                                            <span
                                                role="button"
                                                tabIndex="0"
                                                onClick={() =>
                                                    switchTask(
                                                        'circuit',
                                                        thisSaison.circuits,
                                                        list.circuit
                                                    )
                                                }
                                                onKeyDown={() =>
                                                    switchTask(
                                                        'circuit',
                                                        thisSaison.circuits,
                                                        list.circuit
                                                    )
                                                }
                                            >
                                                Circuit
                                            </span>
                                        </li>
                                        <li
                                            id="formulaOneTab"
                                            className="tab__no__active"
                                        >
                                            <span
                                                role="button"
                                                tabIndex="0"
                                                onClick={() =>
                                                    switchTask(
                                                        'formulaOneTeams',
                                                        thisSaison.formulaOneTeams,
                                                        list.formulaOne
                                                    )
                                                }
                                                onKeyDown={() =>
                                                    switchTask(
                                                        'formulaOneTeams',
                                                        thisSaison.formulaOneTeams,
                                                        list.formulaOne
                                                    )
                                                }
                                            >
                                                Formule 1
                                            </span>
                                        </li>
                                        <li
                                            id="formulaTwoTab"
                                            className="tab__no__active"
                                        >
                                            <span
                                                role="button"
                                                tabIndex="0"
                                                onClick={() =>
                                                    switchTask(
                                                        'formulaTwoTeams',
                                                        thisSaison.formulaTwoTeams,
                                                        list.formulaTwo
                                                    )
                                                }
                                                onKeyDown={() =>
                                                    switchTask(
                                                        'formulaTwoTeams',
                                                        thisSaison.formulaTwoTeams,
                                                        list.formulaTwo
                                                    )
                                                }
                                            >
                                                Formule 2
                                            </span>
                                        </li>
                                        <li
                                            className="tab__no__active"
                                            id="entitySetupTab"
                                        >
                                            <span
                                                role="button"
                                                tabIndex="0"
                                                onClick={() =>
                                                    switchTask(
                                                        'entitySetups',
                                                        thisSaison.entitySetups,
                                                        list.entitySetup,
                                                        true
                                                    )
                                                }
                                                onKeyDown={() =>
                                                    switchTask(
                                                        'entitySetups',
                                                        thisSaison.entitySetup,
                                                        list.entitySetup,
                                                        true
                                                    )
                                                }
                                            >
                                                Entitées Setup
                                            </span>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                            <UpdateSaison drop={listDropSaison} />
                            <div className="block__button">
                                <button
                                    type="submit"
                                    aria-label="add taskSaison"
                                    onClick={(e) => onClickAddTaskSaison(e)}
                                >
                                    Envoyer
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </DragDropContext>
        </>
    );
}
