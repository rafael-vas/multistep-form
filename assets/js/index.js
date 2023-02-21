const sections = document.querySelectorAll(".section");
const nextBtn = document.querySelector(".next.btn")
const backBtn = document.querySelector(".back.btn")
const steps = document.querySelectorAll(".step");

let currentSection = 0;

nextBtn.addEventListener("click", () => {

    currentSection++;

    if (currentSection !== 0 && currentSection != sections.length - 1) {
        backBtn.classList.remove("hidden")
    }

    if (currentSection === sections.length - 1) {
        nextBtn.classList.add("hidden")
        backBtn.classList.add("hidden")
    }

    if (currentSection === sections.length - 2) {
        nextBtn.innerText = "Confirm"
        nextBtn.classList.add("purplish")
    }

    hideShownSection();
    showNextSection();
})

backBtn.addEventListener("click", () => {

    currentSection--;

    if (currentSection === 0) {
        backBtn.classList.add("hidden")
    }

    if (currentSection !== 0 && currentSection != sections.length - 1) {
        backBtn.classList.remove("hidden")
    }

    if (currentSection !== sections.length - 2) {
        nextBtn.innerText = "Next Step"
        nextBtn.classList.remove("purplish")
    }

    hideShownSection();
    showNextSection();
})

function hideShownSection() {
    let shownSection;
    let activeStep;

    sections.forEach(section => {
        if (!(section.classList.contains("hidden"))) {
            shownSection = section
        }
    })

    shownSection.classList.add("hidden")

    steps.forEach(step => {
        if (step.classList.contains("active")) {
            activeStep = step
        }
    })

    activeStep.classList.remove("active")
}

function showNextSection() {
    sections[currentSection].classList.remove("hidden");
    steps[currentSection].classList.add("active")
}