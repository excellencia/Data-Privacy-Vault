const express = require('express');
const bodyParser = require('body-parser');
const tokenRoutes = require('./routes/tokenRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api', tokenRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
