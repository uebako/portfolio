function setupModal(openIds: string[], modalId: string, closeId: string, lightId?: string, textSelector?: string) {
  const openButtons = openIds
    .map((id) => document.getElementById(id))
    .filter((button): button is HTMLElement => button !== null);

  const modal = document.getElementById(modalId);
  const closeButton = document.getElementById(closeId);
  const overlay = modal?.querySelector(".panel-overlay");

  const light = lightId ? document.getElementById(lightId) : null;
  const text = textSelector ? document.querySelector<HTMLElement>(textSelector) : null;

  if (openButtons.length === 0 || !modal || !closeButton) return;

  function openModal() {
    if (!modal) return;

    if (!modal) return;

    // すでに開いていたら閉じる
    if (modal.classList.contains("show")) {
      closeModal();
      return;
    }

    modal.classList.remove("hidden");
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");

    light?.classList.add("show");
    text?.classList.add("active");

    // PROFILE・WORKS・CONTACTだけスクロール

    if (modalId === "profile-modal" || modalId === "works-modal" || modalId === "contact-modal") {
      setTimeout(() => {
        if (window.innerWidth <= 768) {
          const panelContent = modal.querySelector<HTMLElement>(".panel-content");

          if (panelContent) {
            const panelTop = panelContent.getBoundingClientRect().top + window.scrollY;

            window.scrollTo({
              top: panelTop - 30,
              behavior: "smooth",
            });
          }
        } else {
          modal.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 10);
    }
  }
  function closeModal() {
    if (!modal) return;
    modal.classList.remove("show");
    modal.classList.add("hidden");
    modal.setAttribute("aria-hidden", "true");

    light?.classList.remove("show");
    text?.classList.remove("active");
  }

  openButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      openModal();
    });
  });

  closeButton?.addEventListener("click", closeModal);

  if (overlay) {
    overlay.addEventListener("click", closeModal);
  }

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.classList.contains("hidden")) {
      closeModal();
    }
  });
}

/* ===== モーダル登録 ===== */

setupModal(["profile-open"], "profile-modal", "profile-close", "profile-light", ".profile-illumination");

setupModal(["works-open"], "works-modal", "works-close", "works-light", ".works-illumination");

setupModal(["contact-open"], "contact-modal", "contact-close", "contact-light", ".contact-illumination");

setupModal(["topic-open"], "topic-modal", "topic-close");

setupModal(["cat-ore-open"], "cat-ore-modal", "cat-ore-close");

setupModal(["cat-latte-open"], "cat-latte-modal", "cat-latte-close");

setupModal(["menu-open"], "menu-modal", "menu-close");

setupModal(["likes-open"], "likes-modal", "likes-close");

const menuModal = document.getElementById("menu-modal");

document.querySelectorAll("[data-open]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    // メニューを閉じる
    menuModal?.classList.remove("show");
    menuModal?.classList.add("hidden");
    menuModal?.setAttribute("aria-hidden", "true");

    const targetId = (event.currentTarget as HTMLElement).dataset.open;

    if (targetId) {
      // メニューが閉じてから開く
      setTimeout(() => {
        document.getElementById(targetId)?.click();
      }, 150);
    }
  });
});

// =================
// WORKS
// =================

const frames = document.querySelectorAll(".photo-frame");

frames.forEach((frame) => {
  frame.addEventListener("click", (e) => {
    if ((e.target as HTMLElement).closest("a")) {
      return;
    }

    const isOpen = frame.classList.contains("is-open");

    frames.forEach((item) => {
      item.classList.remove("is-open");
    });

    if (!isOpen) {
      frame.classList.add("is-open");
    }
  });
});

// likesのチケット
const ticket = document.getElementById("like-ticket") as HTMLElement;
const ticketLeft = document.getElementById("ticket-left") as HTMLImageElement;
const ticketRight = document.getElementById("ticket-right") as HTMLImageElement;
const ticketTitle = document.getElementById("ticket-title") as HTMLElement;
const ticketDescription = document.getElementById("ticket-description") as HTMLElement;

const likesData = {
  nails: {
    image: "./img/nail-photo1.jpg",
    image2: "./img/nail-photo2.jpg",
    title: "-nail-",
    description:
      "セルフネイルを2週間に一度のペースで楽しんでいます。SNSでトレンドのデザインを見つけ、自分の爪に表現していく作業が好きです。一つのことにじっくり没頭して集中できる、大切な時間になっています。",
  },
  cats: {
    image: "./img/cat-photo1.jpg",
    image2: "./img/cat-photo2.jpg",
    title: "-cats-",
    description:
      "オレとラテという仲良しな兄弟猫2匹と暮らしています。よく同じポーズで並んでいる姿が微笑ましいです。オレがお姉ちゃんのようにラテを毛繕いしたり枕になってあげたりと、毎日とても癒やされています。",
  },
  drawing: {
    image: "./img/drawing-photo1.jpg",
    image2: "./img/drawing-photo2.jpg",
    title: "-drawing-",
    description:
      "幼い頃から絵を描くことが大好きで、今は主にタブレットで描いています。紙とペンがあればいつでも夢中になれる趣味です。SNSに投稿するようになってからは、皆さんの反応を見ることも楽しみの一つです。",
  },
  bagel: {
    image: "./img/bagel-photo1.jpg",
    image2: "./img/bagel-photo2.jpg",
    title: "-bagel-",
    description:
      "ベーグル作りが趣味で、特に生地をこねる時間は無心になれます。噛みごたえのあるもっちりとした食感が好みです。街中で魅力的なベーグル屋さんを見かけると、ついつい立ち寄って買ってしまいます。",
  },
  coffee: {
    image: "./img/coffee-photo1.jpg",
    image2: "./img/coffee-photo2.jpg",
    title: "-coffee-",
    description:
      "仕事時にも休日にも欠かせないパートナーで、酸味が少なく深みのある苦いコーヒーが好みです。雰囲気の良いカフェを探して訪れ、一人でゆっくり読書や作業をして過ごす時間がとても気に入っています。",
  },
  music: {
    image: "./img/music-photo1.jpg",
    image2: "./img/music-photo2.jpg",
    title: "-music-",
    description:
      "オルタナやポップスなど幅広く音楽を聴き、作業中も欠かせません。中学から打楽器を始めて民族打楽器が好きになりました。手軽に持ち運べるカホンを使って、気軽に演奏へ参加して楽しみたいと思っています。",
  },
};

// 今表示中のボタンを記録
let currentKey: keyof typeof likesData | null = null;

document.querySelectorAll("[data-likes]").forEach((button) => {
  button.addEventListener("click", () => {
    const key = (button as HTMLElement).dataset.likes as keyof typeof likesData;
    const data = likesData[key];

    if (!data) return;

    // 同じボタンを押したら閉じる
    if (currentKey === key) {
      ticket.classList.add("hidden");
      button.classList.remove("active");
      currentKey = null;
      return;
    }

    // 全ボタンのactiveを消す
    document.querySelectorAll(".likes-button").forEach((btn) => {
      btn.classList.remove("active");
    });

    // 押したボタンだけactive
    button.classList.add("active");

    currentKey = key;

    ticket.classList.remove("hidden");

    ticketLeft.src = data.image;
    ticketLeft.alt = data.title;

    ticketRight.src = data.image2;
    ticketRight.alt = data.title;

    ticketTitle.textContent = data.title;
    ticketDescription.textContent = data.description;
  });
});

// オレとラテ
type CatDisplay = {
  oreMessage: string;
  latteMessage: string;

  oreButtonImage: string;
  latteButtonImage: string;

  oreClass: string;
  latteClass: string;
};

const catDisplays: CatDisplay[] = [
  {
    oreMessage: "#今は座っています",
    latteMessage: "#今は寝ています",

    oreButtonImage: "./img/ore1.png",
    latteButtonImage: "./img/latte1.png",

    oreClass: "ore-1",
    latteClass: "latte-1",
  },
  {
    oreMessage: "#今は寝ています",
    latteMessage: "#今は寝転んでいます",

    oreButtonImage: "./img/ore2.png",
    latteButtonImage: "./img/latte2.png",

    oreClass: "ore-2",
    latteClass: "latte-2",
  },
  {
    oreMessage: "#今は立っています",
    latteMessage: "#今は座っています",

    oreButtonImage: "./img/ore3.png",
    latteButtonImage: "./img/latte3.png",

    oreClass: "ore-3",
    latteClass: "latte-3",
  },
  {
    oreMessage: "#今は寝ています",
    latteMessage: "#今は寝ています",

    oreButtonImage: "./img/ore2.png",
    latteButtonImage: "./img/latte1.png",

    oreClass: "ore-2",
    latteClass: "latte-1",
  },
  {
    oreMessage: "#今は立っています",
    latteMessage: "#今は寝転んでいます",

    oreButtonImage: "./img/ore3.png",
    latteButtonImage: "./img/latte2.png",

    oreClass: "ore-3",
    latteClass: "latte-2",
  },
  {
    oreMessage: "#今は座っています",
    latteMessage: "#今は座っています",

    oreButtonImage: "./img/ore1.png",
    latteButtonImage: "./img/latte3.png",

    oreClass: "ore-1",
    latteClass: "latte-3",
  },
  {
    oreMessage: "#今は立っています",
    latteMessage: "#今は寝ています",

    oreButtonImage: "./img/ore3.png",
    latteButtonImage: "./img/latte1.png",

    oreClass: "ore-3",
    latteClass: "latte-1",
  },
  {
    oreMessage: "#今は寝ています",
    latteMessage: "#今は座っています",
    oreButtonImage: "./img/ore2.png",
    latteButtonImage: "./img/latte3.png",

    oreClass: "ore-2",
    latteClass: "latte-3",
  },
];

const oreMessage = document.getElementById("ore-message")!;
const latteMessage = document.getElementById("latte-message")!;

const oreButton = document.getElementById("cat-ore-open")!;
const latteButton = document.getElementById("cat-latte-open")!;

const oreButtonImage = document.getElementById("ore-button-image") as HTMLImageElement;

const latteButtonImage = document.getElementById("latte-button-image") as HTMLImageElement;

function updateCats() {
  const hour = new Date().getHours(); // 表示確認終わったらこれ
  // const hour = 0; //表示確認のためたけ
  const index = Math.floor(hour / 3);

  const data = catDisplays[index];

  // メッセージ
  oreMessage.textContent = data.oreMessage;
  latteMessage.textContent = data.latteMessage;

  // ボタン画像
  oreButtonImage.src = data.oreButtonImage;
  latteButtonImage.src = data.latteButtonImage;

  // ボタン位置
  oreButton.className = `cat-ore-button ${data.oreClass}`;
  latteButton.className = `cat-latte-button ${data.latteClass}`;

  console.log("Ore:", oreButtonImage.src);
  console.log("Latte:", latteButtonImage.src);
}

updateCats();
setInterval(updateCats, 60 * 1000);

/* サイトオープン時の動き */

const introButtons = [
  document.querySelector("#profile-open img"),
  document.querySelector("#works-open img"),
  document.querySelector("#contact-open img"),

  document.querySelector(".menu-button img"),
  document.querySelector(".topic-button img"),
  document.querySelector(".instagram-button img"),
  document.querySelector(".profile-character img"),
];

introButtons.forEach((element, index) => {
  if (!(element instanceof HTMLElement)) return;

  setTimeout(() => {
    element.classList.add("intro-sway");

    element.addEventListener(
      "animationend",
      () => {
        element.classList.remove("intro-sway");
      },
      { once: true },
    );
  }, index * 500);
});

/* ボタンのランダムな動き */

const randomButtons = [
  document.querySelector("#profile-open img"),
  document.querySelector("#works-open img"),
  document.querySelector("#contact-open img"),
  document.querySelector("#desk-button img"),
  document.querySelector("#topic-button img"),
  document.querySelector(".instagram-button img"),
  document.querySelector(".profile-character img"),
].filter((element): element is HTMLElement => element !== null);

let lastButton: HTMLElement | null = null;

function randomSway() {
  if (randomButtons.length === 0) return;

  const candidates = randomButtons.filter((button) => button !== lastButton);

  const target = candidates[Math.floor(Math.random() * candidates.length)];

  lastButton = target;

  target.classList.add("random-sway");

  target.addEventListener(
    "animationend",
    () => {
      target.classList.remove("random-sway");
    },
    { once: true },
  );

  const nextTime = Math.random() * 5000 + 4000;

  setTimeout(randomSway, nextTime);
}

setTimeout(randomSway, 5000);
