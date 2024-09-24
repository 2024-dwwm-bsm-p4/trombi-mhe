
const blackScreen = document.getElementById('black-screen');
const clickableImage = document.getElementById('clickable-image');


clickableImage.addEventListener('click', function(event) {
    event.preventDefault();


    blackScreen.classList.add('active');


    setTimeout(function() {
        window.location.href = clickableImage.href; 
    }, 1000);
});
