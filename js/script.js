// Sélectionne l'élément black-screen et le lien de l'image
const blackScreen = document.getElementById('black-screen');
const clickableImage = document.getElementById('clickable-image');

// Ajoute un écouteur d'événements pour le clic sur l'image
clickableImage.addEventListener('click', function(event) {
    event.preventDefault(); // Empêche le lien de se déclencher immédiatement

    // Active l'animation de fermeture (écran noir)
    blackScreen.classList.add('active');

    // Attends la fin de l'animation avant de charger la nouvelle page
    setTimeout(function() {
        window.location.href = clickableImage.href; // Redirige vers la nouvelle page
    }, 1000); // Correspond à la durée de l'animation (1 seconde)
});
