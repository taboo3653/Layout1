import './styles/normalize.css';
import './styles/styles.scss';
import _ from 'lodash';

document.addEventListener('DOMContentLoaded', () => {
/* It help to use scrollTo and contoll finish scroll */
  function ProgrammScroller() {
    this.isProgrammScroll = false;

    this.scrollTo = (offset) => {
      if (this.prevListener) {
        window.removeEventListener('scroll', this.prevListener);
      }

      this.isProgrammScroll = true;

      const onScroll = () => {
        if (Math.round(window.pageYOffset) === Math.round(offset)) {
          window.removeEventListener('scroll', onScroll);
          this.isProgrammScroll = false;
        }
      };

      window.addEventListener('scroll', onScroll);
      onScroll();
      window.scrollTo({
        top: offset,
        behavior: 'smooth',
      });

      this.prevListener = onScroll;
    };
  }

  const porgrammScroller = new ProgrammScroller();


  (function handleMenuNavigation() {
    const navigation = document.querySelectorAll('.navigation-items'); // get all navigation bar
    const header = document.querySelector('header');

    if (navigation.length > 0) {
      navigation.forEach((item) => {
        item.addEventListener('click', (event) => {
          event.preventDefault();

          if (event.target.closest('a')) {
          /* Update class='active' by <li> */
            const prevElement = item.querySelector('.active');

            if (prevElement) {
              prevElement.classList.remove('active');
            }
            event.target.closest('li').classList.add('active');

            const targetBlockName = event.target.closest('a').getAttribute('href').slice(1);

            porgrammScroller.scrollTo(
              document.getElementById(targetBlockName).getBoundingClientRect().top
                        + window.pageYOffset
                        - header.getBoundingClientRect().height,
            );
          }
        });
      });
    }
  }());

  (function handleScroll() {
    const navigation = document.querySelector('.navigation__main');
    const navigationTabs = navigation.querySelectorAll('li');
    const header = document.querySelector('header');

    const sections = new Map();

    /* Place connected <li> and <section> to Map */
    if (navigationTabs.length > 0) {
      navigationTabs.forEach((tab) => {
        const sectionId = tab.querySelector('a').getAttribute('href').slice(1);
        const sectionElement = document.getElementById(sectionId);

        sections.set(tab, sectionElement);
      });
    }
    const onScroll = () => {
      if (!porgrammScroller.isProgrammScroll) {
        sections.forEach((sectionNode, liNode) => {
          const absoluteTopBoundPosition = sectionNode.getBoundingClientRect().top
                    + window.pageYOffset
                    - header.getBoundingClientRect().height;

          const absoluteBottomBoundPosition = sectionNode.getBoundingClientRect().bottom
                    + window.pageYOffset
                    - header.getBoundingClientRect().height;

          if (window.pageYOffset < absoluteBottomBoundPosition
                        && window.pageYOffset >= absoluteTopBoundPosition) {
            const prevElement = navigation.querySelector('.active');
            if (prevElement) {
              prevElement.classList.remove('active');
            }
            liNode.classList.add('active');
          }
        });
      }
    };

    const onScrollThrottled = _.throttle(onScroll, 100);

    document.addEventListener('scroll', () => {
      onScrollThrottled();
    });
  }());

  (function handleSideMenu() {
    const sideMenuClass = 'navigation__side-menu';

    const header = document.querySelector('header');
    const navigationToggle = document.querySelector('.navigation__toggle');
    const navigationSideMenu = document.querySelector(`.${sideMenuClass}`);
    const menuIcon = header.querySelector('.menu-icon');
    const closeIcon = header.querySelector('.close-icon');

    const openSideMenu = () => {
      menuIcon.classList.add('hidden');
      closeIcon.classList.remove('hidden');
      navigationToggle.classList.add('toggled');
      navigationSideMenu.classList.add(`${sideMenuClass}_opened`);
      document.documentElement.classList.add('no-scroll');
      document.body.classList.add('no-scroll');
    };
    const closeSideMenu = () => {
      menuIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
      navigationToggle.classList.remove('toggled');
      navigationSideMenu.classList.remove(`${sideMenuClass}_opened`);
      document.documentElement.classList.remove('no-scroll');
      document.body.classList.remove('no-scroll');
    };

    if (navigationToggle && navigationSideMenu) {
      navigationToggle.addEventListener('click', () => {
        navigationSideMenu.style.top = `${header.getBoundingClientRect().bottom}px`;

        if (!navigationToggle.classList.contains('toggled')) {
          openSideMenu();
        } else closeSideMenu();
      });
    }

    navigationSideMenu.addEventListener('click', (event) => {
      if (event.target.closest('li')) {
        closeSideMenu();
      }
    });
  }());
});
