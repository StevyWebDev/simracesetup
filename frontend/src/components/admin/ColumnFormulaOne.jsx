import FormData from 'form-data';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createFormulaOne } from '../../services/formulaOneService';
import { listActions } from '../../slice/listSlice';
import changeValueFile from '../../utils/changeValueFile';
import formDataTask from '../../utils/formDataTask';

export default function ColumnFormulaOne() {
    const dispatch = useDispatch();
    const formulaOne = useSelector((state) => state.list.formulaOne);
    const [task, setTask] = useState();
    const [file, setFile] = useState();

    const newFormulaOne = (e) => {
        e.preventDefault();
        createFormulaOne(formDataTask(task, new FormData(), file)).then((res) =>
            dispatch(listActions.setFormulaOne(res.data))
        );
    };

    return (
        <section className="block__formulaOne">
            <h3>Circtuis</h3>
            <form
                onSubmit={(e) => newFormulaOne(e)}
                encType="multipart/form-data"
            >
                <input
                    type="text"
                    id="nameFormulaOne"
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
                    id="nationFormulaOne"
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
                    id="imageFormulaOne"
                    className="intput__file"
                    onChange={(e) => {
                        setFile(e.target.files[0]);
                        changeValueFile(
                            e.target.files[0].name,
                            '.block__formulaOne form .message__file'
                        );
                    }}
                />
                <label htmlFor="imageFormulaOne">
                    <span className="icon__upload"> </span> Choisir une image
                </label>
                <p className="message__file">Aucune image...</p>
                <button type="submit">Envoyer</button>
            </form>
            <section>
                {formulaOne?.length > 0 &&
                    formulaOne.map((value) => (
                        <p key={value._id}>{value.name}</p>
                    ))}
            </section>
        </section>
    );
}
