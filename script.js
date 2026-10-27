document.addEventListener("DOMContentLoaded", function () {

  /* =====================================
     1. IMAGE SLIDER
  ===================================== */

  const slides = Array.from(
    document.querySelectorAll(".slide")
  );

  const dots = Array.from(
    document.querySelectorAll(".dot")
  );

  const prevButton = document.getElementById("prevSlide");
  const nextButton = document.getElementById("nextSlide");

  let currentSlide = 0;
  let slideTimer = null;

  const slideInterval = 4500;


  function showSlide(index) {

    if (slides.length === 0) {
      return;
    }

    currentSlide = (index + slides.length) % slides.length;

    slides.forEach(function (slide, i) {
      slide.classList.toggle("active", i === currentSlide);
    });

    dots.forEach(function (dot, i) {

      dot.classList.toggle("active", i === currentSlide);

      dot.setAttribute(
        "aria-current",
        i === currentSlide ? "true" : "false"
      );

    });

  }


  function stopAutoSlide() {

    if (slideTimer !== null) {
      clearInterval(slideTimer);
      slideTimer = null;
    }

  }


  function startAutoSlide() {

    stopAutoSlide();

    if (slides.length <= 1) {
      return;
    }

    slideTimer = setInterval(function () {
      showSlide(currentSlide + 1);
    }, slideInterval);

  }


  if (slides.length > 0) {
    showSlide(0);
    startAutoSlide();
  }


  if (nextButton) {

    nextButton.addEventListener("click", function () {
      showSlide(currentSlide + 1);
      startAutoSlide();
    });

  }


  if (prevButton) {

    prevButton.addEventListener("click", function () {
      showSlide(currentSlide - 1);
      startAutoSlide();
    });

  }


  dots.forEach(function (dot, index) {

    dot.addEventListener("click", function () {
      showSlide(index);
      startAutoSlide();
    });

  });


  /* =====================================
     2. MOBILE NAVIGATION
  ===================================== */

  const menuToggle = document.getElementById("menuToggle");
  const navbar = document.getElementById("navbar");


  if (menuToggle && navbar) {

    menuToggle.addEventListener("click", function () {

      const isOpen = navbar.classList.toggle("open");

      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
      );

      menuToggle.textContent = isOpen ? "✕" : "☰";

    });


    navbar.querySelectorAll("a").forEach(function (link) {

      link.addEventListener("click", function () {

        navbar.classList.remove("open");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");

        menuToggle.textContent = "☰";

      });

    });

  }


  /* =====================================
     3. SERVICE CARD ENQUIRY
  ===================================== */

  const serviceLinks = document.querySelectorAll("[data-service]");
  const serviceSelect = document.getElementById("service");


  serviceLinks.forEach(function (link) {

    link.addEventListener("click", function () {

      const selectedService = link.getAttribute("data-service");

      if (serviceSelect) {
        serviceSelect.value = selectedService;
      }

    });

  });


  /* =====================================
     4. COPYRIGHT YEAR
  ===================================== */

  const yearElement = document.getElementById("year");


  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }


  /* =====================================
     5. ENQUIRY FORM DETAILS
  ===================================== */

  const contactForm = document.getElementById("contactForm");

  const emailButton = document.getElementById("emailButton");

  const companyEmail =
    "financialserviceofficial089@gmail.com";

  /*
    WhatsApp number:
    Country code + phone number.
    Do not include +, spaces or hyphens.

    91 = India country code.
    72999 99696 = company WhatsApp number.
  */

  const whatsappNumber = "917299999696";


  function getEnquiryDetails() {

    const name = document.getElementById("name").value.trim();

    const phone = document.getElementById("phone").value.trim();

    const email = document.getElementById("email").value.trim();

    const service = document.getElementById("service").value;

    const amount = document.getElementById("amount").value.trim();

    const message = document.getElementById("message").value.trim();


    return {
      name: name,
      phone: phone,
      email: email,
      service: service,
      amount: amount,
      message: message
    };

  }


  function buildEnquiryMessage(details) {

    return (
      "TRICHY FINANCIAL SERVICE - NEW ENQUIRY\n\n" +

      "Name: " + details.name + "\n" +

      "Phone Number: " + details.phone + "\n" +

      "Email: " + (details.email || "Not provided") + "\n" +

      "Loan Type: " + details.service + "\n" +

      "Required Loan Amount: " +
      (details.amount ? "₹" + details.amount : "Not specified") +
      "\n" +

      "Additional Details: " +
      (details.message || "Not provided")
    );

  }


  function validateForm() {

    if (!contactForm) {
      return false;
    }

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return false;
    }

    return true;

  }


  /* =====================================
     6. SEND ENQUIRY ON WHATSAPP
  ===================================== */

  if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

      event.preventDefault();

      if (!validateForm()) {
        return;
      }

      const details = getEnquiryDetails();

      const enquiryMessage = buildEnquiryMessage(details);

      const whatsappURL =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        encodeURIComponent(enquiryMessage);


      window.open(
        whatsappURL,
        "_blank",
        "noopener,noreferrer"
      );

    });

  }


  /* =====================================
     7. SEND ENQUIRY BY EMAIL
  ===================================== */

  if (emailButton && contactForm) {

    emailButton.addEventListener("click", function () {

      if (!validateForm()) {
        return;
      }

      const details = getEnquiryDetails();

      const subject =
        "Loan Enquiry - " + details.service;

      const body = buildEnquiryMessage(details);


      const mailtoURL =
        "mailto:" +
        companyEmail +
        "?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(body);


      window.location.href = mailtoURL;

    });

  }

});