class DrawingApp {
  constructor() {
    this.canvas = document.getElementById("drawingCanvas");
    this.ctx = this.canvas.getContext("2d");
    this.currentShape = "rectangle";
    this.isDrawing = false;
    this.startX = 0;
    this.startY = 0;
    this.shapes = [];
    this.undoStack = [];

    this.initializeCanvas();
    this.setupEventListeners();
  }

  initializeCanvas() {
    const resizeCanvas = () => {
      const container = this.canvas.parentElement;
      this.canvas.width = container.clientWidth;
      this.canvas.height = container.clientHeight;
      this.redrawShapes();
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
  }

  setupEventListeners() {
    document.querySelectorAll(".tool-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        document.querySelector(".tool-btn.active").classList.remove("active");
        btn.classList.add("active");
        this.currentShape = btn.dataset.shape;
      });
    });

    this.canvas.addEventListener("mousedown", this.startDrawing.bind(this));
    this.canvas.addEventListener("mousemove", this.draw.bind(this));
    this.canvas.addEventListener("mouseup", this.stopDrawing.bind(this));
    this.canvas.addEventListener("mouseleave", this.stopDrawing.bind(this));

    document.getElementById("clearCanvas").addEventListener("click", () => {
      this.shapes = [];
      this.undoStack = [];
      this.redrawShapes();
    });

    document.getElementById("undoBtn").addEventListener("click", () => {
      if (this.shapes.length > 0) {
        this.undoStack.push(this.shapes.pop());
        this.redrawShapes();
      }
    });
  }

  startDrawing(e) {
    this.isDrawing = true;
    const rect = this.canvas.getBoundingClientRect();
    this.startX = e.clientX - rect.left;
    this.startY = e.clientY - rect.top;
  }

  draw(e) {
    if (!this.isDrawing) return;

    const rect = this.canvas.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;

    this.redrawShapes();
    this.drawShape(
      this.currentShape,
      this.startX,
      this.startY,
      currentX - this.startX,
      currentY - this.startY,
      document.getElementById("fillColor").value,
      document.getElementById("strokeColor").value
    );
  }

  stopDrawing(e) {
    if (!this.isDrawing) return;

    const rect = this.canvas.getBoundingClientRect();
    const endX = e.clientX - rect.left;
    const endY = e.clientY - rect.top;

    this.shapes.push({
      type: this.currentShape,
      x: this.startX,
      y: this.startY,
      width: endX - this.startX,
      height: endY - this.startY,
      fillColor: document.getElementById("fillColor").value,
      strokeColor: document.getElementById("strokeColor").value,
    });

    this.isDrawing = false;
    this.undoStack = [];
  }

  drawShape(type, x, y, width, height, fillColor, strokeColor) {
    this.ctx.fillStyle = fillColor;
    this.ctx.strokeStyle = strokeColor;
    this.ctx.lineWidth = 2;

    switch (type) {
      case "rectangle":
        this.ctx.beginPath();
        this.ctx.rect(x, y, width, height);
        break;

      case "circle":
        this.ctx.beginPath();
        const radius = Math.sqrt(width * width + height * height) / 2;
        this.ctx.arc(x + width / 2, y + height / 2, radius, 0, Math.PI * 2);
        break;

      case "triangle":
        this.ctx.beginPath();
        this.ctx.moveTo(x + width / 2, y);
        this.ctx.lineTo(x, y + height);
        this.ctx.lineTo(x + width, y + height);
        this.ctx.closePath();
        break;
    }

    this.ctx.fill();
    this.ctx.stroke();
  }

  redrawShapes() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.shapes.forEach((shape) => {
      this.drawShape(
        shape.type,
        shape.x,
        shape.y,
        shape.width,
        shape.height,
        shape.fillColor,
        shape.strokeColor
      );
    });
  }
}

window.addEventListener("load", () => {
  new DrawingApp();
});
