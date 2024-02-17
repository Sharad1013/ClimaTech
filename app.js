const temprature = document.querySelector('.weather1');
const cityField = document.querySelector('.weather2 p');
const dateField = document.querySelector('.weather2 span');
const emojiField = document.querySelector('.weather3 img');
const weatherField = document.querySelector('.weather3 span');
const searchField = document.querySelector('.citySearch');
const form = document.querySelector('form');


//adding eventlistener to the form
form.addEventListener('submit', search);


//default location
var targetCity = "bangalore"
// function to fetch data from weatherAPI
const fetchData = async (targetCity) => {
    try{
        const url = `https://api.weatherapi.com/v1/current.json?key=fd8f89a2415f40d0a5b154951240902&q=${targetCity}`

        const response = await fetch(url);
        const data = await response.json();

        const {
            current: { temp_c,
                condition: { text, icon }, },
            location: { name, localtime },
        } = data;

        update(temp_c, name, localtime, icon, text);
    } catch (error){
        alert("Location Not Found!!")
    }
};

//updating the dom
function update(temprate, city, date, emoji, text ) {

    const exactTime = date.split(" ")[1];
    const exactDate = date.split(" ")[0];
    const exactDay = getDayFullName(new Date(exactDate).getDay());


    temprature.innerText = temprate;
    cityField.innerText = city;
    
    
    dateField.innerText = `${exactTime} - ${exactDay} ${exactDate}`;
    emojiField.src =  emoji;
    weatherField.innerText = text;
}



fetchData(targetCity);


//Searching the location
function search(e){
    e.preventDefault();
    targetCity = searchField.value;
    fetchData(targetCity);
};



function getDayFullName(num) {
    switch (num) {
        case 0:
            return "Sunday"
        case 1:
            return "Monday"
        case 2:
            return "Tueday"
        case 3:
            return "Wednesday"
        case 4:
            return "Thursday"
        case 5:
            return "Friday"
        case 6:
            return "Saturday"
        default:
            return "Not Found!!"
    }

}