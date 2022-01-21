import './App.scss';
import 'react-notifications/lib/notifications.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import cookie from 'js-cookie';
import { decodeToken } from 'react-jwt';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Admin from './pages/Admin';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Header from './components/Header';
import Login from './pages/Login';
import { set } from './slice/userSlice';
import AllSaison from './pages/AllSaison';
import CircuitBySaison from './pages/CircuitBySaison';
import Setups from './pages/Setups';
import { findAllCircuit } from './services/circuitService';
import { findAllFormulaOne } from './services/formulaOneService';
import { findAllFormulaTwo } from './services/formulaTwoService';
import { findAllSaison } from './services/saisonService';
import { findAllEntitySetup } from './services/entitySetup';
import { listActions } from './slice/listSlice';

function App() {
    const dispatch = useDispatch();

    /**
     * Récupère les list des task et les enregistres dans l'état list
     */
    async function createList() {
        const formulaOne = await findAllFormulaOne();
        const circuit = await findAllCircuit();
        const formulaTwo = await findAllFormulaTwo();
        const saison = await findAllSaison();
        const entitySetup = await findAllEntitySetup();

        dispatch(listActions.setCircuit(circuit.data));
        dispatch(listActions.setSaison(saison.data));
        dispatch(listActions.setEntitySetup(entitySetup.data));
        dispatch(listActions.setFormulaOne(formulaOne.data));
        dispatch(listActions.setFormulaTwo(formulaTwo.data));
    }

    useEffect(() => {
        const token = cookie.get('token');
        dispatch(set(decodeToken(token)));
        createList();
    }, [
        cookie,
        dispatch,
        set,
        findAllCircuit,
        findAllEntitySetup,
        findAllFormulaOne,
        findAllFormulaTwo,
        findAllSaison,
    ]);

    return (
        <Router>
            <div className="App">
                <Header />
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/admin" element={<Admin />} />
                    <Route exact path="/inscription" element={<SignUp />} />
                    <Route exact path="/connexion" element={<Login />} />
                    <Route exact path="/setup" element={<AllSaison />} />
                    <Route
                        exact
                        path="/setup/:year"
                        element={<CircuitBySaison />}
                    />
                    <Route
                        exact
                        path="/setup/:year/circuit/:circuit"
                        element={<Setups />}
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
