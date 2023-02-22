const sections = document.querySelectorAll(".section");
const nextBtn = document.querySelector(".next.btn");
const backBtn = document.querySelector(".back.btn");
const steps = document.querySelectorAll(".step");
const inputs = document.querySelectorAll("form input");
const plans = document.querySelectorAll(".plan");
const services = document.querySelectorAll(".service");
const checkboxes = document.querySelectorAll(".service .checkbox");
const periodMonth = document.querySelector("#monthly");
const periodYear = document.querySelector("#yearly");
const periodToggle = document.querySelector(".toggle");
const headerPlans = document.querySelectorAll(".plan header");
const arcadePrice = document.querySelector(".arcade.price");
const advancedPrice = document.querySelector(".advanced.price");
const proPrice = document.querySelector(".pro.price");
const onlinePrice = document.querySelector(".online.price");
const largerPrice = document.querySelector(".larger.price");
const customPrice = document.querySelector(".custom.price");
const changePlan = document.querySelector(".change-plan");

arcadePrice.value = 9;
advancedPrice.value = 12;
proPrice.value = 15;
onlinePrice.value = 1;
largerPrice.value = 2;
customPrice.value = 2;

let currentSection = 0;

nextBtn.addEventListener("click", () => {
  if (currentSection === 0) {
    formValidation();
    for (let i = 0; i <= inputs.length - 1; i++) {
      if (inputs[i].classList.contains("wrong")) {
        return;
      }
    }
  }

  currentSection++;

  if (currentSection !== 0 && currentSection != sections.length - 1) {
    backBtn.classList.remove("hidden");
  }

  if (currentSection === sections.length - 1) {
    nextBtn.classList.add("hidden");
    backBtn.classList.add("hidden");
  }

  if (currentSection === sections.length - 2) {
    const chosenPlan = document.querySelector(".chosen-plan strong");
    const chosenPlanPrice = document.querySelector(
      ".purchase-summary header .price"
    );
    const activePlan = document.querySelector(".plan.active .subtitle");
    const activePlanPrice = document.querySelector(".plan.active .price");

    const activePeriod = document.querySelector(".period.active");
    let periodText;

    const totalText = document.querySelector(".total-summary .total-text");
    let totalSubText;

    if (activePeriod.innerText === "Monthly") {
      periodText = "mo";
      totalSubText = "per month";
    } else {
      periodText = "yr";
      totalSubText = "per year";
    }

    const activeServices = document.querySelectorAll(
      ".service.active .subtitle"
    );
    const activeServicePrices = document.querySelectorAll(
      ".service.active .price"
    );

    const chosenFirstService = document.querySelector(".chosen-1 .type");
    const chosenFirstServicePrice = document.querySelector(".chosen-1 .price");
    const chosenSecondService = document.querySelector(".chosen-2 .type");
    const chosenSecondServicePrice = document.querySelector(".chosen-2 .price");
    const chosenThirdService = document.querySelector(".chosen-3 .type");
    const chosenThirdServicePrice = document.querySelector(".chosen-3 .price");

    const totalPrice = document.querySelector(".total-summary .total-price");

    chosenPlan.innerText = `${activePlan.innerText} (${activePeriod.innerText})`;
    chosenPlanPrice.innerText = activePlanPrice.innerText;
    chosenPlanPrice.value = activePlanPrice.value;

    if (activeServices[0]) {
      chosenFirstService.innerText = activeServices[0].innerText;
      chosenFirstServicePrice.innerText = activeServicePrices[0].innerText;
      chosenFirstServicePrice.value = activeServicePrices[0].value;
    } else {
      chosenFirstService.innerText = null;
      chosenFirstServicePrice.innerText = null;
      chosenFirstServicePrice.value = null;
      chosenFirstServicePrice.value = null;
    }

    if (activeServices[1]) {
      chosenSecondService.innerText = activeServices[1].innerText;
      chosenSecondServicePrice.innerText = activeServicePrices[1].innerText;
      chosenSecondServicePrice.value = activeServicePrices[1].value;
    } else {
      chosenSecondService.innerText = null;
      chosenSecondServicePrice.innerText = null;
      chosenSecondServicePrice.value = null;
      chosenSecondServicePrice.value = null;
    }

    if (activeServices[2]) {
      chosenThirdService.innerText = activeServices[2].innerText;
      chosenThirdServicePrice.innerText = activeServicePrices[2].innerText;
      chosenThirdServicePrice.value = activeServicePrices[2].value;
    } else {
      chosenThirdService.innerText = null;
      chosenThirdServicePrice.innerText = null;
      chosenThirdServicePrice.value = null;
      chosenThirdServicePrice.value = null;
    }

    const sum = parseInt(
      chosenPlanPrice.value +
        chosenFirstServicePrice.value +
        chosenSecondServicePrice.value +
        chosenThirdServicePrice.value
    );

    totalText.innerText = `Total (${totalSubText})`;
    totalPrice.innerText = `+$${sum}/${periodText}`;

    nextBtn.innerText = "Confirm";
    nextBtn.classList.add("purplish");
  }

  hideShownSection();
  showNextSection();
});

backBtn.addEventListener("click", () => {
  currentSection--;

  if (currentSection === 0) {
    backBtn.classList.add("hidden");
  }

  if (currentSection !== 0 && currentSection != sections.length - 1) {
    backBtn.classList.remove("hidden");
  }

  if (currentSection !== sections.length - 2) {
    nextBtn.innerText = "Next Step";
    nextBtn.classList.remove("purplish");
  }

  hideShownSection();
  showNextSection();
});

for (let i = 0; i <= plans.length - 1; i++) {
  plans[i].addEventListener("click", () => {
    let clickedPlan = plans[i];
    clickedPlan.classList.add("active");
    for (let j = 0; j <= plans.length - 1; j++) {
      if (plans[j] !== clickedPlan && plans[j].classList.contains("active")) {
        plans[j].classList.remove("active");
      }
    }
  });
}

for (let i = 0; i <= services.length - 1; i++) {
  services[i].addEventListener("click", () => {
    if (services[i].classList.contains("active")) {
      services[i].classList.remove("active");
      checkboxes[i].checked = false;
    } else {
      services[i].classList.add("active");
      checkboxes[i].checked = true;
    }
  });
}

periodToggle.addEventListener("click", () => {
  if (periodMonth.classList.contains("active")) {
    periodMonth.classList.remove("active");
    periodYear.classList.add("active");
    periodToggle.src = "assets/images/toggle-yearly.svg";

    arcadePrice.innerText = "$90/yr";
    arcadePrice.value = 90;

    advancedPrice.innerText = "$120/yr";
    advancedPrice.value = 120;

    proPrice.innerText = "$150/yr";
    proPrice.value = 150;

    headerPlans.forEach((headerPlan) => {
      let paragraph = document.createElement("p");
      paragraph.classList.add("promo");
      paragraph.innerText = "2 months free";
      headerPlan.appendChild(paragraph);
    });

    onlinePrice.innerText = "+$10/yr";
    onlinePrice.value = 10;

    largerPrice.innerText = "+$20/yr";
    largerPrice.value = 20;

    customPrice.innerText = "+$20/yr";
    customPrice.value = 20;
  } else {
    periodYear.classList.remove("active");
    periodMonth.classList.add("active");
    periodToggle.src = "assets/images/toggle-monthly.svg";

    arcadePrice.innerText = "$9/mo";
    arcadePrice.value = 9;

    advancedPrice.innerText = "$12/mo";
    advancedPrice.value = 12;

    proPrice.innerText = "$15/mo";
    proPrice.value = 15;

    onlinePrice.innerText = "+$1/mo";
    onlinePrice.value = 1;

    largerPrice.innerText = "+$2/mo";
    largerPrice.value = 2;

    customPrice.innerText = "+$2/mo";
    customPrice.value = 2;

    headerPlans.forEach((headerPlan) => {
      headerPlan.removeChild(headerPlan.lastChild);
    });
  }
});

changePlan.addEventListener("click", () => {
  for (let i = 0; i <= sections.length - 1; i++) {
    if (i !== 1) {
      sections[i].classList.add("hidden");
    } else {
      sections[i].classList.remove("hidden");
      currentSection = 1;
    }
  }
});

function hideShownSection() {
  let shownSection;
  let activeStep;

  sections.forEach((section) => {
    if (!section.classList.contains("hidden")) {
      shownSection = section;
    }
  });

  shownSection.classList.add("hidden");

  steps.forEach((step) => {
    if (step.classList.contains("active")) {
      activeStep = step;
    }
  });

  activeStep.classList.remove("active");
}

function showNextSection() {
  sections[currentSection].classList.remove("hidden");
  steps[currentSection].classList.add("active");
}

function formValidation() {
  const inputName = document.querySelector("input#name");
  const inputEmail = document.querySelector("input#email");
  const inputPhone = document.querySelector("input#phone");

  if (inputName.value === "") {
    inputName.classList.add("wrong");
  } else {
    inputName.classList.remove("wrong");
  }

  if (!inputEmail.value.includes("@") || !inputEmail.value.includes(".com")) {
    inputEmail.classList.add("wrong");
  } else {
    inputEmail.classList.remove("wrong");
  }

  if (
    isNaN(inputPhone.value) ||
    inputPhone.value === "" ||
    inputPhone.value.length < 9
  ) {
    inputPhone.classList.add("wrong");
  } else {
    inputPhone.classList.remove("wrong");
  }
}
