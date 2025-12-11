/**
 * Template Name: MyResume
 * Template URL: https://bootstrapmade.com/free-html-bootstrap-template-my-resume/
 * Updated: Jun 29 2024 with Bootstrap v5.3.3
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */

(function() {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  /**
   * Project Filter Functionality with Show More - SIMPLIFIED VERSION
   */
  function initProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const allProjects = document.querySelectorAll('.project-item');
    const showMoreBtn = document.getElementById('showMoreBtn');
    
    if (!filterButtons.length || !allProjects.length) return;
    
    // Track visible projects per filter
    let currentFilter = '*';
    let isExpanded = false;
    
    // Function to hide all projects except first 3
    function hideAllProjectsExceptFirstThree() {
      allProjects.forEach((project, index) => {
        if (index >= 3) {
          project.style.display = 'none';
          project.style.opacity = '0';
          project.style.transform = 'translateY(20px)';
        }
      });
    }
    
    // Function to show/hide projects based on filter
    function filterProjects(filter) {
      currentFilter = filter;
      isExpanded = false;
      if (showMoreBtn) {
        showMoreBtn.innerHTML = 'Show More Projects <i class="bi bi-arrow-down"></i>';
      }
      
      let visibleCount = 0;
      
      allProjects.forEach(project => {
        const isMatch = filter === '*' || project.classList.contains(filter.substring(1));
        
        if (isMatch) {
          if (visibleCount < 3) {
            // Show first 3 matching projects
            project.style.display = 'block';
            setTimeout(() => {
              project.style.opacity = '1';
              project.style.transform = 'translateY(0)';
            }, 100);
            visibleCount++;
          } else {
            // Hide other matching projects
            project.style.display = 'none';
            project.style.opacity = '0';
            project.style.transform = 'translateY(20px)';
          }
        } else {
          // Hide non-matching projects
          project.style.display = 'none';
          project.style.opacity = '0';
          project.style.transform = 'translateY(20px)';
        }
      });
      
      // Show/hide Show More button
      if (showMoreBtn) {
        const matchingProjects = Array.from(allProjects).filter(project => 
          filter === '*' || project.classList.contains(filter.substring(1))
        );
        
        if (matchingProjects.length > 3) {
          showMoreBtn.style.display = 'inline-block';
        } else {
          showMoreBtn.style.display = 'none';
        }
      }
    }
    
    // Function to toggle show all/less
    function toggleShowMore() {
      isExpanded = !isExpanded;
      
      if (isExpanded) {
        // Show all matching projects
        allProjects.forEach(project => {
          const isMatch = currentFilter === '*' || project.classList.contains(currentFilter.substring(1));
          if (isMatch) {
            project.style.display = 'block';
            setTimeout(() => {
              project.style.opacity = '1';
              project.style.transform = 'translateY(0)';
            }, 100);
          }
        });
        showMoreBtn.innerHTML = 'Show Less <i class="bi bi-arrow-up"></i>';
      } else {
        // Show only first 3 matching projects
        filterProjects(currentFilter);
      }
    }
    
    // Initially hide all projects except first 3
    hideAllProjectsExceptFirstThree();
    
    // Initialize with all projects (first 3)
    filterProjects('*');
    
    // Filter buttons click handler
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Filter projects
        const filterValue = this.getAttribute('data-filter');
        filterProjects(filterValue);
      });
    });
    
    // Show More button click handler
    if (showMoreBtn) {
      showMoreBtn.addEventListener('click', toggleShowMore);
    }
  }

  // Initialize project filter when DOM is loaded
  document.addEventListener('DOMContentLoaded', function() {
    // Hide projects immediately
    const allProjects = document.querySelectorAll('.project-item');
    allProjects.forEach((project, index) => {
      if (index >= 3) {
        project.style.display = 'none';
      }
    });
    
    // Then initialize filter with small delay
    setTimeout(initProjectFilter, 100);
  });

})();