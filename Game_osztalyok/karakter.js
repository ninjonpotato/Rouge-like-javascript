
class Karakter{
		constructor(nev,x=0,y=0) {
			this.nev = nev;
			this.hp = 10000;
			this.penz = 0;
			this.sebesseg = 2;
			this.dmg = 1000;
			this.tamad = false
			this.x = x;
			this.y = y;
			this.xm = 0;
			this.ym = 0;
			this.le = 0.99
			this.width = 30;
			this.height = 50;
			this.maxHP = 100;
			this.iranyok = [false,false,false,false]
			this.lookIrany = 0
			this.nezesNyomva = false;
			this.zuhan = false;
			this.mozog = false
			this.kulcsok = []
			this.lokes =30;
			this.hitOverlay = document.createElement("div")
			this.hitOverlay.style.width = this.width
			this.hitOverlay.style.height =this.height
			this.hitOverlay.style.opacity = 0
			this.hitOverlay.style.backgroundColor = "white"
			this.karakter = document.createElement("div")
			this.karakter.appendChild(this.hitOverlay)
			this.karakter.style.width = this.width 
			this.karakter.style.height = this.height 
			this.karakter.style.position = "absolute"
			//this.karakter.style.backgroundColor = "red"
			this.karakter.style.backgroundImage = "url(Textures/elore.png)"
			this.lastIrany = "";
			this.karakter.style.left = this.x
			this.karakter.style.top = this.y
			this.karakter.setAttribute("id","kari")
			this.vaszon =document.getElementById("canvas")
			this.vaszon.appendChild(this.karakter)

			this.kulcs = 0;
			document.getElementById("penz").innerText = this.penz
			document.getElementById("hp").innerText = this.hp
			document.getElementById("dmg").innerText = this.dmg
			document.getElementById("kulcs").innerText = this.kulcs

			this.box = document.createElement("div")
			this.box.setAttribute("id","hitbox")
			this.hitMeret = this.height;
			this.box.style.position = "absolute"
			//this.box.style.backgroundColor = "green"
			this.vaszon.appendChild(this.box)	

			this.recovery = 500 //min: 100
			this.recoveryP = document.createElement("p")
			this.recoveryP.innerText = " "
			this.recoveryP.style.position = "relative"
			this.recoveryP.style.textAlign = "center";
			this.recoveryP.style.color = "white";
			this.recoveryP.style.backgroundColor = "black";
			this.recoveryP.style.top = -30;
			this.recoveryP.style.display = "none"
			this.karakter.appendChild(this.recoveryP)

			this.itemek = [];
			this.infoUpdate()
		}
		look(irany) {
			let offset = (this.width-this.hitMeret)/2
			switch(irany) {
				case "ArrowUp":
					this.lookIrany = 1
					this.box.style.left = this.x + offset;
					this.box.style.top = this.y-this.hitMeret+10;
					this.box.style.width = this.hitMeret
					this.box.style.height = this.hitMeret
					if(!(kari.iranyok[0] ||  kari.iranyok[1] ||  kari.iranyok[2] ||  kari.iranyok[3] )) {
					this.karakter.style.backgroundImage = "url(Textures/elore.png)"
					}
					if(this.tamad) {
						this.box.style.transform = "rotate(0deg)";
						this.box.style.backgroundImage=`url(Textures/hitUp.gif)`
					}
					break;
				case "ArrowDown":
					this.lookIrany = 3
					this.box.style.left = this.x+offset;
					this.box.style.top = this.y+this.hitMeret-10;
					this.box.style.width = this.hitMeret
					this.box.style.height = this.hitMeret
					if(!(kari.iranyok[0] ||  kari.iranyok[1] ||  kari.iranyok[2] ||  kari.iranyok[3] )) {
					this.karakter.style.backgroundImage = "url(Textures/hatra.png)"
					}
					if(this.tamad) {
						this.box.style.transform = "rotate(180deg)";
						this.box.style.backgroundImage=`url(Textures/hitUp.gif)`
					}
					break;
				case "ArrowLeft":
					this.lookIrany = 2
					this.box.style.left = this.x-this.hitMeret+10;
					this.box.style.top = this.y;
					this.box.style.width = this.hitMeret
					this.box.style.height = this.hitMeret
					if(!(kari.iranyok[0] ||  kari.iranyok[1] ||  kari.iranyok[2] ||  kari.iranyok[3] )) {
						this.karakter.style.backgroundImage = "url(Textures/balra.png)"
					}
					if(this.tamad) {
						this.box.style.transform = "rotate(270deg)";
						this.box.style.backgroundImage=`url(Textures/hitUp.gif)`
					}
					break;
				case "ArrowRight":
					this.lookIrany = 4
					this.box.style.left = this.x+this.width-10;
					this.box.style.top = this.y;
					this.box.style.width = this.hitMeret
					this.box.style.height = this.hitMeret
					if(!(kari.iranyok[0] ||  kari.iranyok[1] ||  kari.iranyok[2] ||  kari.iranyok[3] )) {
						this.karakter.style.backgroundImage = "url(Textures/jobbra.png)"
					}
					if(this.tamad) {
						this.box.style.transform = "rotate(90deg) scaleX(-1)";
						this.box.style.backgroundImage=`url(Textures/hitUp.gif)`
					}
					break;
				default: 
				this.lookIrany = 0
				break;

			}
		}

		vasarol(ar) {
			this.penz -= parseFloat(ar);
			this.infoUpdate()
		}

		ifCollide(irany) {
			let prevX = 0;
			let prevY = 0;
			for(let i in objektek) {
				let obj = objektek[i];
				if(aabbCollision(this, obj)) {
					if (obj instanceof Wall) {
						if(obj.titkos) {
						if(irany == 1) {this.y += this.sebesseg;} //fel
						if(irany == 2) {this.x += this.sebesseg;} //bal
						if(irany == 3) {this.y -= this.sebesseg;} //le
						if(irany == 4) {this.x -= this.sebesseg;} //jobb
					}
					} 
					if(obj instanceof Felveheto) {
						torol(objektek[i])
					}
					if(obj instanceof Tile) {
						if(obj.isVoid) {
							this.atiranyit(obj.x, obj.y)
							if(obj instanceof Felveheto) {
								torol(objektek[i])
							}
							obj.div.style.backgroundImage="url(Textures/eses.gif)"
							this.addHp(-20);
							this.zuhan = true
							this.karakter.style.opacity = "0"
							setTimeout(()=>{
								if(irany == 1) {this.atiranyit(obj.x, obj.y+this.height+20)} //fel
								if(irany == 2) {this.atiranyit(obj.x+this.width+40, obj.y)} //bal
								if(irany == 3) {this.atiranyit(obj.x, obj.y-this.height-20)} //le
								if(irany == 4) {this.atiranyit(obj.x-this.width-20, obj.y)} //jobb
								this.zuhan = false;
									obj.div.style.backgroundImage="url(Textures/void.png)"
									this.karakter.style.opacity = "100"
							},800)
				
						}
					} 
					if(obj instanceof Exit) {
					
						obj.betoltes()
					
					}
					if(obj instanceof Uzenet) {
						if(arus_megjelenitve) {
							obj.bezar()
						}else {
						if(obj.megnyitva == false) {
							playSound("openUzenet")
						}
							obj.olvas()
						}
						
					}
					if(obj instanceof Arus) {
						if(uzenet != null) {
							uzenet.bezar()
							
						}
						if(obj.megjelenit==false) {
							playSound("openArus")
						}
						arus_megjelenitve = true;

						obj.showAru()
						
					}
				}else {
					prevX = this.x
					prevY = this.y
					if(obj instanceof Arus) {
						arus_megjelenitve = false;
						obj.hideAru()
					}
				}
		}
		}
		left() {
			
			this.x -= this.sebesseg;	
			this.xm += 0;
				if(this.nezesNyomva) {
				if(this.lookIrany == 1) {this.karakter.style.backgroundImage=`url(Textures/elore.gif)` }
					if(this.lookIrany == 2) {this.karakter.style.backgroundImage=`url(Textures/balra.gif)` }
					if(this.lookIrany == 3) {this.karakter.style.backgroundImage=`url(Textures/hatra.gif)` }
					if(this.lookIrany == 4) {this.karakter.style.backgroundImage=`url(Textures/jobbra.gif)` }
			}else {
				if(!(this.iranyok[0] || this.iranyok[3] || this.iranyok[2])) //csak balra megyünk
				{
					this.karakter.style.backgroundImage = "url(Textures/balra.gif)"
				}
			}
			this.ifCollide(2)	
			this.karakter.style.left = this.x;
		}
		right() {

			this.x += this.sebesseg	
					if(this.nezesNyomva) {
					if(this.lookIrany == 1) {this.karakter.style.backgroundImage=`url(Textures/elore.gif)` }
					if(this.lookIrany == 2) {this.karakter.style.backgroundImage=`url(Textures/balra.gif)` }
					if(this.lookIrany == 3) {this.karakter.style.backgroundImage=`url(Textures/hatra.gif)` }
					if(this.lookIrany == 4) {this.karakter.style.backgroundImage=`url(Textures/jobbra.gif)` }
			}else {
				if(!(this.iranyok[0] || this.iranyok[1] || this.iranyok[2])) {this.karakter.style.backgroundImage = "url(Textures/jobbra.gif)"}
			}
				
			this.ifCollide(4)
		
			this.karakter.style.left = this.x;
		}
		up() {
			this.y -= this.sebesseg;
			
			if(this.nezesNyomva) {
				if(this.lookIrany == 1) {this.karakter.style.backgroundImage=`url(Textures/elore.gif)` }
					if(this.lookIrany == 2) {this.karakter.style.backgroundImage=`url(Textures/balra.gif)` }
					if(this.lookIrany == 3) {this.karakter.style.backgroundImage=`url(Textures/hatra.gif)` }
					if(this.lookIrany == 4) {this.karakter.style.backgroundImage=`url(Textures/jobbra.gif)` }
			}else {

				if(!(this.iranyok[1] || this.iranyok[2] || this.iranyok[3])) {this.karakter.style.backgroundImage = "url(Textures/elore.gif)"}
			}
			this.ifCollide(1)
			
			this.karakter.style.top = this.y;
		}
		down() {
			this.y += this.sebesseg;

			if(this.nezesNyomva) {
				if(this.lookIrany == 1) {this.karakter.style.backgroundImage=`url(Textures/elore.gif)` }
					if(this.lookIrany == 2) {this.karakter.style.backgroundImage=`url(Textures/balra.gif)` }
					if(this.lookIrany == 3) {this.karakter.style.backgroundImage=`url(Textures/hatra.gif)` }
					if(this.lookIrany == 4) {this.karakter.style.backgroundImage=`url(Textures/jobbra.gif)` }
			} else {
				if(!(this.iranyok[0] || this.iranyok[1] || this.iranyok[3])) {this.karakter.style.backgroundImage = "url(Textures/hatra.gif)"}
			}
			this.ifCollide(3)
			this.karakter.style.top = this.y;
		}
		
		attack() {
				this.tamad = true
				playSound("utes")
				this.recoveryP.style.display = "block"
				let xx = parseInt(this.box.style.left.split("px")[0]);
				let yy = parseInt(this.box.style.top.split("px")[0]);
				let ww = parseInt(this.box.style.width.split("px")[0])
				let hh =parseInt(this.box.style.height.split("px")[0])
				let h = new Hitbox(xx,yy,ww,hh)
				//ütés kezelése
				for(let i in objektek) {
					let obj = objektek[i];
					if(obj != null){
					if(aabbCollision(h,obj)) 
					{
						if(obj instanceof Enemy) {
							obj.sebzodik(this.dmg)
							if(obj.sebesseg > 0) {
							obj.visszalok(this.lokes,this.lookIrany)}
						}
					}
				}
				}
				if(kari.tamad) {
				//this.box.style.backgroundColor = "grey"
				let s = this.recovery/100// 1s
				//Visszaszámlálás
				let interv = setInterval(()=> {
 					if(this.tamad) {
					this.recoveryP.innerText =  (s/10).toFixed(2) +"s";
					if(s> 0) {
						s-=1;
					}else {
						clearInterval(interv)
					}
					
					}
				},100)
				setTimeout(() =>{
					this.recoveryP.style.display = "none"
					this.tamad = false	
					//this.box.style.backgroundColor = "green"
					this.box.style.backgroundImage=""
					this.recoveryP.innerText = Math.floor(s/10) + "s";
			
				},this.recovery+100) 
				
	}
		}

		addHp(mennyiseg) {
				this.hp += mennyiseg
				if( this.hp <= 0) {
					setTimeout(()=>{
						this.die();
					},1000)
	
				}
				this.infoUpdate()
		}
		picupItem(item) {
			//hp
			if(item instanceof Ruha) {
				playSound("pickupRuha")
				this.hp += parseFloat(item.hp);
				this.sebesseg += parseFloat(item.speed);
				//méretet lekezelni
				if( this.hp <= 0) {
					setTimeout(()=>{
						this.die();
					},1000)
	
				}
			}
			if(item instanceof Fegyver) {
				playSound("pickupFegyver")
				this.dmg += item.dmg
				if(this.recovery-item.speed < 100) {
					this.recovery = 100
				}else {
					this.recovery -= item.speed
				}
		
			}
			if(item instanceof Kulcs) {
				playSound("pickupKey")
				this.kulcsok.push(item)
				this.kulcs++;
			}
			if(item instanceof Coin) {
					playSound("coin")
				  
				this.penz+= parseFloat(item.ertek);
			}
		
			this.infoUpdate()
			return true;
		} 
		die() {
		this.karakter.style.backgroundPositionX = "0";
		this.karakter.style.backgroundImage = "url(Textures/meghal.gif)"
		setTimeout(()=>{
			this.karakter.style.backgroundImage = "url(Textures/meghal.png)"
		},400)
		kari = null
		setTimeout(()=>{
				window.location.href = "index.html"
		},2600)
				}
		sebzodik(dmg){
			this.hp -= dmg;
			this.hitOverlay.style.opacity = 0.9
			setTimeout(()=>{
				this.hitOverlay.style.opacity = 0
			},100)
			this.infoUpdate();
			if(this.hp <= 0) {
				this.die();
			
			}
		

		}
		infoUpdate() {
		document.getElementById("penz").innerText = this.penz.toFixed(2)
		document.getElementById("hp").innerText = this.hp.toFixed(2)
		document.getElementById("dmg").innerText = this.dmg
		document.getElementById("kulcs").innerText = this.kulcs
		}

		atiranyit(x,y) {
			this.x = x;
			this.y = y;
			this.karakter.style.left = this.x;
			this.karakter.style.top = this.y;
		}
	}