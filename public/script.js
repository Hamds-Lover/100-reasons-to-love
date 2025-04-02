let currentPage = 1
const totalPages = 10

document.addEventListener("DOMContentLoaded", () => {
  // Set up event listeners for navigation arrows
  const leftArrow = document.getElementById("left-arrow")
  const rightArrow = document.getElementById("right-arrow")

  leftArrow.addEventListener("click", prevPage)
  rightArrow.addEventListener("click", nextPage)

  // Add keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") prevPage()
    if (e.key === "ArrowRight") nextPage()
  })

  // Load reasons for all pages
  for (let i = 1; i <= totalPages; i++) {
    renderPage(i)
  }

  // Create floating hearts in the background
  createFloatingHearts()

  // Update navigation arrows visibility
  updateArrows()

  // Add page numbers to counter
  document.getElementById("current-page").textContent = currentPage
  document.getElementById("total-pages").textContent = totalPages
})

// Create floating hearts in the background
function createFloatingHearts() {
  const background = document.querySelector(".hearts")
  const heartCount = 20

  for (let i = 0; i < heartCount; i++) {
    const heart = document.createElement("div")
    heart.className = "floating-heart"
    heart.innerHTML = "♥"
    heart.style.left = `${Math.random() * 100}%`
    heart.style.top = `${Math.random() * 100}%`
    heart.style.fontSize = `${Math.random() * 20 + 10}px`
    heart.style.opacity = `${Math.random() * 0.5 + 0.1}`
    heart.style.color = `rgba(255, ${Math.floor(Math.random() * 100) + 100}, ${Math.floor(Math.random() * 50) + 150}, 0.7)`
    heart.style.position = "absolute"
    heart.style.animation = `float ${Math.random() * 10 + 10}s linear infinite, pulse ${Math.random() * 2 + 2}s ease-in-out infinite alternate`
    heart.style.animationDelay = `${Math.random() * 5}s`
    heart.style.transform = `rotate(${Math.random() * 40 - 20}deg)`

    background.appendChild(heart)
  }

  // Add CSS for the animations
  const style = document.createElement("style")
  style.textContent = `
    @keyframes float {
      0% { transform: translate(0, 0) rotate(0deg); }
      25% { transform: translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px) rotate(${Math.random() * 20}deg); }
      50% { transform: translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px) rotate(${Math.random() * 20}deg); }
      75% { transform: translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px) rotate(${Math.random() * 20}deg); }
      100% { transform: translate(0, 0) rotate(0deg); }
    }
    
    @keyframes pulse {
      0% { transform: scale(1); }
      100% { transform: scale(1.2); }
    }
  `
  document.head.appendChild(style)
}

async function renderPage(pageNum) {
  try {
    const response = await axios.get(`https://one00-reasons-to-love.onrender.com/api/reasons/${pageNum}`)
    const reasons = response.data
    const listElement = document.getElementById(`reasons-page-${pageNum}`)
    if (listElement) {
      listElement.innerHTML = reasons.map((reason) => `<li>${reason}</li>`).join("")
    }
  } catch (error) {
    console.error("Failed to load reasons:", error)
    // Fallback content in case API fails
    const listElement = document.getElementById(`reasons-page-${pageNum}`)
    if (listElement) {
      listElement.innerHTML = `<li>I love how you make me smile</li>
                              <li>Your kindness touches everyone around you</li>
                              <li>The way your eyes light up when you're happy</li>`
    }
  }
}

function nextPage() {
  if (currentPage >= totalPages) return

  const current = document.getElementById(`page-${currentPage}`)
  const next = document.getElementById(`page-${currentPage + 1}`)

  // Add animation class
  current.classList.add("flipping")

  // Update page after animation completes
  setTimeout(() => {
    current.classList.add("hidden")
    current.classList.remove("flipping")
    next.classList.remove("hidden")

    // Update current page
    currentPage++
    document.getElementById("current-page").textContent = currentPage

    // Update arrows
    updateArrows()

    // Add page turn sound effect
    playPageTurnSound()
  }, 400)
}

function prevPage() {
  if (currentPage <= 1) return

  const current = document.getElementById(`page-${currentPage}`)
  const prev = document.getElementById(`page-${currentPage - 1}`)

  // Show previous page
  prev.classList.remove("hidden")
  prev.classList.add("flipping-back")

  // Update after animation
  setTimeout(() => {
    current.classList.add("hidden")
    prev.classList.remove("flipping-back")

    // Update current page
    currentPage--
    document.getElementById("current-page").textContent = currentPage

    // Update arrows
    updateArrows()

    // Add page turn sound effect
    playPageTurnSound()
  }, 400)
}

function updateArrows() {
  const leftArrow = document.getElementById("left-arrow")
  const rightArrow = document.getElementById("right-arrow")

  // Update visibility based on current page
  leftArrow.style.opacity = currentPage === 1 ? "0.3" : "1"
  leftArrow.style.pointerEvents = currentPage === 1 ? "none" : "auto"

  rightArrow.style.opacity = currentPage === totalPages ? "0.3" : "1"
  rightArrow.style.pointerEvents = currentPage === totalPages ? "none" : "auto"
}

function playPageTurnSound() {
  // Create a subtle page turn sound
  const audio = new Audio();
  audio.src = \'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAASAAAeMwAUFBQUFCIiIiIiIjAwMDAwMD4+Pj4+PkxMTExMTFpaWlpaWmhoaGhoaHZ2dnZ2doSEhISEhJKSkpKSkqCgoKCgoK6urq6urrKysr6+vr6+vsbGxsbGxtDQ0NDQ0NjY2NjY2ODg4ODg4Orq6urq6vLy8vLy8vr6+vr6+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/7UGQAAAdsVkFpGAAITgpJLSMAAQ2RWOHkZghClCkcvIwAAwEAD+/gYL/5eGcwNnMw5IEJWdSn/3cLG3o0N/ghIRUcs3OTTnTcu1Qz0JBQoVHS0tFQ0eFQ0eKpo6WjxUdHSoaOlRUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR0qKjo6VDR4jjRUNHSoqOjpUNHiONFQ0dKio6OlQ0eI40VDR

