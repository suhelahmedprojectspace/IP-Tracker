
async function getid() {
    const search_data = document.getElementById('value').value;
    console.log(search_data)
    const URL = `https://geo.ipify.org/api/v2/country,city?apiKey=at_0oDi5qERtoz0v9ca7ZyjOU07SD0XR&ipAddress=${search_data}`;

    const respone = await fetch(URL)

    const data = await respone.json()
    console.log(data)

    display(data)

}
function display(data) {
    const ipAddress = data.ip;
    const region = data.location.region;
    const postCode = data.as.asn;
    const country = data.location.country;
    const time = data.location.timezone;
    const isp = data.isp;
    const lat = data.location.lat;
    const lng = data.location.lng;
    console.log(lat)

    document.getElementById('ip').innerText = ipAddress;
    document.getElementById('location').innerText = region + " " + country + " " + postCode;
    document.getElementById('Timezone').innerText = `GMT ${time}`;
    document.getElementById('Isp').innerText = isp;

    maps(lat, lng)
}
function maps(lat, lng) {
    const map = L.map('map').setView([lat, lng], 13);
    const marker = L.marker([lat, lng]).addTo(map);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1Ijoic3VoZWxhaG1lZHByb2plY3QiLCJhIjoiY2wwcnUyYnNiMDZpbjNjcDVwOGdpcHRhOCJ9.8Jvb4Qwy2SPJUXHhjuWXlQ'
    }).addTo(map);
    const circle = L.circle([lat, lng], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 500
    }).addTo(map);
    var polygon = L.polygon([
        [51.509, -0.08],
        [51.503, -0.06],
        [51.51, -0.047]
    ]).addTo(map);
}


const button = document.getElementById('main_btn');
button.addEventListener('click', getid)
