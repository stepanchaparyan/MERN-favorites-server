const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const app = express();
const auth = require('./middleware/auth');
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

require('dotenv').config();

app.use(cors());

//connect to mongoDB
const connectDB = require('./mongoConfig/mongoDB');
connectDB();

app.use(fileUpload());
app.use(express.json({ extended: true }));

// swagger settings
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// API routes
app.use('/api/register', require('./routes/register'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/favItem', auth, require('./routes/favItem'));
app.use('/api/profile', auth, require('./routes/profile'));
app.use('/api/upload', require('./routes/upload'));
app.use('/api/books', auth, require('./routes/books'));
app.use('/api/products', auth, require('./routes/products'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server started at port ${PORT}`));
