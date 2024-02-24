const express = require ('express');
const app =express();
const bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient




app.use(bodyParser.urlencoded({extended:true}));

app.listen(3000, function(){

    console.log('app is listening');
});



MongoClient.connect('mongodb+srv://mogharib:nogodbutallah@cluster0.z9mpi.mongodb.net/?retryWrites=true&w=majority',
{
    useUnifiedTopology: true
  })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('quotes')
    const quotesCollection = db.collection('quotes')

    app.set ('view engine' , 'hbs');
    app.use(express.static('public'));
    app.use(bodyParser.json())

     const { urlencoded } = require('body-parser');
  

  app.post('/quotes', (req, res) => {
    quotesCollection.insertOne(req.body)
      .then(result => {
        res.redirect('/')

        console.log(result)
      })
      .catch(error => console.error(error))
  }), 

  app.get('/',(req,res)=>{

    const finder = db.collection('quotes').find().toArray() .then
    (results =>{
        console.log(results)
        res.render('index.ejs',{quotes:results})
    }) .catch 
    (error => {console.log(error)})

    ;
   
    console.log(finder);
});
  


app.put('/quotes' ,(req ,res ) => {

    
  quotesCollection.findOneAndUpdate(
      { name: 'mohamed' },
      {
        $set: {
          name: req.body.name,
          quote: req.body.quote
        }
      },
      {
        upsert: true
      }
    )
      .then(result => {res.json('success')})
      .catch(error => console.error(error))
}) ;

app.delete('/quotes' ,(req ,res ) => {

    
  quotesCollection.deleteOne(
      { name: 'mohamed' },
      {
       
          name: req.body.name,
        }
     
    )
      .then(result => {
        if (result.deletedCount === 0) {
          return res.json('No quote to delete')
        }
        res.json('delete')})
      .catch(error => console.error(error))
})



})