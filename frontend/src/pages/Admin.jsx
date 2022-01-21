/* eslint-disable */
import React, {useState} from 'react';
import ColumnCircuit from '../components/admin/ColumnCircuit';
import ColumnFormulaOne from '../components/admin/ColumnFormulaOne';
import ColumnFormulaTwo from '../components/admin/ColumnFormulaOne copy';
import ColumnEntitySetup from '../components/admin/ColumsEntitySetup';
import ColumnSaison from '../components/admin/ColumnSaison';
import changeClassTabAdmin from '../utils/changeClassTabAdmin';
import boolConfig from '../data/boolAdmin.config';

export default function Admin() {
    const [blockBool, setBlockBool] = useState(boolConfig.tasks);

    const onClickTask = (task, type) => {
        const newBlockBool = {
            blockCircuit: false,
            blockEntitySetup: false,
            blockFormulaOne: false,
            blockFormulaTwo: false,
            blockSaison: false,
        };
        setBlockBool({ ...newBlockBool, [task]: true });
        changeClassTabAdmin(
            document.querySelector('#SaisonsTabAdmin'),
            document.querySelector('#formulaOneTabAdmin'),
            document.querySelector('#formulaTwoTabAdmin'),
            document.querySelector('#circuitTabAdmin'),
            document.querySelector('#entitySetupTabAdmin'),
            type
        );
    };

    return (
        <main className="main__admin">
            <section className="block__title">
                <h2>Admin</h2>
            </section>
            <aside className="column__admin">
                <nav>
                    <ul>
                        <li
                            onClick={() =>
                                onClickTask('blockSaison', '#SaisonsTabAdmin')
                            }
                            id="SaisonsTabAdmin"
                            className="items__tasks tab__active"
                        >
                            Saison
                        </li>
                        <li
                            onClick={() =>
                                onClickTask(
                                    'blockFormulaOne',
                                    '#formulaOneTabAdmin'
                                )
                            }
                            id="formulaOneTabAdmin"
                            className="items__tasks tab__no__active"
                        >
                            Formule 1
                        </li>
                        <li
                            onClick={() =>
                                onClickTask(
                                    'blockFormulaTwo',
                                    '#formulaTwoTabAdmin'
                                )
                            }
                            id="formulaTwoTabAdmin"
                            className="items__tasks tab__no__active"
                        >
                            Formule 2
                        </li>
                        <li
                            onClick={() =>
                                onClickTask('blockCircuit', '#circuitTabAdmin')
                            }
                            id="circuitTabAdmin"
                            className="items__tasks tab__no__active"
                        >
                            Circuit
                        </li>
                        <li
                            onClick={() =>
                                onClickTask(
                                    'blockEntitySetup',
                                    '#entitySetupTabAdmin'
                                )
                            }
                            id="entitySetupTabAdmin"
                            className="items__tasks tab__no__active"
                        >
                            Entité réglage
                        </li>
                    </ul>
                </nav>
            </aside>
            <section className="container__admin">
                {blockBool.blockSaison ? (
                    <ColumnSaison />
                ) : blockBool.blockFormulaOne ? (
                    <ColumnFormulaOne />
                ) : blockBool.blockFormulaTwo ? (
                    <ColumnFormulaTwo />
                ) : blockBool.blockCircuit ? (
                    <ColumnCircuit />
                ) : (
                    blockBool.blockEntitySetup && <ColumnEntitySetup />
                )}
            </section>
        </main>
    );
}
