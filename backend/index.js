const express = require('express');
const cors = require('cors');
const { createHandler } = require('graphql-http/lib/use/express');
const schema = require('./schema/schema');
require('dotenv').config();

const app = express();

app.use(cors());
app.use('/graphql', createHandler({ schema }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));