import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../services/userService';

export default function SignUp() {
    const [user, setUser] = useState({
        pseudo: '',
        email: '',
        emailConfirm: '',
        password: '',
        passwordConfirm: '',
    });
    const [messageError, setMessageError] = useState({});

    const navigate = useNavigate();

    const registration = (e) => {
        e.preventDefault();

        signUp(user)
            .then((res) => {
                if (res.data) {
                    setMessageError(res.data);
                } else {
                    navigate('/connexion');
                }
            })
            .catch((err) => console.log(err));
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
            <form onSubmit={(e) => registration(e)}>
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

                <label htmlFor="email">
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={user.email}
                        onChange={(e) =>
                            setUser({ ...user, email: e.target.value })
                        }
                        placeholder="&nbsp;"
                    />
                    <span className="label">Email</span>
                    <span className="focus-bg" />
                </label>

                <label htmlFor="emailConfirm">
                    <input
                        type="email"
                        name="emailConfirm"
                        id="emailConfirm"
                        value={user.emailConfirm}
                        onChange={(e) =>
                            setUser({ ...user, emailConfirm: e.target.value })
                        }
                        placeholder="&nbsp;"
                    />
                    <span className="label">Confirmer votre Email</span>
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

                <label htmlFor="passwordConfirm">
                    <input
                        type="password"
                        name="passwordConfirm"
                        id="passwordConfirm"
                        value={user.passwordConfirm}
                        onChange={(e) =>
                            setUser({
                                ...user,
                                passwordConfirm: e.target.value,
                            })
                        }
                        placeholder="&nbsp;"
                    />
                    <span className="label">Confirmez votre mot de passe</span>
                    <span className="focus-bg" />
                </label>

                <div className="block__button">
                    <button className="button button__primary" type="submit">
                        Je m&apos;inscris
                    </button>
                    <button
                        onClick={() => navigate('/connexion')}
                        className="button button__secondary"
                        type="button"
                    >
                        Connexion
                    </button>
                </div>
            </form>
        </main>
    );
}
