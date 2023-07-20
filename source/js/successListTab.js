// Показ элементов списка если их больше 4
(function () {
    const CARD_CLASS = "item-card";
    const SHOW_CARD_CLASS = "item-card--show";
    const SHOW_PRICE_BTN_CLASS = "show";
    const DEFAULT_CASE_SHOW = 4;

    const cardList = document.querySelector(".successes__list");
    const showMoreBtn = document.querySelector(".successes__button");

    let cardsShowCounter = 0;

    const setCardsForShow = (cards, showCounter) => {
        if (cards.length >= showCounter) {
            cards.forEach((el, i) => {
                if (i < showCounter) {
                    el.classList.add(SHOW_CARD_CLASS);
                }
            });
        } else {
            cards.forEach((el) => {
                el.classList.add(SHOW_CARD_CLASS);
            });
        }
    };

    // Подготавливает карты к показу
    const cards = Array.from(cardList.querySelectorAll(`.${CARD_CLASS}`));

    setCardsForShow(cards, DEFAULT_CASE_SHOW);

    cardsShowCounter = DEFAULT_CASE_SHOW;

    if (cards.length > DEFAULT_CASE_SHOW) {
        showMoreBtn.classList.add(SHOW_PRICE_BTN_CLASS);
    }

    const onShowMoreBtnClick = (evt) => {
        evt.preventDefault();

        cardsShowCounter = cardsShowCounter + DEFAULT_CASE_SHOW;

        cards.forEach((el, i) => {
            if (
                i + 1 <= cardsShowCounter &&
                !el.classList.contains(SHOW_CARD_CLASS)
            ) {
                el.classList.add(SHOW_CARD_CLASS);
            }
        });

        if (cards.length <= cardsShowCounter) {
            showMoreBtn.classList.remove(SHOW_PRICE_BTN_CLASS);
        }
    };

    showMoreBtn.addEventListener("click", onShowMoreBtnClick);
})();
