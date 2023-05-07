const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express')
const cors = require('cors');
const app = express();
const dotenv = require('dotenv')

dotenv.config()

const port = process.env.PORT || 5000
// middleware 
app.use(cors());
app.use(express.json());


const uri = process.env.MONGOLAB_URI;


app.get('/', (req, res)=>{
  res.send('server is runing')
})


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// this is async function 
async function run() {
  try {
    
    await client.connect();

    // app.get('/users')
    const usersCollections = client.db('usersDB').collection('users')    
    // database to server to client side response
   
    // get
    app.get('/users', async(req,res) =>{
      const cursor = usersCollections.find();
      const results  = await cursor.toArray()
      res.send(results)
    })

    app.get('/users/:id', async(req,res)=>{
      const id = req.params.id;
      const query = { _id: new ObjectId(id)}
      const result = await usersCollections.findOne(query);
      res.send(result);
    })

    // client site to database
    app.post('/users', async(req,res)=> {
      const user = req.body;

      // const result = await usersCollections.insertOne(user);
      const result = await usersCollections.insertOne(user)
      res.send(result)
    })
    app.put('/users/:id', async(req, res)=> {
      const id = req.params.id;
      const user = req.body;
      const filter = { _id: new ObjectId(id)}
      const option = {upsert: true};
      const updatedUser = {
        $set: {
          name: user.name,
          email: user.email,
          designation: user.designation,
          address: user.address
        }
      }
      const result = await usersCollections.updateOne(filter, updatedUser, option)
      res.send(result);
    })
    // user delete
    app.delete('/users/:id', async(req,res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await usersCollections.deleteOne(query);
      res.send(result)
    })

   
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");


  } finally {

    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.listen(port, ()=> {
  console.log(`server is running port :  ${5000}`);
})