let currentQuestions = [];
let currentIndex = 0;
let userScore = 0;
let selectedOption = null;
let hasValidated = false;
let userHistory = [];

let currentLang = "khmer";
const langSelect = document.getElementById("lang-select");

const views = {
  seriesSelect: document.getElementById("series-select-section"),
  themed: document.getElementById("themed-section"),
  quiz: document.getElementById("quiz-section"),
  history: document.getElementById("history-section")
};

const tabButtons = document.querySelectorAll(".tab-btn");

const ui = {
  svg: document.getElementById("question-svg"),
  title: document.getElementById("question-text"),
  trans: document.getElementById("question-translation"),
  counter: document.getElementById("question-counter"),
  optionsBox: document.getElementById("options-container"),
  btnNext: document.getElementById("btn-next"),
  btnQuit: document.getElementById("btn-quit"),
  expBox: document.getElementById("explanation-box"),
  expTitle: document.getElementById("explanation-title"),
  expText: document.getElementById("explanation-text"),
  expTrans: document.getElementById("explanation-translation")
};

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function renderSeriesSelection() {
  const quickGrid = document.getElementById("quick-series-grid");
  const examGrid = document.getElementById("exam-series-grid");
  
  quickGrid.innerHTML = "";
  examGrid.innerHTML = "";

  for (let i = 1; i <= 4; i++) {
    const card = document.createElement("div");
    card.className = "series-card";
    card.innerHTML = `
      <div class="series-info">
        <h4>Série Découverte ${i}</h4>
        <p>10 questions uniques bilingues</p>
      </div>
      <span class="badge">10 Qs</span>
    `;
    card.addEventListener("click", () => startUniqueSeries(10, i - 1));
    quickGrid.appendChild(card);
  }

  for (let i = 1; i <= 5; i++) {
    const card = document.createElement("div");
    card.className = "series-card exam-badge";
    card.innerHTML = `
      <div class="series-info">
        <h4>Série Examen Officiel ${i}</h4>
        <p>40 questions sans aucun doublon</p>
      </div>
      <span class="badge">40 Qs</span>
    `;
    card.addEventListener("click", () => startUniqueSeries(40, i - 1));
    examGrid.appendChild(card);
  }
}

function startUniqueSeries(count, seriesIndex) {
  const shuffledBank = shuffleArray(questionBank);
  const start = (seriesIndex * count) % (questionBank.length - count);
  let selected = shuffledBank.slice(start, start + count);

  const seenIds = new Set();
  currentQuestions = [];
  
  for (const q of selected) {
    if (!seenIds.has(q.id)) {
      seenIds.add(q.id);
      currentQuestions.push(q);
    }
  }

  if (currentQuestions.length < count) {
    for (const q of shuffledBank) {
      if (!seenIds.has(q.id)) {
        seenIds.add(q.id);
        currentQuestions.push(q);
        if (currentQuestions.length === count) break;
      }
    }
  }

  currentIndex = 0;
  userScore = 0;
  userHistory = [];

  Object.values(views).forEach(v => v.classList.add("hidden"));
  views.quiz.classList.remove("hidden");
  loadQuestion();
}

function initThemes() {
  const grid = document.getElementById("themes-grid");
  grid.innerHTML = "";
  categories.forEach(cat => {
    const categoryQuestions = questionBank.filter(q => q.category === cat.id);
    
    const card = document.createElement("div");
    card.className = "series-card";
    card.innerHTML = `
      <div style="font-size:2rem; margin-right:12px;">${cat.icon}</div>
      <div class="series-info" style="flex:1;">
        <h4>${cat.name}</h4>
        <p>${categoryQuestions.length} questions thématiques</p>
      </div>
      <span class="badge">Thématique</span>
    `;
    card.addEventListener("click", () => {
      currentQuestions = shuffleArray(categoryQuestions);
      currentIndex = 0;
      userScore = 0;
      userHistory = [];
      Object.values(views).forEach(v => v.classList.add("hidden"));
      views.quiz.classList.remove("hidden");
      loadQuestion();
    });
    grid.appendChild(card);
  });
}

langSelect.addEventListener("change", (e) => {
  currentLang = e.target.value;
  if (!views.quiz.classList.contains("hidden") && currentQuestions.length > 0) {
    updateLanguageTexts();
  }
});

function updateLanguageTexts() {
  const q = currentQuestions[currentIndex];
  ui.trans.textContent = q.translations[currentLang] || "";
  
  const optionButtons = document.querySelectorAll(".option-btn");
  optionButtons.forEach((btn, idx) => {
    const transEl = btn.querySelector(".trans-txt");
    if (transEl) transEl.textContent = q.options[idx].t[currentLang] || "";
  });

  if (hasValidated) {
    ui.expTrans.textContent = q.expTranslations[currentLang] || "";
  }
}

tabButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    tabButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    
    Object.values(views).forEach(v => v.classList.add("hidden"));
    
    const target = btn.dataset.tab;
    if (target === "series-select") {
      views.seriesSelect.classList.remove("hidden");
      renderSeriesSelection();
    } else if (target === "themed") {
      views.themed.classList.remove("hidden");
      initThemes();
    } else if (target === "history") {
      views.history.classList.remove("hidden");
      renderHistory();
    }
  });
});

ui.btnQuit.addEventListener("click", () => {
  if (confirm("Quitter la série en cours ?")) {
    document.querySelector('[data-tab="series-select"]').click();
  }
});

function loadQuestion() {
  const q = currentQuestions[currentIndex];
  selectedOption = null;
  hasValidated = false;
  
  ui.counter.textContent = `Question ${currentIndex + 1} / ${currentQuestions.length}`;
  ui.svg.innerHTML = q.svg;
  ui.title.textContent = q.question;
  ui.trans.textContent = q.translations[currentLang] || "";
  
  ui.expBox.classList.add("hidden");
  ui.btnNext.textContent = "Valider";
  ui.btnNext.disabled = true;

  ui.optionsBox.innerHTML = "";
  const letters = ["A", "B", "C", "D"];
  
  q.options.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.innerHTML = `
      <div class="option-content">
        <span class="option-prefix">${letters[idx]}</span>
        <span class="main-txt">${opt.text}</span>
      </div>
      <div class="trans-txt translation-text" style="padding-left:40px;">${opt.t[currentLang] || ""}</div>
    `;
    btn.addEventListener("click", () => selectOption(idx, btn));
    ui.optionsBox.appendChild(btn);
  });
}

function selectOption(idx, btnRef) {
  if (hasValidated) return;
  selectedOption = idx;
  ui.btnNext.disabled = false;
  
  document.querySelectorAll(".option-btn").forEach(b => b.classList.remove("selected"));
  btnRef.classList.add("selected");
}

ui.btnNext.addEventListener("click", () => {
  if (!hasValidated) {
    validateAnswer();
  } else {
    currentIndex++;
    if (currentIndex < currentQuestions.length) loadQuestion();
    else showFinalBilan();
  }
});

function validateAnswer() {
  hasValidated = true;
  const q = currentQuestions[currentIndex];
  const isCorrect = (selectedOption === q.correctIndex);
  
  if (isCorrect) userScore++;
  
  userHistory.push({
    q: q.question,
    isCorrect: isCorrect,
    selected: selectedOption !== null ? q.options[selectedOption].text : "Aucun choix",
    correct: q.options[q.correctIndex].text
  });

  const buttons = document.querySelectorAll(".option-btn");
  buttons.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === q.correctIndex) btn.classList.add("correct");
    else if (idx === selectedOption) btn.classList.add("incorrect");
  });

  ui.expBox.classList.remove("hidden");
  ui.expBox.className = `explanation-box ${isCorrect ? "correct" : "incorrect"}`;
  ui.expTitle.textContent = isCorrect ? "✅ Bonne réponse !" : "❌ Mauvaise réponse";
  ui.expText.textContent = q.explanation;
  ui.expTrans.textContent = q.expTranslations[currentLang] || "";

  ui.btnNext.textContent = "Question suivante →";
}

function showFinalBilan() {
  tabButtons.forEach(b => b.classList.remove("active"));
  document.querySelector('[data-tab="history"]').classList.add("active");
  Object.values(views).forEach(v => v.classList.add("hidden"));
  views.history.classList.remove("hidden");
  renderHistory();
}

function renderHistory() {
  const scoreCard = document.getElementById("final-score-card");
  const recap = document.getElementById("recap-container");
  
  if (userHistory.length === 0) {
    scoreCard.innerHTML = "<p>Aucune série terminée. Veuillez lancer une série d'examen d'abord.</p>";
    recap.innerHTML = "";
    return;
  }

  const isExamFormat = (userHistory.length === 40);
  const isPassed = isExamFormat ? (userScore >= 35) : (userScore >= Math.ceil(userHistory.length * 0.8));
  
  scoreCard.innerHTML = `
    <h3 style="font-size:2rem; color:#58a6ff;">Score final : ${userScore} / ${userHistory.length}</h3>
    <div class="score-badge ${isPassed ? "pass" : "fail"}">
      ${isPassed ? "🎉 EXAMEN RÉUSSI (Admis)" : "❌ EXAMEN NON VALIDE (Ajourné - 5 fautes max)"}
    </div>
  `;
  
  recap.innerHTML = "";
  userHistory.forEach((h, i) => {
    const div = document.createElement("div");
    div.className = `recap-item ${h.isCorrect ? "success" : "error"}`;
    div.innerHTML = `
      <strong>Q${i+1} : ${h.q}</strong><br>
      <span style="color:#8b949e">Votre choix : ${h.selected}</span><br>
      ${!h.isCorrect ? `<span style="color:#3fb950">Réponse attendue : ${h.correct}</span>` : ""}
    `;
    recap.appendChild(div);
  });
}

renderSeriesSelection();
