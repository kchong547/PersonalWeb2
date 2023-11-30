//======================= Grid Double Image Change Functions =======================
//objects that maps the type of button to the 2 images that need to be displayed


//button triggers for image change
const btn_home = document.querySelector('.btn_home');
const btn_projects = document.querySelector('.btn_projects');
const btn_hobbies = document.querySelector('.btn_hobbies');
const btn_hiwm = document.querySelector('.btn_hiwm');
const img_l = document.querySelector('.grid_dbl_img_l');
const img_r = document.querySelector('.grid_dbl_img_r');
const page_text = document.querySelector('.grid_page_text');
const btns = document.querySelector('.grid_dbl_btn_container');

//Array that holds the strings for the locations of the pairs of images to change to once a button has been pressed
const btn_img_map = {
    btn_home_imgs: ['images/wire_home.svg', 'images/mock_home.png'],
    btn_projects_imgs: ['images/wire_projects.png', 'images/mock_projects.png'],
    btn_hobbies_imgs: ['images/wire_hobbies.png', 'images/mock_hobbies.png'],
    btn_hiwm_imgs: ['images/wire_hiwm.png', 'images/mock_hiwm.png']
};

//changes selected image source to the given string
//selected_img: 
const setImage = (selected_img, new_img) => {
    selected_img.src = new_img;
}

const changeImage = (selected_img, new_img) => {
    selected_img.classList.remove('grid_anim_in');
    selected_img.classList.add('grid_anim_out');
    setTimeout(setImage, 301, selected_img, new_img);
    setTimeout(function() {selected_img.classList.remove('grid_anim_out');}, 302);
    setTimeout(function() {selected_img.classList.add('grid_anim_in');}, 302);
}

const changePage = (new_page) => {
    page_text.classList.remove('grid_anim_in');
    page_text.classList.add('grid_anim_out');
    setTimeout(function() {page_text.innerText = new_page}, 301);
    setTimeout(function() {page_text.classList.remove('grid_anim_out');}, 302);
    setTimeout(function() {page_text.classList.add('grid_anim_in');}, 302);
}

const activePage = (targetBtnImg) => {
    const currentBtn = btns.querySelector('.active_btn'); //div of the current btn
    const currentBtnImg = currentBtn.querySelector('.grid_dbl_btn_img'); //img of current btn
    const targetBtn = targetBtnImg.parentNode; //div of target btn clicked

    currentBtnImg.classList.remove('grid_btn_active');
    targetBtnImg.classList.add('grid_btn_active');
    currentBtn.classList.remove('active_btn');
    targetBtn.classList.add('active_btn');
}

btn_home.addEventListener('click', (e) => {
    const btn_images = btn_img_map.btn_home_imgs;
    const targetBtnImg =  btn_home;

    activePage(targetBtnImg);
    changePage("Home Page");
    changeImage(img_l, btn_images[0]);
    changeImage(img_r, btn_images[1]);
})

btn_projects.addEventListener('click', (e) => {
    const btn_images = btn_img_map.btn_projects_imgs;
    const targetBtnImg =  btn_projects;

    activePage(targetBtnImg);
    changePage("Projects & Experience Page");
    changeImage(img_l, btn_images[0]);
    changeImage(img_r, btn_images[1]);
})

btn_hobbies.addEventListener('click', (e) => {
    const btn_images = btn_img_map.btn_hobbies_imgs;
    const targetBtnImg =  btn_hobbies;

    changePage("Hobbies & Interests Page");
    activePage(targetBtnImg);
    changeImage(img_l, btn_images[0]);
    changeImage(img_r, btn_images[1]);
})

btn_hiwm.addEventListener('click', (e) => {
    const btn_images = btn_img_map.btn_hiwm_imgs;
    const targetBtnImg =  btn_hiwm;

    activePage(targetBtnImg);
    changePage("How It Was Made Page");
    changeImage(img_l, btn_images[0]);
    changeImage(img_r, btn_images[1]);
})

//======================= Grid Double Image Change Functions =======================
const deut_btn = document.querySelector('.deuteran-btn');
const trit_btn = document.querySelector('.tritan-btn');
const prot_btn = document.querySelector('.protan-btn');
const mono_btn = document.querySelector('.mono-btn');
const norm_btn = document.querySelector('.normal-btn');
const grid_trpl_img = document.querySelector('.grid_trpl_img');
const trpl_btns = document.querySelector('.grid_trpl_btn_container');

const sample_img = document.querySelector('.grid_trpl_sample_img');
const type = document.querySelector('.blind_type');
const desc = document.querySelector('.blind_desc');
const color_sample = document.querySelector('.color_sample');
const color_palette = document.querySelector('.color_palette');


const trpl_btn_img_map = {
    deut_imgs: ['images/color_blind/deut/d_sample.png', 'images/color_blind/deut/d_color_sample.png', 'images/color_blind/deut/d_color_palette.png'],
    trit_imgs: ['images/color_blind/trit/t_sample.png', 'images/color_blind/trit/t_color_sample.png', 'images/color_blind/trit/t_color_palette.png'],
    prot_imgs: ['images/color_blind/prot/p_sample.png', 'images/color_blind/prot/p_color_sample.png', 'images/color_blind/prot/p_color_palette.png'],
    mono_imgs: ['images/color_blind/mono/m_sample.png', 'images/color_blind/mono/m_color_sample.png', 'images/color_blind/mono/m_color_palette.png'],
    norm_imgs: ['images/color_blind/norm/sample.png', 'images/color_blind/norm/color_sample.png', 'images/color_blind/norm/color_palette.png']
};

const desc_type = {
    deut: 'The most common type of red-green color vision deficiency. A person with deuteranomaly has difficulty distinguishing red and green where green appears more like red.',
    prot: 'Another type of red-green color vision deficiency that is "red-weak". Any red seen appears to be like green.',
    trit: 'A form of blue-yellow color vision deficiency where green is seen as blue and yellow cannot be perceived.',
    mono: 'This simulates complete colorblindness. Though it is rare, these people cannot see colors at all.',
    norm: 'How normal vision views the world. In the eyes, all three color cones (red, green, blue) work together to distinguish thousands of color.'
}

const trpl_active_button_change = (targetBtn) => {
    const currentBtn = trpl_btns.querySelector('.grid_trpl_active'); //button element of current active button

    currentBtn.classList.remove('grid_trpl_active');
    targetBtn.classList.add('grid_trpl_active');
}

const changeType = (new_type) => {
    type.classList.remove('grid_anim_in');
    type.classList.add('grid_anim_out');
    setTimeout(function() {type.innerText = new_type}, 301);
    setTimeout(function() {type.classList.remove('grid_anim_out');}, 302);
    setTimeout(function() {type.classList.add('grid_anim_in');}, 302);
}

const changeDesc = (new_desc) => {
    desc.classList.remove('grid_anim_in');
    desc.classList.add('grid_anim_out');
    setTimeout(function() {desc.innerText = new_desc}, 301);
    setTimeout(function() {desc.classList.remove('grid_anim_out');}, 302);
    setTimeout(function() {desc.classList.add('grid_anim_in');}, 302);
}

deut_btn.addEventListener('click', (e) => {
    const trpl_btn_images = trpl_btn_img_map.deut_imgs;

    trpl_active_button_change(deut_btn);
    changeType('Deuteranomaly');
    changeDesc(desc_type.deut);

    changeImage(sample_img, trpl_btn_images[0]);
    changeImage(color_sample, trpl_btn_images[1]);
    changeImage(color_palette, trpl_btn_images[2]);
})

trit_btn.addEventListener('click', (e) => {
    const trpl_btn_images = trpl_btn_img_map.trit_imgs;

    trpl_active_button_change(trit_btn);
    changeType('Tritanomaly');
    changeDesc(desc_type.trit);

    changeImage(sample_img, trpl_btn_images[0]);
    changeImage(color_sample, trpl_btn_images[1]);
    changeImage(color_palette, trpl_btn_images[2]);
})

prot_btn.addEventListener('click', (e) => {
    const trpl_btn_images = trpl_btn_img_map.prot_imgs;

    trpl_active_button_change(prot_btn);
    changeType('Protanomaly');
    changeDesc(desc_type.prot);
    
    changeImage(sample_img, trpl_btn_images[0]);
    changeImage(color_sample, trpl_btn_images[1]);
    changeImage(color_palette, trpl_btn_images[2]);
})

mono_btn.addEventListener('click', (e) => {
    const trpl_btn_images = trpl_btn_img_map.mono_imgs;

    trpl_active_button_change(mono_btn);
    changeType('Monochromacy');
    changeDesc(desc_type.mono);
    
    changeImage(sample_img, trpl_btn_images[0]);
    changeImage(color_sample, trpl_btn_images[1]);
    changeImage(color_palette, trpl_btn_images[2]);
})

norm_btn.addEventListener('click', (e) => {
    const trpl_btn_images = trpl_btn_img_map.norm_imgs;

    trpl_active_button_change(norm_btn);
    changeType('Normal Vision');
    changeDesc(desc_type.norm);
    
    changeImage(sample_img, trpl_btn_images[0]);
    changeImage(color_sample, trpl_btn_images[1]);
    changeImage(color_palette, trpl_btn_images[2]);
})

