//Page loader
document.addEventListener("DOMContentLoaded", ()=> {
    const preloader = document.getElementById('preloader');

    setTimeout(() =>{
        preloader.style.display = 'none';
    }, 1500)
})

//Loading Leaflet.js map 
let map = L.map('map').setView([45.1, 16.5], 8);
document.addEventListener('DOMContentLoaded', () => {
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
});

//Creating custom icon for displaying flights
const planeIcon = L.icon({
    iconUrl: './images/planeIcon.svg',

    iconSize:     [30, 50], // size of the icon
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

const fetchFlightData = async function fetchFlightDataFromEndPoint() {
    try {
      const response = await fetch('/api/flights');
      const flights = await response.json();
      console.log(flights);
      for(let flight of flights){
        customPopupText = `
        <h4 id="plane-reg">${flight.registration}</h4>
        <h5> ${flight.model},Callsign: ${flight.callsign}<h5>
        <p>From: ${flight.origin} To: ${flight.destination}<p>
        <p>View image: <a href="https://www.google.com/search?sca_esv=35b2ac92d41e214b&rlz=1C5CHFA_enHR1068HR1069&sxsrf=ADLYWII-4qPQqIXLn-RZJW92be3aeyrrsQ:1716759895372&q=${flight.model}&uds=ADvngMj6Ik-DOrL9naoBE3na7_MTqOytCkkr969Vz66Ngb9c7Q6fXxfI8pZzn9GGVqWvTO4p0B7mNWzlDYLCi3AXZjXN_eJdPBTm7p3cVBfy1bbkLm2GQi8zQW0KJtqzfRxkHryculUS4sVdCcRQBieFuWB_QD0A8_7H8v4FPnrQXsNwY6JlLAiOVHTG4m_54sKeNHva4svsuKkYQ6zAgmUAILBrYmJFhoQN7WepQvdzFtw0ANv5s7ZzAEqrSDOLC0yiIeQC5xy-ov0fvDmq2-N5fdqdjHt5eZ8OW_tB77pTyySUFIFrVWD76i-PBy9jVDQgYxDBmgDK&udm=2&prmd=ivmbtz&sa=X&ved=2ahUKEwjHten9pKyGAxUK8LsIHSJlCjEQtKgLegQIExAB&biw=1920&bih=993&dpr=1">HERE</a></p>
        `;
        const marker = L.marker([flight.latitude, flight.longitude],{icon: planeIcon}).addTo(map).bindPopup(customPopupText);
      }
    } catch (error) {
      console.error('Error fetching flight data:', error);
    }
  }  
fetchFlightData();