let highestZ = 1;

class Paper {
  holdingPaper = false;
  touchStartX = 0;
  touchStartY = 0;
  prevTouchX = 0;
  prevTouchY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;

  init(paper) {
    paper.style.transform = `rotateZ(${this.rotation}deg)`;

    paper.addEventListener('touchstart', (e) => {
      if (this.holdingPaper) return;
      this.holdingPaper = true;

      paper.style.zIndex = highestZ++;
      
      const touch = e.touches[0];
      this.touchStartX = touch.clientX;
      this.touchStartY = touch.clientY;
      this.prevTouchX = touch.clientX;
      this.prevTouchY = touch.clientY;
    }, { passive: true });

    paper.addEventListener('touchmove', (e) => {
      if (!this.holdingPaper) return;

      const touch = e.touches[0];
      const deltaX = touch.clientX - this.prevTouchX;
      const deltaY = touch.clientY - this.prevTouchY;

      this.currentPaperX += deltaX;
      this.currentPaperY += deltaY;

      this.prevTouchX = touch.clientX;
      this.prevTouchY = touch.clientY;

      paper.style.transform = `translate(${this.currentPaperX}px, ${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
    }, { passive: false });

    paper.addEventListener('touchend', () => {
      this.holdingPaper = false;
    });
  }
}

const papers = Array.from(document.querySelectorAll('.paper'));
papers.forEach(paper => {
  const p = new Paper();
  p.init(paper);
});

