$(document).ready(function() {
    $('.form').submit(function(event) {
        event.preventDefault(); 
        
        var formData = {
            'email': $('#email').val(),
            'name': $('#name').val(),
            'message': $('#message').val()
        };
        
        // Form verilerini konsola yazdır
        console.log(formData);
        // $('#responseMessage').text('Successfully sent!');
       
        $('#modal-content').modal();
        $(document).on($.modal.CLOSE, function(event, modal) {
            // Sayfayı yenile
            location.reload();
        });
    });
});

function getCoordinatesAndShowMap() {
    const address = "1 Blizzard Way, Irvine, CA 92618, USA"; // Blizzard Entertainment'ın adresi
    addressToCoords(address, (lat, lon) => {
        const mapFrame = document.getElementById("mapFrame");
        const bbox = `${lon - 0.01},${lat - 0.01},${lon + 0.01},${lat + 0.01}`;
        mapFrame.src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lon}`;
        
        // Butonu gizle ve haritayı göster
        document.getElementById("showMapButton").style.display = "none";
        mapFrame.style.display = "block";
    });
}


function addressToCoords(address, callback) {
    const base_url = "https://nominatim.openstreetmap.org/search";
    const params = new URLSearchParams({ q: address, format: "json" });

    fetch(`${base_url}?${params}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.length > 0) {
                const lat = parseFloat(data[0].lat);
                const lon = parseFloat(data[0].lon);
                callback(lat, lon);
            } else {
                alert("Adres koordinatları alınamadı.");
            }
        })
        .catch(error => {
            console.error("Error:", error);
        });
}