// Scroll animation
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            entry.target.classList.toggle('visible', entry.isIntersecting);
        });
    },
    { threshold: 0.15 }
);
document.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el));

// Scroll effect for skill bars
function animateSkillBars() {
    document.querySelectorAll('.skill-bar').forEach(bar => {
        let width = bar.getAttribute('data-level') + '%';
        bar.querySelector('span').innerText = width;
        bar.style.position = 'relative';
        bar.style.background = '#ddd';
        bar.style.overflow = 'hidden';
        // Animate pseudo-element width (not directly accessible, so use inline styling)
        bar.style.setProperty('--skill-width', width);
        bar.querySelector('span').style.right = '12px';
        bar.querySelector('span').style.color = '#fff';

        // Animate the bar using real element for demo purposes
        let fillBar = document.createElement('div');
        fillBar.style.background = 'linear-gradient(90deg,#6D28D9 50%,#312e81 100%)';
        fillBar.style.position = 'absolute';
        fillBar.style.height = '100%';
        fillBar.style.borderRadius = '16px';
        fillBar.style.left = 0;
        fillBar.style.top = 0;
        fillBar.style.width = '0%';
        fillBar.style.transition = 'width 1.3s cubic-bezier(0.4,0,0.2,1)';
        bar.appendChild(fillBar);

        // Reveal animation on scroll-in
        let reveal = () => {
            setTimeout(() => {
                fillBar.style.width = width;
            }, 250);
        };
        const skillObserver = new IntersectionObserver(
            (entries, obsr) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        reveal();
                        obsr.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 }
        );
        skillObserver.observe(bar);
    });
}
window.addEventListener('DOMContentLoaded', animateSkillBars);

// Smooth scroll navigation
document.querySelectorAll('.navbar a').forEach(link => {
    link.onclick = (e) => {
        e.preventDefault();
        const id = link.getAttribute('href');
        document.querySelector(id).scrollIntoView({behavior: 'smooth'});
    }
});
const toggleBtn = document.getElementById('mode-toggle');
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

function setMode(dark) {
    document.body.classList.toggle('dark-mode', dark);
    // Change the button icon
    toggleBtn.textContent = dark ? '☀️' : '🌙';
}

toggleBtn.addEventListener('click', () => {
    const isDark = document.body.classList.contains('dark-mode');
    setMode(!isDark);
    localStorage.setItem('theme', !isDark ? 'dark' : 'light');
});

// On load, set theme
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (savedTheme === null && prefersDark)) {
        setMode(true);
    } else {
        setMode(false);
    }
});
