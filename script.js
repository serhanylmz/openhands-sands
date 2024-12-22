// Initialize the map
document.addEventListener('DOMContentLoaded', function() {
    // Create the map
    const map = new ol.Map({
        target: 'map-container',
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

    // Sample wishlist destinations
    const wishlistDestinations = [
        "Santorini, Greece",
        "Kyoto, Japan",
        "Machu Picchu, Peru",
        "Maldives",
        "Northern Lights in Iceland"
    ];

    // Populate wishlist
    const wishlistElement = document.getElementById('wishlist-items');
    wishlistDestinations.forEach(destination => {
        const li = document.createElement('li');
        li.textContent = destination;
        wishlistElement.appendChild(li);
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Navbar background change on scroll
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) {
            nav.style.backgroundColor = 'rgba(124, 94, 72, 0.95)';
        } else {
            nav.style.backgroundColor = 'rgba(124, 94, 72, 0.95)';
        }
    });
});