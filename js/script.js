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

    // Contact Form & High-Glow Toaster Logic
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = document.getElementById('btn-text');
    const btnSpinner = document.getElementById('btn-spinner');
    const toaster = document.getElementById('toaster');
    const toasterMessage = document.getElementById('toaster-message');
    const closeToaster = document.getElementById('close-toaster');
    let toasterTimeout;

    const showToaster = (message, isError = false) => {
        clearTimeout(toasterTimeout);
        toasterMessage.innerHTML = message;
        
        // High-Glow styling
        const toasterContainer = toaster.querySelector('div');
        const progressBar = document.getElementById('toaster-progress');
        
        toasterContainer.className = `bg-slate-900/90 border ${isError ? 'border-red-500' : 'border-emerald-500'} backdrop-blur-lg rounded-lg p-5 shadow-2xl flex items-center space-x-4 max-w-sm relative overflow-hidden`;
        
        // Reset animation by removing 'show' and forcing reflow
        toaster.classList.remove('show', 'hide');
        void toaster.offsetWidth; // Force reflow
        toaster.classList.add('show');
        
        if (progressBar) {
            progressBar.style.backgroundColor = isError ? '#ef4444' : '#10b981';
        }

        toasterTimeout = setTimeout(() => {
            hideToaster();
        }, 5000);
    };

    const hideToaster = () => {
        toaster.classList.remove('show');
        toaster.classList.add('hide');
    };

    if (closeToaster) {
        closeToaster.addEventListener('click', hideToaster);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        
        // UI: Loading State
        btnText.classList.add('hidden');
        btnSpinner.classList.remove('hidden');
        submitBtn.disabled = true;
        submitBtn.classList.add('btn-loading');

        const data = new FormData(event.target);
        
        try {
            const response = await fetch("https://formspree.io/f/mqeygbyr", {
                method: 'POST',
                body: data,
                mode: 'cors',
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                showToaster("Success! Your message has been sent into the safe haven of my inbox.");
                contactForm.reset();
                // Form stays visible as requested
            } else {
                const errorData = await response.json();
                if (response.status === 403) {
                    console.error("FORMSPREE 403 DEBUG:", errorData);
                }
                throw new Error(errorData.error || 'Submission failed');
            }
        } catch (error) {
            showToaster(`Something went wrong! My digital carrier pigeon got lost in the void.`, true);
        } finally {
            // UI: Reset Loading State
            btnText.classList.remove('hidden');
            btnSpinner.classList.add('hidden');
            submitBtn.disabled = false;
            submitBtn.classList.remove('btn-loading');
        }
    }

    if (contactForm) {
        contactForm.addEventListener('submit', handleSubmit);
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

    // Email Obfuscation & In-place Click-to-Copy
    const initEmailObfuscation = () => {
        const emailLinks = document.querySelectorAll('.email-link');
        emailLinks.forEach(link => {
            const user = link.getAttribute('data-user');
            const domain = link.getAttribute('data-domain');
            if (user && domain) {
                const fullEmail = `${user}@${domain}`;
                // Set initial text to email address instead of loading text
                link.textContent = fullEmail;
                link.style.cursor = 'pointer';

                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    navigator.clipboard.writeText(fullEmail).then(() => {
                        link.textContent = 'COPIED!';
                        link.classList.add('copied');
                        
                        setTimeout(() => {
                            link.textContent = fullEmail;
                            link.classList.remove('copied');
                        }, 2000);
                    });
                });
            }
        });
    };

    // Social Link Obfuscation
    const initSocialObfuscation = () => {
        const socialLinks = document.querySelectorAll('[data-url]');
        socialLinks.forEach(link => {
            link.style.cursor = 'pointer';
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const url = link.getAttribute('data-url');
                if (url) {
                    window.open(url, '_blank', 'noopener,noreferrer');
                }
            });
        });
    };

    // Smooth Scroll Logic
    const initSmoothScroll = () => {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const targetId = link.getAttribute('href');
                if (targetId === '#' || targetId === '') return;

                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    // Close mobile menu if open
                    const mobileMenu = document.getElementById('mobile-menu');
                    if (mobileMenu && mobileMenu.classList.contains('active')) {
                        mobileMenu.classList.remove('active');
                        document.body.style.overflow = '';
                    }

                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    };

    // GitHub Link Obfuscation (Advanced)
    const initGithubObfuscation = () => {
        const ghLink = document.getElementById('gh-link');
        if (ghLink) {
            ghLink.style.cursor = 'pointer';
            ghLink.addEventListener('click', (e) => {
                e.preventDefault();
                // Username split into parts to hide from scrapers
                const part1 = 'cat';
                const part2 = 'kidd';
                const url = `https://github.com/${part1}${part2}`;
                window.open(url, '_blank', 'noopener,noreferrer');
            });
        }
    };

    initEmailObfuscation();
    initSocialObfuscation();
    initSmoothScroll();
    initGithubObfuscation();

    // About Section Carousel Logic
    const initAboutCarousel = () => {
        const carouselImages = document.querySelectorAll('#about-carousel .carousel-img');
        if (carouselImages.length <= 1) return;

        let currentIndex = 0;
        setInterval(() => {
            carouselImages[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % carouselImages.length;
            carouselImages[currentIndex].classList.add('active');
        }, 5000);
    };

    initAboutCarousel();
});
