const mongoose = require('mongoose')
const mongoURI = 'mongodb://127.0.0.1:27017/inotebook'

const connectToMongo = ()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("Connected to mongo database")
    })
}

// const connectToMongo = () => {
//   mongoose
//     .connect(mongoUri)
//     .then(() => console.log("connection success"))
//     .catch((err) => console.log(err));
// };

module.exports = connectToMongo;