let questionElement = document.getElementById("question");
let optionsElement = document.getElementById("options");
let resultsElement = document.getElementById("results");
let timerElement = document.getElementById("timer");
let currentQuestionIndex = 0;
let correctAnswers = 0;
let incorrectAnswers = 0;
let questions = [];
let totalTime = 60; // Toplam test süresi (saniye cinsinden)
let remainingTime = totalTime;

// Fetch ile cografya.json dosyasını al
fetch('cografya.json')
  .then(response => response.json())
  .then(data => {
    questions = data;
    showQuestion(questions[currentQuestionIndex]);
    startTimer(); // Zamanlayıcıyı başlat
  });

// Zamanlayıcıyı başlat
function startTimer() {
  const timerInterval = setInterval(() => {
    remainingTime--;
    if (remainingTime <= 0 || currentQuestionIndex >= questions.length) {
      clearInterval(timerInterval); // Zamanlayıcıyı durdur
      showResults(); // Sonuçları göster
    }
    updateTimer(); // Kalan süreyi güncelle
  }, 1000); // 1 saniye aralıklarla kontrol et
}

// Soruyu göster
function showQuestion(question) {
  questionElement.textContent = question.soru;
  optionsElement.innerHTML = '';
  question.siklar.forEach((option, index) => {
    const optionElement = document.createElement('div');
    optionElement.innerHTML = `
      <div class="question" data-index="${index}">
        ${option.text}
      </div>
    `;
    optionElement.addEventListener('click', () => {
      if (option.isCorrect) {
        correctAnswers++;
      } else {
        incorrectAnswers++;
      }
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
      } else {
        showResults();
      }
    });
    optionsElement.appendChild(optionElement);
  });
}

// Sonuçları göster
function showResults() {
  // Puanı hesapla
  const score = (correctAnswers * 10) + (incorrectAnswers * -5);
  // Sonuçları results.html sayfasına gönder
  sessionStorage.setItem('correctAnswers', correctAnswers);
  sessionStorage.setItem('incorrectAnswers', incorrectAnswers);
  sessionStorage.setItem('score', score);
  sessionStorage.setItem('totalTime', totalTime); // totalTime'yi de sessionStorage'a kaydet
  window.location.href = 'results.html'; // Yeni sayfaya yönlendir
}

// Kalan süreyi güncelle
function updateTimer() {
  timerElement.innerHTML = `Kalan Süre: ${remainingTime} saniye<br>`;
}
