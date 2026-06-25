function setupModal(openId: string, modalId: string, closeId: string, lightId?: string, textSelector?: string) {
  const openButton = document.getElementById(openId);
  const modal = document.getElementById(modalId);
  const closeButton = document.getElementById(closeId);
  const overlay = modal?.querySelector(".panel-overlay");

  const light = lightId ? document.getElementById(lightId) : null;
  const text = textSelector ? document.querySelector<HTMLElement>(textSelector) : null;

  if (!openButton || !modal || !closeButton || !overlay) {
    return;
  }

  // モーダルを開く
  function openModal() {
    modal.classList.remove("hidden");
    modal.setAttribute("aria-hidden", "false");

    light?.classList.add("show");
    text?.classList.add("active");
  }

  // モーダルを閉じる
  function closeModal() {
    modal.classList.add("hidden");
    modal.setAttribute("aria-hidden", "true");

    light?.classList.remove("show");
    text?.classList.remove("active");
  }

  // 開く
  openButton.addEventListener("click", openModal);

  // ×ボタンで閉じる
  closeButton.addEventListener("click", closeModal);

  // 背景クリックで閉じる
  overlay.addEventListener("click", closeModal);

  // Escキーで閉じる
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.classList.contains("hidden")) {
      closeModal();
    }
  });
}

// PROFILE
setupModal("profile-open", "profile-modal", "profile-close", "profile-light", ".profile-illumination");

// WORKS
setupModal("works-open", "works-modal", "works-close", "works-light", ".works-illumination");

// CONTACT
setupModal("contact-open", "contact-modal", "contact-close", "contact-light", ".contact-illumination");
