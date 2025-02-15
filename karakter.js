class Karakter{
		constructor(nev,hp) {
			this.nev = nev;
			this.hp = hp;
			this.penz = 0;
			this.sebesseg = 3;
			this.dmg = 3;
			this.tamad = false
			this.x = 230;
			this.y = 230;
			this.width = 100;
			this.height = 100;
			this.iranyok = [false,false,false,false]
			this.nezesIrany = "";
			this.lokes = 50;
			this.karakter = document.createElement("div")
			this.karakter.style.width = this.width 
			this.karakter.style.height = this.height 
			this.karakter.style.position = "absolute"
			this.karakter.style.backgroundColor = "red"
			this.karakter.style.left = this.x;
			this.karakter.style.top = this.y
			this.vaszon =document.getElementById("canvas")
			this.vaszon.appendChild(this.karakter)

			document.getElementById("penz").innerText = this.penz
			document.getElementById("hp").innerText = this.hp

			this.box = document.createElement("div")
			this.box.setAttribute("id","hitbox")
			this.hitMeret = 50;
			this.box.style.position = "absolute"
			this.box.style.backgroundColor = "green"
			this.vaszon.appendChild(this.box)	

			this.recovery = 10000 //ms;
			this.recoveryP = document.createElement("p")
			this.recoveryP.innerText = " "
			this.recoveryP.style.position = "relative"
			this.recoveryP.style.textAlign = "center";
			this.recoveryP.style.top = -30;
			this.karakter.appendChild(this.recoveryP)
		}
		look(irany) {
			if(irany == "ArrowUp"){
				this.box.style.left = this.x;
				this.box.style.top = this.y-this.hitMeret;
				this.box.style.width = this.width
				this.box.style.height = this.hitMeret
			}
			if(irany == "ArrowDown"){
				this.box.style.left = this.x;
				this.box.style.top = this.y+this.width;
				this.box.style.width = this.width
				this.box.style.height = this.hitMeret
			}
			if(irany == "ArrowLeft"){
				this.box.style.left = this.x-30;
				this.box.style.top = this.y;
				this.box.style.width = this.hitMeret
				this.box.style.height = this.height
			}
			if(irany == "ArrowRight"){
				this.box.style.left = this.x+this.width;
				this.box.style.top = this.y;
				this.box.style.width = this.hitMeret
				this.box.style.height = this.height
			}
		}
		left() {
			this.x -= this.sebesseg;
			
			for(let i in objektek) {
				let obj = objektek[i];
				if(aabbCollision(this, obj)) {
					if (obj instanceof Wall) {
						this.x += this.sebesseg;
					} else if(obj instanceof Felveheto) {
						torol(objektek[i])
					}
				}
				
			}
			
			this.karakter.style.left = this.x;
		}
		right() {
			this.x += this.sebesseg;
			
			for(let i in objektek) {
				let obj = objektek[i];
				if(aabbCollision(this, obj)) {
					if (obj instanceof Wall) {
			
						this.x -= this.sebesseg;
					} else if(obj instanceof Felveheto) {

						torol(objektek[i])
					}
				}
				
			}
			this.karakter.style.left = this.x;
		}
		up() {
			this.y -= this.sebesseg;
			
			for(let i in objektek) {
				let obj = objektek[i];
				if(aabbCollision(this, obj)) {
					if (obj instanceof Wall) {
				
						this.y += this.sebesseg;
					} else if(obj instanceof Felveheto) {
						torol(objektek[i])
					}
				}
				
			}

			this.karakter.style.top = this.y;
		}
		down() {
			this.y += this.sebesseg;
			
			for(let i in objektek) {
				let obj = objektek[i];
				if(aabbCollision(this, obj)) {
					if (obj instanceof Wall) {
						this.y -= this.sebesseg;
					} else if(obj instanceof Felveheto) {

						torol(objektek[i])
						
					
					}
				}
				
			}


			this.karakter.style.top = this.y;
		}

		attack() {
				this.tamad = true
				let xx = parseInt(this.box.style.left.split("px")[0]);
				let yy = parseInt(this.box.style.top.split("px")[0]);
				let ww = parseInt(this.box.style.width.split("px")[0])
				let hh =parseInt(this.box.style.height.split("px")[0])
				let h = new Hitbox(xx,yy,ww,hh)
				for(let i in objektek) {
					let obj = objektek[i];
					if(aabbCollision(h,obj)) 
					{
						if(obj instanceof Enemy) {
							obj.sebzodik(this.dmg)
							obj.visszalok(this.lokes)
						}
					}
				}
				if(kari.tamad) { 
				this.box.style.backgroundColor = "grey"
				let s = this.recovery/100// 1s
				let interv = setInterval(()=> {
					if(this.tamad) {
					this.recoveryP.innerText =  s/10 +"s";
					if(s > 0) {
						s-=1;
					}else {
						clearInterval(interv)
					}
					
					}
				},100)
				console.log(this.recovery/1000+"s")
				setTimeout(() =>{
					this.tamad = false	
					this.box.style.backgroundColor = "green"
					this.recoveryP.innerText = Math.floor(s/10) + "s";
			
				},this.recovery) 
				
	}
		}
		sebzodik(dmg){
			this.hp -= dmg;
			if(this.hp <= 0) {alert("Meghaltál :/")}
			this.infoUpdate();

		}
		infoUpdate() {
		document.getElementById("penz").innerText = this.penz
		document.getElementById("hp").innerText = this.hp
		}

	}