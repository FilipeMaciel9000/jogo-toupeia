document.addEventListener('DOMContentLoaded', () => {
  const gameBoard = document.getElementById('game-board');
  const scoreDisplay = document.getElementById('score');
  const timeDisplay = document.getElementById('time');
  const startButton = document.getElementById('start');
  const restartButton = document.getElementById('restart');

  let score = 0;
  let timeLeft = 30;
  let gameActive = false;
  let timer;
  let moleTimer;
  let holes = [];

  // Criar os buracos
  function createHoles() {
    gameBoard.innerHTML = '';
    holes = [];

    for (let i = 0; i < 9; i++) {
      const hole = document.createElement('div');
      hole.classList.add('hole');
      hole.dataset.index = i;

      const mole = document.createElement('div');
      mole.classList.add('mole');
      mole.innerHTML = '🐹';

      hole.appendChild(mole);
      gameBoard.appendChild(hole);
      holes.push(hole);

      // Adicionar evento de clique
      hole.addEventListener('click', whackMole);
    }
  }

  // Iniciar o jogo
  function startGame() {
    if (gameActive) return;

    score = 0;
    timeLeft = 30;
    gameActive = true;

    scoreDisplay.textContent = score;
    timeDisplay.textContent = timeLeft;

    // Iniciar o timer
    timer = setInterval(() => {
      timeLeft--;
      timeDisplay.textContent = timeLeft;

      if (timeLeft <= 0) {
        endGame();
      }
    }, 1000);

    // Iniciar as toupeiras
    showRandomMole();
  }

  // Mostrar uma toupeira aleatória
  function showRandomMole() {
    if (!gameActive) return;

    // Esconder todas as toupeiras primeiro
    hideAllMoles();

    // Escolher um buraco aleatório
    const randomIndex = Math.floor(Math.random() * holes.length);
    const hole = holes[randomIndex];
    const mole = hole.querySelector('.mole');

    // Mostrar a toupeira
    mole.classList.add('up');

    // Definir tempo aleatório para a toupeira desaparecer
    const showTime = Math.random() * 1000 + 500; // Entre 0.5 e 1.5 segundos

    moleTimer = setTimeout(() => {
      if (mole.classList.contains('up')) {
        mole.classList.remove('up');
      }
      showRandomMole();
    }, showTime);
  }

  // Esconder todas as toupeiras
  function hideAllMoles() {
    holes.forEach((hole) => {
      const mole = hole.querySelector('.mole');
      mole.classList.remove('up');
    });
  }

  // Acertar a toupeira
  function whackMole(e) {
    if (!gameActive) return;

    const mole = e.target.closest('.hole').querySelector('.mole');

    if (mole.classList.contains('up')) {
      // Adicionar efeito visual de acerto
      const hitEffect = document.createElement('div');
      hitEffect.classList.add('hit-effect');
      e.target.closest('.hole').appendChild(hitEffect);

      // Animação de acerto
      hitEffect.style.animation = 'hit 0.5s forwards';

      // Remover o efeito após a animação
      setTimeout(() => {
        hitEffect.remove();
      }, 500);

      // Esconder a toupeira e aumentar a pontuação
      mole.classList.remove('up');
      score++;
      scoreDisplay.textContent = score;

      // Mostrar uma nova toupeira mais rapidamente
      clearTimeout(moleTimer);
      showRandomMole();
    }
  }

  // Terminar o jogo
  function endGame() {
    gameActive = false;
    clearInterval(timer);
    clearTimeout(moleTimer);
    hideAllMoles();

    alert(`Fim de jogo! Sua pontuação: ${score}`);
  }

  // Reiniciar o jogo
  function restartGame() {
    if (gameActive) {
      clearInterval(timer);
      clearTimeout(moleTimer);
    }

    gameActive = false;
    hideAllMoles();

    score = 0;
    timeLeft = 30;

    scoreDisplay.textContent = score;
    timeDisplay.textContent = timeLeft;
  }

  // Event listeners
  startButton.addEventListener('click', startGame);
  restartButton.addEventListener('click', restartGame);

  // Inicializar o jogo
  createHoles();
});
