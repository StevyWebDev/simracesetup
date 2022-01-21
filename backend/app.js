require('dotenv').config();
const express = require('express');

const app = express();
const port = process.env.PORT;
const cors = require('cors');
const path = require('path');
const db = require('./database');

const formulaOneRouter = require('./routers/formulaOneRouter');
const formulaTwoRouter = require('./routers/formulaTwoRouter');
const circuitRouter = require('./routers/circuitRouter');
const saisonRouter = require('./routers/saisonRouter');
const userRouter = require('./routers/userRouter');
const entitySetupRouter = require('./routers/entitySetupRouter');
const setupRouter = require('./routers/setupRouter');

db();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/formulaOne', formulaOneRouter);
app.use('/formulaTwo', formulaTwoRouter);
app.use('/circuit', circuitRouter);
app.use('/saison', saisonRouter);
app.use('/user', userRouter);
app.use('/entitySetup', entitySetupRouter);
app.use('/setup', setupRouter);

app.listen(port, () => console.log(`connexion effectué`));
