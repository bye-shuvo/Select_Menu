const textsec = document.getElementById("textSection");
const optionMenu = document.getElementById("options");
const input = document.getElementById("input");
const wrapper = document.getElementById("wrapper");
let countryElement = document.getElementsByClassName("country");
const text = document.getElementById("text");
const userInput = document.getElementById("input");
dropDownToggle();
getCountryData();

async function getCountryData(){
    let Countryesponse = await fetch("countries.json");
    let data = await Countryesponse.json();

    let countryName = data.map((country)=>{
        return country.name;
    })
    
    countryName.forEach(country => {
        let element = `<li class="country"><p>${country}</p></li>`
        wrapper.insertAdjacentHTML("beforeend" , element);
        countryElement = document.getElementsByClassName("country");
    });

    show();
    search(countryName);
}

function dropDownToggle(){
    textsec.addEventListener("click" , ()=>{
        textsec.lastElementChild.firstElementChild.classList.toggle("rotate");
        optionMenu.classList.toggle("dropDownClose");
        optionMenu.classList.toggle("dropDownOpen");
        mediaHandle();
    })
}

function show(){
    Array.from(countryElement).forEach((element)=>{
        element.addEventListener("click" , (e)=>{
            text.innerText = e.target.innerText;
        },true)
    })
}

function search(countryName){
    userInput.addEventListener("input" , ()=>{
        let inputValue = userInput.value.toLowerCase();
        let filteredCountry = [];
        countryName.forEach((country)=>{
            if(country.substr(0,inputValue.length).toLowerCase() === inputValue){
                filteredCountry.push(country);
            }
        })

        Array.from(countryElement).forEach((country)=>{
            country.remove();
        });

        filteredCountry.forEach(country => {
            let element = `<li class="country"><p>${country}</p></li>`
            wrapper.insertAdjacentHTML("beforeend" , element);
            countryElement = document.getElementsByClassName("country");
        });
        show();
    })
}

function mediaHandle(){
    const media = window.matchMedia("(max-width:600px)");
    if(media.matches){
        userInput.blur();
    }
    else{
        userInput.focus();
    }
}
