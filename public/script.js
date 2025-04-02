let currentPage = 1;
const totalPages = 10; // 10 pages total

document.addEventListener('DOMContentLoaded', () => {
  // Add navigation arrows
  const notebook = document.querySelector('.notebook');
  const leftArrow = document.createElement('div');
  leftArrow.className = 'nav-arrow left';
  leftArrow.innerHTML = '❮';
  leftArrow.addEventListener('click', prevPage);
  notebook.parentNode.insertBefore(leftArrow, notebook);

  const rightArrow = document.createElement('div');
  rightArrow.className = 'nav-arrow right';
  rightArrow.innerHTML = '❯';
  rightArrow.addEventListener('click', nextPage);
  notebook.parentNode.insertBefore(rightArrow, notebook);

  // Load reasons for all pages
  for (let i = 1; i <= totalPages; i++) {
    renderPage(i);
  }
  updateArrows();
});

async function renderPage(pageNum) {
  try {
    const response = await axios.get(`https://one00-reasons-to-love.onrender.com/api/reasons/${pageNum}`);
    const reasons = response.data;
    const listElement = document.getElementById(`reasons-page-${pageNum}`);
    if (listElement) {
      listElement.innerHTML = reasons.map(reason => `<li>${reason}</li>`).join('');
    }
  } catch (error) {
    console.error("Failed to load reasons:", error);
  }
}

function nextPage() {
  if (currentPage >= totalPages) return;
  const current = document.getElementById(`page-${currentPage}`);
  const next = document.getElementById(`page-${currentPage + 1}`);

  current.style.transform = 'rotateY(-180deg)';
  setTimeout(() => {
    current.classList.add('hidden');
    next.classList.remove('hidden');
    currentPage++;
    updateArrows();
  }, 600);
}

function prevPage() {
  if (currentPage <= 1) return;
  const current = document.getElementById(`page-${currentPage}`);
  const prev = document.getElementById(`page-${currentPage - 1}`);

  prev.style.transform = 'rotateY(0deg)';
  prev.classList.remove('hidden');
  setTimeout(() => {
    current.classList.add('hidden');
    currentPage--;
    updateArrows();
  }, 10);
}

function updateArrows() {
  const leftArrow = document.querySelector('.nav-arrow.left');
  const rightArrow = document.querySelector('.nav-arrow.right');
  leftArrow.style.opacity = currentPage === 1 ? '0.5' : '1';
  rightArrow.style.opacity = currentPage === totalPages ? '0.5' : '1';
}