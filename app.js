import {fetchFromRadar} from 'flightradar24-client'
import express from 'express';
import dotenv from 'dotenv';
const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;

//Serving Images,CSS files and JS files in dir named 'public'
app.use(express.static('public'))
//Setting the view engine
app.set('view engine', 'ejs');


//Routes
app.get('/', (req, res) => {
    res.render('index', { title: 'Home'});
});

app.get('/api/flights', async (req, res) => {
    try {
      const flights = await fetchFromRadar(46.57, 13.41, 42.03, 19.51);
      res.json(flights);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch flight data' });
    }
  });

//Middleware
app.use((req,res) =>{
    res.status(404).render('error')
})

/*
const flights = await fetchFromRadar(46.57, 13.41, 42.03, 19.51)
console.log(flights)
*/
app.listen(PORT, () =>{
    console.log(`Listening on http://localhost:${PORT}`)
});
