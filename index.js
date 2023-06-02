const express = require('express')
const app = express();
const config = require('dotenv');
const  mongoose  = require('mongoose');
const { notFound, errorHandler } = require('./middlewares/errorHandler');
config.config({path:"./config/config.env"})
const morgan  = require('morgan')
app.use(morgan())

const PORT = process.env.PORT || 4000 || 3000
const URI = process.env.URI;


mongoose.connect(URI)
mongoose.connection.on('connected',()=>{
    console.log("Connect to Database");
})

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/api/user',require('./routes/authRoute'))
app.use('/api/product',require('./routes/productRoute'))
app.use('/api/blog',require('./routes/blogRoutes'))
app.use('/api/category',require('./routes/prodcategoryRoute'))
app.use('/api/blogcategory',require('./routes/blogcatRoute'))
app.use('/api/brand',require('./routes/brandRoute'))
app.use('/api/coupon',require('./routes/couponRoute'))


app.use(notFound)
app.use(errorHandler)

app.listen(PORT,()=>{
    console.log(`server is running at PORT ${PORT}`);
})