class EmojiGenerator {
  constructor() {
    this.container = document.getElementById("emojiContainer");
    this.patterns = ["grid", "circle", "wave"];
    this.emojis = ["🤑", "😎", "🥶", "🤯", "🤪", "😈", "🤓", "🤠", "👾", "🤡"];
    this.setupEventListeners();
  }

  setupEventListeners() {
    document.getElementById("generateBtn").addEventListener("click", () => {
      this.generate();
    });

    document.getElementById("sizeSlider").addEventListener("input", (e) => {
      this.generate();
    });

    this.generate();
  }

  getRandomEmoji() {
    return this.emojis[Math.floor(Math.random() * this.emojis.length)];
  }

  getRandomPattern() {
    return this.patterns[Math.floor(Math.random() * this.patterns.length)];
  }

  clearContainer() {
    this.container.innerHTML = "";
  }

  createEmojiElement(x, y, delay = 0) {
    const emoji = document.createElement("div");
    emoji.className = "emoji";
    emoji.style.left = x + "px";
    emoji.style.top = y + "px";
    emoji.style.fontSize = document.getElementById("sizeSlider").value + "px";
    emoji.style.animationDelay = delay + "s";
    emoji.textContent = this.currentEmoji;
    return emoji;
  }

  generateGrid() {
    const size = parseInt(document.getElementById("sizeSlider").value);
    const spacing = size * 1.5;
    const cols = Math.floor(window.innerWidth / spacing);
    const rows = Math.floor(window.innerHeight / spacing);

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const x = j * spacing + (spacing - size) / 2;
        const y = i * spacing + (spacing - size) / 2;
        const delay = (i + j) * 0.05;
        this.container.appendChild(this.createEmojiElement(x, y, delay));
      }
    }
  }

  generateCircle() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const size = parseInt(document.getElementById("sizeSlider").value);
    const maxRadius = Math.min(window.innerWidth, window.innerHeight) / 2;
    const circles = 5;
    const emojisPerCircle = 12;

    for (let c = 0; c < circles; c++) {
      const radius = (c + 1) * (maxRadius / circles);
      for (let i = 0; i < emojisPerCircle; i++) {
        const angle = (i / emojisPerCircle) * Math.PI * 2;
        const x = centerX + Math.cos(angle) * radius - size / 2;
        const y = centerY + Math.sin(angle) * radius - size / 2;
        const delay = c * 0.1 + i * 0.05;
        this.container.appendChild(this.createEmojiElement(x, y, delay));
      }
    }
  }

  generateWave() {
    const size = parseInt(document.getElementById("sizeSlider").value);
    const spacing = size * 1.5;
    const cols = Math.floor(window.innerWidth / spacing);
    const rows = Math.floor(window.innerHeight / spacing);

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const x = j * spacing;
        const baseY = i * spacing;
        const offset = Math.sin(j * 0.5) * 50;
        const y = baseY + offset;
        const delay = (i + j) * 0.05;
        this.container.appendChild(this.createEmojiElement(x, y, delay));
      }
    }
  }

  generateRandom() {
    const size = parseInt(document.getElementById("sizeSlider").value);
    const count = Math.floor(
      (window.innerWidth * window.innerHeight) / (size * size * 4)
    );

    for (let i = 0; i < count; i++) {
      const x = Math.random() * (window.innerWidth - size);
      const y = Math.random() * (window.innerHeight - size);
      const delay = Math.random() * 0.5;
      this.container.appendChild(this.createEmojiElement(x, y, delay));
    }
  }

  generate() {
    this.clearContainer();
    this.currentEmoji = this.getRandomEmoji();
    const pattern = this.getRandomPattern();

    switch (pattern) {
      case "grid":
        this.generateGrid();
        break;
      case "circle":
        this.generateCircle();
        break;
      case "wave":
        this.generateWave();
        break;
    }
  }
}

window.addEventListener("load", () => {
  new EmojiGenerator();
});
