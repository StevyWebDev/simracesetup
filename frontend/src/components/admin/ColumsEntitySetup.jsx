import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createEntitySetup } from '../../services/entitySetup';
import { listActions } from '../../slice/listSlice';

export default function ColumnEntitySetup() {
    const dispatch = useDispatch();
    const entitySetup = useSelector((state) => state.list.entitySetup);
    const [task, setTask] = useState();

    const newEntitySetup = (e) => {
        e.preventDefault();
        createEntitySetup(task).then((res) =>
            dispatch(listActions.setEntitySetup(res.data))
        );
    };

    return (
        <section className="block__entitySetup">
            <h3>Entitées setup</h3>
            <form
                onSubmit={(e) => newEntitySetup(e)}
                encType="multipart/form-data"
            >
                <input
                    type="text"
                    id="nameEntitySetup"
                    placeholder="Nom de l'entitée"
                    onInput={(e) =>
                        setTask({
                            ...task,
                            name: e.target.value,
                        })
                    }
                />
                <input
                    type="number"
                    id="minEntitySetup"
                    placeholder="Valeur minimum"
                    onInput={(e) =>
                        setTask({
                            ...task,
                            min: e.target.value,
                        })
                    }
                />
                <input
                    type="number"
                    id="maxEntitySetup"
                    placeholder="Valeur maximum"
                    onInput={(e) =>
                        setTask({
                            ...task,
                            max: e.target.value,
                        })
                    }
                />
                <input
                    type="number"
                    id="intevalEntitySetup"
                    placeholder="Valeur interval à additionner"
                    onInput={(e) =>
                        setTask({
                            ...task,
                            inteval: e.target.value,
                        })
                    }
                />

                <input
                    type="text"
                    className="nameEntitySetup"
                    placeholder="Nom de l'entitée"
                    onInput={(e) =>
                        setTask({
                            ...task,
                            listText: e.target.value.split(';'),
                        })
                    }
                />

                <button type="submit">Envoyer</button>
            </form>
            <section>
                {entitySetup?.length > 0 &&
                    entitySetup.map((value) => (
                        <p key={value._id}>{value.name}</p>
                    ))}
            </section>
        </section>
    );
}
