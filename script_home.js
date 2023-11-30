const navigationBar = document.querySelector('.nav-home');
const headerContainer = document.querySelector('.header');
const headerText = 'Welcome';

const carouselContainer = document.querySelector('.carousel_container');
const trackContainer = document.querySelector('.carousel_track_container');
const track = document.querySelector('.carousel_track'); /*finds the first element with this class*/
const slides = Array.from(track.children); //get all the children into an array
const nextButton = document.querySelector('.carousel_button_right');
const prevButton = document.querySelector('.carousel_button_left');
const dotsNav = document.querySelector('.carousel_nav');
const bottomContainer = document.querySelector('.carousel_bottom');
const carouselNavContainer = document.querySelector('.carousel_nav_container');
const nextElement = document.querySelector('.carousel_next');
const dots = Array.from(dotsNav.children);

let currentWindowWidth = window.innerWidth;
let typeSpeed = 100;
let index = 0;

//=============================== Header Functions =============================== 

//https://medium.com/front-end-weekly/how-to-create-typing-effect-in-css-and-js-3252dd807f0a
const typeAnimation = () => {
    if(index >= 0 && index < headerText.length) {
        document.querySelector(".header-content").innerHTML += headerText.charAt(index);
        index++;
        setTimeout(typeAnimation, typeSpeed);
    }
}

const headerAnimation = (entries, observer) => {
    entries.forEach((entry) => {
        //console.log(entry);
        if(entry.isIntersecting)
        {
            entry.target.style.backgroundImage = "url('images/grass_in_wind.gif')";
        }
        else
        {
            entry.target.style.backgroundImage = "url('images/grass_in_wind.jpg')";
        }
    })
}

const header_options = {
    root: null, 
    rootMargin: "0px",
    threshold: 0.1,
};

const header_observer = new IntersectionObserver(headerAnimation, header_options);
header_observer.observe(headerContainer);

//=============================== Carousel Functions =============================== 
//functions for placing the slides next to one another
const setPos = () => {
    //when we adjust the window size, we adjust the carousel track container size
    //therefore, when we change slides we need to calculate how much to shift
    const slideWidth = slides[0].getBoundingClientRect().width;

    slides.forEach((slide, index) => {
        slide.style.left = ((slideWidth + 150) * index) + 'px';
    })
}

//=== movement related functions ===
const moveToSlide = (track, currentSlide, targetSlide) => {
    const amtToMove = targetSlide.style.left; //the start of the next slide basically

    //move to the next slide
    track.style.transform = 'translateX(-' + amtToMove + ')'; //changes X coord to amtToMove

    //update the current_slide class
    currentSlide.classList.remove('current_slide');
    targetSlide.classList.add('current_slide');
}

const updateDots = (currentDot, targetDot) => {
    //update the dots navigation
    currentDot.classList.remove('current_slide');
    targetDot.classList.add('current_slide');
}

const hideShowArrows = (slides, targetIndex, prevButton, nextButton) => {
    if(targetIndex === 0)
    {
        prevButton.classList.add('is_hidden');
        nextButton.classList.remove('is_hidden');
    }
    else if(targetIndex === slides.length-1)
    {
        prevButton.classList.remove('is_hidden');
        nextButton.classList.add('is_hidden');
    }
    else
    {
        prevButton.classList.remove('is_hidden');
        nextButton.classList.remove('is_hidden');
    }
}

prevButton.addEventListener('click', (e) => {
    const currentSlide = track.querySelector('.current_slide');    //look for the current_slide under track
    const prevSlide = currentSlide.previousElementSibling;
    const currentDot = dotsNav.querySelector('.current_slide');
    const prevDot = currentDot.previousElementSibling;
    const prevIndex = slides.findIndex(slide => slide === prevSlide);
    
    moveToSlide(track, currentSlide, prevSlide);
    updateDots(currentDot, prevDot);
    hideShowArrows(slides, prevIndex, prevButton, nextButton);

})

nextButton.addEventListener('click', (e) => {
    const currentSlide = track.querySelector('.current_slide');    //look for the current_slide under track
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = dotsNav.querySelector('.current_slide');
    const nextDot = currentDot.nextElementSibling;
    const nextIndex = slides.findIndex(slide => slide === nextSlide);
    
    moveToSlide(track, currentSlide, nextSlide);
    updateDots(currentDot, nextDot);
    hideShowArrows(slides, nextIndex, prevButton, nextButton);
})

//click row indicators -> move to that slide
dotsNav.addEventListener('click', (e) => {
    //will return null if clicked on the container of the dots, returns which dot you pressed on if click on a dot
    const targetDot = e.target.closest('button');

    if(!targetDot) return;

    const currentSlide = track.querySelector('.current_slide');
    const currentDot = dotsNav.querySelector('.current_slide');
    const targetIndex = dots.findIndex(dot => dot === targetDot); //for each dot inside of dots for the first dot that matches what you clicked, return it then extract its index in the array 
    const targetSlide = slides[targetIndex];

    moveToSlide(track, currentSlide, targetSlide);
    updateDots(currentDot, targetDot);
    hideShowArrows(slides, targetIndex, prevButton, nextButton);

})

//=== Window Resizing Function ===
//reset the slide width and positions when you change the browser size

const resetSlide = (callback) => {
    const currentSlide = track.querySelector('.current_slide');    //look for the current_slide under track

    setPos();

    //make animation fast
    track.classList.remove('transition');
    moveToSlide(track, currentSlide, currentSlide);

    callback();
}

//TODO: issue with on resize, when you move to slide it still plays the animation 
//setting the style transition to 0 works alone but resetting back makes noothing change
//https://stackoverflow.com/questions/34726154/temporarily-bypass-a-css-transition
const resetAnimation = async () => {
    track.classList.add('transition');
}

window.addEventListener('resize', (e) => resetSlide(resetAnimation));

// === Scroll and Navigation Bar Event ===
let scrolling = false;

window.addEventListener("scroll", (e) => {
    scrolling = true;
    stopNav();
});

//returns an array of the elements left/top position relative to the whole document(page)
const getPos = (ele) => {
    const rect = ele.getBoundingClientRect();

    return {
        left: rect.left + window.scrollX,
        right: rect.left + window.scrollX + rect.width,
        top: rect.top + window.scrollY,
        bottom: rect.top + window.scrollY + rect.height
    };
}

const stopNav = () => {
    const scrollBottomPos = (window.innerHeight + window.scrollY);
    const trackContainerPos = getPos(carouselContainer);
    const half = (trackContainerPos.bottom + trackContainerPos.top)/2;

    if(scrollBottomPos < half)
    {
        stopNavTop();
    }
    else
    {
        stopNavBottom();
    }
}

//TODO: code clean-up: lots of repeated variables and generalize functions
const stopNavBottom = () => {
    //let fixed carousel bottom continue being fixed until it reaches a certain point

    //Y coord of where we want the object to remained fixed relative to the bottom of the 
    const bottomCarouselContainer = getPos(carouselContainer).bottom;
    const posStop = document.body.scrollHeight - (bottomCarouselContainer + ((window.innerHeight * .30)/2)); //subtract document.body.scrollheight since the below equation relies on X being the distance from bottom

    //https://stackoverflow.com/questions/5902822/stopping-fixed-position-scrolling-at-a-certain-point
    //window.scrollY: how far the upper left corner of the window has scrolled down
    //window.innerHeight: the height of the page within the window currently visible
    //document.body.scrollHeight = height of the body element
    //(window.scrollY + window.innerHeight) how much the bottom of the page has scrolled
    //(window.innerHeight + window.scrollY) >= document.body.scrollHeight; for detecting if we've scrolled to the bottom of the page
    //(window.innerHeight + window.scrollY) >= document.body.scrollHeight - x; detect if we've scrolled to a height x above the bottom of the page
    //x + (window.innerHeight + window.scrollY) - document.body.scrollHeight >= 0; so when that sum is greater than 0, we know  we've hit the wanted height. sum tells us how much we've scrolled past
    const amtPassedPosStop = Math.max(0, (posStop + (window.innerHeight + window.scrollY) - document.body.scrollHeight))
    
    let newBottom = 0;
    if(amtPassedPosStop != 0)
    {
        //add how much has been passed in order to keep up a "stopped" illusion
        newBottom += amtPassedPosStop;
    }

    //default fixed position is 15% the window size
    //TODO: probably change so its not a percentage
    newBottom += window.innerHeight * .05;
    bottomContainer.style.bottom = newBottom + "px";
}

const stopNavTop = () => {
    const topCarouselContainer = getPos(carouselContainer).top;
    const posStart = topCarouselContainer + (window.innerHeight * .05);
    const scrollBottomPos = (window.innerHeight + window.scrollY);
    const distance = posStart - scrollBottomPos; //distance from when to switch over to regular fixed behavior and current scroll position

    let newBottomPos = 0;
    if(scrollBottomPos < posStart)
    {
        //style.bottom is based off of the bottom scroll position
        //distance is how much away from the bottom scroll pos the nav is placed
        //"illusion" of being in place bc the nav is fixed
        newBottomPos += distance * -1;
    }

    //default 15%
    newBottomPos += ((window.innerHeight * .05));
    bottomContainer.style.bottom = newBottomPos + "px";
}

//https://usefulangle.com/post/113/javascript-detecting-element-visible-during-scroll
//throttling the scroll event to keep scroll event handler lightweight
setInterval(() => {
    if(scrolling) {
        scrolling = false;

        // === page navigation bar ===
        //havee the nav bar pop down but only on the home page
        const headerPos = getPos(headerContainer);
        const bottomHeader = headerPos.bottom;

        if(window.scrollY <= bottomHeader*.25)
        {
            navigationBar.style.height = 0;
        }
        else
        {
            navigationBar.style.height = "3em";
        }



        // === carousel navigation bar ===
        const trackContainerPos = getPos(carouselContainer);
        const bottomScrollPos = (window.innerHeight + window.scrollY);
        const half = (trackContainerPos.bottom - trackContainerPos.top)/2;
    
        if(bottomScrollPos > (trackContainerPos.top + (half * .25)) && bottomScrollPos < (trackContainerPos.bottom + (half)))
        {
            //animation
            //only show the navigation bar within a certain boundary
            carouselNavContainer.style.width = '100%';
        }
        else
        {
            carouselNavContainer.style.width = '0%';
        }
    }

}, 200);

/*
window.onscroll = function(ev) {
    if((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 2) //minus 2 for mac offset issue
    {
        alert("youre at the bottom of the page");
    }
};
*/

// === Functions to run at the beginning ===
//initial setting of slides
setPos(); //places slides next to each other

window.addEventListener('load', (e) => {
    stopNav(); //sets where the carousel navigation should be located
    setTimeout(typeAnimation, 2800); //opening animation delay
});
