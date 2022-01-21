const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserSchema = require('../schemas/userSchema');

const isEqual = require('../function/isEqual');
const isEmpty = require('../function/isEmpty');
const isValid = require('../function/isValid');

exports.signUp = async (req, res) => {
    const emailRegx =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    const passwordRegx =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const dataMessage = [];

    const { pseudo, email, emailConfirm, password, passwordConfirm } = req.body;

    const pseudoVerify = isEmpty(pseudo, 'Vous devez indiquer un pseudo');
    const emailVerify = isEmpty(email, 'Vous devez indiquer votre email');
    const emailConfirmVerify = isEmpty(
        emailConfirm,
        'Vous devez confirmer votre email'
    );
    const passwordVerify = isEmpty(
        password,
        'Vous devez indiquer un mot de passe'
    );
    const passwordConfirmVerify = isEmpty(
        passwordConfirm,
        'Vous devez confirmer votre mot de passe'
    );

    const passwordIsEqual = isEqual(
        password,
        passwordConfirm,
        'Vos mots de passe ne sont pas identique'
    );
    const emailIsEqual = isEqual(
        email,
        emailConfirm,
        'Vos emails ne correspondent pas'
    );

    const passwordIsValid = isValid(
        password,
        passwordRegx,
        'Votre mot de passe doit contenir au moins 8 caractères, une minuscule, une majuscule, un chiffre et un caractère spécial'
    );
    const emailIsValid = isValid(
        email,
        emailRegx,
        "Votre email n'est pas conforme"
    );

    if (
        pseudoVerify.error === true ||
        emailVerify.error === true ||
        emailConfirmVerify.error === true ||
        passwordVerify.error === true ||
        passwordConfirmVerify.error === true ||
        emailIsEqual.error === true ||
        passwordIsEqual.error === true ||
        emailIsValid.error === true ||
        passwordIsValid.error === true
    ) {
        dataMessage.push(
            { message: pseudoVerify.message },
            { message: emailVerify.message },
            { message: emailConfirmVerify.message },
            { message: passwordVerify.message },
            { message: passwordConfirmVerify.message },
            { message: emailIsEqual.message },
            { message: passwordIsEqual.message },
            { message: emailIsValid.message },
            { message: passwordIsValid.message }
        );
    }

    if (await UserSchema.findOne({ pseudo }))
        dataMessage.push({ message: 'Ce pseudo est déjà utilisé' });
    if (await UserSchema.findOne({ email }))
        dataMessage.push({ message: 'Cette email est déjà utilisé' });

    if (dataMessage.length > 0) return res.status(200).json(dataMessage);

    const hash = await bcrypt.hash(password, 10);

    const newUser = await new UserSchema({
        pseudo,
        email,
        password: hash,
        role: ['ROLE_USER'],
    });

    const user = await newUser.save();

    if (!user) return res.status(500);

    return res.status(200).res.json(true);
};

exports.login = async (req, res) => {
    const { pseudo, password } = req.body;

    const pseudoVerify = isEmpty(pseudo, 'Vous devez indiquer votre pseudo');
    const passwordVerify = isEmpty(
        password,
        'Vous devez indiquer votre mot de passe'
    );

    if (pseudoVerify.error === true || passwordVerify.error === true)
        return res.json({
            error: [
                { message: pseudoVerify.message },
                { message: passwordVerify.message },
            ],
        });

    const user = await UserSchema.findOne({ pseudo });

    if (!user)
        return res.json({
            error: [{ message: 'Votre pseudo ou mot de passe est incorrect' }],
        });

    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare)
        return res.json({
            error: { message: 'Votre pseudo ou mot de passe est incorrect' },
        });

    return res.json({
        token: jwt.sign(
            {
                userId: user._id,
                role: user.role,
            },
            'RANDOM_TOKEN_SECRET',
            { expiresIn: '24h' }
        ),
    });
};
