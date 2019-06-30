const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000;

app.get('/teams', (req, res) => res.send('Hello Teams!'))

app.listen(PORT, () => console.log(`Example app running!`))