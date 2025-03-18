// =========================
// 1. Update Card Message
// =========================
function generateCard() {
    const name = document.getElementById('nameInput').value.trim();
    const message = document.getElementById('customMessage').value.trim();
  
    const senderDisplay = document.getElementById('senderNameDisplay');
    const messageDisplay = document.getElementById('displayMessage');
  
    if (name !== '') {
      senderDisplay.textContent = "– From " + name;
    } else {
      senderDisplay.textContent = "– From Your Friend";
    }
  
    if (message !== '') {
      messageDisplay.textContent = message;
    } else {
      messageDisplay.textContent = "May this Eid bring peace, happiness, and blessings to your life.";
    }
  }
  
  // =========================
  // 2. Countdown Timer
  // =========================
  function startCountdown() {
    const eidDate = new Date("2025-03-31T18:30:00"); // Change this date to actual Eid day
    const timer = document.getElementById("countdownTimer");
  
    setInterval(() => {
      const now = new Date().getTime();
      const distance = eidDate - now;
  
      if (distance <= 0) {
        timer.innerHTML = "🎉 Eid Mubarak! 🎉";
        return;
      }
  
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
      timer.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }, 1000);
  }
  
  startCountdown();
  
  // =========================
  // 3. Play Nasheed
  // =========================
  function playNasheed() {
    const audio = document.getElementById("bgMusic");
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  }
  
  // =========================
  // 4. Toggle Fireworks
  // =========================
  let fireworksActive = false;
  let canvas, ctx, particles = [];
  
  function toggleFireworks() {
    const canvasElement = document.getElementById('fireworksCanvas');
    if (!fireworksActive) {
      canvasElement.style.display = 'block';
      canvas = canvasElement;
      ctx = canvas.getContext('2d');
      resizeCanvas();
      fireworksActive = true;
      animateFireworks();
    } else {
      canvasElement.style.display = 'none';
      fireworksActive = false;
    }
  }
  
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  window.addEventListener("resize", resizeCanvas);
  
  function createParticle(x, y) {
    return {
      x, y,
      radius: Math.random() * 3 + 1,
      color: `hsl(${Math.random() * 360}, 100%, 70%)`,
      velocityX: (Math.random() - 0.5) * 6,
      velocityY: (Math.random() - 0.5) * 6,
      life: 100
    };
  }
  
  function animateFireworks() {
    if (!fireworksActive) return;
  
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    if (Math.random() < 0.05) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height / 2;
      for (let i = 0; i < 50; i++) {
        particles.push(createParticle(x, y));
      }
    }
  
    particles.forEach((p, i) => {
      p.x += p.velocityX;
      p.y += p.velocityY;
      p.life--;
  
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
  
      if (p.life <= 0) particles.splice(i, 1);
    });
  
    requestAnimationFrame(animateFireworks);
  }
  
  // =========================
// 5. Download Card
// =========================
function downloadCard() {
  const card = document.getElementById('cardContent');
  html2canvas(card).then(canvas => {
    const link = document.createElement('a');
    const name = document.getElementById("nameInput").value || "eid_card";
    link.download = `eid_card_from_${name.replace(/\s+/g, '_')}.png`;
    link.href = canvas.toDataURL();
    link.click();
  });
}

  // =========================
  // 6. Share Greeting
  // =========================
  function shareWish() {
    const name = document.getElementById("nameInput").value || "Your Friend";
    const message = document.getElementById("customMessage").value || "Eid Mubarak! May this Eid bring joy and peace.";
  
    const text = `🌙 Eid Mubarak!\n${message}\n– From ${name}\n\nCelebrate at: ${window.location.href}`;
    
    if (navigator.share) {
      navigator.share({
        title: "Eid Mubarak Greeting",
        text: text,
        url: window.location.href
      }).catch(() => alert("Unable to share."));
    } else {
      prompt("Copy and share this greeting:", text);
    }
  }
  