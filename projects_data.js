const projectsData = [
  {
    id: "promin-folder",
    name: "Promin Folder",
    category: "Desktop Tool / Windows Customizer",
    tagline: "Преміальний Windows-додаток для кастомізації іконок папок в один клік.",
    techStack: ["Electron", "React", "TypeScript", "Zustand", "Sharp", "Electron-Vite", "Node.js"],
    emotionalReview: {
      story: "Мене завжди дратувало, що в Windows зміна іконки папки — це довгий і нудний процес через властивості системи. Мені захотілося створити вишуканий інструмент, який робить це миттєво. Так народився Promin Folder — додаток з кастомним безрамковим редактором (frameless editor), де можна фарбувати папки в будь-які кольори, накладати поверх значки і миттєво застосовувати зміни.",
      challenges: "Головний біль полягав у реальній системній інтеграції Windows. Мало просто створити файл `.ico` та записати його в `desktop.ini`. Потрібно було виставити правильні системні атрибути папки (Read-Only/System) та змусити Провідник (Windows Explorer) оновити кеш без перезавантаження комп'ютера. На форумах розробники роками скаржилися на це.",
      victory: "Я вирішив це, написавши нативний міст через Node.js IPC, який викликає Windows Shell API (`SHChangeNotify`), змушуючи систему миттєво перерендерити іконку. Для рендерингу самих іконок я використав потужну бібліотеку `Sharp` у головному процесі Electron, що дозволило змішувати шари SVG та накладати ефектні тіні."
    },
    links: {
      github: "https://github.com/djestick/Promin-Folder",
      demo: "#"
    },
    screenshots: [
      "assets/design/Frame 2.webp"
    ]
  },
  {
    id: "promin-studio",
    name: "Promin Studio (OpenHUD Manager Fork)",
    category: "Desktop App / CS:GO & CS2 Overlay Manager",
    tagline: "Кастомний менеджер HUD та оверлеїв для кіберспортивних трансляцій CS.",
    techStack: ["Electron", "React", "Socket.io", "Express", "SQLite3", "Playwright", "Tailwind CSS"],
    emotionalReview: {
      story: "Це форк відомого менеджера OpenHUD. Мені потрібно було зробити його швидшим, стабільнішим та зручнішим для режисерів трансляцій CS:GO/CS2. Я хотів створити інтерфейс, який дозволяв би керувати оверлеями та HUD-ами «на льоту» під час живого ефіру, не боячись, що все впаде в найвідповідальніший момент.",
      challenges: "Найбільший виклик — синхронізація даних гри в реальному часі через Game State Integration (GSI) без затримок. Кожна секунда затримки в трансляції — це катастрофа. Крім того, потрібно було реалізувати вибір монітора для виведення оверлею та регулювання його розміру прямо з вікна менеджера.",
      victory: "Я побудував архітектуру на Socket.io для миттєвого обміну повідомленнями між сервером Express (який парсить дані CS GSI) та клієнтом React. Інтегрував SQLite для збереження налаштувань матчів та написав модуль керування вікнами Electron, який дозволяє перетягувати та масштабувати оверлей на будь-який підключений екран в один клік."
    },
    links: {
      github: "https://github.com/djestick/promin-studio",
      demo: "#"
    },
    screenshots: [
      "assets/design/Screenshot 2026-05-20 at 23-19-35  Admin Panels Design Designly.png"
    ]
  },
  {
    id: "vatra-manager",
    name: "VatraManager (KOLOBOARD CS MANAGER)",
    category: "Desktop / Tournament Dashboard",
    tagline: "Професійна система керування матчами та турнірами з CS2.",
    techStack: ["Electron", "React", "Socket.io", "SQLite3", "OGL (WebGL)", "Tailwind CSS", "Firebase"],
    emotionalReview: {
      story: "Це масштабна кіберспортивна панель для керування турнірними сітками, складами команд та ігровою статистикою. Тут мені хотілося вийти за межі звичайного 2D та створити щось неймовірне з точки зору візуалу, додавши тривимірну графіку для відображення аналітики.",
      challenges: "Потрібно було поєднати важкі 3D-компоненти аналітики на WebGL з логікою Electron, при цьому зберігаючи високий FPS та стабільність бази даних при локальному зберіганні тисяч записів про гравців.",
      victory: "Я вибрав надлегку WebGL бібліотеку OGL замість важкої Three.js, що дозволило зберегти швидкість завантаження інтерфейсу в межах 150мс. Дані синхронізуються з Firebase у реальному часі для резервного копіювання, а локальна SQLite база гарантує роботу додатку навіть за повної відсутності інтернету на кіберспортивній арені."
    },
    links: {
      github: "https://github.com/djestick/VatraManager",
      demo: "#"
    },
    screenshots: [
      "assets/design/Screenshot 2026-05-20 at 23-19-03  UX_UI  ? Designly ࠪ筨  ? .png"
    ]
  },
  {
    id: "irl-advancement",
    name: "IRL Advancement",
    category: "Web Application / Life Gamification",
    tagline: "Гейміфікація ваших цілей у стилі досягнень (Advancements) з Minecraft.",
    techStack: ["React", "Vite", "Firebase Firestore", "Framer Motion", "Tailwind CSS", "React-Zoom-Pan-Pinch"],
    emotionalReview: {
      story: "Я обожнюю Minecraft та його систему ачивок. В один день я подумав: чому б не зробити планувальник цілей на рік у вигляді такого ж дерева досягнень? Так з'явився IRL Advancement. Кожна мета — це іконка в дереві, яка красиво спалахує при виконанні, видаючи той самий звук досягнення.",
      challenges: "Дерево цілей може бути величезним і розгалуженим. Звичайна статична сторінка перетворилася б на кашу. Мені потрібно було зробити нескінченне полотно (Infinite Canvas), де користувач може вільно переміщатися, масштабувати дерево (zoom/pan) та взаємодіяти з вузлами без втрати продуктивності.",
      victory: "Я реалізував це за допомогою `react-zoom-pan-pinch`, оптимізувавши рендеринг за допомогою React memoization. Для бази даних я вибрав Firebase Firestore, що дозволило оновлювати статус цілей на льоту та зберігати прогрес користувача в реальному часі з плавною анімацією від `Framer Motion`."
    },
    links: {
      github: "https://github.com/djestick/irl-Advancement",
      demo: "#"
    },
    screenshots: [
      "assets/design/Frame 2.webp"
    ]
  },
  {
    id: "rp-helper",
    name: "RP Helper (AI Roleplay Assistant)",
    category: "AI Web Application / Assistant",
    tagline: "Розумний ШІ-помічник для рольових ігор з інтеграцією Gemini API.",
    techStack: ["React", "Firebase", "Framer Motion", "@google/generative-ai", "PDF-Parse", "i18next", "Tailwind CSS"],
    emotionalReview: {
      story: "У рольових іграх (RP) правила часто займають сотні сторінок у форматі PDF. Гравці та адміністратори витрачають купу часу на пошук потрібного пункту. Я вирішив створити додаток, куди можна завантажити PDF-звід правил, а навчений ШІ-асистент миттєво відповість на будь-яке запитання щодо ігрового процесу.",
      challenges: "Парсинг великих PDF-файлів безпосередньо на клієнті може сильно навантажувати браузер, а інтеграція великих мовних моделей потребувала безпечного збереження ключів API та швидкої обробки відповідей.",
      victory: "Я створив легкий модуль парсингу на базі `pdf-parse`, а як ядро ШІ використав найновіший `@google/generative-ai` (Gemini API) з контекстним навчанням на льоту. Додав локалізацію через `i18next`, щоб помічник говорив різними мовами, і загорнув усе в розкішний інтерфейс з плавними картками на `Framer Motion`."
    },
    links: {
      github: "https://github.com/djestick/rp-helper",
      demo: "#"
    },
    screenshots: [
      "assets/design/Screenshot 2026-05-20 at 23-19-44   ?      Designly.png"
    ]
  },
  {
    id: "nekto-me-skipper",
    name: "Nekto.me Skipper & Ukrainizator",
    category: "Chrome Extension / Web Utility",
    tagline: "Розширення для чату Nekto.me з автопропуском та повною українізацією.",
    techStack: ["JavaScript (Chrome Extension API)", "HTML5", "CSS3", "JSON (I18n)"],
    emotionalReview: {
      story: "Популярний анонімний чат Nekto.me переповнений ботами та нецікавими співрозмовниками. Доводиться постійно клікати кнопку «пропустити». Плюс інтерфейс сервісу повністю російськомовний. Мені захотілося виправити обидві проблеми одним махом — написати розширення для Chrome, яке автоматизує рутину та перекладає сайт українською.",
      challenges: "Головна складність була в тому, щоб розширення коректно відстежувало події чату (підключення нового користувача, вихід, отримання повідомлень) та вбудовувалося в DOM-структуру сайту, яка часто оновлюється без перезавантаження сторінки.",
      victory: "Я використав Chrome Extension Content Scripts для впровадження кастомного скрипта, який через `MutationObserver` стежить за змінами в інтерфейсі чату. Коли співрозмовник мовчить або відключається, скрипт автоматично ініціює перехід до наступного чату, а локальний JSON-файл перекладу на льоту замінює весь текст сайту на солов'їну."
    },
    links: {
      github: "https://github.com/djestick/nekto.me-skipper",
      demo: "#"
    },
    screenshots: [
      "assets/design/Frame 2.webp"
    ]
  },
  {
    id: "511-dvizh",
    name: "511.DVIZH × 030.DVIZH",
    category: "Web / Club Event Platform",
    tagline: "Офіційний промо-сайт клубних івентів у Ганновері та Берліні.",
    techStack: ["HTML5", "CSS3", "JavaScript", "Live-Server"],
    emotionalReview: {
      story: "Цей проект народився з моєї пристрасті до електронної музики та нічного життя. Організаторам вечірок у Німеччині (Ганновер та Берлін) потрібне було яскраве цифрове обличчя, яке виділялося б на тлі нудних корпоративних сайтів та передавало атмосферу темних, неонових клубів.",
      challenges: "Потрібно було зробити сайт візуально глибоким і насиченим (з неоновими градієнтами, глоу-ефектами та анімаціями), але при цьому зберегти миттєве завантаження на мобільних пристроях при слабкому 3G/LTE біля входу в клуб.",
      victory: "Я свідомо відмовився від важких фреймворків. Написав абсолютно чистий, семантичний HTML та кастомний ванільний CSS з використанням HSL-кольорів та апаратного прискорення для анімацій. Сайт важить лічені кілобайти, завантажується миттєво та вражає своїм стилем."
    },
    links: {
      github: "https://github.com/djestick/511.dvizh",
      demo: "#"
    },
    screenshots: [
      "assets/design/Frame 2.webp"
    ]
  },
  {
    id: "schulmensa",
    name: "Schulmensa",
    category: "Desktop / Financial Billing App",
    tagline: "Десктопна система обліку та генерації рахунків-фактур для шкільних їдалень.",
    techStack: ["Electron", "React", "TypeScript", "SQLite3", "Tailwind CSS", "Nodemailer", "SendGrid"],
    emotionalReview: {
      story: "Шкільні їдальні щомісяця стикаються з паперовою рутиною: потрібно розрахувати вартість обідів для сотень учнів та розіслати рахунки батькам. Я розробив Schulmensa — надійний десктопний додаток, який автоматизує цей процес, створює PDF-рахунки та розсилає їх на email одним натисканням.",
      challenges: "Обробка фінансових даних вимагає високої точності. Крім того, автоматична масова розсилка листів часто потрапляє у спам, якщо поштовий клієнт налаштований неправильно, а локальна база даних мала працювати безвідмовно.",
      victory: "Я побудував базу даних на базі SQLite3 з індексацією для швидкого пошуку. Реалізував подвійний міст відправки листів: через класичний `Nodemailer` (SMTP) для локальних серверів та через професійний API `SendGrid` з DKIM-підписами, що гарантує 100% доставку рахунків прямо у вхідні батьків."
    },
    links: {
      github: "https://github.com/djestick/Schulmensa",
      demo: "#"
    },
    screenshots: [
      "assets/design/Frame 2.webp"
    ]
  },
  {
    id: "gorbunovsite",
    name: "Gorbunov Site",
    category: "Web / Creative Portfolio Page",
    tagline: "Стильний персональний сайт-портфоліо з унікальною естетикою.",
    techStack: ["HTML5", "CSS3", "JavaScript"],
    emotionalReview: {
      story: "Це був експериментальний проект, де головною метою було створити вишуканий мінімалістичний дизайн з акцентом на типографіку та плавні переходи. Я хотів, щоб сайт викликав відчуття преміального журналу про сучасне мистецтво.",
      challenges: "Створення плавних інтерактивних елементів без використання важких бібліотек на кшталт GSAP. Потрібно було досягти ідеального Pixel Perfect відображення на будь-яких екранах.",
      victory: "Я реалізував усю динаміку на чистих CSS-анімаціях та трансформаціях з апаратним прискоренням (`translate3d`), а також оптимізував шрифтову сітку за допомогою відносних одиниць `clamp()`. Сайт виглядає бездоганно як на моніторах, так і на мобільних."
    },
    links: {
      github: "https://github.com/djestick/gorbunovsite",
      demo: "#"
    },
    screenshots: [
      "assets/design/Frame 2.webp"
    ]
  },
  {
    id: "promin-lab",
    name: "Promin Lab",
    category: "Web Application / Creative Lab",
    tagline: "Інтерактивна лабораторія креативних вебових інтерфейсів.",
    techStack: ["React", "TypeScript", "Vite", "GSAP (GreenSock)", "Tailwind CSS", "Firebase"],
    emotionalReview: {
      story: "Promin Lab — це мій цифровий майданчик для експериментів з мікро-анімаціями, фізикою елементів та незвичайними способами взаємодії з користувачем. Тут я втілюю найсміливіші фронтенд-ідеї, які потім переходять у мої комерційні проекти.",
      challenges: "Складна анімація багатьох об'єктів одночасно може викликати фризи (drop frames), особливо на пристроях без потужної відеокарти.",
      victory: "Я опанував бібліотеку анімацій GSAP у поєднанні з React-хуками, налаштувавши рендеринг через SVG-фільтри та canvas, мінімізувавши перерахунки DOM (reflow). Результат — неймовірно плавні мікро-рухи елементів на швидкості 60 FPS."
    },
    links: {
      github: "https://github.com/djestick/Promin--Lab",
      demo: "#"
    },
    screenshots: [
      "assets/design/Frame 2.webp"
    ]
  },
  {
    id: "qrx",
    name: "QRX Landing Page",
    category: "Web / Product Showcase",
    tagline: "Сучасний висококонверсійний лендінг для інноваційного продукту.",
    techStack: ["HTML5", "CSS3", "JavaScript"],
    emotionalReview: {
      story: "Перед моїм клієнтом стояла задача швидко протестувати нішу та зібрати перші заявки на продукт. Мені потрібно було розробити цільову сторінку з неймовірно соковитим візуалом, яка б переконувала користувача з перших секунд скролу.",
      challenges: "Стислі терміни розробки — потрібно було зробити повністю готовий адаптивний продукт за лічені дні, при цьому не втративши в унікальності дизайну.",
      victory: "Я використав модульний підхід до верстки, заздалегідь розробивши власну міні-дизайн систему з гнучкими токенами кольорів та відступів. Це дозволило завершити розробку за 48 годин, отримавши ідеальні 100 балів у тестах швидкості Google PageSpeed."
    },
    links: {
      github: "https://github.com/djestick/qrx",
      demo: "#"
    },
    screenshots: [
      "assets/design/Frame 2.webp"
    ]
  }
];

// Share globally for our application if in browser
if (typeof window !== 'undefined') {
  window.projectsData = projectsData;
}

// Export for node builds
if (typeof module !== 'undefined' && module.exports) {
  module.exports = projectsData;
}
