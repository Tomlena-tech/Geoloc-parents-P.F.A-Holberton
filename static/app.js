function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(sendPosition);
    } else {
        document.getElementById("result").innerHTML = "Géolocalisation non supportée";
    }
}

function sendPosition(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    
    fetch('/api/location', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({latitude: lat, longitude: lng})
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("result").innerHTML = 
            `Position: ${data.lat}, ${data.lng}`;
    });
}
