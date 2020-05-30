$(document).ready(() => {

  


  $("header").css({"position":"relative","opacity": 0, "left":"-=50"});
  $("header").animate({left:0, opacity:1},800);

  $(".intro svg").css({"position":"relative","opacity": 0, "left":"+=50"});
  $(".intro svg").delay(700).animate({left:0, opacity:1},800);

  window.sr = ScrollReveal({
    reset: false,
    duration: 600,
    easing: 'cubic-bezier(.694,0,.335,1)',
    scale: 1,
    
  });

  sr.reveal('.intro');
  sr.reveal('.background', { viewFactor: 0.4 });
  sr.reveal('.skills', { viewFactor: 0.4 });
  sr.reveal('.myPassion', { viewFactor: 0.4 });
  sr.reveal('.work', { viewFactor: 0.1 });
  // sr.reveal('.experience', { viewFactor: 0.2 });
  sr.reveal('footer');
  // sr.reveal('.other-projects', { viewFactor: 0.05 });
//ScrollReveal().reveal('.myPassion');
})





class TypeWriter {
  constructor(txtElement, words, wait = 1000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }

  type() {
    // Current index of word
    const current = this.wordIndex % this.words.length;
    // Get full text of current word
    const fullTxt = this.words[current];

    // Check if deleting
    if(this.isDeleting) {
      // Remove char
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      // Add char
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // Insert txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    // Initial Type Speed
    let typeSpeed = 200;

    if(this.isDeleting) {
      typeSpeed /= 2;
    }

    // If word is complete
    if(!this.isDeleting && this.txt === fullTxt) {
      // Make pause at end
      typeSpeed = this.wait;
      // Set delete to true
      this.isDeleting = true;
    } else if(this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      // Move to next word
      this.wordIndex++;
      // Pause before start typing
      typeSpeed = 200;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}


// Init On DOM Load
document.addEventListener('DOMContentLoaded', init);

// Init App
function init() {
  const txtElement = document.querySelector('.txt-type');
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  const wait = txtElement.getAttribute('data-wait');
  // Init TypeWriter
  new TypeWriter(txtElement, words, wait);
}