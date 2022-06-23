import express from 'express';
import routes from './routes/api/api';
import {promises as fsPromises} from 'fs';
import { allowedNodeEnvironmentFlags } from 'process';

const app = express();
const port:number = 3000;

app.use('/api/images', routes);

app.get('/', (req,res) :void => {
    res.status(200).send('it works!');
});

app.get('/api', (req,res): void => {
    res.status(200).send('api works!');
});

app.listen(port, () : void => {
    console.log(`server is running at http://localhost:${port}`);
});

export default app;