const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

require('./controllers/authcontroller')(app);
require('./controllers/searchController')(app);

app.listen(port, ()=>{
    console.log(`Running on port ${port}`);
})