/**
 * 넥서스 컨설팅 (Nexus Consulting) 공통 인터랙션 스크립트
 */

document.addEventListener("DOMContentLoaded", () => {
  initActiveNav();
  initMobileMenu();
  initLanguageSwitcher();
  initSmoothScroll();
});

/**
 * 1. 현재 접속 중인 페이지에 맞추어 헤더 메뉴 하이라이트
 */
function initActiveNav() {
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll("header nav a");

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPath || (currentPath === "" && href === "index.html")) {
      link.classList.remove("text-on-surface-variant", "font-normal");
      link.classList.add("text-primary", "font-bold");
      link.setAttribute("aria-current", "page");
    } else {
      link.classList.remove("text-primary", "font-bold");
      link.classList.add("text-on-surface-variant");
      link.removeAttribute("aria-current");
    }
  });
}

/**
 * 2. 모바일/태블릿 반응형 햄버거 메뉴 자동 생성 및 토글
 */
function initMobileMenu() {
  const header = document.querySelector("header");
  if (!header) return;

  const headerContainer = header.querySelector("div.max-w-\\[1360px\\]");
  if (!headerContainer) return;

  // 햄버거 버튼 생성 (xl 미만 화면에서 표시)
  const menuBtn = document.createElement("button");
  menuBtn.type = "button";
  menuBtn.className = "xl:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-surface-container text-on-surface transition-colors";
  menuBtn.setAttribute("aria-label", "모바일 메뉴 열기");
  menuBtn.innerHTML = `<span class="material-symbols-outlined text-[26px]">menu</span>`;

  // 우측 컨트롤 그룹 앞에 버튼 삽입
  const rightControls = headerContainer.querySelector(".flex.items-center.gap-space-md");
  if (rightControls) {
    rightControls.appendChild(menuBtn);
  } else {
    headerContainer.appendChild(menuBtn);
  }

  // 모바일 메뉴 드로어 생성
  const mobileDrawer = document.createElement("div");
  mobileDrawer.id = "mobile-nav-drawer";
  mobileDrawer.className = "hidden xl:hidden fixed top-20 left-0 w-full bg-surface-container-lowest/98 backdrop-blur-lg border-b border-outline-variant shadow-xl z-40 transition-all duration-300";

  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  const menuItems = [
    { label: "메인", href: "index.html" },
    { label: "회사 소개", href: "company.html" },
    { label: "컨설팅 서비스", href: "services.html" },
    { label: "성공 사례", href: "cases.html" },
    { label: "전문가 소개", href: "consultants.html" },
    { label: "인사이트", href: "insights.html" },
    { label: "문의 및 신청", href: "contact.html" },
  ];

  let linksHtml = '<div class="px-6 py-6 flex flex-col gap-3 max-w-[1360px] mx-auto">';
  menuItems.forEach((item) => {
    const isActive = item.href === currentPath;
    linksHtml += `
      <a href="${item.href}" class="py-2.5 px-4 rounded-lg font-medium text-base transition-colors ${
      isActive
        ? "bg-primary-container text-on-primary font-bold"
        : "text-on-surface hover:bg-surface-container"
    }">
        ${item.label}
      </a>
    `;
  });
  linksHtml += `
    <div class="pt-4 border-t border-outline-variant flex flex-col gap-2">
      <a href="contact.html" class="w-full text-center py-3 bg-primary text-on-primary font-bold rounded-lg hover:bg-primary-container transition-colors">
        컨설팅 무료 상담 신청 →
      </a>
    </div>
  </div>`;

  mobileDrawer.innerHTML = linksHtml;
  header.parentNode.insertBefore(mobileDrawer, header.nextSibling);

  // 토글 이벤트
  let isOpen = false;
  menuBtn.addEventListener("click", () => {
    isOpen = !isOpen;
    if (isOpen) {
      mobileDrawer.classList.remove("hidden");
      menuBtn.innerHTML = `<span class="material-symbols-outlined text-[26px]">close</span>`;
    } else {
      mobileDrawer.classList.add("hidden");
      menuBtn.innerHTML = `<span class="material-symbols-outlined text-[26px]">menu</span>`;
    }
  });

  // 메뉴 바깥 클릭 시 닫기
  document.addEventListener("click", (e) => {
    if (isOpen && !mobileDrawer.contains(e.target) && !menuBtn.contains(e.target)) {
      isOpen = false;
      mobileDrawer.classList.add("hidden");
      menuBtn.innerHTML = `<span class="material-symbols-outlined text-[26px]">menu</span>`;
    }
  });
}

/**
 * 3. contact.html 탭 전환 핸들러 (기업 의뢰 vs 전문가 참여)
 */
window.switchNexusTab = function (type) {
  const corporateView = document.getElementById("corporate-view");
  const expertView = document.getElementById("expert-view");
  const corporateBtn = document.getElementById("tab-corporate-btn");
  const expertBtn = document.getElementById("tab-expert-btn");

  if (!corporateView || !expertView || !corporateBtn || !expertBtn) return;

  if (type === "corporate") {
    corporateView.classList.remove("hidden");
    expertView.classList.add("hidden");

    corporateBtn.className = "flex-1 py-space-sm px-space-md rounded-full font-label-lg text-label-lg transition-all duration-200 flex items-center justify-center gap-space-xs bg-surface-container-lowest text-on-surface shadow-sm";
    expertBtn.className = "flex-1 py-space-sm px-space-md rounded-full font-label-lg text-label-lg transition-all duration-200 flex items-center justify-center gap-space-xs text-on-surface-variant hover:text-on-surface";
  } else if (type === "expert") {
    corporateView.classList.add("hidden");
    expertView.classList.remove("hidden");

    expertBtn.className = "flex-1 py-space-sm px-space-md rounded-full font-label-lg text-label-lg transition-all duration-200 flex items-center justify-center gap-space-xs bg-surface-container-lowest text-on-surface shadow-sm";
    corporateBtn.className = "flex-1 py-space-sm px-space-md rounded-full font-label-lg text-label-lg transition-all duration-200 flex items-center justify-center gap-space-xs text-on-surface-variant hover:text-on-surface";
  }
};

/**
 * 4. 상담 / 파트너십 폼 접수 핸들러 및 모달 피드백
 */
window.handleNexusSubmit = function (event, successMessage) {
  if (event) event.preventDefault();

  showToastModal({
    title: "접수가 완료되었습니다",
    message: successMessage || "전달해 주신 내용을 바탕으로 24시간 이내 담당 시니어 파트너가 직접 검토 의견을 회신해 드립니다.",
    icon: "task_alt"
  });

  if (event && event.target && typeof event.target.reset === "function") {
    event.target.reset();
  }
};

/**
 * 5. 모던 토스트/모달 알림 컴포넌트
 */
function showToastModal({ title, message, icon }) {
  const existing = document.getElementById("nexus-feedback-modal");
  if (existing) existing.remove();

  const modal = document.createElement("div");
  modal.id = "nexus-feedback-modal";
  modal.className = "fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-surface/40 backdrop-blur-sm transition-opacity animate-fade-in";
  modal.innerHTML = `
    <div class="bg-surface-container-lowest border border-outline-variant max-w-md w-full rounded-2xl p-6 shadow-2xl flex flex-col items-center text-center transform scale-100 transition-all">
      <div class="w-16 h-16 rounded-full bg-secondary-fixed/40 text-primary flex items-center justify-center mb-4">
        <span class="material-symbols-outlined text-[36px]">${icon || "check_circle"}</span>
      </div>
      <h3 class="text-xl font-bold text-on-surface mb-2">${title}</h3>
      <p class="text-on-surface-variant text-sm leading-relaxed mb-6">${message}</p>
      <button type="button" class="w-full py-3 px-6 bg-primary text-on-primary font-bold rounded-lg hover:bg-primary-container transition-colors" onclick="document.getElementById('nexus-feedback-modal').remove()">
        확인
      </button>
    </div>
  `;

  document.body.appendChild(modal);
}

/**
 * 6. 헤더 언어 스위처 (KR / EN) 토글
 */
function initLanguageSwitcher() {
  const langButtons = document.querySelectorAll("header .bg-surface-container button");
  if (langButtons.length < 2) return;

  langButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      langButtons.forEach((b) => {
        b.className = "px-space-sm py-0.5 rounded-full text-on-surface-variant hover:text-on-surface font-label-md text-label-md transition-colors";
      });
      btn.className = "px-space-sm py-0.5 rounded-full bg-surface-container-lowest text-on-surface font-label-md text-label-md shadow-[0_1px_2px_rgba(0,0,0,0.05)]";

      if (btn.textContent.trim() === "EN") {
        showToastModal({
          title: "English Version",
          message: "English services overview will be released soon. Please contact us via inquiry form for English advisory.",
          icon: "language"
        });
      }
    });
  });
}

/**
 * 7. 내부 해시 앵커 부드러운 스크롤
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId && targetId !== "#") {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });
}
