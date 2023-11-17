//============================= Text Fade-in Functions ============================= 
//callback function
const fade_in = (entries, observer) => {
    entries.forEach((entry) => {
        //console.log(entry);
        if(entry.isIntersecting)
        {
            entry.target.classList.add('content_anim');
        }
    });
}

//small observer
const small_options = {
    root: null, 
    rootMargin: "-50px",
    threshold: 1.0,
};

const small_observer = new IntersectionObserver(fade_in, small_options);
const small_targets = document.querySelectorAll('.small_content');

for (const target of small_targets)
{
    small_observer.observe(target);
}

//medium observer
const medium_options = {
    root: null, 
    rootMargin: "0px",
    threshold: .8,
};

const medium_observer = new IntersectionObserver(fade_in, medium_options);
const medium_targets = document.querySelectorAll('.medium_content');

for (const target of medium_targets)
{
    medium_observer.observe(target);
}

//large observer
const large_options = {
    root: null, 
    rootMargin: "0px",
    threshold: .6,
};

const large_observer = new IntersectionObserver(fade_in, large_options);
const large_targets = document.querySelectorAll('.large_content');

for (const target of large_targets)
{
    large_observer.observe(target);
}
