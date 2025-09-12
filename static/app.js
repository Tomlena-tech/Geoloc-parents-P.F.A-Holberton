let map;
let marker;

// Initialise la carte au chargement de la page
window.onload = function() {
    // Carte centrée sur la France par défaut
    map = L.map('map').setView([46.603354, 1.888334], 6);
    
    // Ajout de la couche de carte (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
};

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(sendPosition, showError);
    } else {
        document.getElementById("result").innerHTML = "Géolocalisation non supportée";
    }
}

function sendPosition(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    
    // Affichage des coordonnées
    document.getElementById("result").innerHTML = 
        `📍 Position: ${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    
    // Centrer la carte sur la position
    map.setView([lat, lng], 15);
    
    // Supprimer l'ancien marqueur s'il existe
    if (marker) {
        map.removeLayer(marker);
    }
    
    // Ajouter un nouveau marqueur
    marker = L.marker([lat, lng]).addTo(map)
        .bindPopup('🏠 Votre position actuelle')
        .openPopup();
    
    // Envoyer au serveur Python
    fetch('/api/location', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({latitude: lat, longitude: lng})
    })
    .then(response => response.json())
    .then(data => {
        console.log('Position envoyée au serveur:', data);
    });
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            document.getElementById("result").innerHTML = "❌ Géolocalisation refusée";
            break;
        case error.POSITION_UNAVAILABLE:
            document.getElementById("result").innerHTML = "❌ Position indisponible";
            break;
        case error.TIMEOUT:
            document.getElementById("result").innerHTML = "❌ Délai dépassé";
            break;
        default:
            document.getElementById("result").innerHTML = "❌ Erreur inconnue";
            break;
    }
}
