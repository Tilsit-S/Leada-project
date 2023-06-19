// Смена активного таба
(function () {
    const ACTIVE_TAB_CLASS = "price__item--active";
    const SHOW_CASE_LISTS_CLASS = "show-list";
    const CARD_CLASS = "card";
    const SHOW_CARD_CLASS = "card--show";
    const SHOW_PRICE_BTN_CLASS = "show";
    const DEFAULT_CASE_SHOW = 3;
    const DEFAULT_CASE_SHOW_TABLET = 2;

    const tabsBtn = Array.from(document.querySelectorAll(".price__item"));
    const caseLists = Array.from(
        document.querySelectorAll(".price__list-wrapper")
    );
    const showMoreBtn = document.querySelector(".price__button");

    let cardsShowCounter = 0;

    let activeList = undefined;

    const isTablet =
        document.documentElement.clientWidth >= 695 &&
        document.documentElement.clientWidth <= 1000;

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

    // Подготавливает карты к показу (первые три или две в активном табе)
    caseLists.forEach((el) => {
        if (el.classList.contains(SHOW_CASE_LISTS_CLASS)) {
            activeList = el;
        }

        const isActiveList = el === activeList;

        const cards = Array.from(el.querySelectorAll(`.${CARD_CLASS}`));

        if (!isTablet) {
            setCardsForShow(cards, DEFAULT_CASE_SHOW);

            cardsShowCounter = DEFAULT_CASE_SHOW;
        } else {
            setCardsForShow(cards, DEFAULT_CASE_SHOW_TABLET);

            cardsShowCounter = DEFAULT_CASE_SHOW_TABLET;
        }

        if (isActiveList && cards.length > DEFAULT_CASE_SHOW) {
            showMoreBtn.classList.add(SHOW_PRICE_BTN_CLASS);
        }
    });

    const onShowMoreBtnClick = (evt) => {
        evt.preventDefault();
        const activeListCards = Array.from(
            activeList.querySelectorAll(`.${CARD_CLASS}`)
        );

        cardsShowCounter =
            cardsShowCounter +
            (!isTablet ? DEFAULT_CASE_SHOW : DEFAULT_CASE_SHOW_TABLET);

        activeListCards.forEach((el, i) => {
            if (
                i + 1 <= cardsShowCounter &&
                !el.classList.contains(SHOW_CARD_CLASS)
            ) {
                el.classList.add(SHOW_CARD_CLASS);
            }
        });

        if (activeListCards.length <= cardsShowCounter) {
            showMoreBtn.classList.remove(SHOW_PRICE_BTN_CLASS);
        }
    };

    showMoreBtn.addEventListener("click", onShowMoreBtnClick);

    function onTabBtnClick(evt) {
        evt.preventDefault();
        const activeTab = evt.currentTarget.dataset.list;
        activeList = caseLists.find((el) => activeTab === el.dataset.list);

        tabsBtn.forEach((el) => {
            el.classList.remove(ACTIVE_TAB_CLASS);
        });

        caseLists.forEach((el) => {
            el.classList.remove(SHOW_CASE_LISTS_CLASS);
        });

        if (activeTab === activeList.dataset.list) {
            showMoreBtn.classList.remove(SHOW_PRICE_BTN_CLASS);
            activeList.classList.add(SHOW_CASE_LISTS_CLASS);

            const isСardsNotShown = !!activeList.querySelectorAll(
                `.${CARD_CLASS}:not(.${SHOW_CARD_CLASS})`
            ).length;

            if (isСardsNotShown) {
                showMoreBtn.classList.add(SHOW_PRICE_BTN_CLASS);
            }
        }

        cardsShowCounter = !isTablet
            ? DEFAULT_CASE_SHOW
            : DEFAULT_CASE_SHOW_TABLET;
        evt.currentTarget.classList.add(ACTIVE_TAB_CLASS);
    }

    tabsBtn.forEach((el) => {
        el.addEventListener("click", onTabBtnClick);
    });
})();
