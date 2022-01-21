/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { NotificationManager } from 'react-notifications';
import { deleteCircuit } from '../../services/circuitService';
import { listActions } from '../../slice/listSlice';
import BoolBlockAdminDeleteContext from '../../context/BoolBlockAdminDeleteContext';

// eslint-disable-next-line react/prop-types
export default function BlockConfirmDelete(props) {
    // eslint-disable-next-line react/prop-types
    const { thisTask, actionName, changeBoolBlock } = props;
    const dispatch = useDispatch();
    const blockBool = useContext(BoolBlockAdminDeleteContext);

    console.log(thisTask);

    const confirmDelete = () => {
        deleteCircuit(thisTask._id).then((res) => {
            dispatch(listActions[actionName](res.data.task));
            dispatch(listActions.setSaison(res.data.saison));
            NotificationManager.success(`${thisTask.name} à bien été modifier`);
            changeBoolBlock();
        });
    };

    return (
        <div>
            {blockBool && (
                <>
                    <div
                        role="button"
                        aria-label="Delete task"
                        onClick={changeBoolBlock}
                        onKeyDown={changeBoolBlock}
                        tabIndex={0}
                        className="overlay"
                    />
                    <div className="block__confirm">
                        <p>
                            Etes vous sûre de vouloir supprimé {thisTask.name}
                        </p>
                        <section className="block__button">
                            <button
                                className="button button__primary"
                                onClick={confirmDelete}
                                type="submit"
                            >
                                Oui
                            </button>
                            <button
                                className="button button__secondary"
                                onClick={changeBoolBlock}
                                type="submit"
                            >
                                Non
                            </button>
                        </section>
                    </div>
                </>
            )}
        </div>
    );
}
