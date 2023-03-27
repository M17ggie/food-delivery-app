import app from "./src/app"
const mongoose = require('mongoose');

//DB Connection
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.mimdgki.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB')
}).catch((err: any) => {
    console.log('Connection to DB failed')
})

//PORT connection
app.listen(process.env.PORT, () => {
    console.log(`Listening to PORT ${process.env.PORT}`)
})