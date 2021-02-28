const express=require('express');
// const contacts=require('./api/persons/phoneList');
const cors=require('cors');
const app = express();
// const morgan=require('morgan');
const routesConfig=require('./routes');

app.use(express.json()); 
app.use(cors());

routesConfig(app);


// morgan.token('reqBody',(req)=>{return JSON.stringify(req.body)})

// app.use(
//     morgan(':method :url :status :res[content-length] :reqBody - :response-time ms')
// );

const PORT= process.env.PORT || 3001

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})  

    // (async () => {

    //     const response = await fetch('https://shrouded-headland-67003.herokuapp.com/api/persons')
    //     const users = await response.json() 
    //     console.log(users)
    
    
    // })()
    
