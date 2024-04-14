let currentQuestionIndex = 0;
let correctAnswers = 0;
let incorrectAnswers = 0;
let questions = []; // Global olarak tanımlanan "questions" değişkeni
let timeLeft = 60; // Kullanıcıya verilecek süre (saniye cinsinden)

// JSON dosyasından soruları ve seçenekleri al
fetch('cografya.json')
  .then(response => response.json())
  .then(data => {
    questions = data; // "questions" değişkenine veri ataması yapılıyor
    console.log(questions);
    showQuestion(questions[currentQuestionIndex]);
    startTimer(); // Zamanlayıcıyı başlat
  });

// Zamanlayıcıyı başlat
function startTimer() {
  const timerInterval = setInterval(() => {
    timeLeft--;
    if (timeLeft <= 0) {
      clearInterval(timerInterval); // Zamanlayıcıyı durdur
      showResults(); // Sonuçları göster
    }
    updateTimer(); // Kalan süreyi güncelle
  }, 1000); // 1 saniye aralıklarla kontrol et
}
///SORULARI GÖSTER



  // Div elementlerine tıklama olayını dinle
  optionsElement.querySelectorAll('.question').forEach(function(optionElement) {
    optionElement.addEventListener('click', function() {
      const selectedOptionIndex = parseInt(this.getAttribute('value'));
      const selectedOption = question.sıklar[selectedOptionIndex]; // doğru erişim
      if (selectedOption === question.doğru) { // doğru erişim
        correctAnswers++;
      } else {
        incorrectAnswers++;
      }
      // Butona tıklandıktan sonra 1 saniye bekle ve sonraki soruyu göster
      setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
          showQuestion(questions[currentQuestionIndex]);
        } else {
          showResults(); // Sonuçları göster
        }
      }, 500);
    });
  });


// Sonuçları göster
function showResults() {
  sessionStorage.setItem('correctAnswers', correctAnswers);
  sessionStorage.setItem('incorrectAnswers', incorrectAnswers);
  window.location.href = 'results.html'; // Yeni sayfaya yönlendir
}

// Kalan süreyi gösteren ve güncelleyen fonksiyon
function updateTimer() {
  const timerElement = document.getElementById('timer');
  timerElement.innerHTML = `Kalan Süre: ${timeLeft} saniye<br>`;
}
