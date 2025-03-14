
class Karakter{
		constructor(nev,hp=15,x=0,y=0) {
			this.nev = nev;
			this.hp = hp;
			this.penz = 0;
			this.sebesseg = 3;
			this.dmg = 3;
			this.tamad = false
			this.x = x;
			this.y = y;
			this.width = 50;
			this.height = 50;
			this.iranyok = [false,false,false,false]
			this.lookIrany = 0
			this.nezesIrany = "";
			this.lokes =30;
			this.karakter = document.createElement("div")
			this.karakter.style.width = this.width 
			this.karakter.style.height = this.height 
			this.karakter.style.position = "absolute"
			//this.karakter.style.backgroundColor = "red"
			this.karakter.style.backgroundImage = "url(Textures/elore.png)"
			this.lastIrany = "";
			this.karakter.style.left = this.x
			this.karakter.style.top = this.y

			this.vaszon =document.getElementById("canvas")
			this.vaszon.appendChild(this.karakter)

			this.kulcs = 0;
			document.getElementById("penz").innerText = this.penz
			document.getElementById("hp").innerText = this.hp
			document.getElementById("dmg").innerText = this.dmg
			document.getElementById("kulcs").innerText = this.kulcs

			this.box = document.createElement("div")
			this.box.setAttribute("id","hitbox")
			this.hitMeret = this.width;
			this.box.style.position = "absolute"
			//this.box.style.backgroundColor = "green"
			this.vaszon.appendChild(this.box)	

			this.recovery = 150 //ms;
			this.recoveryP = document.createElement("p")
			this.recoveryP.innerText = " "
			this.recoveryP.style.position = "relative"
			this.recoveryP.style.textAlign = "center";
			this.recoveryP.style.top = -30;
			this.karakter.appendChild(this.recoveryP)

			this.itemek = [];
	
		}
		look(irany) {
			if(irany == "ArrowUp"){
				this.lookIrany = 1
				this.box.style.left = this.x;
				this.box.style.top = this.y-this.hitMeret;
				this.box.style.width = this.width
				this.box.style.height = this.hitMeret
				if(!(kari.iranyok[0] ||  kari.iranyok[1] ||  kari.iranyok[2] ||  kari.iranyok[3] )) {
       			 this.karakter.style.backgroundImage = "url(Textures/elore.png)"
				}
				
			}else 
			if(irany == "ArrowDown"){
				this.lookIrany = 3
				this.box.style.left = this.x;
				this.box.style.top = this.y+this.width;
				this.box.style.width = this.width
				this.box.style.height = this.hitMeret
				if(!(kari.iranyok[0] ||  kari.iranyok[1] ||  kari.iranyok[2] ||  kari.iranyok[3] )) {
       			this.karakter.style.backgroundImage = "url(Textures/hatra.png)"
				}
				
			}else
			if(irany == "ArrowLeft"){
				this.lookIrany = 2
				this.box.style.left = this.x-this.width;
				this.box.style.top = this.y;
				this.box.style.width = this.hitMeret
				this.box.style.height = this.height
				if(!(kari.iranyok[0] ||  kari.iranyok[1] ||  kari.iranyok[2] ||  kari.iranyok[3] )) {
					this.karakter.style.backgroundImage = "url(Textures/balra.png)"
				 }
			}else
			if(irany == "ArrowRight"){
				this.lookIrany = 4
				this.box.style.left = this.x+this.width;
				this.box.style.top = this.y;
				this.box.style.width = this.hitMeret
				this.box.style.height = this.height
				if(!(kari.iranyok[0] ||  kari.iranyok[1] ||  kari.iranyok[2] ||  kari.iranyok[3] )) {
					this.karakter.style.backgroundImage = "url(Textures/jobbra.png)"
				 }
			}else {
				this.lookIrany = 0
			}
		}
		left() {
			this.x -= this.sebesseg;
			if(!(this.iranyok[0] || this.iranyok[3] || this.iranyok[2])) {this.karakter.style.backgroundImage = "url(Textures/balra.gif)"}
			
			for(let i in objektek) {
				let obj = objektek[i];
				if(aabbCollision(this, obj)) {
					if (obj instanceof Wall) {
						if(obj.titkos) {
							this.x += this.sebesseg;
						}
					} else if(obj instanceof Felveheto) {
						torol(objektek[i])
					}
				}
				
			}
			
			this.karakter.style.left = this.x;
		}
		right() {
			this.x += this.sebesseg;
			if(!(this.iranyok[0] || this.iranyok[1] || this.iranyok[2])) {this.karakter.style.backgroundImage = "url(Textures/jobbra.gif)"}
			
			for(let i in objektek) {
				let obj = objektek[i];
				if(aabbCollision(this, obj)) {
					if (obj instanceof Wall) {
						if(obj.titkos) {
						this.x -= this.sebesseg;}
					} else if(obj instanceof Felveheto) {

						torol(objektek[i])
					}
				}
				
			}
			this.karakter.style.left = this.x;
		}
		up() {
			this.y -= this.sebesseg;
			
			if(!(this.iranyok[1] || this.iranyok[2] || this.iranyok[3])) {this.karakter.style.backgroundImage = "url(Textures/elore.gif)"}
			for(let i in objektek) {
				let obj = objektek[i];
				if(aabbCollision(this, obj)) {
					if (obj instanceof Wall) {
						if(obj.titkos) {
						this.y += this.sebesseg;}
					} else if(obj instanceof Felveheto) {
						torol(objektek[i])
					}
				}
				
			}

			this.karakter.style.top = this.y;
		}
		down() {
			this.y += this.sebesseg;
			if(!(this.iranyok[0] || this.iranyok[1] || this.iranyok[3])) {this.karakter.style.backgroundImage = "url(Textures/hatra.gif)"}
			
			for(let i in objektek) {
				let obj = objektek[i];
				if(aabbCollision(this, obj)) {
					if (obj instanceof Wall) {
						if(obj.titkos) {
						this.y -= this.sebesseg;}
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
							console.log(this.nezesIrany)
							obj.visszalok(this.lokes,this.lookIrany)
						}
					}
				}
				if(kari.tamad) {
					if(this.lookIrany == 1) {this.box.style.backgroundImage=`url(Textures/hitUp.gif)` }
					if(this.lookIrany == 2) {this.box.style.backgroundImage=`url(Textures/hitLeft.gif)` }
					if(this.lookIrany == 3) {this.box.style.backgroundImage=`url(Textures/hitDown.gif)` }
					if(this.lookIrany == 4) {this.box.style.backgroundImage=`url(Textures/hitRight.gif)` }
				
				//this.box.style.backgroundColor = "grey"
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
					//this.box.style.backgroundColor = "green"
					this.box.style.backgroundImage=""
					this.recoveryP.innerText = Math.floor(s/10) + "s";
			
				},this.recovery) 
				
	}
		}
		sebzodik(dmg){
			this.hp -= dmg;
			if(this.hp <= 0) {
				alert("Meghaltál.")
				window.location.href = "index.html"
			}
			this.infoUpdate();

		}
		infoUpdate() {
		document.getElementById("penz").innerText = this.penz
		document.getElementById("hp").innerText = this.hp
		document.getElementById("dmg").innerText = this.dmg
		document.getElementById("kulcs").innerText = this.kulcs
		}

	}