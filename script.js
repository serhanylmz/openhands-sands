document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Gallery filters
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Initialize map if we're on the map page
    if (document.getElementById('map')) {
        initMap();
    }
});

// Map initialization
function initMap() {
    const map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        view: new ol.View({
            center: ol.proj.fromLonLat([0, 20]),
            zoom: 2
        })
    });

    // Sample visited locations
    const visitedLocations = [
        { name: 'Bali, Indonesia', coordinates: [115.188919, -8.409518] },
        { name: 'Reykjavik, Iceland', coordinates: [-21.827774, 64.128288] },
        { name: 'Santorini, Greece', coordinates: [25.396111, 36.393333] }
    ];

    // Sample wishlist locations
    const wishlistLocations = [
        { name: 'Machu Picchu, Peru', coordinates: [-72.545128, -13.163141] },
        { name: 'Petra, Jordan', coordinates: [35.444832, 30.328960] },
        { name: 'Great Barrier Reef, Australia', coordinates: [147.700000, -18.286110] },
        { name: 'Serengeti, Tanzania', coordinates: [34.833333, -2.333333] }
    ];

    // Add markers for visited locations
    const visitedFeatures = visitedLocations.map(location => {
        return new ol.Feature({
            geometry: new ol.geom.Point(ol.proj.fromLonLat(location.coordinates)),
            name: location.name,
            type: 'visited'
        });
    });

    // Add markers for wishlist locations
    const wishlistFeatures = wishlistLocations.map(location => {
        return new ol.Feature({
            geometry: new ol.geom.Point(ol.proj.fromLonLat(location.coordinates)),
            name: location.name,
            type: 'wishlist'
        });
    });

    // Create vector source and layer for markers
    const vectorSource = new ol.source.Vector({
        features: [...visitedFeatures, ...wishlistFeatures]
    });

    const vectorLayer = new ol.layer.Vector({
        source: vectorSource,
        style: function(feature) {
            return new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 6,
                    fill: new ol.style.Fill({
                        color: feature.get('type') === 'visited' ? '#4CAF50' : '#FF9800'
                    }),
                    stroke: new ol.style.Stroke({
                        color: '#fff',
                        width: 2
                    })
                })
            });
        }
    });

    map.addLayer(vectorLayer);

    // Add popup overlay
    const popup = new ol.Overlay({
        element: document.createElement('div'),
        positioning: 'bottom-center',
        offset: [0, -10]
    });
    popup.getElement().className = 'map-popup';
    map.addOverlay(popup);

    // Show popup on hover
    map.on('pointermove', function(e) {
        const feature = map.forEachFeatureAtPixel(e.pixel, function(feature) {
            return feature;
        });

        if (feature) {
            const coordinates = feature.getGeometry().getCoordinates();
            popup.getElement().innerHTML = feature.get('name');
            popup.setPosition(coordinates);
            popup.getElement().style.display = 'block';
        } else {
            popup.getElement().style.display = 'none';
        }
    });
}

// Handle mobile menu
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.style.backgroundColor = 'rgba(124, 94, 72, 0.95)';
    } else {
        nav.style.backgroundColor = 'rgba(124, 94, 72, 0.95)';
    }
});