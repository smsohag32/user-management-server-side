# always package.json file write to a script ..

```
    'start': 'node index.js'

```

- middleware use korty hobay ..... cors()

# env file create and handle username and password ;

- npm i dotenv

```
npm i dotenv
```

- create .env file and inside file .....

```
MONGOLAB_URI="mongodb://username:password@ds01316.mlab.com:1316/food"
```

- index.js inside file just type

```
const  dotenv = require('dotenv');
```

- then call to config

```
dotenv.config();
```

- last step

```
const  url = process.env.MONGOLAB_URI
```

# step to

- create databage
- create an user with password
- whitelist ip address
- database > connect > driver> node> show all code ..

- change the uri with .env file

# create .... post server site

- app.post
- make the function async to use await inside it
- make sure you use the express.json() middleware
- access data from the body: const user = req.body
- const result = await userCollections.insertOne(user);

# create client site

- create successful hole insertedId pawa jay ... data er vitor

```
 fetch(`http://localhost:5000/users`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          alert("User create successful");
          e.target.reset();
        }
      });
```

# read server site

```
 app.get('/users', async(req,res) =>{
      const cursor = usersCollections.find();
      const results  = await cursor.toArray()
      res.send(results)
    })
```

# read client site

```
just fetch
```

# delete server site

- dynamic id takey query kore delete one korete hobay ...

```
    app.delete('/users/:id', async(req,res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await usersCollections.deleteOne(query);
      res.send(result)
    })
```

# delete client site...

### filter kore deleted data badhay baki gula state a set korete hobay ... jar jonno usually ekta state declare kor ty hobay ...

- delete successful done hole deletedCount 1 hoy tai condition use

```
 fetch(`http://localhost:5000/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deleteDCount > 0) {
          alert("Delete user Successful");
          const remaining = users.filter((user) => user._id !== id);
          setUsers(remaining);
        }
      });
```

# projection

- option er vitor sort korer jonno projection er vitor key set kore dewa hoy..
