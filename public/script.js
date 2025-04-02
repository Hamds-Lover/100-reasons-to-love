let currentPage = 1;
const totalPages = 10; // Update this if you add more pages

document.addEventListener('DOMContentLoaded', () => {
    // Add arrow navigation
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
    
    updateArrows();
});

function nextPage() {
    if (currentPage >= totalPages) return;
    const current = document.getElementById(`page-${currentPage}`);
    const next = document.getElementById(`page-${currentPage + 1}`);
    
    current.style.transform = 'rotateY(-180deg)';
    setTimeout(() => {
        current.classList.add('hidden');
        next.classList.remove('hidden');
        next.style.transform = 'rotateY(0deg)';
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