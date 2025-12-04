// ===================================
// Smooth Scrolling for Navigation Links
// ===================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()

    const targetId = this.getAttribute("href")
    if (targetId === "#") return

    const targetElement = document.querySelector(targetId)

    if (targetElement) {
      const navbarHeight = document.querySelector(".navbar").offsetHeight
      const targetPosition = targetElement.offsetTop - navbarHeight

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })

      // Close mobile menu if open
      const navbarCollapse = document.querySelector(".navbar-collapse")
      if (navbarCollapse.classList.contains("show")) {
        const bsCollapse = new window.bootstrap.Collapse(navbarCollapse)
        bsCollapse.hide()
      }
    }
  })
})

// ===================================
// Active Navigation Link on Scroll
// ===================================
window.addEventListener("scroll", () => {
  let current = ""
  const sections = document.querySelectorAll("section[id]")
  const navbarHeight = document.querySelector(".navbar").offsetHeight

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - navbarHeight - 100
    const sectionHeight = section.offsetHeight

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id")
    }
  })

  document.querySelectorAll(".navbar-nav .nav-link").forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
})

// ===================================
// Back to Top Button
// ===================================
const backToTopButton = document.getElementById("backToTop")

// Show/hide button based on scroll position
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopButton.classList.add("show")
  } else {
    backToTopButton.classList.remove("show")
  }
})

// Scroll to top when button is clicked
backToTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
})

// ===================================
// Form Validation
// ===================================
const contactForm = document.getElementById("contactForm")
const formMessage = document.getElementById("formMessage")

contactForm.addEventListener("submit", function (event) {
  event.preventDefault()
  event.stopPropagation()

  // Remove any previous validation states
  const inputs = this.querySelectorAll(".form-control")
  inputs.forEach((input) => {
    input.classList.remove("is-valid", "is-invalid")
  })

  let isValid = true

  // Validate Name
  const nameInput = document.getElementById("name")
  const nameValue = nameInput.value.trim()

  if (nameValue.length < 2) {
    nameInput.classList.add("is-invalid")
    isValid = false
  } else {
    nameInput.classList.add("is-valid")
  }

  // Validate Email
  const emailInput = document.getElementById("email")
  const emailValue = emailInput.value.trim()
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!emailPattern.test(emailValue)) {
    emailInput.classList.add("is-invalid")
    isValid = false
  } else {
    emailInput.classList.add("is-valid")
  }

  // Validate Message
  const messageInput = document.getElementById("message")
  const messageValue = messageInput.value.trim()

  if (messageValue.length < 10) {
    messageInput.classList.add("is-invalid")
    isValid = false
  } else {
    messageInput.classList.add("is-valid")
  }

  // Subject is optional, so just mark as valid if it has content
  const subjectInput = document.getElementById("subject")
  if (subjectInput.value.trim().length > 0) {
    subjectInput.classList.add("is-valid")
  }

  // If form is valid, show success message
  if (isValid) {
    // Show success message
    formMessage.classList.remove("d-none")

    // Reset form
    setTimeout(() => {
      contactForm.reset()
      inputs.forEach((input) => {
        input.classList.remove("is-valid")
      })

      // Hide message after 5 seconds
      setTimeout(() => {
        formMessage.classList.add("d-none")
      }, 5000)
    }, 1000)

    // Here you would typically send the form data to a server
    console.log("Form submitted successfully!", {
      name: nameValue,
      email: emailValue,
      subject: subjectInput.value.trim(),
      message: messageValue,
    })
  }

  // Add Bootstrap validation classes
  this.classList.add("was-validated")
})

// Real-time validation feedback
const formInputs = contactForm.querySelectorAll(".form-control")
formInputs.forEach((input) => {
  input.addEventListener("blur", function () {
    if (contactForm.classList.contains("was-validated")) {
      validateInput(this)
    }
  })

  input.addEventListener("input", function () {
    if (this.classList.contains("is-invalid") || this.classList.contains("is-valid")) {
      validateInput(this)
    }
  })
})

function validateInput(input) {
  const value = input.value.trim()

  input.classList.remove("is-valid", "is-invalid")

  if (input.id === "name") {
    if (value.length >= 2) {
      input.classList.add("is-valid")
    } else if (value.length > 0) {
      input.classList.add("is-invalid")
    }
  } else if (input.id === "email") {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (emailPattern.test(value)) {
      input.classList.add("is-valid")
    } else if (value.length > 0) {
      input.classList.add("is-invalid")
    }
  } else if (input.id === "message") {
    if (value.length >= 10) {
      input.classList.add("is-valid")
    } else if (value.length > 0) {
      input.classList.add("is-invalid")
    }
  } else if (input.id === "subject") {
    if (value.length > 0) {
      input.classList.add("is-valid")
    }
  }
}

// ===================================
// Scroll Animations (Intersection Observer)
// ===================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe skill cards and project cards
document.querySelectorAll(".skill-card, .project-card, .contact-info-box").forEach((el) => {
  el.style.opacity = "0"
  el.style.transform = "translateY(30px)"
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  observer.observe(el)
})

// ===================================
// Navbar Background on Scroll
// ===================================
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 50) {
    navbar.style.backgroundColor = "rgba(15, 23, 42, 0.98)"
    navbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.4)"
  } else {
    navbar.style.backgroundColor = "rgba(15, 23, 42, 0.95)"
    navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.3)"
  }
})

// ===================================
// Console Message
// ===================================
console.log("%c👋 Welcome to my portfolio!", "color: #4F46E5; font-size: 20px; font-weight: bold;")
console.log("%cInterested in working together? Let's connect!", "color: #06B6D4; font-size: 14px;")
