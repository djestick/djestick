document.addEventListener('DOMContentLoaded', () => {
  // --- HIGH-PERFORMANCE CANVAS FRAME SEQUENCER ---
  const canvas = document.getElementById('hero-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    const frameCount = 101;
    const fps = 24;
    const frameInterval = 1000 / fps;
    
    // Pre-allocated array for frames
    const frames = [];
    let loadedFramesCount = 0;
    let currentFrameIndex = 0;
    let lastDrawTime = 0;
    let isPlaying = false;

    // Handle canvas resizing with aspect ratio correction (like object-fit: cover)
    function resizeCanvas() {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      drawCurrentFrame();
    }

    // Helper to draw image centered with crop (object-fit: cover)
    function drawImageProp(ctx, img, x, y, w, h, offsetX = 0.5, offsetY = 0.5) {
      if (!img || img.width === 0 || img.height === 0) return;

      const iw = img.width;
      const ih = img.height;
      const r = Math.min(w / iw, h / ih);
      let nw = iw * r;
      let nh = ih * r;
      let cx, cy, cw, ch, ar = 1;

      if (nw < w) ar = w / nw;
      if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh;
      nw *= ar;
      nh *= ar;

      cw = iw / (nw / w);
      ch = ih / (nh / h);

      cx = (iw - cw) * offsetX;
      cy = (ih - ch) * offsetY;

      if (cx < 0) cx = 0;
      if (cy < 0) cy = 0;
      if (cw > iw) cw = iw;
      if (ch > ih) ch = ih;

      ctx.drawImage(img, cx, cy, cw, ch, x, y, w, h);
    }

    function drawCurrentFrame() {
      const img = frames[currentFrameIndex];
      if (img && img.complete && img.naturalWidth !== 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawImageProp(ctx, img, 0, 0, canvas.width, canvas.height);
      } else {
        // Fallback: search backwards for the nearest loaded frame to prevent flickering
        for (let i = currentFrameIndex - 1; i >= 0; i--) {
          if (frames[i] && frames[i].complete && frames[i].naturalWidth !== 0) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawImageProp(ctx, frames[i], 0, 0, canvas.width, canvas.height);
            break;
          }
        }
      }
    }

    function animate(timestamp) {
      if (!lastDrawTime) lastDrawTime = timestamp;
      const elapsed = timestamp - lastDrawTime;

      if (elapsed >= frameInterval) {
        // Advance frame in loop
        currentFrameIndex = (currentFrameIndex + 1) % frameCount;
        drawCurrentFrame();
        lastDrawTime = timestamp - (elapsed % frameInterval);
      }

      requestAnimationFrame(animate);
    }

    // Progressive image preloader to ensure instant site loading
    function preloadFrames() {
      for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        const paddedIndex = String(i).padStart(5, '0');
        img.src = `assets/hero-frames/frame_${paddedIndex}.png`;
        img.onload = () => {
          loadedFramesCount++;
          // Start playback once the first few frames are cached
          if (loadedFramesCount >= 5 && !isPlaying) {
            isPlaying = true;
            requestAnimationFrame(animate);
          }
        };
        frames.push(img);
      }
    }

    // Initialize Canvas
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    preloadFrames();
  }


  // --- DYNAMIC PROJECTS RENDERING & FILTERS ---
  const projectsGrid = document.getElementById('projectsGrid');
  const filterBtns = document.querySelectorAll('.filter-btn');

  function renderProjects(filterCategory = 'all') {
    if (!projectsGrid || !window.projectsData) return;

    projectsGrid.innerHTML = '';
    
    // Split targets if filter button contains multiple comma-separated values
    const filterTargets = filterCategory !== 'all' 
      ? filterCategory.split(',').map(s => s.trim()) 
      : [];

    const filtered = window.projectsData.filter(proj => {
      if (filterCategory === 'all') return true;
      return filterTargets.includes(proj.category);
    });

    filtered.forEach(proj => {
      const card = document.createElement('a');
      card.className = 'project-card';
      card.href = `projects/${proj.id}.html`;
      
      // Use fallback image if none provided
      const thumbnail = proj.screenshots && proj.screenshots[0] 
        ? proj.screenshots[0] 
        : 'assets/design/Frame 2.webp';

      // Assemble tech badges
      const techBadges = proj.techStack.slice(0, 4).map(tech => 
        `<span class="tech-tag">${tech}</span>`
      ).join('');

      card.innerHTML = `
        <div class="project-thumbnail">
          <img class="project-thumbnail-img" src="${thumbnail}" alt="${proj.name}" loading="lazy" />
          <span class="project-category-tag">${proj.category}</span>
        </div>
        <div class="project-content-wrapper">
          <h3 class="project-card-title">${proj.name}</h3>
          <p class="project-card-tagline">${proj.tagline}</p>
          <div class="project-tech-tags">
            ${techBadges}
          </div>
        </div>
      `;

      projectsGrid.appendChild(card);
    });
  }

  // Filter Buttons event listeners
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      renderProjects(filter);
    });
  });


  // --- BIOGRAPHY TIMELINE REVEALS ---
  const reveals = document.querySelectorAll('.reveal');
  
  if ('IntersectionObserver' in window && reveals.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback if IntersectionObserver is not supported
    reveals.forEach(el => el.classList.add('active'));
  }


  // --- ACTIVE MENU HIGHLIGHT ON SCROLL ---
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  if ('IntersectionObserver' in window && navLinks.length > 0) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          let activeId = entry.target.getAttribute('id');

          navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${activeId}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: '-80px 0px -20% 0px' // Adjust active trigger margin based on header height
    });

    sections.forEach(sec => sectionObserver.observe(sec));
  }


  // --- INIT BOOTSTRAP ---
  renderProjects();
});
