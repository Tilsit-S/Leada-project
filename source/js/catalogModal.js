// Открытие модалки
(function () {
    const ESC_BUTTON = 27;
    const body = document.querySelector("body");
    const commonModalWrapper = document.querySelector(".modal-overlay");
    const catalogModal = document.querySelector(".catalog-modal");
    const openModalButtons = Array.from(
        document.querySelectorAll(".modal-btn")
    );
    const closeButtons = document.querySelectorAll(".catalog-modal__close");

    function onOverlayClick(evt) {
        if (evt.target.classList.contains("modal-overlay")) {
            closeMenu();
            closeOverlay();
        }
    }

    function onCloseButtonClick(evt) {
        evt.preventDefault();
        closeMenu();
        closeOverlay();
    }

    function onDocumentKeyDown(evt) {
        if (
            evt.keyCode === ESC_BUTTON &&
            commonModalWrapper.classList.contains("open")
        ) {
            evt.preventDefault();
            closeMenu();
            closeOverlay();
        }
    }

    function closeMenu() {
        catalogModal.classList.remove("open");
    }

    function closeOverlay() {
        commonModalWrapper.classList.remove("open");
        body.classList.remove("no-scroll");
        commonModalWrapper.removeEventListener("click", onOverlayClick);
        closeButtons.forEach((btn) => {
            btn.removeEventListener("click", onCloseButtonClick);
        });
        window.removeEventListener("keydown", onDocumentKeyDown);
    }

    function onOpenModalButtonClick(evt) {
        evt.preventDefault();
        commonModalWrapper.classList.add("open");
        catalogModal.classList.add("open");
        body.classList.add("no-scroll");
        commonModalWrapper.addEventListener("click", onOverlayClick);
        Array.from(closeButtons).forEach((btn) => {
            btn.addEventListener("click", onCloseButtonClick);
        });
        window.addEventListener("keydown", onDocumentKeyDown);
    }

    Array.from(openModalButtons).forEach((btn) => {
        btn.addEventListener("click", onOpenModalButtonClick);
    });
})();
