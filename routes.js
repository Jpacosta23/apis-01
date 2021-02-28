const controllerApi=require('./api/controller')
// const contacts=require('./api/persons/phoneList');

const myfuntion=(app)=>{
    app.use('/api/persons',controllerApi);
    // app.use(contacts);
}

module.exports=myfuntion;