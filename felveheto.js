	class Felveheto{
		constructor(x,y) {
			this.x = x;
			this.y = y;	
			this.width = 30;
			this.height = 30;
			this.div = document.createElement("div")
			this.div.style.width = this.width;
			this.div.style.height = this.height
			this.div.style.left = this.x;
			this.div.style.top = this.y;
			if(this.x > 0 && this.y > 0) {
			this.div.style.position = "absolute"
			this.vaszon =document.getElementById("canvas")
			this.vaszon.appendChild(this.div)
			objektek.push(this)
			}
			
		}
	}

    class Coin extends Felveheto {
		constructor(x,y,ertek) {
			super(x,y);
			this.ertek = ertek;
			this.div.style.backgroundImage = "url(Textures/penz.png)"
			//this.div.style.backgroundColor = "yellow"
			//this.div.style.border = "none"
		}
	}

	class Item extends Felveheto {
		constructor(x,y,nev,texture) {
			super(x,y);
			this.nev = nev;
			this.texture = texture
			this.div.style.backgroundImage = `url(Textures/${texture})`;
			//this.div.style.backgroundColor = "pink"
			//this.div.style.border = "1px solid black"
		//	this.div.innerText = this.nev
		}

		kirajzol(x,y) {
			this.div.style.position = "absolute"
			this.x = x;
			this.y = y;
			this.div.style.left = x
			this.div.style.top = y
			this.div.style.zIndex = "100"
			this.div.style.backgroundImage = `url(Textures/${this.texture})`;
			this.vaszon =document.getElementById("canvas")
			this.vaszon.appendChild(this.div)
			objektek.push(this)
		}
	}

	class Fegyver extends Item {
		constructor(x,y,nev,dmg,texture) {
			super(x,y,nev,texture);
			this.dmg = dmg;
		//	this.div.style.backgroundColor = "green"
		//	this.div.style.border = "1px solid blue"
		}
	}

	class Ruha extends Item {
		constructor(x,y,nev,hp,texture) {
			super(x,y,nev,texture);
			this.hp = hp;
			//this.div.style.backgroundColor = "blue"
		//	this.div.style.border = "1px solid green"
		}
	}

	class Kulcs extends Item {
		constructor(x,y,nev,texture) {
			super(x,y,nev,texture)
		//	this.div.style.backgroundColor = "red"
		//	this.div.style.border = "2px solid yellow"
		}

	}