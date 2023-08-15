const connectToMongo = require('./db');
const express = require('express')
connectToMongo();
var cors = require('cors')

const app = express()
const port = 5000


app.use(cors())


app.use(express.json()) // middleware, if we want to use req.body (go and see in ./routes/auth.js)  

// Available routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes/', require('./routes/notes'))

app.listen(port, () => {
  console.log(`iNotebook backend listening on port ${port}`)
})

// const start = async () => {
//     try {
//       await connectToMongo();
//       app.listen(port, () => {
//         console.log(`Connected to ${port}`);
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

