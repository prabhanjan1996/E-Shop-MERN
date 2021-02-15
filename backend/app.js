const express = require('express'); // like importing the libraries
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose'); // 
const cors = require('cors');
require('dotenv/config');

app.use(cors());
app.options('*', cors())

//middleware
app.use(bodyParser.json()); // middleware for parse the post request API's
app.use(morgan('tiny'));  // display log request in specific format

//Routes
const categoriesRoutes = require('./routes/categories');
const productsRoutes =require('./routes/products');
const usersRoutes = require('./routes/users');
const ordersRoutes = require('./routes/orders');

const api = process.env.API_URL;


app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);



//  http://localhost:3000/api/v1/products
//Database
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'eshop-database'
}) // DB connction using mongodb atlas

.then(()=>{
    console.log('Database Connection is ready');
})
.catch((err)=>{
    console.log(err);
})
//Server
app.listen(3000, ()=>{
    
    console.log('server is running http://localhost:3000');
})
