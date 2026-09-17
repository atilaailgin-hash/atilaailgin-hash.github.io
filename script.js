const topics = {
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
};

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
  const contactDetails = [`Yanıt adresim: ${data.get("email")}`];
  if (phone) contactDetails.push(`Telefonum: ${phone}`);
  const draft = [
    "Merhaba Ilgın Hanım,",
    "",
    `Ben ${data.get("name")}. ${data.get("service")} hakkında iletişime geçiyorum.`,
    "",
    data.get("message"),
    "",
    ...contactDetails,
  ].join("\n");

  const subject = encodeURIComponent(`Görüşme talebi — ${data.get("name")}`);
  const body = encodeURIComponent(draft);
  window.location.href = `mailto:ilgin.atila.psk@gmail.com?subject=${subject}&body=${body}`;
  showToast("E-posta taslağınız cihazınızdaki e-posta uygulamasında açılıyor.");
});

document.querySelector("#year").textContent = new Date().getFullYear();
