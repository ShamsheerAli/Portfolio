// Have focus outline only for keyboard users
const handleFirstTab = (e) => {
  if (e.key === 'Tab') {
    document.body.classList.add('user-is-tabbing');
    window.removeEventListener('keydown', handleFirstTab);
    window.addEventListener('mousedown', handleMouseDownOnce);
  }
};

const handleMouseDownOnce = () => {
  document.body.classList.remove('user-is-tabbing');
  window.removeEventListener('mousedown', handleMouseDownOnce);
  window.addEventListener('keydown', handleFirstTab);
};

window.addEventListener('keydown', handleFirstTab);

// Back to Top Button
const backToTopButton = document.querySelector(".back-to-top");
let isBackToTopRendered = false;

let alterStyles = (isBackToTopRendered) => {
  if (backToTopButton) {
    backToTopButton.style.visibility = isBackToTopRendered ? "visible" : "hidden";
    backToTopButton.style.opacity = isBackToTopRendered ? 1 : 0;
    backToTopButton.style.transform = isBackToTopRendered ? "scale(1)" : "scale(0)";
  }
};

window.addEventListener("scroll", () => {
  if (window.scrollY > 700) {
    isBackToTopRendered = true;
    alterStyles(isBackToTopRendered);
  } else {
    isBackToTopRendered = false;
    alterStyles(isBackToTopRendered);
  }
});

// Modal Functionality
document.addEventListener('DOMContentLoaded', function () {
  const resumeBtn = document.getElementById('resumeBtn');
  const modal = document.getElementById('resumeModal');
  const closeModal = document.getElementById('closeModal');

  if (resumeBtn) {
    resumeBtn.addEventListener('click', function () {
      if (modal) modal.style.display = 'flex';
    });
  }

  if (closeModal) {
    closeModal.addEventListener('click', function () {
      if (modal) modal.style.display = 'none';
    });
  }

  window.addEventListener('click', function (event) {
    if (event.target === modal) {
      if (modal) modal.style.display = 'none';
    }
  });

  window.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && modal && modal.style.display === 'flex') {
      modal.style.display = 'none';
    }
  });

  // --- NEW: Collapsible Card Functionality ---
  initCollapsibles();
});

/**
 * NEW: Finds all collapsible cards and sets them up.
 */
function initCollapsibles() {
  // Select all cards from all sections
  const cards = document.querySelectorAll('.work__box, .project__box, .leadership__box');

  cards.forEach(card => {
    const trigger = card.querySelector('h3');
    const workText = card.querySelector('.work__text');

    // Only proceed if a heading and text block exist
    if (!trigger || !workText) {
      return;
    }

    // Get all content *except* the h3
    const contentElements = Array.from(workText.children).filter(child => child.tagName !== 'H3');
    
    // If no content, don't make it collapsible
    if (contentElements.length === 0) {
      return;
    }

    // Create a wrapper for the content
    const contentWrapper = document.createElement('div');
    contentWrapper.className = 'collapsible-content';
    
    // Move all content elements into the wrapper
    contentElements.forEach(el => contentWrapper.appendChild(el));
    
    // Put the wrapper back into the .work__text
    workText.appendChild(contentWrapper);

    // Add the arrow to the trigger
    trigger.classList.add('collapsible-trigger');
    trigger.innerHTML += ' <span class="collapsible-arrow">▼</span>';

    // Add click event to the trigger (the h3)
    trigger.addEventListener('click', () => {
      card.classList.toggle('active');
    });
  });
}
