	class Felveheto{
		constructor(x,y,palya) {
			this.x = x;
			this.y = y;	
			this.width = 30;
			this.height = 30;
			this.div = document.createElement("div")
			this.div.style.width = this.width;
			this.div.style.height = this.height
			this.div.style.left = this.x;
			this.div.style.top = this.y;
			this.div.setAttribute("class","felveheto")
			this.palya = palya
			if(this.x > 0 && this.y > 0) {
			this.div.style.position = "absolute"
			this.vaszon =document.getElementById("canvas")
			this.vaszon.appendChild(this.div)
			this.palya.palyaObjekt.push(this)
			}
			
		}
	}

    class Coin extends Felveheto {
		constructor(x,y,ertek,palya) {
			super(x,y,palya);
			this.ertek = ertek;
			this.div.style.backgroundImage = "url(Textures/penz.png)"
			//this.div.style.backgroundColor = "yellow"
			//this.div.style.border = "none"
		}
	}

	class Item extends Felveheto {
		constructor(x,y,nev,texture,palya) {
			super(x,y,palya);
			this.nev = nev;
			this.texture = texture
			this.div.style.backgroundImage = `url(Textures/${texture})`;
			//this.div.style.backgroundColor = "pink"
			//this.div.style.border = "1px solid black"
		//	this.div.innerText = this.nev
		}

		kirajzol(x,y,lada) {
			this.x = x
			this.y = y
			this.div.style.position = "absolute"
			
			this.div.style.left = lada.width/2-this.width/2
			this.div.style.top =lada.height/2-this.height/2
			lada.div.appendChild(this.div)
			objektek.push(this)
		}
	}

	class Fegyver extends Item {
		// constructor(x,y,dmg = 3, range=0,speed=0,nev="Fegyver",textura=global_fegyver,manual = true) {
		constructor(x,y,nev,dmg,range,speed,texture,palya) {
			super(x,y,nev,texture,palya);
			this.dmg = dmg;
			this.range = range;
			this.speed = speed*10
		//	this.div.style.backgroundColor = "green"
		//	this.div.style.border = "1px solid blue"
		}
	}

	class Ruha extends Item {
		constructor(x,y,nev,hp,speed,meret,texture,palya) {
			super(x,y,nev,texture,palya);
			this.hp = hp;
			this.speed = speed;
			this.meret = meret;
			//this.div.style.backgroundColor = "blue"
		//	this.div.style.border = "1px solid green"
		}
	}

	class Kulcs extends Item {
		constructor(x,y,nev,texture,palya) {
			super(x,y,nev,texture,palya)
		//	this.div.style.backgroundColor = "red"
		//	this.div.style.border = "2px solid yellow"
		}

	}