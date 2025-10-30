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
  if (backToTopButton) { // Check if the button exists
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

// Modal Functionality (Original - No Changes Needed Here)
document.addEventListener('DOMContentLoaded', function () {
  const resumeBtn = document.getElementById('resumeBtn');
  const modal = document.getElementById('resumeModal');
  const closeModal = document.getElementById('closeModal');

  if (resumeBtn && modal && closeModal) { // Check elements exist
    resumeBtn.addEventListener('click', function () {
      modal.style.display = 'flex';
    });

    closeModal.addEventListener('click', function () {
      modal.style.display = 'none';
    });

    window.addEventListener('click', function (event) {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });

    window.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && modal.style.display === 'flex') {
        modal.style.display = 'none';
      }
    });
  }

  // --- ▼▼▼ UPDATED Collapsible Logic ▼▼▼ ---
  // Select all trigger elements *except* those inside the UX case study section
  const triggers = document.querySelectorAll(
      '.work__box .collapsible-trigger, ' +
      '.project__box:not(.ux-case-study__card) .collapsible-trigger, ' + // Exclude UX case study cards
      '.leadership__box .collapsible-trigger'
  );

  triggers.forEach(trigger => {
    // Find the closest parent card element that IS NOT a ux-case-study card
     const parentCard = trigger.closest('.work__box, .project__box:not(.ux-case-study__card), .leadership__box');
    if (!parentCard) return; // Skip if no parent card found or if it's a UX card

    // Find the content and arrow within that specific card
    const content = parentCard.querySelector('.collapsible-content');
    const arrow = trigger.querySelector('.collapsible-arrow');

    if (content && arrow) { // Make sure content and arrow exist
      // Initial setup: Add arrow and hide content
      arrow.textContent = '▼'; // Down arrow
      content.style.display = 'none'; // Initially hide content using JS
      parentCard.classList.remove('active'); // Ensure cards start closed

      trigger.addEventListener('click', () => {
        // console.log('Clicked trigger:', trigger.textContent.trim().split('▼')[0].split('▲')[0]); // Log heading text
        parentCard.classList.toggle('active'); // Toggle active class on the *parent card*

        // Animate open/close
        if (parentCard.classList.contains('active')) {
          content.style.display = 'block'; // Make it visible for animation
           // We need to force a reflow before setting max-height for transition to work correctly
          content.offsetHeight; // Trigger reflow
          content.style.maxHeight = content.scrollHeight + 'px'; // Set max-height to content height
          arrow.textContent = '▲'; // Up arrow
        } else {
          content.style.maxHeight = '0px'; // Collapse
          arrow.textContent = '▼'; // Down arrow
        }
      });

        // After collapse transition ends, set display to none for accessibility/tabbing
        content.addEventListener('transitionend', () => {
            if (!parentCard.classList.contains('active')) {
                content.style.display = 'none';
            }
        });

    } else {
        // If content/arrow not found, remove the trigger class to prevent confusion
        // trigger.classList.remove('collapsible-trigger');
        // console.warn("Collapsible content or arrow not found for trigger:", trigger);
    }
  });
  
});

