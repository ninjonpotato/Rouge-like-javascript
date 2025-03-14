const express = require('express');
const app = express();
const port = 3200;
const fs = require("fs").promises;
app.use(express.static('.')); //Ebben a mappában lévő statikus fájlokat használja.
app.use(express.json())
app.post('/mentes',(req,res) => { //Erre a végpontra érkező kérést fogadjuk
    let {message, palya_name} = req.body;
    let palyaString = "";
    for(let i of message) {
      let isLada = false;
      for(let j in i) {
        if(i[j] == "lada") {isLada = true;}
        if((j == "atributumok" || j == "itemAtib")) {
          let attributumok = i[j];
          palyaString += "|";
          for(let atr in attributumok) {
            if(atr == "Textúra") 
              {
                if(isLada) {  palyaString +=`${attributumok[atr]},`}else {
                  palyaString +=`${attributumok[atr]}`
                }         
              }else {
            palyaString +=`${attributumok[atr]},`
            }         
          }
        }else {
           palyaString +=`${i[j]},`
        }
         
      }
      palyaString += "\n"
    }
    console.log(palya_name)
    fajlbaIr(palya_name,palyaString)
    res.json({ message: 'Fájl sikeresen mentve!' }); //Válaszüzenet, ezzel küldöm vissza a beolvasott fájl tartalmát.
})

async function fajlbolOlvas(nev) { //asnync nélkül nem tudja retürnölni az adatot
  try {
    data = await fs.readFile("Maps/"+nev,'utf8')
    return data
  } catch(err)  {
    console.log(`Hiba történt: ${err}`)
  }
  
}

app.post("/beolvas",async (req,res) => {
  //requestben a pálya neve res a beolvasott fájl objekté alakítása és elküldése (ezzel majd a editor foglalkozik)
  let {palya} = req.body;
  palyaData = await fajlbolOlvas(palya)
  res.json({ message:palyaData });
})


app.listen(port, () => {
    console.log(`Szerver fut a http://localhost:${port}/index.html címen`);
  });

function fajlbaIr(nev,objektek) { //jelenleg hozzáfűz a régi pályához ha többször nyomunk a mentésre
  fs.writeFile(`Maps/${nev}`,objektek, (err) =>{
    if (err) {
        console.log('Hiba történt a fájl írásakor:', err);
      } else {
      console.log("fájl sikeresen létrehozva!")
      }
    });
} 

