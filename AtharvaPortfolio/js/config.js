/* ==========================================================================
   SITE CONFIG — this is the ONLY file you need to edit to personalise the site.
   - Every link must be https:// (or mailto:, or a relative path like assets/x.pdf).
     Anything else (javascript:, http:, data:) is silently dropped for safety.
   - Leave a link as "" to hide that button.
   - Text is rendered as plain text (never HTML), so special characters are safe.
   ========================================================================== */
window.SITE_CONFIG = Object.freeze({
  name: "Atharva Nayak",
  initials: "AN",

  // >>> PASTE: your deployed URL once live (used for share previews), e.g. "https://artnayak.github.io/"
  siteUrl: "",

  // Rotating roles in the hero typing effect
  roles: [
    "AI / ML engineer in the making",
    "Reinforcement-learning tinkerer",
    "Full-stack builder",
    "Satellite data for smallholder farms"
  ],
  intro:
    "Final-year Electronics & Computer Science student at TCET Mumbai. I build ML systems and full-stack apps, and I'm looking for software engineering roles.",

  location: "Mumbai, India",

  // >>> PASTE: the email you want public. Bots scrape public emails; consider a dedicated one.
  email: "arnayak025@gmail.com",

  // >>> PASTE: your links. Leave "" to hide.
  links: {
    github: "https://github.com/ArtNayak",
    linkedin: "https://www.linkedin.com/in/atharva-nayak",
    hackerrank: "https://www.hackerrank.com/profile/arnayak025",
    resume: "" // e.g. "assets/resume.pdf"  (put the PDF in the assets/ folder)
  },

  // Optional: live "Latest on GitHub" section (calls GitHub's public API once per 10 min, cached).
  // Set autoFetch to true to turn it on. Needs your exact GitHub username.
  github: { username: "ArtNayak", autoFetch: false, maxRepos: 6 },

  // >>> PASTE: your photo at assets/photo.jpg (square, ~600x600, < 150 KB) and change this path.
  photo: "assets/photo.png",

  about: [
    "I'm a B.E. student in Electronics & Computer Science at Thakur College of Engineering and Technology, graduating in 2027. My coursework spans data science, deep learning, software engineering and business intelligence.",
    "Most of what I build sits between ML and real products: an RL environment for airport operations, a satellite-based crop yield model, a billing engine for a subscription app. I care about things that run end to end, not just notebooks."
  ],

  idCard: {
    id: "ECS-01",
    department: "Electronics & Computer Science",
    valid: "2027",
    whatIAm: ["Builder", "Fast learner", "Team player", "Detail-minded"],
    facts: [
      ["Location", "Mumbai, India"],
      ["Education", "B.E. ECS, TCET"],
      ["CGPA", "9.14 / 10"],
      ["Latest role", "Web Developer Intern"]
    ],
    quote: "Ship it end to end, then make it better."
  },

  ticker: [
    "Machine Learning", "Reinforcement Learning", "Full-stack", "Satellite Imagery",
    "FastAPI", "PyTorch", "React", "Open to SDE roles"
  ],

  /* Skills: [symbol (1-2 letters), name, category]
     Categories must be one of the names in skillCategories below. */
  skillCategories: ["Languages", "AI & Data", "Web", "Backend & DB", "Tools", "Core CS"],
  skills: [
    ["Py", "Python", "Languages"], ["Jv", "Java", "Languages"], ["C", "C", "Languages"],
    ["C+", "C++", "Languages"], ["Js", "JavaScript", "Languages"], ["Ts", "TypeScript", "Languages"],
    ["Ml", "Machine Learning", "AI & Data"], ["Dl", "Deep Learning", "AI & Data"],
    ["Nl", "NLP", "AI & Data"], ["Tr", "Transformers", "AI & Data"],
    ["Rl", "Reinforcement Learning", "AI & Data"], ["Pt", "PyTorch", "AI & Data"],
    ["Sk", "Scikit-learn", "AI & Data"], ["Hf", "Hugging Face", "AI & Data"],
    ["Pd", "Pandas", "AI & Data"], ["Np", "NumPy", "AI & Data"], ["Ge", "Earth Engine", "AI & Data"],
    ["Re", "React", "Web"], ["Nx", "Next.js", "Web"], ["H5", "HTML5", "Web"],
    ["C3", "CSS3", "Web"], ["Tw", "Tailwind CSS", "Web"], ["Fg", "Figma", "Web"],
    ["Fa", "FastAPI", "Backend & DB"], ["Nd", "Node.js", "Backend & DB"], ["Ex", "Express", "Backend & DB"],
    ["Sp", "Spring Boot", "Backend & DB"], ["Sq", "SQL / MySQL", "Backend & DB"],
    ["Mg", "MongoDB", "Backend & DB"], ["Pg", "PostgreSQL", "Backend & DB"], ["Pr", "Prisma", "Backend & DB"],
    ["Gi", "Git & GitHub", "Tools"], ["Dk", "Docker", "Tools"], ["Vs", "VS Code", "Tools"],
    ["Jp", "Jupyter", "Tools"], ["Oa", "OpenAI API", "Tools"],
    ["Ds", "DSA", "Core CS"], ["Oo", "OOP", "Core CS"], ["Db", "DBMS", "Core CS"],
    ["Os", "Operating Systems", "Core CS"], ["Cn", "Computer Networks", "Core CS"]
  ],

  /* Projects. Add, remove or reorder freely.
     repo / demo: paste your https:// links ("" hides the button).
     image: optional screenshot path like "assets/airportops.webp" (lazy-loaded). "" = no image. */
  projects: [
    {
      type: "Research · In progress",
      title: "WheatRust Detection",
      description: "Deep-learning detection of wheat rust disease from satellite imagery, built toward a research paper. Uses archived Sentinel-1 SAR and Sentinel-2 optical data, retrospective and software-only.",
      highlights: ["Retrospective validation against historical rust outbreak records is planned", "Aims to improve accuracy over the closest existing literature"],
      tags: ["Python", "Deep Learning", "Sentinel-1", "Sentinel-2", "Remote Sensing"],
      demo: "",
      image: ""
    },
    {
      type: "LLM evaluation",
      title: "EvalGate",
      description: "A quality and safety evaluation harness for a RAG assistant, built to measure whether an LLM-backed system is good enough to ship.",
      highlights: ["Quality and safety checks for a retrieval-augmented assistant"], // >>> EDIT: add real details (metrics, test sets, results)
      tags: ["Python", "LLM", "RAG", "Evaluation"], // >>> EDIT: tags to match your stack
      repo: "https://github.com/ArtNayak/EvalGate",
      demo: "",
      image: ""
    },
    {
      type: "Desktop app · In progress",
      title: "Conductor",
      description: "A local-first AI model orchestration desktop app for Mac, Linux and Windows. It scores each downloaded model on a CPU, then routes every prompt to the best one.",
      highlights: ["Local-only and privacy-focused, built at zero cost", "C++/Qt 6 shell supervising a Python FastAPI backend"],
      tags: ["C++", "Qt 6", "Python", "FastAPI", "Local LLMs"],
      repo: "https://github.com/ArtNayak/conductor",
      demo: "",
      image: ""
    },
    {
      type: "Reinforcement learning · Hackathon",
      title: "AirportOps",
      description: "An OpenEnv-compliant RL environment where an agent dispatches runways, gates and emergency units across progressively harder tasks. Built for the Meta × PyTorch × Hugging Face Hackathon.",
      highlights: ["Graders and scenario files for tasks of rising difficulty", "Containerised with Docker, served through FastAPI"],
      tags: ["Python", "FastAPI", "Docker", "OpenAI API"],
      repo: "https://github.com/ArtNayak/Airport_Ops",
      demo: "",
      image: ""
    },
    {
      type: "Team project · Full-stack",
      title: "Brightloop",
      description: "A subscription management web app built by a team of four. I own the billing side: turning due subscriptions into invoices, and the invoice workflow end to end.",
      highlights: ["Discounts, tax and gapless INV-0001 numbering; each period billed at most once", "Confirm, cancel, send and print flows plus 7 check scripts"],
      tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Docker"],
      repo: "https://github.com/ArtNayak/Brightloop",
      demo: "",
      image: ""
    },
    {
      type: "Data & ML platform",
      title: "GeoVision AI",
      description: "A global environmental intelligence platform that fuses satellite, climate, precipitation and air-quality data into a single Environmental Health Index.",
      highlights: ["8-stage pipeline from ingestion to alerting, 13-region registry", "Random Forest / XGBoost plus CNN, LSTM and Transformer forecasting"],
      tags: ["Python", "FastAPI", "PyTorch", "Sentinel-2", "JavaScript"],
      repo: "https://github.com/ArtNayak/GeoVision-AI",
      demo: "",
      image: ""
    },
    {
      type: "Agentic AI · Full-stack",
      title: "FinWise AI",
      description: "A conversational retirement planning assistant that gathers a user's financial details and generates a personalised plan and investment suggestions.",
      highlights: ["Dialogue flow designed in BotPress", "MongoDB-backed data layer, OpenAI API for plan generation"],
      tags: ["React", "Node.js", "MongoDB", "OpenAI API"],
      repo: "https://github.com/ArtNayak/FinWise-AI",
      demo: "",
      image: ""
    },
    {
      type: "Remote sensing · ML",
      title: "Satellite Crop Yield Prediction",
      description: "A precision-agriculture system that extracts vegetation indices from multispectral imagery and estimates yield variability across fields.",
      highlights: ["NDVI, EVI and NDWI features from Google Earth Engine", "Random Forest regression with productivity maps"],
      tags: ["Python", "Scikit-learn", "Earth Engine"],
      repo: "https://github.com/ArtNayak/Satellite-Crop-Yield-Prediction",
      demo: "",
      image: ""
    },
    {
      type: "Full-stack · Spring Boot",
      title: "RouteX",
      description: "An online bus booking system with search by route and date, an interactive seat map and an admin dashboard. Designed from my own IEEE-format SRS.",
      highlights: ["Double-booking prevention with transactional bookings", "Role-based access (USER / ADMIN) with BCrypt"],
      tags: ["Java", "Spring Boot", "JPA", "MySQL", "JavaScript"],
      repo: "https://github.com/ArtNayak/RouteX",
      demo: "",
      image: ""
    },
    {
      type: "Data structures · REST API",
      title: "NexBank",
      description: "A bank account management system that applies OOP and data structures: inheritance for account types, a stack for undo, a queue for service requests, merge sort for rankings.",
      highlights: ["Dark-themed vanilla JS frontend", "Node + Express API with JWT, helmet and rate limiting"],
      tags: ["JavaScript", "Node.js", "Express"],
      repo: "https://github.com/ArtNayak/NexBank",
      demo: "",
      image: ""
    },
    {
      type: "NLP · Web app",
      title: "Sentiment Analysis System",
      description: "An NLP app that combines a RoBERTa classifier with VADER lexicon scoring and shows confidence scores in an interactive interface.",
      highlights: ["Hybrid model + lexicon scoring", "Deployed as a Streamlit app"],
      tags: ["Python", "PyTorch", "RoBERTa", "Streamlit"],
      repo: "https://github.com/ArtNayak/Sentiment-Analysis-System",
      demo: "",
      image: ""
    },
    {
      type: "IoT · Hardware",
      title: "Smart Soil Monitoring & Recommendation System",
      description: "An IoT system that monitors soil conditions and gives agricultural recommendations from sensor readings.",
      highlights: ["Monitors soil nutrients, temperature and humidity", "Hardware: Arduino Uno, DHT11, NPK sensor, nRF24L01, MAX485"],
      tags: ["Arduino", "IoT", "NPK Sensor", "nRF24L01"],
      repo: "https://github.com/ArtNayak/Smart-Soil-Monitoring-Recommendation-System",
      demo: "",
      image: ""
    },
    {
      type: "Computer vision",
      title: "Plant Disease Classification",
      description: "A deep-learning project that classifies plant leaves as Healthy, Powdery or Rust, using the Kaggle Plant Disease Recognition dataset.",
      highlights: ["Custom CNN built in TensorFlow/Keras", "Comparison of EfficientNet-B6 and MobileNetV2 was planned"],
      tags: ["Python", "TensorFlow", "Keras", "CNN"],
      repo: "https://github.com/ArtNayak/Plant-Disease-Classification",
      demo: "",
      image: ""
    },
    {
      type: "Deep learning",
      title: "ECG Classification System",
      description: "A deep-learning project classifying ECG signals, trained on a Kaggle dataset.",
      highlights: ["Focus on ECG signal classification", "Developed on Google Colab"],
      tags: ["Python", "Deep Learning", "Google Colab"],
      repo: "https://github.com/ArtNayak/ECG-Classification-System",
      demo: "",
      image: ""
    },
    {
      type: "Backend",
      title: "Newsletter Management System",
      description: "A backend application for managing newsletter subscriptions and sending newsletters.",
      highlights: [], // >>> EDIT: add 1-2 highlights
      tags: ["Backend"], // >>> EDIT: add your stack
      repo: "https://github.com/ArtNayak/NewlettersProject",
      demo: "",
      image: ""
    },
    {
      type: "Web app",
      title: "Pizza Delivery Application",
      description: "A web application for managing pizza orders and delivery workflows.",
      highlights: [], // >>> EDIT: add 1-2 highlights
      tags: ["Web app"], // >>> EDIT: add your stack
      repo: "https://github.com/ArtNayak/Pizza-Delivery-Application",
      demo: "",
      image: ""
    },
    {
      type: "Java · Desktop",
      title: "Hospital Management System",
      description: "A Java desktop application for managing hospital information and operations: patient registration, appointments and billing.",
      highlights: ["OOP design with a normalised MySQL schema via JDBC"],
      tags: ["Java", "MySQL", "JDBC", "NetBeans"],
      repo: "https://github.com/ArtNayak/Hospital-Management-System",
      demo: "",
      image: ""
    },
    {
      type: "C · Console",
      title: "Cricket Score Management System",
      description: "A C-based application for recording and managing cricket match scores.",
      highlights: [], // >>> EDIT
      tags: ["C"],
      repo: "", // >>> PASTE
      demo: "",
      image: ""
    },
    {
      type: "Web app · React",
      title: "Quiz App",
      description: "A quiz application built with React Hooks.",
      highlights: [], // >>> EDIT
      tags: ["React", "JavaScript", "Vite"],
      repo: "https://github.com/ArtNayak/Quiz-App-IP",
      demo: "",
      image: ""
    }
  ],

  /* >>> PASTE: credential URLs (Credly, Cisco, Kaggle...) into "url". "" hides the link. */
  certifications: [
    { title: "Python Essentials 1", issuer: "Cisco Networking Academy", date: "Sep 2026", url: "" },
    { title: "Python Essentials 2", issuer: "Cisco Networking Academy", date: "Sep 2026", url: "" },
    { title: "Intro to Deep Learning", issuer: "Kaggle Learn", date: "", url: "" },
    { title: "Introduction to Python", issuer: "Data Flair", date: "", url: "" }
  ],

  timeline: [
    { when: "2023 — now", title: "B.E., Electronics & Computer Science", where: "Thakur College of Engineering and Technology, Mumbai", note: "CGPA 9.14 / 10. Graduating 2027." },
    { when: "May — Jun 2024", title: "In-house Python internship", where: "Mumbai", note: "OOP, file handling, GUI development and SQLite. Built small management apps and a file-encryption utility." },
    { when: "Jun 2024 — Jun 2025", title: "Board of Director, Entrepreneurship Development", where: "Rotaract Club of TCET", note: "Organised entrepreneurship and innovation activities, with recognition at district and college level." },
    { when: "2025", title: "Mumbai Hacks — final round", where: "Hackathon", note: "Reached the final round." },
    { when: "Dec 2025 — Jan 2026", title: "Web Developer Intern", where: "Oasis Infobyte, Mumbai", note: "Delivered 3 frontend projects in React and Tailwind CSS; optimised assets and added lazy loading." },
    { when: "Mar 2026", title: "Meta × PyTorch × Hugging Face Hackathon", where: "AirportOps", note: "Built an OpenEnv-compliant RL environment end to end." },
    { when: "Next", title: "Software engineering role", where: "Open to opportunities", note: "Graduating 2027." }
  ],

  // Count-up numbers. value is a number; decimals/prefix/suffix are optional.
  stats: [
    { value: 9.14, decimals: 2, label: "CGPA (out of 10)" },
    { value: 19, label: "Projects built" },
    { value: 4, label: "Certifications" },
    { value: 2, label: "Internships" },
    { value: 1, label: "Hackathon final round" }
  ]
});
