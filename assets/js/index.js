const images = [{img: "../assets/images/IMG_20191025_224137.jpg", name: "horse1", breed:"breed11", year: 2000, owner: "Fernando"},{img: "../assets/images/IMG_20191027_225646.jpg", name: "horse2", breed:"breed11", year: 2000, owner: "Fernando"},{img: "../assets/images/IMG_20191027_225704.jpg", name: "horse3", breed:"breed11", year: 2000, owner: "Fernando"},{img: "../assets/images/IMG_20191027_225715.jpg", name: "horse4", breed:"breed11", year: 2000, owner: "Fernando"},{img: "../assets/images/IMG_20191027_225737.jpg", name: "horse5", breed:"breed11", year: 2000, owner: "Fernando"},{img: "../assets/images/IMG_20191027_225802.jpg", name: "horse6", breed:"breed11", year: 2000, owner: "Fernando"},{img: "../assets/images/IMG_20191027_225749.jpg", name: "horse7", breed:"breed11", year: 2000, owner: "Fernando"}];

let showingimgs = [6,0,1];
let midimg = showingimgs[1];

const herotab = document.querySelectorAll('.herotab');
const carousel = document.querySelector('.carousel');
const carouselbtns = document.querySelectorAll('.horsestext button');
const carouselimg = document.querySelectorAll('.carouselimg');

function createimg(img, value, midimg) {
    const newdiv = document.createElement("div");
    newdiv.className = "carouselimg";
    newdiv.style.backgroundImage = `url(${img.img})`;

    // console.log(newdiv, value);

    if (value == midimg) {
        newdiv.classList.add('activeimg');
        const blankdiv = document.createElement("div");
        blankdiv.className = "horseblank";
        const textdiv = document.createElement("div");
        textdiv.className = "horsedet";
        textdiv.innerHTML = `<h3>${img.name}</h3>
            <p>${img.breed}, ${img.year} <br>${img.owner}</p>`;
        newdiv.appendChild(blankdiv);
        newdiv.appendChild(textdiv);
    }

    carousel.appendChild(newdiv);
}

showingimgs.forEach((index) =>{
    createimg(images[index], index, midimg);
})

herotab.forEach((tab)=>{
    tab.addEventListener("click", ()=>{
        herotab.forEach(i => {
            i.classList.remove('activetab');
        });
        tab.classList.add('activetab');
    })
})

carouselbtns.forEach((btn)=>{
    btn.addEventListener("click", (e) => {
        const btnval = e.target.innerText;

        if (btnval === "<") {
            if (midimg > -1) {
                for (let i = 0; i < showingimgs.length; i++) {
                    showingimgs[i] -= 1;
                }
                console.log(showingimgs);
                
            }
        } else if (btnval === ">") {
            if (midimg < images.length ) {
                for (let i = 0; i < showingimgs.length; i++) {
                    showingimgs[i] += 1;
                }
                console.log(showingimgs);
            }
        }

        showingimgs = showingimgs.map(i => (i + images.length) % images.length);
        midimg = showingimgs[1];
        

        carousel.innerHTML = "";

        showingimgs.forEach((index) =>{
            console.log(images[index], index);
            createimg(images[index], index, showingimgs[1]);
        })
    });
})


// inputhandling
const searchinput = document.querySelector("#searchinput");
const searchbtn = document.querySelector("#searchbtn");
const findinput = document.querySelector("#findinput");
const findbtn = document.querySelector("#findbtn");
const suscribeinput = document.querySelector("#suscribeinput");
const suscribebtn = document.querySelector("#suscribebtn");
const radiobtns = document.getElementsByName('feature');
const togglebtn = document.getElementById('hamburger');
const columnnav = document.getElementById('columnnav');
const rownav = document.getElementById('rownav');

togglebtn.addEventListener("click", ()=>{
    columnnav.lastElementChild.classList.toggle('hidediv');
})

searchbtn.addEventListener("click", (e)=>{
    e.preventDefault();
    console.log(searchinput.value);
    addtostorage('search', searchinput.value);
    searchinput.value = '';
})

findbtn.addEventListener("click", (e)=>{
    e.preventDefault();

    for (let i = 0; i < radiobtns.length; i++) {
        if (radiobtns[i].checked) {
            if (findinput.value == '') {
                alert('enter zip code');
                return;
            } else if(isNaN(findinput.value)){
                alert('enter valid zip code');
            }

            const item = {feature: radiobtns[i].value, zipcode: findinput.value}

            console.log(item);
            addtostorage('find', item);
            alert('find', item);
            findinput.value = '';
        } 
    }
})

suscribebtn.addEventListener("click", (e)=>{
    e.preventDefault();

    if (!suscribeinput.value) {
        alert("enter your email");
    } else if (suscribeinput.value.includes('@gmail.com')) {
        const storage = getstorage('suscribed');
        if (storage.includes(suscribeinput.value)) {
            alert('exists');
            return;
        }

        console.log(suscribeinput.value);
        addtostorage('suscribed', suscribeinput.value);
        alert(`${suscribeinput.value} has been suscribed`);
        suscribeinput.value = '';
    } else{
        alert("enter valid email");
    }
})

function addtostorage(storagename, item){
    const storage = getstorage(storagename);
    storage.push(item);
    console.log(`${item} has been added to storage.`);
    
    localStorage.setItem(storagename, JSON.stringify(storage));
}

function getstorage (storagename){
    const storage = localStorage.getItem(storagename) ? JSON.parse(localStorage.getItem(storagename)):[];
    return storage;
}

function toggleNav() {
    if (window.innerWidth <= 840) {
      rownav.classList.add("hidediv");
      columnnav.classList.remove("hidediv");
    } else {
      rownav.classList.remove("hidediv");
      columnnav.classList.add("hidediv");
    }
}

window.addEventListener("load", toggleNav);
window.addEventListener("resize", toggleNav);
