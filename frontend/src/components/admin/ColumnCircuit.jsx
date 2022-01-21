import FormData from 'form-data';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    NotificationContainer,
    NotificationManager,
} from 'react-notifications';
import { createCircuit } from '../../services/circuitService';
import { listActions } from '../../slice/listSlice';
import changeValueFile from '../../utils/changeValueFile';
import formDataTask from '../../utils/formDataTask';
import BlockConfirmDelete from './BlockConfirmDelete';
import BoolBlockAdminDeleteContext from '../../context/BoolBlockAdminDeleteContext';
import BoolBlockAdminUpdateContext from '../../context/BoolBlockAdminUpdateContext';
import BlockUpdateCircuit from './BlockUpdateCircuit';

export default function ColumnCircuit() {
    const dispatch = useDispatch();
    const circuit = useSelector((state) => state.list.circuit);
    const [task, setTask] = useState();
    const [thisTask, setThisTask] = useState();
    const [taskId, setTaskId] = useState();
    const [file, setFile] = useState();
    const [blockBoolDelete, setBlockBoolDelete] = useState();
    const [blockBoolUpdate, setBlockBoolUpdate] = useState();

    const changeBoolBlockDelete = () => {
        if (blockBoolDelete) {
            setBlockBoolDelete(false);
        } else {
            setBlockBoolDelete(true);
        }
    };

    const changeBoolBlockUpdate = () => {
        if (blockBoolUpdate) {
            setBlockBoolUpdate(false);
        } else {
            setBlockBoolUpdate(true);
        }
    };

    const newCircuit = (e) => {
        e.preventDefault();
        createCircuit(formDataTask(task, new FormData(), file)).then((res) => {
            if (!res.data.error) {
                dispatch(listActions.setCircuit(res.data));
                NotificationManager.success(
                    `${task.name}à bien été enregistré`
                );
            } else {
                res.data.error.forEach((value) => {
                    NotificationManager.error(value);
                });
            }
        });
    };

    return (
        <section className="block__circuit">
            <NotificationContainer />
            <BoolBlockAdminDeleteContext.Provider value={blockBoolDelete}>
                <BlockConfirmDelete
                    circuit="circuit"
                    actionName="setCircuit"
                    changeBoolBlock={changeBoolBlockDelete}
                    thisTask={thisTask}
                />
            </BoolBlockAdminDeleteContext.Provider>
            <BoolBlockAdminUpdateContext.Provider value={blockBoolUpdate}>
                <BlockUpdateCircuit
                    circuit={thisTask}
                    taskId={taskId}
                    changeBoolBlock={changeBoolBlockUpdate}
                />
            </BoolBlockAdminUpdateContext.Provider>
            <h3>Circtuis</h3>
            <form onSubmit={(e) => newCircuit(e)} encType="multipart/form-data">
                <input
                    type="text"
                    id="nameCircuit"
                    placeholder="Nom du GP"
                    onInput={(e) =>
                        setTask({
                            ...task,
                            name: e.target.value,
                        })
                    }
                />
                <input
                    type="text"
                    id="nationCircuit"
                    placeholder="Nom du Pays"
                    onInput={(e) =>
                        setTask({
                            ...task,
                            nation: e.target.value,
                        })
                    }
                />
                <input
                    type="file"
                    id="imageCircuit"
                    className="intput__file"
                    onChange={(e) => {
                        setFile(e.target.files[0]);
                        changeValueFile(
                            e.target.files[0].name,
                            '.block__circuit form .message__file'
                        );
                    }}
                />
                <label htmlFor="imageCircuit">
                    <span className="icon__upload"> </span> Choisir une image
                </label>
                <p className="message__file">Aucune image...</p>
                <button type="submit">Envoyer</button>
            </form>
            <section className="table admin circuit">
                {circuit?.length > 0 &&
                    circuit.map((value) => (
                        <div key={value._id} className="line circuit">
                            <div>
                                <p>{value.nation}</p>
                            </div>
                            <div>
                                <p>{value.name}</p>
                            </div>
                            <div>
                                <img
                                    className="img__admin"
                                    src={`http://localhost:3001/${value.image}`}
                                    alt={value.name}
                                />
                            </div>
                            <div>
                                <span
                                    role="button"
                                    aria-label="Delete task"
                                    onClick={() => {
                                        changeBoolBlockDelete();
                                        setThisTask(value);
                                        setTaskId(value._id);
                                    }}
                                    onKeyDown={() => {
                                        changeBoolBlockDelete();
                                        setThisTask(value);
                                        setTaskId(value._id);
                                    }}
                                    className="icon delete"
                                    tabIndex={0}
                                />
                            </div>
                            <div>
                                <span
                                    role="button"
                                    aria-label="Delete task"
                                    onClick={() => {
                                        changeBoolBlockUpdate();
                                        setThisTask(value);
                                        setTaskId(value._id);
                                    }}
                                    onKeyDown={() => {
                                        changeBoolBlockUpdate();
                                        setThisTask(value);
                                        setTaskId(value._id);
                                    }}
                                    className="icon update"
                                    tabIndex={0}
                                />
                            </div>
                        </div>
                    ))}
            </section>
        </section>
    );
}
