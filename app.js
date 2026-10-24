/* صدقة جارية — أيمن فتحي محمد */

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

const arNum = (value) => Number(value).toLocaleString("ar-EG", { useGrouping: false });
const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const SURAHS = {
  fatiha: {
    id: "fatiha",
    name: "الفاتحة",
    badge: "١",
    meta: "٧ آيات · مكية",
    src: "https://server8.mp3quran.net/afs/001.mp3",
    startAyah: 1,
    ayahs: [
      "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
      "الرَّحْمَٰنِ الرَّحِيمِ",
      "مَالِكِ يَوْمِ الدِّينِ",
      "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
      "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
      "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ"
    ]
  },
  kursi: {
    id: "kursi",
    name: "آية الكرسي",
    badge: "٢٥٥",
    meta: "البقرة · الآية ٢٥٥",
    src: "https://everyayah.com/data/Alafasy_128kbps/002255.mp3",
    startAyah: 255,
    ayahs: [
      "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ"
    ]
  },
  yaseen: {
    id: "yaseen",
    name: "يس",
    badge: "٣٦",
    meta: "٨٣ آية · مكية",
    src: "https://server8.mp3quran.net/afs/036.mp3"
  },
  mulk: {
    id: "mulk",
    name: "الملك",
    badge: "٦٧",
    meta: "٣٠ آية · مكية",
    src: "https://server8.mp3quran.net/afs/067.mp3"
  },
  rahman: {
    id: "rahman",
    name: "الرحمن",
    badge: "٥٥",
    meta: "٧٨ آية · مكية",
    src: "https://server8.mp3quran.net/afs/055.mp3"
  },
  duha: {
    id: "duha",
    name: "الضحى",
    badge: "٩٣",
    meta: "١١ آية · مكية",
    src: "https://server8.mp3quran.net/afs/093.mp3",
    bismillah: true,
    ayahs: [
      "وَالضُّحَىٰ",
      "وَاللَّيْلِ إِذَا سَجَىٰ",
      "مَا وَدَّعَكَ رَبُّكَ وَمَا قَلَىٰ",
      "وَلَلْآخِرَةُ خَيْرٌ لَّكَ مِنَ الْأُولَىٰ",
      "وَلَسَوْفَ يُعْطِيكَ رَبُّكَ فَتَرْضَىٰ",
      "أَلَمْ يَجِدْكَ يَتِيمًا فَآوَىٰ",
      "وَوَجَدَكَ ضَالًّا فَهَدَىٰ",
      "وَوَجَدَكَ عَائِلًا فَأَغْنَىٰ",
      "فَأَمَّا الْيَتِيمَ فَلَا تَقْهَرْ",
      "وَأَمَّا السَّائِلَ فَلَا تَنْهَرْ",
      "وَأَمَّا بِنِعْمَةِ رَبِّكَ فَحَدِّثْ"
    ]
  },
  sharh: {
    id: "sharh",
    name: "الشرح",
    badge: "٩٤",
    meta: "٨ آيات · مكية",
    src: "https://server8.mp3quran.net/afs/094.mp3",
    bismillah: true,
    ayahs: [
      "أَلَمْ نَشْرَحْ لَكَ صَدْرَكَ",
      "وَوَضَعْنَا عَنكَ وِزْرَكَ",
      "الَّذِي أَنقَضَ ظَهْرَكَ",
      "وَرَفَعْنَا لَكَ ذِكْرَكَ",
      "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا",
      "إِنَّ مَعَ الْعُسْرِ يُسْرًا",
      "فَإِذَا فَرَغْتَ فَانصَبْ",
      "وَإِلَىٰ رَبِّكَ فَارْغَبْ"
    ]
  },
  teen: {
    id: "teen",
    name: "التين",
    badge: "٩٥",
    meta: "٨ آيات · مكية",
    src: "https://server8.mp3quran.net/afs/095.mp3",
    bismillah: true,
    ayahs: [
      "وَالتِّينِ وَالزَّيْتُونِ",
      "وَطُورِ سِينِينَ",
      "وَهَٰذَا الْبَلَدِ الْأَمِينِ",
      "لَقَدْ خَلَقْنَا الْإِنسَانَ فِي أَحْسَنِ تَقْوِيمٍ",
      "ثُمَّ رَدَدْنَاهُ أَسْفَلَ سَافِلِينَ",
      "إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ فَلَهُمْ أَجْرٌ غَيْرُ مَمْنُونٍ",
      "فَمَا يُكَذِّبُكَ بَعْدُ بِالدِّينِ",
      "أَلَيْسَ اللَّهُ بِأَحْكَمِ الْحَاكِمِينَ"
    ]
  },
  kawthar: {
    id: "kawthar",
    name: "الكوثر",
    badge: "١٠٨",
    meta: "٣ آيات · مكية",
    src: "https://server8.mp3quran.net/afs/108.mp3",
    bismillah: true,
    ayahs: [
      "إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ",
      "فَصَلِّ لِرَبِّكَ وَانْحَرْ",
      "إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ"
    ]
  },
  ikhlas: {
    id: "ikhlas",
    name: "الإخلاص",
    badge: "١١٢",
    meta: "٤ آيات · مكية",
    src: "https://server8.mp3quran.net/afs/112.mp3",
    bismillah: true,
    ayahs: [
      "قُلْ هُوَ اللَّهُ أَحَدٌ",
      "اللَّهُ الصَّمَدُ",
      "لَمْ يَلِدْ وَلَمْ يُولَدْ",
      "وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ"
    ]
  },
  falaq: {
    id: "falaq",
    name: "الفلق",
    badge: "١١٣",
    meta: "٥ آيات · مكية",
    src: "https://server8.mp3quran.net/afs/113.mp3",
    bismillah: true,
    ayahs: [
      "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ",
      "مِن شَرِّ مَا خَلَقَ",
      "وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ",
      "وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ",
      "وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ"
    ]
  },
  nas: {
    id: "nas",
    name: "الناس",
    badge: "١١٤",
    meta: "٦ آيات · مكية",
    src: "https://server8.mp3quran.net/afs/114.mp3",
    bismillah: true,
    ayahs: [
      "قُلْ أَعُوذُ بِرَبِّ النَّاسِ",
      "مَلِكِ النَّاسِ",
      "إِلَٰهِ النَّاسِ",
      "مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ",
      "الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ",
      "مِنَ الْجِنَّةِ وَالنَّاسِ"
    ]
  }
};

const DHIKRS = [
  { id: "subhan", label: "سبحان الله", full: "سُبْحَانَ اللَّهِ", target: 33 },
  { id: "hamd", label: "الحمد لله", full: "الْحَمْدُ لِلَّهِ", target: 33 },
  { id: "akbar", label: "الله أكبر", full: "اللَّهُ أَكْبَرُ", target: 33 },
  { id: "tahlil", label: "لا إله إلا الله", full: "لَا إِلَهَ إِلَّا اللَّهُ", target: 100 },
  { id: "istighfar", label: "أستغفر الله", full: "أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ", target: 100 },
  { id: "salawat", label: "الصلاة على النبي", full: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِهِ وَصَحْبِهِ وَسَلِّمْ", target: 100 }
];

const DAILY_AYAT = [
  {
    text: "وَإِذَا سَأَلَكَ عِبَادِي عَنِّي فَإِنِّي قَرِيبٌ ۖ أُجِيبُ دَعْوَةَ الدَّاعِ إِذَا دَعَانِ ۖ فَلْيَسْتَجِيبُوا لِي وَلْيُؤْمِنُوا بِي لَعَلَّهُمْ يَرْشُدُونَ",
    ref: "سورة البقرة · الآية ١٨٦"
  },
  {
    text: "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا ۖ وَيَرْزُقْهُ مِنْ حَيْثُ لَا يَحْتَسِبُ",
    ref: "سورة الطلاق · من الآيتين ٢–٣"
  },
  {
    text: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا ۖ إِنَّ مَعَ الْعُسْرِ يُسْرًا",
    ref: "سورة الشرح · الآيتان ٥–٦"
  },
  {
    text: "وَاصْبِرْ فَإِنَّ اللَّهَ لَا يُضِيعُ أَجْرَ الْمُحْسِنِينَ",
    ref: "سورة هود · الآية ١١٥"
  },
  {
    text: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
    ref: "سورة البقرة · من الآية ٢٠١"
  },
  {
    text: "وَاذْكُر رَّبَّكَ إِذَا نَسِيتَ",
    ref: "سورة الكهف · من الآية ٢٤"
  },
  {
    text: "وَتَوَكَّلْ عَلَى اللَّهِ ۚ وَكَفَىٰ بِاللَّهِ وَكِيلًا",
    ref: "سورة الأحزاب · الآية ٣"
  }
];

const JUZ_ORDINALS = [
  "الأول", "الثاني", "الثالث", "الرابع", "الخامس", "السادس", "السابع", "الثامن", "التاسع", "العاشر",
  "الحادي عشر", "الثاني عشر", "الثالث عشر", "الرابع عشر", "الخامس عشر", "السادس عشر", "السابع عشر",
  "الثامن عشر", "التاسع عشر", "العشرون", "الحادي والعشرون", "الثاني والعشرون", "الثالث والعشرون",
  "الرابع والعشرون", "الخامس والعشرون", "السادس والعشرون", "السابع والعشرون", "الثامن والعشرون",
  "التاسع والعشرون", "الثلاثون"
];

const STORAGE_KEY = "ayman-sadaqah-v1";
const TASBEEH_CIRCUMFERENCE = 703.717;
const KHATMA_CIRCUMFERENCE = 339.292;

const defaultState = () => ({
  hadiya: 0,
  juz: [],
  dhikr: { selected: "subhan", counts: {} }
});

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return defaultState();

    const selected = DHIKRS.some((dhikr) => dhikr.id === parsed?.dhikr?.selected)
      ? parsed.dhikr.selected
      : "subhan";

    const counts = {};
    if (parsed?.dhikr?.counts && typeof parsed.dhikr.counts === "object") {
      DHIKRS.forEach((dhikr) => {
        const value = Number(parsed.dhikr.counts[dhikr.id]);
        if (Number.isFinite(value) && value > 0) counts[dhikr.id] = Math.floor(value);
      });
    }

    return {
      hadiya: Number.isFinite(Number(parsed.hadiya)) ? Math.max(0, Math.floor(Number(parsed.hadiya))) : 0,
      juz: Array.isArray(parsed.juz)
        ? [...new Set(parsed.juz.map(Number).filter((n) => Number.isInteger(n) && n >= 1 && n <= 30))].sort((a, b) => a - b)
        : [],
      dhikr: { selected, counts }
    };
  } catch {
    return defaultState();
  }
}

let state = loadState();

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* Storage may be unavailable in private mode. */
  }
}

/* ---------- shared UI ---------- */

const toastEl = $("#toast");
let toastTimer = null;

function showToast(message) {
  if (!toastEl) return;
  toastEl.textContent = message;
  toastEl.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove("show"), 4000);
}

function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text).then(() => true).catch(() => fallbackCopy(text));
  }
  return Promise.resolve(fallbackCopy(text));
}

function fallbackCopy(text) {
  const area = document.createElement("textarea");
  area.value = text;
  area.setAttribute("readonly", "");
  area.style.position = "fixed";
  area.style.opacity = "0";
  area.style.pointerEvents = "none";
  document.body.appendChild(area);
  area.select();
  let copied = false;
  try {
    copied = document.execCommand("copy");
  } catch {
    copied = false;
  }
  area.remove();
  return copied;
}

/* ---------- header & navigation ---------- */

const header = $("#siteHeader");
const nav = $("#siteNav");
const navToggle = $("#navToggle");

function updateHeader() {
  if (header) header.classList.toggle("is-scrolled", window.scrollY > 16);
}
window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

function setNav(open) {
  if (!nav || !navToggle) return;
  nav.classList.toggle("open", open);
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute("aria-label", open ? "إغلاق القائمة" : "فتح القائمة");
}

navToggle?.addEventListener("click", () => {
  setNav(!nav.classList.contains("open"));
});

nav?.addEventListener("click", (event) => {
  if (event.target.closest("a")) setNav(false);
});

document.addEventListener("click", (event) => {
  if (!nav?.classList.contains("open")) return;
  if (nav.contains(event.target) || navToggle?.contains(event.target)) return;
  setNav(false);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setNav(false);
});

const navLinks = $$(".site-nav a");
if ("IntersectionObserver" in window) {
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    },
    { rootMargin: "-42% 0px -52% 0px", threshold: 0 }
  );
  navLinks.forEach((link) => {
    const section = document.getElementById(link.getAttribute("href").slice(1));
    if (section) spy.observe(section);
  });
}

/* ---------- reveal animations ---------- */

const revealItems = $$(".reveal");
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
  );
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("in"));
}

/* ---------- hadiya (gifted reward) counters ---------- */

function renderHadiya() {
  $$("[data-hadiya-count]").forEach((el) => {
    el.textContent = arNum(state.hadiya);
  });
}

function recordHadiya(message) {
  state.hadiya += 1;
  saveState();
  renderHadiya();
  showToast(message);
}

/* ---------- daily ayah ---------- */

const ayahTextEl = $("#ayahText");
const ayahRefEl = $("#ayahRef");
const ayahDateEl = $("#ayahDate");
const copyAyahBtn = $("#copyAyah");
const giftAyahBtn = $("#giftAyah");

let currentAyah = DAILY_AYAT[0];

function dailyAyahIndex(date) {
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const dayOfYear = Math.floor((date - startOfYear) / 86400000);
  return dayOfYear % DAILY_AYAT.length;
}

function renderDailyAyah() {
  const now = new Date();
  currentAyah = DAILY_AYAT[dailyAyahIndex(now)] || DAILY_AYAT[0];

  if (ayahTextEl) ayahTextEl.textContent = currentAyah.text;
  if (ayahRefEl) ayahRefEl.textContent = currentAyah.ref;

  if (ayahDateEl) {
    let weekday = "";
    let hijri = "";
    try {
      weekday = new Intl.DateTimeFormat("ar-EG", { weekday: "long" }).format(now);
    } catch {
      /* Locale support is optional. */
    }
    try {
      hijri = new Intl.DateTimeFormat("ar-EG-u-ca-islamic-umalqura", {
        day: "numeric",
        month: "long",
        year: "numeric"
      }).format(now);
    } catch {
      /* Hijri calendar support is optional. */
    }
    ayahDateEl.textContent = [weekday, hijri].filter(Boolean).join(" · ") || "وِردٌ يتجدّد كل يوم";
  }
}

copyAyahBtn?.addEventListener("click", async () => {
  if (!currentAyah) return;
  const original = copyAyahBtn.innerHTML;
  const copied = await copyText(`«${currentAyah.text}»\n${currentAyah.ref}`);
  if (!copied) {
    showToast("تعذّر النسخ تلقائيًا. يمكنك تحديد الآية ونسخها يدويًا.");
    return;
  }
  copyAyahBtn.innerHTML = '<svg class="icon" aria-hidden="true"><use href="#i-check"></use></svg> تم النسخ';
  showToast("تم نسخ الآية. اقرأها وتأمّلها.");
  setTimeout(() => {
    copyAyahBtn.innerHTML = original;
  }, 2200);
});

giftAyahBtn?.addEventListener("click", () => {
  if (!currentAyah) return;
  recordHadiya("تقبّل الله منك… أُهدي ثواب تلاوة آية اليوم لروح المرحوم أيمن فتحي محمد.");
});

/* ---------- audio player ---------- */

const audio = $("#audio");
const player = $("#player");
const playerTitle = $("#playerTitle");
const playerToggle = $("#playerToggle");
const playerClose = $("#playerClose");
const seek = $("#seek");
const playerCurrent = $("#playerCurrent");
const playerDuration = $("#playerDuration");

let currentTrackId = null;

function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const total = Math.floor(seconds);
  const minutes = Math.floor(total / 60);
  const rest = total % 60;
  return `${minutes}:${String(rest).padStart(2, "0")}`;
}

function setPlayingIcon(isPlaying) {
  if (!playerToggle) return;
  playerToggle.innerHTML = `<svg class="icon" aria-hidden="true"><use href="#i-${isPlaying ? "pause" : "play"}"></use></svg>`;
  playerToggle.setAttribute("aria-label", isPlaying ? "إيقاف مؤقت" : "تشغيل");
}

function setSeekUI(progress) {
  if (!seek) return;
  const percent = clamp(progress, 0, 1) * 100;
  seek.value = String(Math.round(percent * 10));
  seek.style.setProperty("--seek", `${percent.toFixed(2)}%`);
}

function updatePlayerTime() {
  if (!audio) return;
  const duration = audio.duration;
  const current = audio.currentTime;
  if (playerCurrent) playerCurrent.textContent = formatTime(current);
  if (playerDuration) playerDuration.textContent = formatTime(duration);
  if (Number.isFinite(duration) && duration > 0) {
    setSeekUI(current / duration);
  }
}

function startTrack(surah) {
  if (!surah?.src || !audio || !player) return;
  const isSame = currentTrackId === surah.id;
  player.hidden = false;
  document.body.classList.add("player-open");
  playerTitle.textContent = surah.name;

  if (!isSame) {
    currentTrackId = surah.id;
    audio.src = surah.src;
    if (playerCurrent) playerCurrent.textContent = "0:00";
    if (playerDuration) playerDuration.textContent = "0:00";
    setSeekUI(0);
    if ("mediaSession" in navigator) {
      try {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: `سورة ${surah.name}`,
          artist: "الشيخ مشاري العفاسي",
          album: "صدقة جارية — أيمن فتحي محمد"
        });
      } catch {
        /* Media Session is optional. */
      }
    }
  }

  if (audio.paused) {
    audio.play().catch((error) => {
      if (error?.name === "AbortError") return;
      showToast("تعذّر تشغيل التلاوة الآن. تأكد من اتصال الإنترنت ثم حاول مرة أخرى.");
      setPlayingIcon(false);
    });
  }
}

audio?.addEventListener("play", () => setPlayingIcon(true));
audio?.addEventListener("pause", () => setPlayingIcon(false));
audio?.addEventListener("ended", () => {
  setPlayingIcon(false);
  setSeekUI(0);
  if (playerCurrent) playerCurrent.textContent = "0:00";
});
audio?.addEventListener("timeupdate", updatePlayerTime);
audio?.addEventListener("loadedmetadata", updatePlayerTime);
audio?.addEventListener("error", () => {
  if (!audio.getAttribute("src")) return;
  setPlayingIcon(false);
  showToast("تعذّر تحميل التلاوة. تأكد من اتصال الإنترنت ثم حاول مرة أخرى.");
});

playerToggle?.addEventListener("click", () => {
  if (!audio?.getAttribute("src")) return;
  if (audio.paused) {
    audio.play().catch(() => showToast("تعذّر تشغيل التلاوة الآن. حاول مرة أخرى."));
  } else {
    audio.pause();
  }
});

playerClose?.addEventListener("click", () => {
  if (!audio || !player) return;
  audio.pause();
  audio.removeAttribute("src");
  audio.load();
  player.hidden = true;
  document.body.classList.remove("player-open");
  currentTrackId = null;
});

seek?.addEventListener("input", () => {
  if (!audio || !Number.isFinite(audio.duration) || audio.duration <= 0) return;
  const progress = Number(seek.value) / 1000;
  audio.currentTime = progress * audio.duration;
  setSeekUI(progress);
});

/* ---------- surah dialog ---------- */

const modal = $("#surahDialog");
const modalBadge = $("#modalBadge");
const modalMeta = $("#modalMeta");
const modalTitle = $("#modalTitle");
const modalBody = $("#modalBody");
const modalClose = $("#modalClose");
const modalPlay = $("#modalPlay");
const modalGift = $("#modalGift");

let currentSurahId = null;

function openSurahDialog(surahId) {
  const surah = SURAHS[surahId];
  if (!surah || !modal) return;
  currentSurahId = surahId;

  modalBadge.textContent = surah.badge;
  modalMeta.textContent = surah.meta;
  modalTitle.textContent = surah.name;

  let content = "";
  if (surah.bismillah) {
    content += '<p class="modal-bismillah">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>';
  }

  if (surah.ayahs) {
    content += surah.ayahs
      .map((ayah, index) => `<p class="modal-ayah">${ayah} <span class="ayah-num">${arNum(index + (surah.startAyah || 1))}</span></p>`)
      .join("");
  } else {
    content += `<div class="modal-note-text"><strong>${surah.name}</strong> كاملة بصوت الشيخ مشاري العفاسي.<br>يمكنك الاستماع للتلاوة، أو القراءة من مصحفك ثم إهداء الثواب لروح المرحوم أيمن فتحي محمد.</div>`;
  }

  modalBody.innerHTML = content;
  modalBody.scrollTop = 0;
  modalGift.disabled = false;
  modalGift.innerHTML = '<svg class="icon" aria-hidden="true"><use href="#i-gift"></use></svg> أهدِ ثواب القراءة';

  modal.showModal();
  document.body.classList.add("modal-open");
}

function closeSurahDialog() {
  modal?.close();
}

$$("[data-open-surah]").forEach((button) => {
  button.addEventListener("click", () => openSurahDialog(button.dataset.openSurah));
});

$$("[data-gift-surah]").forEach((button) => {
  button.addEventListener("click", () => {
    recordHadiya(`تقبّل الله منك… أُهدي ثواب ${button.dataset.giftSurah} لروح المرحوم أيمن فتحي محمد.`);
  });
});

modalClose?.addEventListener("click", closeSurahDialog);

modal?.addEventListener("click", (event) => {
  if (event.target === modal) closeSurahDialog();
});

modal?.addEventListener("close", () => {
  document.body.classList.remove("modal-open");
  currentSurahId = null;
});

modalPlay?.addEventListener("click", () => {
  const surah = currentSurahId ? SURAHS[currentSurahId] : null;
  closeSurahDialog();
  if (surah) startTrack(surah);
});

modalGift?.addEventListener("click", () => {
  if (modalGift.disabled) return;
  const surah = currentSurahId ? SURAHS[currentSurahId] : null;
  if (!surah) return;
  recordHadiya(`تقبّل الله منك… أُهدي ثواب سورة ${surah.name} لروح المرحوم أيمن فتحي محمد.`);
  modalGift.disabled = true;
  modalGift.innerHTML = '<svg class="icon" aria-hidden="true"><use href="#i-check"></use></svg> تم إهداء الثواب';
});

/* ---------- khatma ---------- */

const juzGrid = $("#juzGrid");
const khatmaReset = $("#khatmaReset");
const khatmaRing = $("#khatmaRing");
const khatmaRingFill = $("#khatmaRingFill");
const khatmaBarFill = $("#khatmaBarFill");
const khatmaDone = $("#khatmaDone");
const khatmaPercent = $("#khatmaPercent");
const khatmaComplete = $("#khatmaComplete");

function buildJuzGrid() {
  if (!juzGrid) return;
  juzGrid.innerHTML = JUZ_ORDINALS.map((ordinal, index) => {
    const number = index + 1;
    return `<button class="juz" type="button" data-juz="${number}" aria-pressed="false" aria-label="الجزء ${ordinal}">
      <svg class="check" aria-hidden="true"><use href="#i-check"></use></svg>
      <span class="num">${arNum(number)}</span>
      <span class="lbl">جزء</span>
    </button>`;
  }).join("");
}

function renderKhatma() {
  const done = state.juz.length;
  const progress = done / 30;
  const percent = Math.round(progress * 100);

  if (khatmaDone) khatmaDone.textContent = arNum(done);
  if (khatmaPercent) khatmaPercent.textContent = `${arNum(percent)}٪`;
  if (khatmaBarFill) khatmaBarFill.style.width = `${progress * 100}%`;
  if (khatmaRingFill) khatmaRingFill.style.strokeDashoffset = String(KHATMA_CIRCUMFERENCE * (1 - progress));
  if (khatmaRing) khatmaRing.setAttribute("aria-valuenow", String(done));
  if (khatmaReset) khatmaReset.hidden = done === 0;
  if (khatmaComplete) khatmaComplete.hidden = done < 30;

  $$(".juz", juzGrid || document).forEach((button) => {
    const number = Number(button.dataset.juz);
    const isDone = state.juz.includes(number);
    button.classList.toggle("is-done", isDone);
    button.setAttribute("aria-pressed", String(isDone));
  });
}

let resetArmed = false;
let resetTimer = null;

function resetKhatma() {
  state.juz = [];
  saveState();
  renderKhatma();
  if (khatmaReset) {
    resetArmed = false;
    clearTimeout(resetTimer);
    khatmaReset.textContent = "إعادة تعيين الختمة";
  }
  showToast("تمت إعادة تعيين الختمة.");
}

buildJuzGrid();

juzGrid?.addEventListener("click", (event) => {
  const button = event.target.closest(".juz");
  if (!button) return;
  const number = Number(button.dataset.juz);
  const wasDone = state.juz.includes(number);
  const set = new Set(state.juz);

  if (wasDone) set.delete(number);
  else set.add(number);

  state.juz = [...set].sort((a, b) => a - b);
  saveState();
  renderKhatma();

  if (!wasDone && state.juz.length === 30) {
    showToast("تمت الختمة بحمد الله، تقبّل الله منكم وأوصل ثوابها إلى روحه.");
  }
});

khatmaReset?.addEventListener("click", () => {
  if (!resetArmed) {
    resetArmed = true;
    khatmaReset.textContent = "اضغط مرة أخرى للتأكيد";
    clearTimeout(resetTimer);
    resetTimer = setTimeout(() => {
      resetArmed = false;
      khatmaReset.textContent = "إعادة تعيين الختمة";
    }, 3500);
    return;
  }
  resetKhatma();
});

/* ---------- dhikr counter ---------- */

const dhikrChips = $$(".chip[data-dhikr]");
const dhikrFull = $("#dhikrFull");
const tasbeehBtn = $("#tasbeehBtn");
const tasbeehCount = $("#tasbeehCount");
const tasbeehTarget = $("#tasbeehTarget");
const tasbeehRing = $("#tasbeehRing");
const resetDhikrBtn = $("#resetDhikr");
const giftDhikrBtn = $("#giftDhikr");

function currentDhikr() {
  return DHIKRS.find((dhikr) => dhikr.id === state.dhikr.selected) || DHIKRS[0];
}

function dhikrCount(id) {
  const value = Number(state.dhikr.counts[id]);
  return Number.isFinite(value) && value > 0 ? Math.floor(value) : 0;
}

function setDhikrCount(id, value) {
  const next = Math.max(0, Math.floor(value));
  if (next === 0) delete state.dhikr.counts[id];
  else state.dhikr.counts[id] = next;
  saveState();
}

function renderDhikrTotal() {
  const total = Object.values(state.dhikr.counts).reduce((sum, value) => {
    const n = Number(value);
    return sum + (Number.isFinite(n) ? n : 0);
  }, 0);
  $$("[data-dhikr-total]").forEach((el) => {
    el.textContent = arNum(total);
  });
}

function renderDhikr() {
  const dhikr = currentDhikr();
  const count = dhikrCount(dhikr.id);
  const progress = clamp(count / dhikr.target, 0, 1);

  if (dhikrFull) dhikrFull.textContent = dhikr.full;
  if (tasbeehCount) tasbeehCount.textContent = arNum(count);
  if (tasbeehTarget) tasbeehTarget.textContent = `الهدف ${arNum(dhikr.target)}`;
  if (tasbeehRing) tasbeehRing.style.strokeDashoffset = String(TASBEEH_CIRCUMFERENCE * (1 - progress));

  dhikrChips.forEach((chip) => {
    const isActive = chip.dataset.dhikr === dhikr.id;
    chip.classList.toggle("is-active", isActive);
    chip.setAttribute("aria-pressed", String(isActive));
  });

  renderDhikrTotal();
}

dhikrChips.forEach((chip) => {
  chip.addEventListener("click", () => {
    state.dhikr.selected = chip.dataset.dhikr;
    saveState();
    renderDhikr();
  });
});

tasbeehBtn?.addEventListener("click", () => {
  const dhikr = currentDhikr();
  const next = dhikrCount(dhikr.id) + 1;
  setDhikrCount(dhikr.id, next);
  renderDhikr();

  tasbeehBtn.classList.remove("pop");
  void tasbeehBtn.offsetWidth;
  tasbeehBtn.classList.add("pop");
  setTimeout(() => tasbeehBtn.classList.remove("pop"), 320);

  if (next === dhikr.target) {
    showToast(`بلغت ${arNum(dhikr.target)} من «${dhikr.label}»، تقبّل الله منك.`);
  }

  if (typeof navigator.vibrate === "function") {
    try {
      navigator.vibrate(12);
    } catch {
      /* Haptics are optional. */
    }
  }
});

resetDhikrBtn?.addEventListener("click", () => {
  const dhikr = currentDhikr();
  setDhikrCount(dhikr.id, 0);
  renderDhikr();
});

giftDhikrBtn?.addEventListener("click", () => {
  const dhikr = currentDhikr();
  recordHadiya(`تقبّل الله منك… أُهدي ثواب «${dhikr.label}» لروح المرحوم أيمن فتحي محمد.`);
});

/* ---------- dua copy ---------- */

$$(".copy-btn[data-copy]").forEach((button) => {
  button.addEventListener("click", async () => {
    const card = button.closest(".dua-card");
    const text = card?.querySelector(".dua-text")?.textContent?.trim();
    if (!text) return;

    const original = button.innerHTML;
    const copied = await copyText(text);
    if (!copied) {
      showToast("تعذّر النسخ تلقائيًا. يمكنك تحديد الدعاء ونسخه يدويًا.");
      return;
    }
    button.classList.add("is-copied");
    button.innerHTML = '<svg class="icon" aria-hidden="true"><use href="#i-check"></use></svg> تم النسخ';
    showToast("تم نسخ الدعاء. ادعُ له بقلبٍ حاضر.");
    setTimeout(() => {
      button.classList.remove("is-copied");
      button.innerHTML = original;
    }, 2200);
  });
});

/* ---------- share ---------- */

const shareWhatsapp = $("#shareWhatsapp");
const copyLinkBtn = $("#copyLink");

function siteUrl() {
  return `${window.location.origin}${window.location.pathname}`;
}

function shareText() {
  return `صدقة جارية عن روح المرحوم أيمن فتحي محمد.\nاقرأ آية، سبّح، وادعُ له:\n${siteUrl()}`;
}

if (shareWhatsapp) {
  shareWhatsapp.href = `https://wa.me/?text=${encodeURIComponent(shareText())}`;
}

copyLinkBtn?.addEventListener("click", async () => {
  const original = copyLinkBtn.innerHTML;
  const copied = await copyText(siteUrl());
  if (!copied) {
    showToast("تعذّر نسخ الرابط، يمكنك نسخه من شريط العنوان.");
    return;
  }
  copyLinkBtn.innerHTML = '<svg class="icon" aria-hidden="true"><use href="#i-check"></use></svg> تم نسخ الرابط';
  showToast("تم نسخ رابط الموقع، شاركه مع من تحب.");
  setTimeout(() => {
    copyLinkBtn.innerHTML = original;
  }, 2200);
});

const nativeShareBtn = $("#nativeShare");

if (nativeShareBtn && typeof navigator.share === "function") {
  nativeShareBtn.hidden = false;
  nativeShareBtn.addEventListener("click", async () => {
    try {
      await navigator.share({
        title: "صدقة جارية عن روح المرحوم أيمن فتحي محمد",
        text: "اقرأ آية، سبّح، وادعُ له… صدقةٌ جارية في ميزان حسناته.",
        url: siteUrl()
      });
    } catch (error) {
      if (error?.name !== "AbortError") {
        showToast("تعذّرت المشاركة من هذا المتصفح، جرّب واتساب أو نسخ الرابط.");
      }
    }
  });
}

/* ---------- init ---------- */

renderHadiya();
renderDhikr();
renderKhatma();
renderDailyAyah();
setPlayingIcon(false);

window.__siteReady = true;
