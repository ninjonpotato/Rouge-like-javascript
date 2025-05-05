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
        }else if(j == "aruk") {
           palyaString +=`|`
           let it = 0;
           let dbC = 0;
           let aruk = i[j]
          for(let aru in aruk) {
            let elem = aruk[aru]
           if(typeof elem == "object") {
              for(let param in elem) {
                let atrib = elem[param]
                 palyaString +=`${atrib},`
              }
            }else {
              if(it == aruk.length-1) {
                palyaString +=`${elem}`
              }else {
                if(typeof elem == "number") {
                  dbC++
                  if(dbC > 1) {
                     palyaString +=`${elem}|`
                     dbC = 0
                  }else {
                  palyaString +=`${elem},`
                  }
                 
                }else {
                   palyaString +=`${elem},`
                }
                 
              }
               
            }
            it++;
          }
           
        }
        else {
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


app.post("/asset_mentes",async (req,res) => {
  let {asset} = req.body;
  AssetMentes(asset);
 res.json({ message: 'Fájl sikeresen mentve!' });
})

function fajlbaIr(nev,objektek) {
  fs.writeFile(`Maps/${nev}`,objektek, (err) =>{
    if (err) {
        console.log('Hiba történt a fájl írásakor:', err);
      } else {
      console.log("fájl sikeresen létrehozva!")
      }
    });
} 


app.post("/clear",async (req,res) => {
  let {path} = req.body;
  fileEmpty(path);
 res.json({ message: 'Fájl sikeresen kiürítve!' });
})
function fileEmpty(path) {
  fs.writeFile(path,"", (err) =>{
    if (err) {
        console.log('Hiba történt a fájl írásakor:', err);
      } else {
      console.log("fájl sikeresen kiürítve!")
      }
    });
}

function AssetMentes(asset) {

    fs.writeFile(`asset`,asset, {flag: 'a+'}, (err) =>{
      if (err) {
          console.log('Hiba történt a fájl írásakor:', err);
        } else {
        console.log("fájl sikeresen létrehozva!")
        }
      });
  }


app.post("/fajlBeolvas", async (req,res) =>{
  let {fajl} = req.body
  res.json({ message: await FajlOlvas(fajl)});
})
app.post("/fajlMentes",async (req,res) =>{
  let {nev,tartalom} = req.body
  res.json({ message: await FajlMentes(nev,tartalom)});
})
app.post("/asset_betoltes",async (req,res) => {
   res.json({ message: await AssetOlvas()});
  })
  

  async function FajlOlvas(fajl) { 
    try {
      data = await fs.readFile(fajl,'utf8')
      return data
    } catch(err)  {
      console.log(`Hiba történt: ${err}`)
    }
  }

  function FajlMentes(nev,tartalom) {

    fs.writeFile(nev,tartalom, (err) =>{
      if (err) {
          console.log('Hiba történt a fájl írásakor:', err);
        } else {
        console.log("fájl sikeresen létrehozva!")
        }
      });
  }



  async function AssetOlvas() { 
    try {
      data = await fs.readFile("asset",'utf8')
      return data
    } catch(err)  {
      console.log(`Hiba történt: ${err}`)
    }
  }



app.listen(port, () => {
  console.log(`Szerver fut a http://localhost:${port}/index.html címen`);
});