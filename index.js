import express from 'express';
import cors from 'cors';
import 'dotenv/config'

const app = express()
const port = process.env.PORT || 5000

// middleware 
app.use(cors())
app.use(express.json())

app.get('/', (req, res)=>{
    res.send('my electric-echoes server is running')
})

app.listen(port, ()=>{
    console.log(`my server is running on port: ${port}`);
})