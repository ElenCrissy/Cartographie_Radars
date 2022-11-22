const map = L.map('map').setView([51.505, -0.09], 13);

const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

function addRadars(map){
    Papa.parse("./radars.csv", {
        header: true,
        download:true,
        dynamicTyping: true,
        complete: function(results){
            const radars = results.data;
            radars.map(radar => {
                if (radar.latitude && radar.longitude)
                addMarkerOnMap(radar.latitude, radar.longitude, map);
            })
        }
    })
}

function addMarkerOnMap(latitude, longitude, map){
    L.marker([latitude, longitude]).addTo(map)
}

addRadars(map)

