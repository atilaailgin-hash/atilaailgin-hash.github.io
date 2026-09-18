const language = document.documentElement.lang === "en" ? "en" : "tr";

const topicsByLanguage = {
  tr: {
    ayrilik: {
      index: "01",
      label: "Ayrılık veya yas",
      title: "Kaybın anlamını ve bıraktığı izi birlikte taşırız.",
      first:
        "Kaybın sizde uyandırdığı duygulara, bağa ve tamamlanmamış ihtiyaçlara alan açarız.",
      next:
        "Yasın gündelik hayatınızdaki düşünce ve davranış döngülerini birlikte görünür kılarız.",
      goal:
        "Kaybı silmeden, onunla yeni bir ilişki kurabileceğiniz daha esnek bir yaşam alanı oluşturmak.",
    },
    iliski: {
      index: "02",
      label: "Tekrarlayan ilişki döngüsü",
      title: "Kimin haklı olduğundan önce, döngünün ikinize ne yaptığını inceleriz.",
      first:
        "Tetikleyici anları ve çatışmanın altında kalan daha hassas duyguları yavaşlatıp fark ederiz.",
      next:
        "Korunma stratejilerinin ilişki içinde nasıl birbirini beslediğini açık bir haritaya dönüştürürüz.",
      goal:
        "İhtiyaçların daha doğrudan duyulabildiği, güvenli ve onarılabilir bir ilişki kurabilmek.",
    },
    yogunluk: {
      index: "03",
      label: "Duygusal yoğunluk",
      title: "Duyguyu susturmak yerine, taşıdığı bilgiyi anlamaya çalışırız.",
      first:
        "Yoğunluğun bedende, düşüncede ve davranışta nasıl yaşandığını yargılamadan gözlemleriz.",
      next:
        "Duygunun işaret ettiği ihtiyeti bulur; düzenleme ve baş etme yollarını birlikte deneriz.",
      goal:
        "Duyguların yönetimi ele geçirmediği, seçim yapabileceğiniz daha geniş bir iç alan yaratmak.",
    },
    kultur: {
      index: "04",
      label: "Aidiyet ve kültür",
      title: "Yaşantınızı, içinde oluştuğu kültürel bağlamdan ayırmadan ele alırız.",
      first:
        "Aile, toplum, dil ve kültürün kimliğinize ve ilişkilerinize taşıdığı mesajları keşfederiz.",
      next:
        "Farklı aidiyetler arasında oluşan gerilimleri ve bunlara verdiğiniz anlamları birlikte inceleriz.",
      goal:
        "Tek bir kalıba sığmak zorunda kalmadan, değerlerinizle uyumlu bir aidiyet duygusu geliştirmek.",
    },
  },
  en: {
    ayrilik: {
      index: "01",
      label: "Separation or grief",
      title: "We make space for the meaning of loss and the trace it leaves.",
      first:
        "We make room for the emotions stirred by the loss, the bond itself and what may still feel unfinished.",
      next:
        "Together, we identify how grief appears in everyday thought and behaviour patterns.",
      goal:
        "To create a more flexible life in which the loss is not erased, but held differently.",
    },
    iliski: {
      index: "02",
      label: "Recurring relationship cycles",
      title: "Before asking who is right, we look at what the cycle is doing to both of you.",
      first:
        "We slow down triggering moments and notice the more vulnerable emotions beneath the conflict.",
      next:
        "We map how protective strategies feed one another within the relationship.",
      goal:
        "To build a safer, more repairable relationship where needs can be heard more directly.",
    },
    yogunluk: {
      index: "03",
      label: "Emotional intensity",
      title: "Rather than silencing emotion, we try to understand the information it carries.",
      first:
        "We observe without judgement how intensity is experienced in the body, thoughts and behaviour.",
      next:
        "We identify what the emotion is pointing towards and practise ways of regulating and coping with it.",
      goal:
        "To create more inner space for choice, so emotions do not take over.",
    },
    kultur: {
      index: "04",
      label: "Belonging and culture",
      title: "We understand your experience within the cultural context in which it has developed.",
      first:
        "We explore the messages that family, society, language and culture bring to your identity and relationships.",
      next:
        "Together, we examine tensions between different forms of belonging and the meanings you give them.",
      goal:
        "To develop a sense of belonging aligned with your values, without having to fit into a single mould.",
    },
  },
};

const topics = topicsByLanguage[language];

const result = document.querySelector(".explorer-result");
const resultFields = {
  index: document.querySelector("#result-index"),
  label: document.querySelector("#result-label"),
  title: document.querySelector("#result-title"),
  first: document.querySelector("#result-first"),
  next: document.querySelector("#result-next"),
  goal: document.querySelector("#result-goal"),
};

document.querySelectorAll(".topic").forEach((button) => {
  button.addEventListener("click", () => {
    const selected = topics[button.dataset.topic];
    document.querySelectorAll(".topic").forEach((item) => {
      item.classList.toggle("active", item === button);
      item.setAttribute("aria-selected", item === button ? "true" : "false");
    });

    Object.entries(resultFields).forEach(([key, node]) => {
      node.textContent = selected[key];
    });

    result.classList.remove("result-changing");
    void result.offsetWidth;
    result.classList.add("result-changing");
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

window.addEventListener("scroll", () => {
  document.querySelector(".site-header").classList.toggle("scrolled", window.scrollY > 20);
});

const toast = document.querySelector("#toast");
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("show"), 4800);
}

document.querySelector("#contact-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const phone = data.get("phone").trim();
  const isEnglish = language === "en";
  const contactDetails = [
    `${isEnglish ? "My email" : "Yanıt adresim"}: ${data.get("email")}`,
  ];
  if (phone) contactDetails.push(`${isEnglish ? "My phone" : "Telefonum"}: ${phone}`);
  const draft = isEnglish
    ? [
        "Hello Ilgın,",
        "",
        `My name is ${data.get("name")}. I am getting in touch to request information.`,
        "",
        data.get("message"),
        "",
        ...contactDetails,
      ].join("\n")
    : [
        "Merhaba Ilgın Hanım,",
        "",
        `Ben ${data.get("name")}. Bilgi almak için iletişime geçiyorum.`,
        "",
        data.get("message"),
        "",
        ...contactDetails,
      ].join("\n");

  const subject = encodeURIComponent(
    isEnglish ? `Session enquiry — ${data.get("name")}` : `Görüşme talebi — ${data.get("name")}`
  );
  const body = encodeURIComponent(draft);
  window.location.href = `mailto:ilgin.atila.psk@gmail.com?subject=${subject}&body=${body}`;
  showToast(
    isEnglish
      ? "Your email draft is opening in your device’s email application."
      : "E-posta taslağınız cihazınızdaki e-posta uygulamasında açılıyor."
  );
});

document.querySelector("#year").textContent = new Date().getFullYear();
