nextBtn.innerHTML = currentIndex === totalItems - 1 ? '←' : '→';
prevBtn.innerHTML = currentIndex === 0 ? '→' : '←';

localStorage.setItem("theme", "dark");
localStorage.setItem("theme", "light");
