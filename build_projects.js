const fs = require('fs');
const path = require('path');
const projectsData = require('./projects_data.js');

const projectsDir = path.join(__dirname, 'projects');

// Create projects directory if it doesn't exist
if (!fs.existsSync(projectsDir)) {
  fs.mkdirSync(projectsDir, { recursive: true });
}

// Helper to resolve local assets by adding relative parent path
function resolveAsset(url) {
  if (!url) return '../assets/design/Frame 2.webp';
  if (url.startsWith('http') || url.startsWith('//') || url.startsWith('../')) return url;
  return '../' + url;
}

// Generate static HTML for each project
projectsData.forEach(proj => {
  const thumbnail = resolveAsset(proj.screenshots ? proj.screenshots[0] : null);
  const techBadges = proj.techStack.map(tech => `<span class="tech-tag">${tech}</span>`).join('\n          ');

  const htmlContent = `<!DOCTYPE html>
<html lang="uk">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${proj.name} | @djestick - Проект</title>
    <meta name="description" content="${proj.tagline}" />
    <meta name="author" content="Sviatoslav (djestick)" />
    
    <!-- Open Graph Metadata -->
    <meta property="og:title" content="${proj.name} | @djestick" />
    <meta property="og:description" content="${proj.tagline}" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="${thumbnail}" />

    <!-- Favicon -->
    <link rel="icon" href="../assets/e7fe06ee-a764-46c6-b61b-ad6252634b31_Dhcj4Nj2TVi22B2bkeN7-s2fnku5c091aB1jA.webp" type="image/webp" />
    
    <!-- Styles -->
    <link rel="stylesheet" href="../styles.css" />
  </head>
  <body class="project-detail-page">
    <!-- Premium Flat Navigation Bar -->
    <header class="nav-header">
      <div class="container nav-container">
        <a href="../index.html" class="logo-brand">
          djestick
        </a>
        <div class="nav-right">
          <nav>
            <ul class="nav-menu">
              <li><a href="../index.html#biography" class="nav-link">Біографія</a></li>
              <li><a href="../index.html#projects" class="nav-link active">Проекти</a></li>
              <li><a href="../brandbook.html" class="nav-link">Брендбук</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>

    <main class="project-page-content">
      <div class="container">
        <!-- Breadcrumbs -->
        <div class="breadcrumbs">
          <a href="../index.html">Головна</a>
          <span class="breadcrumb-separator">/</span>
          <a href="../index.html#projects">Проекти</a>
          <span class="breadcrumb-separator">/</span>
          <span class="current-page">${proj.name}</span>
        </div>

        <!-- Project Intro Details -->
        <div class="project-intro-section">
          <span class="project-category-tag">${proj.category}</span>
          <h1 class="project-main-title">${proj.name}</h1>
          <p class="project-intro-tagline">${proj.tagline}</p>
          <div class="project-tech-tags">
            ${techBadges}
          </div>
        </div>

        <!-- Large Sharp Image -->
        <div class="project-featured-image-box">
          <img src="${thumbnail}" alt="${proj.name}" class="project-featured-image" />
        </div>

        <!-- Narrative Content Grid (Flat Cards) -->
        <div class="project-story-grid">
          <!-- Story Block -->
          <div class="project-story-card">
            <h2 class="project-story-card-title">
              <span class="flat-dot primary"></span> Як все починалося (Сторi)
            </h2>
            <p class="project-story-card-text">${proj.emotionalReview.story}</p>
          </div>

          <!-- Challenges Block -->
          <div class="project-story-card">
            <h2 class="project-story-card-title accent-violet">
              <span class="flat-dot violet"></span> Виклики & Складні моменти
            </h2>
            <p class="project-story-card-text">${proj.emotionalReview.challenges}</p>
          </div>

          <!-- Victory Block -->
          <div class="project-story-card">
            <h2 class="project-story-card-title accent-lavender">
              <span class="flat-dot lavender"></span> Фінальна Перемога
            </h2>
            <p class="project-story-card-text">${proj.emotionalReview.victory}</p>
          </div>
        </div>

        <!-- Links Bar -->
        <div class="project-links-bar">
          <a href="${proj.links.github}" target="_blank" rel="noopener noreferrer" class="brand-btn primary">
            Перейти на GitHub
          </a>
          <a href="${proj.links.demo}" target="_blank" rel="noopener noreferrer" class="brand-btn secondary">
            Відкрити Live Demo
          </a>
        </div>
      </div>
    </main>

    <!-- Page Footer -->
    <footer>
      <div class="container">
        <p>&copy; 2026 @djestick (Святослав). Побудовано за допомогою Vibe Coding та ІІ-оркестрації.</p>
        <p>Дизайн на основі оригінальних макетів <a href="../brandbook.html">Designly</a>.</p>
      </div>
    </footer>
  </body>
</html>`;

  const fileName = path.join(projectsDir, `${proj.id}.html`);
  fs.writeFileSync(fileName, htmlContent, 'utf-8');
  console.log(`Generated standalone page for: ${proj.name} -> ${fileName}`);
});
console.log('All project pages generated successfully.');
