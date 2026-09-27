/* =====================================================================
   EDIT YOUR CONTENT HERE  (تعديل المحتوى من هنا)
   =====================================================================
   Everything below is plain data. Change it, save the file, refresh.

   HOW TO ADD A NEW PROJECT
   1. Copy one whole { ... }, block inside PROJECTS.
   2. Paste it where you want it to appear and edit the text.

   RULES
   - Text fields look like { en: "English", ar: "عربي" }.
     "ar" is optional: if you leave it out, the English shows in Arabic mode.
   - icon:   eye, cpu, server, code, layers, wifi, tool
   - cats:   one or more ids from CATEGORIES below ("ai", "embedded", "backend")
   - status: "done" or "wip"  (wip = in progress)
   - tags:   a name starting with * is highlighted, e.g. "*TensorFlow"
   - featured: true makes the card full-width
   - link:   optional { url: "https://...", label: { en: "...", ar: "..." } }
   - Keep the commas between blocks, and keep the quotes "" around text.
   ===================================================================== */

var SITE = {
  email: "muhammadbekheit@gmail.com",
  // Contact tiles. Remove a line to hide it. "url" is optional (no url = plain text).
  links: [
    { icon: "github",   label: "GitHub",   text: "bekheitmuhammad",  url: "https://github.com/bekheitmuhammad", ltr: true },
    { icon: "linkedin", label: "LinkedIn", text: "Muhammad Bekheit", url: "https://www.linkedin.com/in/muhammad-bekheit-" },
    { icon: "phone",    label: { en: "Phone", ar: "الهاتف" }, text: "+20 155 925 8222", url: "tel:+201559258222", ltr: true },
    { icon: "pin",      label: { en: "Location", ar: "الموقع" }, text: { en: "Alexandria, Egypt", ar: "الإسكندرية، مصر" } }
  ]
};

var CATEGORIES = [
  { id: "ai",       label: { en: "AI & vision",       ar: "ذكاء اصطناعي ورؤية" } },
  { id: "embedded", label: { en: "Embedded & IoT",    ar: "مدمجة وإنترنت أشياء" } },
  { id: "backend",  label: { en: "Backend",           ar: "تطوير خلفي" } }
];

var PROJECTS = [
  {
    featured: true,
    icon: "layers",
    cats: ["ai", "embedded", "backend"],
    status: "done",
    statusText: { en: "Completed, June 2025", ar: "مكتمل، يونيو 2025" },
    title: { en: "AgroVision", ar: "AgroVision" },
    kind: {
      en: "Flagship · AI-powered smart agriculture platform · graduation project",
      ar: "المشروع الرئيسي · منصة زراعة ذكية بالذكاء الاصطناعي · مشروع التخرج"
    },
    short: { en: "AI + IoT platform for precision agriculture", ar: "منصة ذكاء اصطناعي وإنترنت أشياء للزراعة الدقيقة" },
    desc: {
      en: "Computer vision, IoT sensing, and cloud infrastructure working together to give farmers real-time crop-health visibility and disease detection. Three classification models shipped at 95–99% validation accuracy.",
      ar: "رؤية حاسوبية واستشعار إنترنت أشياء وبنية سحابية تعمل معًا لتمنح المزارعين رؤية فورية لصحة المحاصيل وكشفًا للأمراض. تم تسليم ثلاثة نماذج تصنيف بدقة تحقق 95–99%."
    },
    tags: ["*TensorFlow", "*OpenCV", "*FastAPI", "Raspberry Pi", "ESP32", "Firebase", "React.js", "Flutter", "Docker"],
    link: { url: "#agrovision", label: { en: "Read the case study", ar: "اقرأ دراسة الحالة" } }
  },
  {
    icon: "eye",
    cats: ["ai"],
    status: "done",
    title: { en: "Potato Disease Classification", ar: "تصنيف أمراض البطاطس" },
    kind: { en: "Computer vision", ar: "رؤية حاسوبية" },
    short: { en: "CNN, 99% validation accuracy", ar: "CNN بدقة تحقق 99%" },
    desc: {
      en: "A CNN classifier that identifies potato leaf disease from images with 99% validation accuracy. It became the reference architecture for the tomato and plant-ID models.",
      ar: "مصنّف CNN يحدد أمراض أوراق البطاطس من الصور بدقة تحقق 99%، وأصبح المعمارية المرجعية لنموذجي الطماطم وتعريف النبات."
    },
    role: {
      en: "model design, training, and evaluation. Result: 99% accuracy, 0.01 loss.",
      ar: "تصميم النموذج وتدريبه وتقييمه. النتيجة: دقة 99% وخسارة 0.01."
    },
    tags: ["*CNN", "TensorFlow", "Python", "OpenCV"]
  },
  {
    icon: "code",
    cats: ["ai", "backend"],
    status: "done",
    title: { en: "AI Image Classification Web App", ar: "تطبيق ويب لتصنيف الصور" },
    kind: { en: "Flask + TensorFlow", ar: "Flask + TensorFlow" },
    short: { en: "Flask + TensorFlow model serving", ar: "تقديم نموذج بـ Flask وTensorFlow" },
    desc: {
      en: "A web app that serves a trained image-classification model through a Flask API and a simple upload page, so non-technical users can use a model that would otherwise stay in a notebook.",
      ar: "تطبيق ويب يقدّم نموذج تصنيف صور مدرَّبًا عبر Flask API وصفحة رفع بسيطة، ليتمكن غير المتخصصين من استخدام نموذج كان سيبقى حبيس دفتر التجارب."
    },
    role: { en: "full build, model serving and web UI.", ar: "بناء كامل: تقديم النموذج وواجهة الويب." },
    tags: ["*Flask", "TensorFlow", "Python", "HTML / CSS"]
  },
  {
    icon: "cpu",
    cats: ["embedded"],
    status: "done",
    title: { en: "Smart Garage", ar: "المرآب الذكي" },
    kind: { en: "IoT", ar: "إنترنت الأشياء" },
    short: { en: "microcontroller-based access system", ar: "نظام دخول للمرآب بالمتحكمات الدقيقة" },
    desc: {
      en: "An automated garage-access system built on microcontrollers and sensors, handling entry, exit, and monitoring without manual intervention.",
      ar: "نظام آلي للتحكم في دخول المرآب وخروجه مبني على متحكمات وحساسات، يتولى الدخول والخروج والمراقبة دون تدخل يدوي."
    },
    role: { en: "hardware design and firmware.", ar: "تصميم العتاد والبرمجيات المدمجة." },
    tags: ["*Arduino / ESP32", "Sensors", "Relay control", "IoT"]
  },
  {
    icon: "server",
    cats: ["backend"],
    status: "wip",
    title: { en: "Life OS", ar: "Life OS" },
    kind: { en: "Enterprise productivity platform · .NET", ar: "منصة إنتاجية بمستوى المؤسسات · .NET" },
    short: { en: ".NET productivity platform", ar: "منصة إنتاجية بـ .NET" },
    desc: {
      en: "A personal platform for productivity, habits, and goals, built as a proving ground for production .NET patterns: clean architecture, security, and scalability from day one.",
      ar: "منصة شخصية لإدارة الإنتاجية والعادات والأهداف، أبنيها كساحة اختبار لممارسات .NET الاحترافية: معمارية نظيفة وأمان وقابلية توسع منذ اليوم الأول."
    },
    roadmap: [
      { en: "Core architecture and data model", ar: "المعمارية الأساسية ونموذج البيانات" },
      { en: "Habit and goal tracking", ar: "تتبع العادات والأهداف" },
      { en: "Security hardening and auth", ar: "تعزيز الأمان والمصادقة" },
      { en: "Analytics dashboard, then public release", ar: "لوحة التحليلات ثم الإطلاق العام" }
    ],
    tags: ["*C#", ".NET", "ASP.NET Core", "Entity Framework", "SQL Server"]
  }
  /* ,{ paste a new project block here (put a comma before it) } */
];

var SKILLS = [
  {
    id: "ai", icon: "eye", label: { en: "AI & ML", ar: "الذكاء الاصطناعي" },
    groups: [
      { title: { en: "Machine learning", ar: "تعلّم الآلة" }, tags: ["*Machine Learning", "*Deep Learning", "*Computer Vision", "CNNs", "Model evaluation"] },
      { title: { en: "Frameworks", ar: "الأطر والمكتبات" }, tags: ["*TensorFlow", "*PyTorch", "*OpenCV", "NumPy", "Scikit-learn"] },
      { title: { en: "Serving and GenAI", ar: "النشر والذكاء التوليدي" }, tags: ["*FastAPI", "Flask", "Docker", "REST APIs", "Gemini API"] }
    ]
  },
  {
    id: "emb", icon: "cpu", label: { en: "Embedded & IoT", ar: "المدمجة وإنترنت الأشياء" },
    groups: [
      { title: { en: "Boards and controllers", ar: "اللوحات والمتحكمات" }, tags: ["*ESP32", "*Arduino", "*Raspberry Pi", "ATmega328P", "GPIO"] },
      { title: { en: "Protocols", ar: "بروتوكولات الاتصال" }, tags: ["*UART", "*SPI", "*I²C", "*MQTT", "RS-485", "Modbus RTU"] },
      { title: { en: "In practice", ar: "في التطبيق" }, tags: ["Sensor integration", "Edge preprocessing", "Cloud connectivity", "Remote monitoring", "Real-time systems", "Proteus"] }
    ]
  },
  {
    id: "ind", icon: "tool", label: { en: "Industrial automation", ar: "الأتمتة الصناعية" },
    groups: [
      { title: { en: "Control systems", ar: "أنظمة التحكم" }, tags: ["*PLC", "*SCADA", "Instrumentation", "Signal conditioning"] },
      { title: { en: "Security and safety", ar: "الأمن والسلامة" }, tags: ["*ICS / OT cybersecurity", "HSE fundamentals"] },
      { title: { en: "Field readiness", ar: "الجاهزية الميدانية" }, tags: ["Electrical schematics", "Bench testing", "On-site deployment"] }
    ]
  },
  {
    id: "be", icon: "code", label: { en: "Backend & tools", ar: "التطوير الخلفي والأدوات" },
    groups: [
      { title: { en: "Backend", ar: "الخلفية" }, tags: ["*C#", "*.NET", "ASP.NET Core", "Entity Framework", "REST APIs", "SQL Server"] },
      { title: { en: "Languages", ar: "لغات البرمجة" }, tags: ["*Python", "*C", "*C++", "SQL"] },
      { title: { en: "Tools", ar: "الأدوات" }, tags: ["Git", "GitHub", "Docker", "Linux", "VS Code"] }
    ]
  }
];

var CERTS = [
  { title: { en: "AI & Machine Learning", ar: "الذكاء الاصطناعي وتعلّم الآلة" },
    detail: { en: "Digital Egypt Pioneers Initiative (DEPI), MCIT. Completed the track twice.", ar: "مبادرة رواد مصر الرقمية (DEPI)، وزارة الاتصالات. أنهيت المسار مرتين." } },
  { title: { en: "ICS/OT Cybersecurity", ar: "الأمن السيبراني للأنظمة الصناعية (ICS/OT)" },
    detail: { en: "Engineers Syndicate, Alexandria, 2023", ar: "نقابة المهندسين بالإسكندرية، 2023" } },
  { title: { en: "PLC Programming & SCADA", ar: "برمجة PLC وأنظمة SCADA" },
    detail: { en: "Self-directed industrial control study", ar: "دراسة ذاتية في التحكم الصناعي" } },
  { title: { en: "HSE Fundamentals", ar: "أساسيات الصحة والسلامة والبيئة (HSE)" },
    detail: { en: "Health, safety, and environmental standards for industrial plants", ar: "معايير الصحة والسلامة والبيئة في المنشآت الصناعية" } }
];

var TIMELINE = [
  { when: "2020",
    title: { en: "Started Computer Engineering", ar: "بدأت دراسة هندسة الحاسبات" },
    text: { en: "Programming fundamentals, then embedded systems and Arduino projects.", ar: "أساسيات البرمجة، ثم الأنظمة المدمجة ومشاريع Arduino." } },
  { when: "2023 – 2024",
    title: { en: "AI, computer vision, and IoT", ar: "الذكاء الاصطناعي والرؤية الحاسوبية وإنترنت الأشياء" },
    text: { en: "Finished the DEPI AI track twice, then moved into machine learning, computer vision, and IoT-connected systems.", ar: "أنهيت مسار DEPI للذكاء الاصطناعي مرتين، ثم انتقلت إلى تعلّم الآلة والرؤية الحاسوبية وأنظمة إنترنت الأشياء المتصلة." } },
  { when: "2025",
    title: { en: "Graduated with AgroVision", ar: "تخرجت بمشروع AgroVision" },
    text: { en: "Delivered the graduation project in June, then started building Life OS.", ar: "سلّمت مشروع التخرج في يونيو، ثم بدأت بناء Life OS." } },
  { when: { en: "Now", ar: "الآن" },
    title: { en: "Preparing for the job market", ar: "أستعد لدخول سوق العمل" },
    text: { en: "Looking for roles in AI, embedded systems, and IoT.", ar: "أبحث عن فرص في الذكاء الاصطناعي والأنظمة المدمجة وإنترنت الأشياء." } }
];
