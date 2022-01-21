import React, { useContext, useEffect, useState } from 'react';
import { NotificationManager } from 'react-notifications';
import { useDispatch } from 'react-redux';
import { updateCircuit } from '../../services/circuitService';
import { listActions } from '../../slice/listSlice';
import BoolBlockAdminUpdateContext from '../../context/BoolBlockAdminUpdateContext';

// eslint-disable-next-line react/prop-types
export default function BlockUpdateCircuit(props) {
    // eslint-disable-next-line react/prop-types
    const { circuit, changeBoolBlock } = props;
    const [task, setTask] = useState();
    const dispatch = useDispatch();
    const blockBool = useContext(BoolBlockAdminUpdateContext);

    useEffect(() => {
        setTask(circuit);
    }, [circuit]);

    const onSubmitUpdate = (e) => {
        e.preventDefault();
        updateCircuit(task, task._id).then((res) => {
            if (!res.data.error) {
                dispatch(listActions.setCircuit(res.data));
                NotificationManager.success('Le contenu à bien été modifier');
                changeBoolBlock();
            } else {
                res.data.error.forEach((value) => {
                    NotificationManager.error(value);
                });
            }
        });
    };

    return (
        <div>
            {blockBool && (
                <>
                    <div
                        role="button"
                        aria-label="overlay"
                        onClick={() => {
                            changeBoolBlock();
                        }}
                        onKeyDown={changeBoolBlock}
                        tabIndex={0}
                        className="overlay"
                    />
                    <div className="block__confirm">
                        {task && (
                            <form onSubmit={(e) => onSubmitUpdate(e)}>
                                <input
                                    type="text"
                                    id="nameCircuit"
                                    placeholder="Nom du GP"
                                    value={task.name}
                                    onInput={(e) =>
                                        setTask({
                                            ...circuit,
                                            name: e.target.value,
                                        })
                                    }
                                />
                                <input
                                    type="text"
                                    id="nationCircuit"
                                    placeholder="Nom du Pays"
                                    value={task.nation}
                                    onInput={(e) =>
                                        setTask({
                                            ...circuit,
                                            nation: e.target.value,
                                        })
                                    }
                                />

                                <section className="block__button">
                                    <button
                                        className="button button__primary"
                                        type="submit"
                                    >
                                        Envoyer
                                    </button>
                                    <button
                                        className="button button__secondary"
                                        onClick={changeBoolBlock}
                                        type="button"
                                    >
                                        Retour
                                    </button>
                                </section>
                            </form>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
