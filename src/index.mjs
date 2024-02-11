import express from 'express';
import bodyParser from 'body-parser';
import tokenRoutes from './routes/tokenRoutes.mjs';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api', tokenRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
