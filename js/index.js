import galleryItems from './app.js';

const galleryList = document.querySelector('.js-gallery');
const modalEl = document.querySelector('.js-lightbox');
const modalOverlay = document.querySelector('.lightbox__overlay');
const modalImg = document.querySelector('.lightbox__image');
const closeModalBtn = document.querySelector('[data-action="close-lightbox"]');
const body = document.querySelector('body');

const cardsMarkup = makeGalleryMarkup(galleryItems);

let currentIndex = 0;

galleryList.insertAdjacentHTML('beforeend', cardsMarkup);

function makeGalleryMarkup(images) {
  return images
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      loading="lazy"
      class="gallery__image lazyload"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
      
    />
  </a>
</li>`;
    })
    .join('');
}

galleryList.addEventListener('click', onCardClick);
modalOverlay.addEventListener('click', onOverlay);
closeModalBtn.addEventListener('click', closeModal);
// modalEl.addEventListener('click', closeModal);

function onCardClick(e) {
  e.preventDefault();
  console.log(e.target.nodeName);
  if (e.target.nodeName !== 'IMG') {
    return;
  }

  //   console.log(e.target.dataset.source);
  //     openModal(e.target.dataset.source);
  openModal(e);
}

function openModal(e) {
  modalEl.classList.add('is-open');
  body.classList.add('is-open');

  modalImg.src = e.target.dataset.source;
  modalImg.alt = e.target.alt;

  galleryItems.forEach(el => {
    if (el.original === modalImg.src) {
      currentIndex = galleryItems.indexOf(el);
    }
  });

  window.addEventListener('keydown', onListenerButton);
}

function closeModal() {
  modalEl.classList.remove('is-open');
  body.classList.remove('is-open');
  modalImg.src = '';
}

function onOverlay(e) {
  if (e.target !== modalOverlay) {
    return;
  }

  closeModal();
}

// window.addEventListener('keydown', onListenerButton);

function onListenerButton(e) {
  const ESCAPE = 'Escape';
  const ARROWRIGHT = 'ArrowRight';
  const ARROWLEFT = 'ArrowLeft';
  const isArrowRight = e.code === 'ArrowRight';
  const isArrowLeft = e.code === 'ArrowLeft';

  console.log(e);
  if (e.code === ESCAPE) {
    closeModal();
  }

  //   if (isArrowRight) {
  //     showNextImg(isArrowRight);
  //   }

  //   if (isArrowLeft) {
  //     showNextImg(isArrowLeft);
  //   }

  if (ARROWRIGHT || ARROWLEFT) {
    showNextImg(isArrowRight);
  }
}

const imglArr = galleryItems.map(img => img.original);
function showNextImg(direction) {
  let index;
  let currentImg = imglArr.indexOf(modalImg.src);
  index = direction ? currentImg + 1 : currentImg - 1;
  if (index < 0) {
    index = galleryItems.length + index;
  }
  if (index === galleryItems.length) {
    index = 0;
  }
  modalImg.src = imglArr[index];
}
