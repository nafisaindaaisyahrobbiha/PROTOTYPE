/* ==========================================================================
   LITTLESEED PLANTS - WIREFRAME PROTOTYPE INTERACTION SCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const topSwitcherBtns = document.querySelectorAll('.screen-switch-btn');
  const bottomNavBtns = document.querySelectorAll('.nav-tab-item');
  const screens = document.querySelectorAll('.screen-view');

  // Function to switch visible screen
  function showScreen(targetId) {
    // Hide all screens
    screens.forEach(screen => {
      screen.classList.remove('active-screen');
    });

    // Show target screen
    const targetScreen = document.getElementById(targetId);
    if (targetScreen) {
      targetScreen.classList.add('active-screen');
    }

    // Update Top switcher buttons
    topSwitcherBtns.forEach(btn => {
      if (btn.getAttribute('data-target') === targetId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Update Bottom navigation items
    bottomNavBtns.forEach(btn => {
      if (btn.getAttribute('data-screen') === targetId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Scroll device to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Event Listeners for Top Switcher Bar
  topSwitcherBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      showScreen(targetId);
    });
  });

  // Event Listeners for Bottom Navigation
  bottomNavBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-screen');
      showScreen(targetId);
    });
  });

  // ==========================================================================
  // SCREEN 1: KUIS INTERACTION
  // ==========================================================================
  const quizGroups = document.querySelectorAll('[data-group]');
  quizGroups.forEach(group => {
    const buttons = group.querySelectorAll('.wire-option-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
      });
    });
  });

  const btnCariTanaman = document.getElementById('btnCariTanaman');
  if (btnCariTanaman) {
    btnCariTanaman.addEventListener('click', () => {
      // Transition to Screen 2: Katalog Tanaman
      showScreen('screen-katalog');
    });
  }

  // ==========================================================================
  // SCREEN 2: KATALOG INTERACTION
  // ==========================================================================
  const filterTags = document.querySelectorAll('.filter-tag');
  filterTags.forEach(tag => {
    tag.addEventListener('click', () => {
      filterTags.forEach(t => t.classList.remove('active'));
      tag.classList.add('active');
    });
  });

  const catalogCards = document.querySelectorAll('.catalog-card');
  catalogCards.forEach(card => {
    card.addEventListener('click', (e) => {
      // If plus button clicked, prevent opening guide
      if (e.target.classList.contains('catalog-card-btn')) {
        e.stopPropagation();
        e.target.textContent = e.target.textContent === '+' ? '✓' : '+';
        return;
      }
      // Jump to Screen 5: Panduan Perawatan
      const plantName = card.getAttribute('data-open-guide');
      const guideTitle = document.querySelector('#screen-panduan .guide-plant-name');
      if (guideTitle && plantName) {
        guideTitle.textContent = plantName.toUpperCase();
      }
      showScreen('screen-panduan');
    });
  });

  // ==========================================================================
  // SCREEN 3: FILTER RUANGAN INTERACTION
  // ==========================================================================
  const locationTabs = document.querySelectorAll('.location-tab-btn');
  const selectionTitle = document.querySelector('.selection-info-title');

  locationTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      locationTabs.forEach(t => t.classList.remove('selected'));
      tab.classList.add('selected');
      const cleanText = tab.textContent.replace(/[\[\]]/g, '').trim().toUpperCase();
      if (selectionTitle) {
        selectionTitle.textContent = `PILIHAN: ${cleanText}`;
      }
    });
  });

  const selectPlantBtns = document.querySelectorAll('.room-plant-select-btn');
  selectPlantBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.textContent === '[ PILIH ]') {
        btn.textContent = '[ DIPILIH ✓ ]';
        btn.style.background = '#000000';
        btn.style.color = '#ffffff';
      } else {
        btn.textContent = '[ PILIH ]';
        btn.style.background = '#ffffff';
        btn.style.color = '#111111';
      }
    });
  });

  // ==========================================================================
  // SCREEN 4: MODE TAMPILAN INTERACTION
  // ==========================================================================
  const btnModePemula = document.getElementById('btnModePemula');
  const btnModeKolektor = document.getElementById('btnModeKolektor');
  const valPenyiraman = document.getElementById('valPenyiraman');
  const valCahaya = document.getElementById('valCahaya');
  const valHewan = document.getElementById('valHewan');

  if (btnModePemula && btnModeKolektor) {
    btnModePemula.addEventListener('click', () => {
      btnModePemula.classList.add('selected');
      btnModeKolektor.classList.remove('selected');
      if (valPenyiraman) valPenyiraman.textContent = '2-3 minggu sekali';
      if (valCahaya) valCahaya.textContent = 'Teduh / Terang';
      if (valHewan) valHewan.textContent = 'Jauhkan dari anabul';
    });

    btnModeKolektor.addEventListener('click', () => {
      btnModeKolektor.classList.add('selected');
      btnModePemula.classList.remove('selected');
      if (valPenyiraman) valPenyiraman.textContent = 'Moisture Meter < 15%';
      if (valCahaya) valCahaya.textContent = 'Indirect 800-1500 Lux';
      if (valHewan) valHewan.textContent = 'Saponin Toxic (Tingkat 2)';
    });
  }

  // ==========================================================================
  // SCREEN 5: CHECKLIST PRA-BELI INTERACTION
  // ==========================================================================
  const checklistItems = document.querySelectorAll('.checklist-item');
  checklistItems.forEach(item => {
    item.addEventListener('click', () => {
      const box = item.querySelector('.checklist-checkbox');
      if (box) {
        box.classList.toggle('checked');
      }
    });
  });
});
