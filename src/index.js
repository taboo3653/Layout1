import './styles/normalize.css'
import './styles/styles.scss'

document.addEventListener("DOMContentLoaded", () => {

    (function handleMenuNavigation () {
        const navigationTabs = document.querySelectorAll(".navigation-items");
        const topInfo = document.querySelector(".top-info");
            
        (navigationTabs.length > 0) && 
        navigationTabs.forEach( item => {
            
            item.addEventListener("click", function(event) {
                event.preventDefault();
                
                if(event.target.closest('a'))
                {
                    const prevElement =  item.querySelector(".active");
                    prevElement && prevElement.classList.remove("active");
                    event.target.closest('li').classList.add("active");

                    const targetBlockName =  event.target.closest('a').getAttribute('href').slice(1);
        
                    window.scrollTo({
                        behavior: 'smooth',
                        left: 0,
                        top: document.getElementById(targetBlockName).offsetTop+topInfo.getBoundingClientRect().height,
                    });
                }
            })
        })
    
    })();


    (function handleSideMenu () {
        const sideMenuClass = "navigation__side-menu";

        const header = document.querySelector("header");
        const navigationToggle = document.querySelector(".navigation__toggle");
        const navigationSideMenu = document.querySelector('.'+sideMenuClass);
        const menuIcon = header.querySelector(".menu-icon")
        const closeIcon = header.querySelector(".close-icon")

        const openSideMenu = () => {
            menuIcon.classList.add("hidden");
            closeIcon.classList.remove("hidden");
            navigationToggle.classList.add("toggled");
            navigationSideMenu.classList.add(sideMenuClass+"_opened");
            document.documentElement.classList.add("no-scroll");
            document.body.classList.add("no-scroll");
        }
        const closeSideMenu = () => {
            menuIcon.classList.remove("hidden");
            closeIcon.classList.add("hidden");
            navigationToggle.classList.remove("toggled");
            navigationSideMenu.classList.remove(sideMenuClass+"_opened");
            document.documentElement.classList.remove("no-scroll");
            document.body.classList.remove("no-scroll");
        }

        navigationToggle && 
        navigationSideMenu &&
        navigationToggle.addEventListener("click", () => {
            
            navigationSideMenu.style.top = header.getBoundingClientRect().bottom+"px";
            
            (!navigationToggle.classList.contains("toggled")) ? 
                openSideMenu():
                closeSideMenu();    

        })

        navigationSideMenu.addEventListener("click", event => {
            event.target.closest('li') &&
            closeSideMenu();
        })            
    
    })();
    
});