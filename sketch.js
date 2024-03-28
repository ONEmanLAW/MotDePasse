document.addEventListener("DOMContentLoaded", function() {
  const displayImages = document.querySelectorAll('.displayImage');
  const addButtons = document.querySelectorAll('.addButton');
  const takeOffButtons = document.querySelectorAll('.takeOffButton');
  const checkBtn = document.getElementById('checkBtn');
  const resultDisplay = document.getElementById('result');
  const clickSound = new Audio('audios/click.wav');
  const ledSound = new Audio('audios/ledOn.wav')

 
  let code = '64385';
  let currentCode = '00000'; 
  let isProcessing = false; 

  // Chemins des images pour chaque chiffre
  const imagePaths = [
    'assets/0.png',
    'assets/1.png',
    'assets/2.png',
    'assets/3.png', 
    'assets/4.png', 
    'assets/5.png', 
    'assets/6.png', 
    'assets/7.png', 
    'assets/8.png', 
    'assets/9.png',
  ];

  // Fonction pour mettre à jour l'affichage du code
  function updateDisplay() {
    for (let i = 0; i < currentCode.length; i++) {
      displayImages[i].src = imagePaths[currentCode[i]];
      displayImages[i].alt = currentCode[i];
    }
  };

  // Fonction pour changer l'image avec une temporisation
  function changeImageWithDelay(imgElement, newSrc, delay) {
    const originalSrc = imgElement.src;
    imgElement.src = newSrc;
    setTimeout(() => {
      imgElement.src = originalSrc;
      isProcessing = false;
    }, delay);
  };


  // Fonction pour jouer le son
  function playClickSound() {
    clickSound.currentTime = 0; 
    clickSound.play();
  };
  
  function ledOnClickSound () {
    ledSound.currentTime = 0;
    ledSound.play(); 
  };


  // Gestion de l'événement pour les boutons "Ajouter"
  addButtons.forEach((button, index) => {
    button.addEventListener('click', function() {
      if (!isProcessing) {
        isProcessing = true;
        let num = parseInt(currentCode[index]);
        num = num === 9 ? 0 : num + 1;
        currentCode = currentCode.substring(0, index) + num + currentCode.substring(index + 1);
        updateDisplay();
        changeImageWithDelay(this, 'assets/flecheHautOn.png', 100);
        playClickSound(); // Jouer le son
      }
    });
  });

  // Gestion de l'événement pour les boutons "Soustraire"
  takeOffButtons.forEach((button, index) => {
    button.addEventListener('click', function() {
        if (!isProcessing) {
          isProcessing = true;
          let num = parseInt(currentCode[index]);
          num = num === 0 ? 9 : num - 1;
          currentCode = currentCode.substring(0, index) + num + currentCode.substring(index + 1);
          updateDisplay();
          changeImageWithDelay(this, 'assets/flecheBasOn.png', 100);
          playClickSound();
        }
    });
  });

  // Gestionnaire d'événement pour le bouton "Vérifier"
  checkBtn.addEventListener('click', function() {
    if (!isProcessing) {
      isProcessing = true;
      if (currentCode === code) {
        document.body.style.backgroundImage = "url('assets/fondLumVert.png')";
        ledOnClickSound();
      } else {
        // Il ne ce passe rien.
      }
      changeImageWithDelay(this, 'assets/boutonOn.png', 100);
    }
  });
});
