/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cookie from 'js-cookie';
import { useDispatch } from 'react-redux';
import { decodeToken } from 'react-jwt';
import { login } from '../services/userService';
import { set } from '../slice/userSlice';

export default function Login() {
    const [user, setUser] = useState({ pseudo: '', password: '' });
    const [messageError, setMessageError] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitForm = async (e) => {
        e.preventDefault();
        const dataUser = await login(user);

        if (dataUser.data.error) {
            setMessageError(dataUser.data.error);
        } else {
            const token = cookie.set('token', dataUser.data.token);

            if (dispatch(set(decodeToken(token)))) navigate('/');
        }
    };

    return (
        <main className="main__formUser">
            {messageError?.length > 0 && (
                <div className="block__message error">
                    {/* eslint-disable-next-line no-unused-vars */}
                    {messageError.map((value, index) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <p key={index}>{value.message}</p>
                    ))}
                </div>
            )}
            <form onSubmit={(e) => submitForm(e)}>
                <label htmlFor="pseudo">
                    <input
                        type="text"
                        name="pseudo"
                        id="pseudo"
                        value={user.pseudo}
                        onChange={(e) =>
                            setUser({ ...user, pseudo: e.target.value })
                        }
                        placeholder="&nbsp;"
                    />
                    <span className="label">Pseudo</span>
                    <span className="focus-bg" />
                </label>

                <label htmlFor="password">
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={user.password}
                        onChange={(e) =>
                            setUser({ ...user, password: e.target.value })
                        }
                        placeholder="&nbsp;"
                    />
                    <span className="label">Mot de passe</span>
                    <span className="focus-bg" />
                </label>

                <div className="block__button">
                    <button className="button button__primary" type="submit">
                        Connexion
                    </button>
                    <button
                        onClick={() => navigate('/inscription')}
                        className="button button__secondary"
                        type="button"
                    >
                        Je m&apos;inscris
                    </button>
                </div>
            </form>
        </main>
    );
}
