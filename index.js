const express=require('express');
const contacts=require('./phoneList');

const app = express();

app.get('/api/persons:',(req,res)=>{
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

app.post('/api/persons/:name/:number',(req,res)=>{
    const newContact={
    id:Math.random()*100,
    name:req.params.name,
    number:req.params.number 
    }

    const state=contacts.some(item=>item.name===newContact.name);
    if(state){
        res.status(404).json('name must be unique');
    }
    else if(newContact.number===null){
        res.status(404).json('number required');
    }
    else{
    newContacts=contacts.concat(newContact);
    res.json(`la nueva lista de contactos es ${JSON.stringify(newContacts)}`);
    }
})


app.listen(3001,()=>{
    console.log('server is running on port 3001');
})

