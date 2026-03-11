document.addEventListener('DOMContentLoaded', () => {
    // Interactive Particle Network Hero
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];
        
        // Settings
        const particleCount = 180; // Adjust for density
        const connectDistance = 200; // Distance to draw lines
        const mouseRadius = 200; // Radius of mouse attraction
        const baseColor = 'rgba(16, 185, 129, '; // Emerald-500

        // Mouse interaction state
        let mouse = { x: null, y: null };

        // Handle Resize with High DPI Support
        const resizeCanvas = () => {
            const dpr = window.devicePixelRatio || 1;
            const parent = canvas.parentElement;
            width = parent.offsetWidth;
            height = parent.offsetHeight;
            
            // Set display size
            canvas.style.width = width + 'px';
            canvas.style.height = height + 'px';
            
            // Set actual memory size
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            
            // Scale context to match DPR
            ctx.scale(dpr, dpr);
            
            initParticles();
        };

        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(resizeCanvas, 200);
        });
        
        // Mouse Tracking
        canvas.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        });

        canvas.addEventListener('mouseleave', () => {
            mouse.x = null;
            mouse.y = null;
        });

        // Particle Class
        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.5; // Slow movement
                this.vy = (Math.random() - 0.5) * 0.5;
                this.radius = Math.random() * 1.5 + 0.5;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = baseColor + '0.8)'; // Solid nodes
                ctx.fill();
            }

            update() {
                // Move
                this.x += this.vx;
                this.y += this.vy;

                // Bounce off edges
                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;

                // Mouse Attraction
                if (mouse.x != null && mouse.y != null) {
                    let dx = mouse.x - this.x;
                    let dy = mouse.y - this.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < mouseRadius) {
                        // Gentle pull towards cursor
                        const forceDirectionX = dx / distance;
                        const forceDirectionY = dy / distance;
                        const force = (mouseRadius - distance) / mouseRadius; // Stronger closer
                        
                        // Limit max speed when attracted
                        this.x += forceDirectionX * force * 1.5;
                        this.y += forceDirectionY * force * 1.5;
                    }
                }

                this.draw();
            }
        }

        // Initialize points
        const initParticles = () => {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        // Draw connecting lines
        const drawConnections = () => {
            for (let a = 0; a < particles.length; a++) {
                for (let b = a + 1; b < particles.length; b++) {
                    let dx = particles[a].x - particles[b].x;
                    let dy = particles[a].y - particles[b].y;
                    let distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectDistance) {
                        // Fade line based on distance
                        let opacity = 1 - (distance / connectDistance);
                        // Make line very subtle, max opacity 0.3
                        opacity *= 0.3;
                        
                        ctx.beginPath();
                        ctx.strokeStyle = baseColor + opacity + ')';
                        ctx.lineWidth = 1;
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }
        };

        // Animation Loop
        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            
            // Background is technically handled by CSS gradient beneath canvas,
            // so we just clear and draw particles on top.
            
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
            }
            
            drawConnections();
            
            requestAnimationFrame(animate);
        };

        // Start
        resizeCanvas();
        animate();
    }

    // Page Fade-in
    document.body.classList.add('loaded');

    // Reading Progress Bar & Back to Top
    const progressBar = document.getElementById('progress-bar');
    const bttButton = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        if (progressBar) {
            progressBar.style.width = scrolled + "%";
        }

        // Show/Hide Back to Top
        if (bttButton) {
            if (winScroll > 500) {
                bttButton.classList.add('show');
            } else {
                bttButton.classList.remove('show');
            }
        }
    });

    if (bttButton) {
        bttButton.addEventListener('click', (e) => {
            e.preventDefault();
            const originalText = bttButton.textContent;
            bttButton.textContent = "COMPILING...";
            
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });

            setTimeout(() => {
                bttButton.textContent = originalText;
            }, 800);
        });
    }

    // Mobile Menu Toggle
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeBtn = document.getElementById('close-btn');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    const toggleMenu = () => {
        const isActive = mobileMenu.classList.toggle('active');
        document.body.classList.toggle('overflow-hidden');
        
        // Accessibility Fixes
        mobileMenu.setAttribute('aria-hidden', !isActive);
        if (isActive) {
            mobileMenu.removeAttribute('inert');
            closeBtn.focus();
        } else {
            mobileMenu.setAttribute('inert', '');
            menuBtn.focus();
        }
    };

    // Initialize Menu State
    if (mobileMenu) {
        mobileMenu.setAttribute('aria-hidden', 'true');
        mobileMenu.setAttribute('inert', '');

        menuBtn.addEventListener('click', toggleMenu);
        closeBtn.addEventListener('click', toggleMenu);

        mobileLinks.forEach(link => {
            link.addEventListener('click', toggleMenu);
        });
    }

    // // Smooth Scrolling
    // document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    //     anchor.addEventListener('click', function (e) {
    //         e.preventDefault();
    //         const target = document.querySelector(this.getAttribute('href'));
    //         if (target) {
    //             target.scrollIntoView({
    //                 behavior: 'smooth'
    //             });
    //         }
    //     });
    // });

    // Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href'); // Get the href once
        if (href === '#') { // Check if the href is just '#'
            return; // Exit if it's a placeholder link
        }
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});


    // Infinite Terminal Typing Effect
    const tagline = document.querySelector('.tagline');
    const titles = [
        "Full Stack Developer",
        "Backend Specialist",
        "UI/UX Enthusiast",
        "Open Source Contributor",
        "Problem Solver"
    ];
    
    if (tagline) {
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;

        function typeLoop() {
            const currentTitle = titles[wordIndex];
            
            if (isDeleting) {
                tagline.textContent = currentTitle.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50;
            } else {
                tagline.textContent = currentTitle.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 100;
            }

            if (!isDeleting && charIndex === currentTitle.length) {
                isDeleting = true;
                typeSpeed = 2000; // Wait before starting to delete
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % titles.length;
                typeSpeed = 500;
            }

            setTimeout(typeLoop, typeSpeed);
        }
        
        // Start the loop after a short delay
        setTimeout(typeLoop, 1000);
    }

    // Contact Form Validation
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (name && email && message) {
                formStatus.textContent = "Thank you! I'll get back to you soon.";
                formStatus.className = "mt-4 text-sm font-mono text-emerald-500 block";
                contactForm.reset();
            } else {
                formStatus.textContent = "Please fill in all fields.";
                formStatus.className = "mt-4 text-sm font-mono text-red-500 block";
            }
        });
    }

    // Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
    const body = document.body;

    const updateThemeUI = (isLight) => {
        const text = isLight ? '[ MODE: LIGHT ]' : '[ MODE: DARK ]';
        if (themeToggle) themeToggle.textContent = text;
        if (mobileThemeToggle) mobileThemeToggle.textContent = text;
    };

    const toggleTheme = () => {
        const isLight = body.classList.toggle('light-mode');
        document.documentElement.classList.toggle('dark', !isLight);
        localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark');
        updateThemeUI(isLight);
        
        // Refresh Lucide icons if needed (e.g. if we use themed icons)
        if (window.lucide) lucide.createIcons();
    };

    // Initialize Theme
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
        document.documentElement.classList.remove('dark');
        updateThemeUI(true);
    } else {
        document.documentElement.classList.add('dark');
        updateThemeUI(false);
    }

    if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
    if (mobileThemeToggle) mobileThemeToggle.addEventListener('click', toggleTheme);

    // Scroll Reveal Intersection Observer
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Unobserve after revealing to trigger only once
                observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        threshold: 0.15
    });

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => revealObserver.observe(el));
});
