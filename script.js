
class Particle {
    constructor(x, y, radius, color, velocity) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.color = color;
      this.velocity = velocity;
    }
  
    draw(ctx) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath();
    }
  
    update() {
      this.x += this.velocity.x;
      this.y += this.velocity.y;
  
      this.draw(ctx);
    }
  }
  
  // Utility function to generate random number within a range
  function randomRange(min, max) {
    return Math.random() * (max - min) + min;
  }
  
  // Canvas setup
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  let particles = [];
  
  // Create particles
  function createParticles() {
    for (let i = 0; i < 100; i++) {
      const x = canvas.width / 2;
      const y = canvas.height / 2;
      const radius = randomRange(2, 5);
      const color = "#333";
      const velocity = {
        x: randomRange(-2, 2),
        y: randomRange(-2, 2)
      };
  
      particles.push(new Particle(x, y, radius, color, velocity));
    }
  }
  
  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    particles.forEach(particle => {
      particle.update();
  
      // Update particle position within canvas bounds
      if (
        particle.x + particle.radius < 0 ||
        particle.x - particle.radius > canvas.width ||
        particle.y + particle.radius < 0 ||
        particle.y - particle.radius > canvas.height
      ) {
        particle.x = canvas.width / 2;
        particle.y = canvas.height / 2;
      }
    });
  }
  
  // Create particles and start animation
  createParticles();
  animate();
  