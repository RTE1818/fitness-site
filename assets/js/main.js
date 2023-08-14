/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/*===== Show Menu =====*/
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/*===== Hide Menu =====*/
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))


/*=============== CHANGE BACKGROUND HEADER ===============*/
const scrollHeader = () =>{
    const header = document.getElementById('header')
    // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    this.scrollY >= 50 ? header.classList.add('bg-header') 
                       : header.classList.remove('bg-header')
}
window.addEventListener('scroll', scrollHeader)


/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')
    
const scrollActive = () =>{
  	const scrollY = window.pageYOffset

	sections.forEach(current =>{
		const sectionHeight = current.offsetHeight,
			  sectionTop = current.offsetTop - 58,
			  sectionId = current.getAttribute('id'),
			  sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

		if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
			sectionsClass.classList.add('active-link')
		}else{
			sectionsClass.classList.remove('active-link')
		}                                                    
	})
}
window.addEventListener('scroll', scrollActive)

/*=============== SHOW SCROLL UP ===============*/ 
const scrollUp = () =>{
	const scrollUp = document.getElementById('scroll-up')
    // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scrollup class
	this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
						: scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
})

sr.reveal(`.home__data, .footer__container, .footer__group`)
sr.reveal(`.home__img`, {delay: 700, origin: 'bottom'})
sr.reveal(`.logos__img, .program__card, .pricing__card`, {interval: 100})
sr.reveal(`.choose__img, .calculator__content`, {origin: 'left'})
sr.reveal(`.choose__content, .calculator__img`, {origin: 'right'})

/*=============== BMI CALCULATOR ===============*/
const calculatorForm = document.getElementById('calculator')
const calculatorHeight = document.getElementById('calculator-height')
const calculatorWeight = document.getElementById('calculator-weight')
const calculatorMessage = document.getElementById('calculator-message')

const calculateBMI = (e) => {
    e.preventDefault()

    if(calculatorHeight.value === '' || calculatorWeight.value === ''){
        calculatorMessage.classList.remove('color-green')
        calculatorMessage.classList.add('color-red')

        calculatorMessage.textContent = "Please provide your height and weight!"
        setTimeout(() => {
            calculatorMessage.textContent = ''
        }, 3000)
    } else {
        const height = calculatorHeight.value
        const weight = calculatorWeight.value
        const BMI = Math.round(weight / (height * height) * 703)

        if(BMI < 18.5) {
            calculatorMessage.classList.add('color-green')
            calculatorMessage.textContent = `Your BMI is ${BMI} and you are very lean!`
        } else if (BMI > 18.5 && BMI < 25) {
            calculatorMessage.classList.add('color-green')
            calculatorMessage.textContent = `Your BMI is ${BMI} and you are at a healthy weight.`
        } else {
            calculatorMessage.classList.add('color-red')
            calculatorMessage.textContent = `Your BMI is ${BMI} and you are obese.`
        }

        calculatorHeight.value = ''
        calculatorWeight.value = ''

        setTimeout(() => {
            calculatorMessage.textContent = ''
        }, 4000)
    }
}

calculatorForm.addEventListener('submit', calculateBMI)
/*=============== EMAIL JS ===============*/
const contactForm = document.getElementById('contact-form')
const contactMessage = document.getElementById('contact-message')
const contactEmail = document.getElementById('contact-email')

const sendEmail = (e) => {
    e.preventDefault()

    if(contactEmail.value === '') {
        contactMessage.classList.remove('color-green')
        contactMessage.classList.add('color-red')
        contactMessage.textContent = "Please enter your email to subscribe!"

        setTimeout(() => {
            contactMessage.textContent = ""
        }, 3000)
    } else {
        emailjs.sendForm('service_0w64odj', 'template_eyj6oem', '#contact-form', 'UdfQgPJQlrbHEEnGU')
            .then(() => {
                contactMessage.classList.add('color-green')
                contactMessage.textContent = "Subscription Confirmed"

                setTimeout(() => {
                    contactMessage.textContent = ""                    
                }, 3000)
            }, (error) => {
                contactMessage.classList.add('color-red')
                contactMessage.textContent = `Oh no, something went wrong! Error Details: ${error.text}`
            })
        
            contactEmail.value = ""
    }
}

contactForm.addEventListener('submit', sendEmail)