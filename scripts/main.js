const theatreSelect = document.getElementById("theatreSelect");
const divmovieinfo = document.getElementById('divmovieinfo');
const movieTicker = document.getElementById('movieTicker');
var movieTickerTheatre = '';
var movieTickerCounter = 0;

const CapitalRegion = [1056, 1050, 1058, 1034, 1047, 1038, 1043]; // All theatres in Helsinki, Espoo, Vantaa
const Espoo = [1056, 1050]; // All theatres in Espoo
const Helsinki = [1058, 1034, 1047, 1038]; // All theatres in Helsinki
const UnavailableRegions = [1015, 1016, 1017, 1041, 1018, 1019, 1021, 1034, 1035, 1047, 1022, 1046]; // Finnkino API only shows info for theatres in the Helsinki Capital Region

document.addEventListener('DOMContentLoaded', () => {
    url = "https://www.finnkino.fi/xml/TheatreAreas/"; // Request theatre list XML from Finnkino
    console.log(url);
    fetch(url) // Makes HTTP request to Finnkino server
        .then(response => response.text())
        .then(data => {
            parsetheatreXML(data);
        })
        .catch(error => {
            console.error('Error fetching Finnkino theatre data:', error);
        });
    function parsetheatreXML(data) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, "application/xml");
        const errorNode = doc.querySelector("parsererror"); // Error handling in parser
        if (errorNode) {
            console.log("error while parsing Finnkino theatre data");
        } else {
            var theatres = doc.getElementsByTagName("TheatreArea");
            var theatreID;
            looperTheatreID: for (let i = 0; i < theatres.length; i++) { // Add every theatre to dropdown list as option, add ID as value
                theatreName = (theatres[i].getElementsByTagName("Name")[0].textContent);
                theatreID = (theatres[i].getElementsByTagName("ID")[0].textContent);
                for (let x = 0; x < UnavailableRegions.length; x++) { // Filters out theatres that aren't available on Schedule API
                    if (theatreID == UnavailableRegions[x]) {
                        continue looperTheatreID;
                    }
                }
                const option = document.createElement('option');
                option.innerText = `${theatreName}`;
                option.value = `${theatreID}`;
                console.log(option);
                theatreSelect.appendChild(option);
            }
        }
    }
});

function requestSchedule() {
    var theatreID = document.getElementById("theatreSelect").value; // Selected theatre
    console.log("Theatre ID: " + theatreID);
    if (theatreID == 1029) { // No theatre selected, no need to request schedule
        return;
    }
    url = "https://www.finnkino.fi/xml/Schedule/"; // Request schedule XML from Finnkino
    fetch(url) // Makes HTTP request to Finnkino server
        .then(response => response.text())
        .then(data => {
            parsescheduleXML(data);
        })
        .catch(error => {
            console.error('Error fetching Finnkino schedule data:', error);
        });
    function parsescheduleXML(data) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, "application/xml");
        const errorNode = doc.querySelector("parsererror"); // Error handling in parser
        if (errorNode) {
            console.log("error while parsing Finnkino schedule data");
        } else {
            var shows = doc.getElementsByTagName("Show");
            while (divmovieinfo.firstChild) { // Removes previously printed movie info. Solution by Gabriel McAdams on stackoverflow https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
                divmovieinfo.removeChild(divmovieinfo.lastChild);
            }
            movieTickerCounter = 0;
            for (let i = 0; i < shows.length; i++) { // Check all shows for matching theatre ID
                if (theatreID == 1014) { // Helsinki, Espoo, or Vantaa
                    if (shows[i].getElementsByTagName("TheatreID")[0].textContent.indexOf(CapitalRegion)) {
                        movieTickerTheatre = "Pääkaupunkiseutu";
                        printShowInfo(i, shows);
                    }
                } else if (theatreID == 1012) { // Espoo
                    if (shows[i].getElementsByTagName("TheatreID")[0].textContent.indexOf(Espoo)) {
                        movieTickerTheatre = "Espoo";
                        printShowInfo(i, shows);
                    }
                } else if (theatreID == 1039) { // Espoo OMENA
                    if (shows[i].getElementsByTagName("TheatreID")[0].textContent == 1056) {
                        movieTickerTheatre = "Espoo OMENA";
                        printShowInfo(i, shows);
                    }
                } else if (theatreID == 1038) { // Espoo SELLO
                    if (shows[i].getElementsByTagName("TheatreID")[0].textContent == 1050) {
                        movieTickerTheatre = "Espoo SELLO";
                        printShowInfo(i, shows);
                    }
                } else if (theatreID == 1002) { // Helsinki
                    if (shows[i].getElementsByTagName("TheatreID")[0].textContent.indexOf(Helsinki)) {
                        movieTickerTheatre = "Helsinki";
                        printShowInfo(i, shows);
                    }
                } else if (theatreID == 1045) { // Helsinki ITIS
                    if (shows[i].getElementsByTagName("TheatreID")[0].textContent == 1058) {
                        movieTickerTheatre = "Helsinki ITIS";
                        printShowInfo(i, shows);
                    }
                } else if (theatreID == 1031) { // Helsinki KINOPALATSI
                    if (shows[i].getElementsByTagName("TheatreID")[0].textContent == 1034) {
                        movieTickerTheatre = "Helsinki KINOPALATSI";
                        printShowInfo(i, shows);
                    }
                } else if (theatreID == 1032) { // Helsinki MAXIM
                    if (shows[i].getElementsByTagName("TheatreID")[0].textContent == 1047) {
                        movieTickerTheatre = "Helsinki MAXIM";
                        printShowInfo(i, shows);
                    }
                } else if (theatreID == 1033) { // Helsinki TENNISPALATSI
                    if (shows[i].getElementsByTagName("TheatreID")[0].textContent == 1038) {
                        movieTickerTheatre = "Helsinki TENNISPALATSI";
                        printShowInfo(i, shows);
                    }
                } else if (theatreID == 1013) { // Vantaa FLAMINGO
                    if (shows[i].getElementsByTagName("TheatreID")[0].textContent == 1043) {
                        movieTickerTheatre = "Vantaa FLAMINGO";
                        printShowInfo(i, shows);
                    }
                }
            }
        }
    }
}

function printShowInfo(i, shows) {
    console.log("Found event at ID " + shows[i].getElementsByTagName("TheatreID")[0].textContent + ", location: " + shows[i].getElementsByTagName("Theatre")[0].textContent);
    const div1 = document.createElement('div');
    const header1 = document.createElement('header');
    const p1 = document.createElement('p');
    const p2 = document.createElement('p');
    var img = document.createElement('img');
    div1.id = `movieinfo${i}`;
    movieTitle = (shows[i].getElementsByTagName("Title")[0].textContent);
    movieYear = (shows[i].getElementsByTagName("ProductionYear")[0].textContent);
    movieLength = (shows[i].getElementsByTagName("LengthInMinutes")[0].textContent);
    movieRating = (shows[i].getElementsByTagName("Rating")[0].textContent);
    movieGenres = (shows[i].getElementsByTagName("Genres")[0].textContent);
    moviePresentationMethod = (shows[i].getElementsByTagName("PresentationMethod")[0].textContent);
    movieStart = (shows[i].getElementsByTagName("dttmShowStart")[0].textContent);
    movieStart = movieStart.split("T"); // Splits format YYYY-MM-DDTHH:MM:SS into separate date and time strings.
    movieStartDate = movieStart[0].split("-");
    movieStartDate.reverse(); // Sets format to DD-MM-YYYY.
    movieEnd = (shows[i].getElementsByTagName("dttmShowEnd")[0].textContent);
    movieEnd = movieEnd.split("T");
    movieEndDate = movieEnd[0].split("-");
    movieEndDate.reverse();
    movieImgLarge = (shows[i].getElementsByTagName("EventLargeImagePortrait")[0].textContent);
    theatreName = (shows[i].getElementsByTagName("Theatre")[0].textContent);
    img.src = movieImgLarge;
    div1.appendChild(img);
    header1.innerHTML = `<h2>${movieTitle}</h2>`;
    div1.appendChild(header1);
    p1.innerHTML = `${movieGenres}<br>Julkaisuvuosi: ${movieYear}<br>Pituus: ${movieLength} minuuttia<br>Ikäraja: ${movieRating}<br>Esitysmuoto: ${moviePresentationMethod}`;
    div1.appendChild(p1);
    divmovieinfo.appendChild(div1);
    p2.innerHTML = `Teatteri: ${theatreName}<br>Esityksen aloitus: ${movieStartDate.join("/")}, kello ${movieStart[1].slice(0, 5)}<br>Esityksen lopetus: ${movieEndDate.join("/")}, kello ${movieEnd[1].slice(0, 5)}`;
    div1.appendChild(p2);
    divmovieinfo.appendChild(div1);
    movieTickerCounter = movieTickerCounter+1; // Counts how many screenings have been found.
    movieTicker.innerHTML = `Valittu alue/teatteri: ${movieTickerTheatre}. Löydetty ${movieTickerCounter} esitystä.`
}