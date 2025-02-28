const express = require('express');
const app = express();
const port = 3000;
app.use(express.static('MapEditor'));
app.use(express.json())
app.post('/mentes',(req,res) => {
    let {message} = req.body;
    console.log("Üzenet jött: "+message)
    res.json({ message: 'Fájl sikeresen mentve!' });
})

app.listen(port, () => {
    console.log(`Szerver fut a http://localhost:${port}/mapEditor.html címen`);
  });
/*
fs.writeFile("example.txt","Ez van benne", (err) =>{
    if (err) {
        console.log('Hiba történt a fájl írásakor:', err);
      } else {
      console.log("fájl sikeresen létrehozva!")
      }
    });

    
fs.readFile('example.txt', 'utf8', (err, data) => {
  if (err) throw err;
  alert(data)
});*/