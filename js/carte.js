var map = L.map('map').setView([50.7, 1.6], 8);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

async function getCommuneData(nomCommune, codePostal = null) {
    let url = `https://geo.api.gouv.fr/communes?nom=${nomCommune}&fields=nom,code,centre&format=json&geometry=centre`;

    if (codePostal) {
        url += `&codePostal=${codePostal}`;
    }

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.length > 0) {
            const commune = data[0];
            const lat = commune.centre.coordinates[1];
            const lng = commune.centre.coordinates[0];

            const marker = L.marker([lat, lng]).addTo(map)
                .bindPopup(`<b>${commune.nom}</b><br>Code INSEE: ${commune.code}`);

            marker.on('click', function() {
                map.setView([lat, lng], 13);

                if (nomCommune === 'Saint-Omer') {
                    addImageMarker(50.7473, 2.2624, 'saint-omer-marker', '<h2>Mairie de Saint-Omer</h2><p>Description de la Mairie.</p>');
                } else if (nomCommune === 'Arques') {
                    addImageMarker(50.7400, 2.3080, 'arques-marker', '<h2>Mairie de Arques</h2><p>Description de la Mairie d\'Arques.</p>');
                } else if (nomCommune === 'Calais') {
                    addImageMarker(50.9500, 1.8500, 'calais-marker-1', '<h2>Cercle 1 - Calais</h2><p>Informations sur le premier cercle à Calais.</p>');
                    addImageMarker(50.9500, 1.8600, 'calais-marker-2', '<h2>Cercle 2 - Calais</h2><p>Informations sur le deuxième cercle à Calais.</p>');
                    addImageMarker(50.9500, 1.8700, 'calais-marker-3', '<h2>Cercle 3 - Calais</h2><p>Informations sur le troisième cercle à Calais.</p>');
                } else if (nomCommune === 'Boulogne-sur-Mer') {
                    addImageMarker(50.7200, 1.6000, 'boulogne-marker-1', '<h2>Cercle 1 - Boulogne-sur-Mer</h2><p>Informations sur le premier cercle à Boulogne-sur-Mer.</p>');
                    addImageMarker(50.7200, 1.6100, 'boulogne-marker-2', '<h2>Cercle 2 - Boulogne-sur-Mer</h2><p>Informations sur le deuxième cercle à Boulogne-sur-Mer.</p>');
                    addImageMarker(50.7200, 1.6200, 'boulogne-marker-3', '<h2>Cercle 3 - Boulogne-sur-Mer</h2><p>Informations sur le troisième cercle à Boulogne-sur-Mer.</p>');
                    addImageMarker(50.7200, 1.6300, 'boulogne-marker-4', '<h2>Cercle 4 - Boulogne-sur-Mer</h2><p>Informations sur le quatrième cercle à Boulogne-sur-Mer.</p>');
                    addImageMarker(50.7200, 1.6400, 'boulogne-marker-5', '<h2>Cercle 5 - Boulogne-sur-Mer</h2><p>Informations sur le cinquième cercle à Boulogne-sur-Mer.</p>');
                    addImageMarker(50.7200, 1.6500, 'boulogne-marker-6', '<h2>Cercle 6 - Boulogne-sur-Mer</h2><p>Informations sur le sixième cercle à Boulogne-sur-Mer.</p>');
                    addImageMarker(50.7200, 1.6600, 'boulogne-marker-7', '<h2>Cercle 7 - Boulogne-sur-Mer</h2><p>Informations sur le septième cercle à Boulogne-sur-Mer.</p>');
                    addImageMarker(50.7200, 1.6700, 'boulogne-marker-8', '<h2>Cercle 8 - Boulogne-sur-Mer</h2><p>Informations sur le huitième cercle à Boulogne-sur-Mer.</p>');
                    addImageMarker(50.7200, 1.6700, 'boulogne-marker-9', '<h2>Cercle 8 - Boulogne-sur-Mer</h2><p>Informations sur le huitième cercle à Boulogne-sur-Mer.</p>');
                }
            });
        }
    } catch (error) {
        console.error(`Erreur lors de la récupération des données de ${nomCommune} via l'API Geo:`, error);
    }
}

function addImageMarker(lat, lng, cssClass, popupContent) {
    const icon = L.divIcon({
        className: `custom-div-icon ${cssClass}`,
        html: `<div class="custom-marker"></div>`,
        iconSize: [50, 50],
        iconAnchor: [25, 25]
    });

    const imageMarker = L.marker([lat, lng], { icon: icon }).addTo(map);

    imageMarker.on('click', function() {
        L.popup()
            .setLatLng([lat, lng])
            .setContent(popupContent)
            .openOn(map);
    });
}

getCommuneData('Calais');
getCommuneData('Boulogne-sur-Mer');
getCommuneData('Saint-Omer', '62500');
getCommuneData('Arques', '62510');
