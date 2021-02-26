const express=require('express');
const contacts=require('./phoneList');
const cors=require('./cors');
const app = express();
const morgan=require('morgan');

app.use(express.json()); 

app.use(cors());

// morgan.token('reqBody',(req)=>{return JSON.stringify(req.body)})

// app.use(
//     morgan(':method :url :status :res[content-length] :reqBody - :response-time ms')
// );


app.get('/api/persons',(req,res)=>{
    if(contacts){
        res.json(contacts);
    }
    else{
        res.status(404);    
    }
})

app.get('/info',(req,res)=>{

    if(contacts){
        console.log(contacts.length);
        res.send(`Phonebook has info for ${contacts.length} people <br>
        ${new Date()}
        `);       
    }
})

app.get('/api/persons/:id', (req,res)=>{
    const { id }=req.params;
    const person=contacts.find(item=>item.id===Number(id));
    if(contacts){
        res.json(person);
    }
    else{
        res.status(404).end();
    }
})

app.delete('/api/persons/:id',(req,res)=>{
    const {id}=req.params;
    const filtered=contacts.filter(item=>item.id!=Number(id))
    if(contacts){
        res.json(`La persona se ha eliminado satisfactoriamente. Sus contactos son: ${JSON.stringify(filtered)}`)
    }
    else{
        res.status(404).end();
    }
})

app.post('/api/persons/',(req,res)=>{
    
    const newContact=req.body;
    
    newContact.id=Math.round(Math.random()*100);

    const state=contacts.some(item=>item.name===newContact.name);
    if(state){
        res.status(404).json('name must be unique');
    }
    else if(newContact.number===undefined){
        res.status(404).json('number required');
    }
    else{
    const newContacts=contacts.concat(newContact);
    res.json(newContacts);
    }

})

const PORT= process.env.PORT || 3001

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})

(async () => {

    const response = await fetch('https://shrouded-headland-67003.herokuapp.com/api/persons')
    const users = await response.json() 
    console.log(users)
  
  
  })()
  
