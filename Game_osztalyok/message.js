class Uzenet {
    constructor(x,y,msg="üdv",texture,palya) {
    this.x = x;
    this.y = y;
    this.palya = palya
    this.texture = texture
    this.msg =msg;

    this.width = 60;
    this.height = 60;
    this.div = document.createElement("div")
    this.div.style.width = this.width;
    this.div.style.height = this.height
    this.div.style.position = "absolute"
    this.div.setAttribute("class","msg")
//	this.div.style.backgroundColor = "yellow"
    this.div.style.backgroundImage=`url(Textures/${this.texture})`
    this.div.style.left = this.x;
    this.div.style.top = this.y;
    this.vaszon =document.getElementById("canvas")
    this.palya.palyaObjekt.push(this)
    this.vaszon.appendChild(this.div)
    this.text = document.createElement("p")
    this.textBox = document.getElementById("textBox")
    this.text.innerHTML = this.msg
    this.megnyitva = false
    
}

olvas() {
    uzenet = this
    this.megnyitva = true
    this.textBox.innerHTML = ""
    this.textBox.style.display ="block"
    this.textBox.style.width = "80%"
    this.textBox.style.animationName = "uzenet-megjelen"
    this.textBox.style.animationDuration = "1s"
    this.textBox.appendChild(this.text)
    let exit = document.createElement("p")
    exit.innerText = "Exit [E]"
    this.textBox.appendChild(this.text)
    this.textBox.appendChild(exit)
}
bezar() {
    this.megnyitva = false
        this.textBox.style.animationName = "uzenet-bezar"
        this.textBox.style.animationDuration = "1s"
        this.textBox.style.width = "0px"
        
}
}