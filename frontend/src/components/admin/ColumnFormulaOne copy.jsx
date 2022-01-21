import FormData from 'form-data';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createFormulaTwo } from '../../services/formulaTwoService';
import { listActions } from '../../slice/listSlice';
import changeValueFile from '../../utils/changeValueFile';
import formDataTask from '../../utils/formDataTask';

export default function ColumnFormulaTwo() {
    const dispatch = useDispatch();
    const formulaTwo = useSelector((state) => state.list.formulaTwo);
    const [task, setTask] = useState();
    const [file, setFile] = useState();

    const newFormulaTwo = (e) => {
        e.preventDefault();
        createFormulaTwo(formDataTask(task, new FormData(), file)).then((res) =>
            dispatch(listActions.setFormulaTwo(res.data))
        );
    };

    return (
        <section className="block__formulaTwo">
            <h3>Circtuis</h3>
            <form
                onSubmit={(e) => newFormulaTwo(e)}
                encType="multipart/form-data"
            >
                <input
                    type="text"
                    id="nameFormulaTwo"
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
                    id="nationFormulaTwo"
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
                    id="imageFormulaTwo"
                    className="intput__file"
                    onChange={(e) => {
                        setFile(e.target.files[0]);
                        changeValueFile(
                            e.target.files[0].name,
                            '.block__formulaTwo form .message__file'
                        );
                    }}
                />
                <label htmlFor="imageFormulaTwo">
                    <span className="icon__upload"> </span> Choisir une image
                </label>
                <p className="message__file">Aucune image...</p>
                <button type="submit">Envoyer</button>
            </form>
            <section>
                {formulaTwo?.length > 0 &&
                    formulaTwo.map((value) => (
                        <p key={value._id}>{value.name}</p>
                    ))}
            </section>
        </section>
    );
}
