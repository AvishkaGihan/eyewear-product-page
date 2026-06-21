import { productData, DEFAULT_COLOR } from "./product-data.js";

document.addEventListener("DOMContentLoaded", () => {
  const swatches = document.querySelectorAll(".swatch-circle");
  const colorLabel = document.getElementById("color-label");
  const mainImage = document.getElementById("main-product-image");
  const paginationContainer = document.getElementById("pagination-dots");
  const prevBtn = document.getElementById("prev-image-btn");
  const nextBtn = document.getElementById("next-image-btn");

  // Zoom Modal Elements
  const zoomTrigger = document.querySelector(".zoom-trigger");
  const zoomModal = document.getElementById("zoom-modal");
  const zoomModalClose = document.getElementById("zoom-modal-close");
  const zoomedImage = document.getElementById("zoomed-image");
  const zoomInBtn = document.getElementById("zoom-in-btn");
  const zoomOutBtn = document.getElementById("zoom-out-btn");
  const zoomPaginationContainer = document.getElementById(
    "zoom-pagination-dots",
  );

  let currentActiveColor = DEFAULT_COLOR;
  let currentImageIndex = 0;
  let currentScale = 1;
  const ZOOM_STEP = 0.25;
  const MAX_ZOOM = 3;
  const MIN_ZOOM = 0.5;

  function getImages() {
    return (
      productData[currentActiveColor]?.images ||
      productData[DEFAULT_COLOR].images
    );
  }

  function renderPaginationDots(totalImages, activeIndex) {
    paginationContainer.innerHTML = "";
    zoomPaginationContainer.innerHTML = "";

    for (let i = 0; i < totalImages; i++) {
      // Main carousel dots
      const dot = document.createElement("div");
      dot.classList.add("dot");
      if (i === activeIndex) dot.classList.add("active");
      dot.addEventListener("click", () => setImageIndex(i));
      paginationContainer.appendChild(dot);

      // Zoom modal dots
      const zoomDot = document.createElement("div");
      zoomDot.classList.add("dot");
      if (i === activeIndex) zoomDot.classList.add("active");
      zoomDot.addEventListener("click", () => setImageIndex(i));
      zoomPaginationContainer.appendChild(zoomDot);
    }
  }

  function setImageIndex(index) {
    const images = getImages();
    if (index >= 0 && index < images.length) {
      currentImageIndex = index;
      mainImage.src = images[currentImageIndex];
      zoomedImage.src = images[currentImageIndex];
      renderPaginationDots(images.length, currentImageIndex);
    }
  }

  prevBtn.addEventListener("click", () => {
    const images = getImages();
    let newIndex = currentImageIndex - 1;
    if (newIndex < 0) newIndex = images.length - 1;
    setImageIndex(newIndex);
  });

  nextBtn.addEventListener("click", () => {
    const images = getImages();
    let newIndex = currentImageIndex + 1;
    if (newIndex >= images.length) newIndex = 0;
    setImageIndex(newIndex);
  });

  function setActiveColor(colorName) {
    currentActiveColor = colorName;
    colorLabel.innerHTML = `<span style="font-weight: 600;">Color:</span> ${colorName}`;

    swatches.forEach((swatch) => {
      swatch.classList.toggle("active", swatch.dataset.color === colorName);
    });

    const images = getImages();
    currentImageIndex = 0;
    mainImage.src = images[0];
    zoomedImage.src = images[0];

    renderPaginationDots(images.length, 0);
  }

  swatches.forEach((swatch) => {
    swatch.addEventListener("click", () => {
      setActiveColor(swatch.dataset.color);
    });
  });

  // Initialize
  setActiveColor(DEFAULT_COLOR);

  // Touch Swipe for Mobile
  const imageViewerFrame = document.querySelector(".image-viewer-frame");
  let touchStartX = 0;
  let touchEndX = 0;

  imageViewerFrame.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
    },
    { passive: true },
  );

  imageViewerFrame.addEventListener(
    "touchend",
    (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    },
    { passive: true },
  );

  function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
      // Swipe left - next image
      nextBtn.click();
    }
    if (touchEndX > touchStartX + swipeThreshold) {
      // Swipe right - previous image
      prevBtn.click();
    }
  }

  // Zoom Modal Logic
  zoomTrigger.addEventListener("click", () => {
    zoomModal.classList.add("active");
    currentScale = 1;
    updateZoom();
  });

  zoomModalClose.addEventListener("click", () => {
    zoomModal.classList.remove("active");
  });

  zoomInBtn.addEventListener("click", () => {
    if (currentScale < MAX_ZOOM) {
      currentScale += ZOOM_STEP;
      updateZoom();
    }
  });

  zoomOutBtn.addEventListener("click", () => {
    if (currentScale > MIN_ZOOM) {
      currentScale -= ZOOM_STEP;
      updateZoom();
    }
  });

  function updateZoom() {
    zoomedImage.style.transform = `scale(${currentScale})`;
  }

  // Mobile Menu Drawer
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const mobileMenuDrawer = document.getElementById("mobile-menu-drawer");
  const mobileMenuOverlay = document.getElementById("mobile-menu-overlay");
  const mobileMenuClose = document.getElementById("mobile-menu-close");

  function openMobileMenu() {
    mobileMenuDrawer.classList.add("active");
  }

  function closeMobileMenu() {
    mobileMenuDrawer.classList.remove("active");
  }

  if (
    mobileMenuBtn &&
    mobileMenuDrawer &&
    mobileMenuOverlay &&
    mobileMenuClose
  ) {
    mobileMenuBtn.addEventListener("click", openMobileMenu);
    mobileMenuClose.addEventListener("click", closeMobileMenu);
    mobileMenuOverlay.addEventListener("click", closeMobileMenu);
  }
});
