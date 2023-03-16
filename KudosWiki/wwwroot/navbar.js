function initNavbar() {
    var navbar = document.querySelector('.sidebarController');
    var icon = document.querySelector('.icon');
    var mq = window.matchMedia('(max-width: 689.98px)');

    // Set initial state based on screen size
    if (mq.matches) {
        navbar.classList.add('navHider');
        icon.classList.remove('rotateLeft');
        icon.classList.add('rotateRight');
    } else {
        navbar.classList.add('navShower');
        icon.classList.remove('rotateRight');
        icon.classList.add('rotateLeft');
    }

    // Listen for clicks on the icon
    icon.addEventListener('click', function () {
        if (navbar.classList.contains('navShower')) {
            navbar.classList.remove('navShower');
            navbar.classList.add('navHider');
            icon.classList.remove('rotateLeft');
            icon.classList.add('rotateRight');
        } else {
            navbar.classList.remove('navHider');
            navbar.classList.add('navShower');
            icon.classList.remove('rotateRight');
            icon.classList.add('rotateLeft');
        }
    });

    // Listen for screen size changes
    mq.addListener(function () {
        if (mq.matches) {
            navbar.classList.remove('navShower');
            navbar.classList.add('navHider');
            icon.classList.remove('rotateLeft');
            icon.classList.add('rotateRight');
        } else {
            navbar.classList.remove('navHider');
            navbar.classList.add('navShower');
            icon.classList.remove('rotateRight');
            icon.classList.add('rotateLeft');
        }
    });
}

function fadeOut() {
    var elements = document.querySelectorAll('.fade-in');
    for (var i = 0; i < elements.length; i++) {
        elements[i].classList.add('fade-out');
    }
}

let navContainer;
let scrollContainer;
let nav;
let isScrolling = false;
let currentTop = 0;
let maxTop;
let isFirstHover = true;
let navItemsContainer;
let navItemsContainerClone1;
let navItemsContainerClone2;
let containerHeight;
let navHeight;
let navItemsHeight;
let isMouseOverNav = false;
let prevTop = 0;
let animationStarted = false;


function initScrollingMenu(navContainerSelector, scrollContainerSelector, navSelector) {
    navContainer = document.querySelector(navContainerSelector);
    scrollContainer = document.querySelector(scrollContainerSelector);
    nav = document.querySelector(navSelector);

    setTimeout(() => {
        const navItemsContainer = nav.querySelector('.nav-items-container');
        const navItemsContainerClone1 = navItemsContainer.cloneNode(true);
        const navItemsContainerClone2 = navItemsContainer.cloneNode(true);

        nav.prepend(navItemsContainerClone1);
        nav.append(navItemsContainerClone2);
        containerHeight = navContainer.offsetHeight;
        navHeight = nav.offsetHeight;
        navItemsHeight = navItemsContainer.offsetHeight;
        maxTop = containerHeight - navHeight - (navHeight / 2);

        currentTop = (containerHeight - navItemsHeight * 3) / 2; // Update currentTop calculation
        scrollContainer.style.top = `${currentTop}px`;

        navContainer.addEventListener("mousemove", onMouseMove);
        navContainer.addEventListener("mouseleave", onMouseLeave);
    }, 500); // Set the delay time in milliseconds (e.g., 500ms)
}

function calculateScrollSpeed(mouseY, containerHeight, maxSpeed) {
    const distanceToMiddle = Math.abs(mouseY - containerHeight / 2);
    const speed = distanceToMiddle / (containerHeight / 2);

    if (speed > maxSpeed) {
        return maxSpeed;
    }

    return speed;
}

function onMouseMove(event) {
    isMouseOverNav = true;
    navHeight = nav.offsetHeight;
    containerHeight = navContainer.offsetHeight;
    navItemsHeight = nav.querySelector('.nav-items-container').offsetHeight;

    if (navHeight > containerHeight) {
        const navContainerRect = navContainer.getBoundingClientRect();
        const mouseY = event.clientY - navContainerRect.top;
        const scrollPosition = mouseY / containerHeight;
        maxTop = containerHeight - navItemsHeight * 3 + navItemsHeight * 2;

        // Calculate scrolling speed based on the mouse position
        const maxSpeed = 2.5; // Set the maximum scrolling speed
        const speed = calculateScrollSpeed(mouseY, containerHeight, maxSpeed);
        const newTop = (maxTop * (scrollPosition - 0.5) * speed) - navItemsHeight;

        updatePosition(newTop);
    }

    // Start the animation loop only if it has not been started
    if (!animationStarted) {
        animationStarted = true;
        animateMouseMove(event);
    }
}

function animateMouseMove(event) {
    if (isMouseOverNav) {
        window.requestAnimationFrame(() => onMouseMove(event));
    } else {
        // Reset the animationStarted flag when the mouse leaves the nav
        animationStarted = false;
    }
}

function updatePosition(targetTop) {
    const smoothingFactor = 0.05; // Change this value to control the smoothness of the animation
    prevTop = currentTop; // Store the current top position before updating
    currentTop += (targetTop - currentTop) * smoothingFactor;
    //currentTop = currentTop - 15;
    scrollContainer.style.top = `${currentTop}px`;

    if (Math.abs(targetTop - currentTop) > 0.5) {
        window.requestAnimationFrame(() => updatePosition(targetTop));
    }
}

function onMouseLeave(event) {
    // Apply momentum effect when the cursor leaves the navbar
    applyMomentum();
    isMouseOverNav = false; // Set the flag to false when the mouse leaves the navbar
}

function applyMomentum() {
    const deltaTop = currentTop - prevTop;
    const targetTop = targetTop * momentumFactor;

    // Clamp the targetTop value within the allowable range
    const clampedTargetTop = Math.max(Math.min(targetTop, 0), maxTop);

    updatePosition(clampedTargetTop);
}



window.initScrollingMenu = initScrollingMenu;