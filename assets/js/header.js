jQuery(document).ready(function() {

	// AOS Instance
	AOS.init();

	// Hero Carousel Animations
	jQuery('#carouselExampleCaptions').on('slide.bs.carousel', function (event) {
		jQuery('#carouselExampleCaptions .carousel-inner .carousel-item').removeClass('current-showing');
		jQuery('#carouselExampleCaptions .carousel-inner .carousel-item:nth-child('+ (++event.to) +')').addClass('current-showing');
	})
	
	if(jQuery('.zimmer-section').length) {
		class VerticalMouseDrivenCarousel {
			constructor(options = {}) {
				const _defaults = {
					carousel: ".js-carousel",
					bgImg: ".js-carousel-bg-img",
					list: ".js-carousel-list",
					listItem: ".js-carousel-list-item"
				};
		
				this.posY = 0;
		
				this.defaults = Object.assign({}, _defaults, options);
		
				this.initCursor();
				this.init();
				this.bgImgController();
			}
		
			//region getters
			getBgImgs() {
				return document.querySelectorAll(this.defaults.bgImg);
			}
		
			getListItems() {
				return document.querySelectorAll(this.defaults.listItem);
			}
		
			getList() {
				return document.querySelector(this.defaults.list);
			}
		
			getCarousel() {
				return document.querySelector(this.defaults.carousel);
			}
		
			init() {
				TweenMax.set(this.getBgImgs(), {
					autoAlpha: 0,
					scale: 1.05
				});
		
				TweenMax.set(this.getBgImgs()[0], {
					autoAlpha: 1,
					scale: 1
				});
		
				this.listItems = this.getListItems().length - 1;
				
				this.listOpacityController(0);
			}
		
			initCursor() {
				const listHeight = this.getList().clientHeight;
				const carouselHeight = this.getCarousel().clientHeight;
		
				this.getCarousel().addEventListener(
					"mousemove",
					event => {
						this.posY = event.pageY - this.getCarousel().offsetTop;
						let offset = -this.posY / carouselHeight * listHeight;
		
						TweenMax.to(this.getList(), 0.3, {
							y: offset,
							ease: Power4.easeOut
						});
					},
					false
				);
			}
		
			bgImgController() {
				for (const link of this.getListItems()) {
					link.addEventListener("mouseenter", ev => {
						let currentId = ev.currentTarget.dataset.itemId;
		
						this.listOpacityController(currentId);
		
						TweenMax.to(ev.currentTarget, 0.3, {
							autoAlpha: 1
						});
		
						TweenMax.to(".is-visible", 0.2, {
							autoAlpha: 0,
							scale: 1.05
						});
		
						if (!this.getBgImgs()[currentId].classList.contains("is-visible")) {
							this.getBgImgs()[currentId].classList.add("is-visible");
						}
		
						TweenMax.to(this.getBgImgs()[currentId], 0.6, {
							autoAlpha: 1,
							scale: 1
						});
					});
				}
			}
		
			listOpacityController(id) {
				id = parseInt(id);
				let aboveCurrent = this.listItems - id;
				let belowCurrent = parseInt(id);
		
				if (aboveCurrent > 0) {
					for (let i = 1; i <= aboveCurrent; i++) {
						let opacity = 0.5 / i;
						let offset = 5 * i;
						TweenMax.to(this.getListItems()[id + i], 0.5, {
							autoAlpha: opacity,
							x: offset,
							ease: Power3.easeOut
						});
					}
				}
		
				if (belowCurrent > 0) {
					for (let i = 0; i <= belowCurrent; i++) {
						let opacity = 0.5 / i;
						let offset = 5 * i;
						TweenMax.to(this.getListItems()[id - i], 0.5, {
							autoAlpha: opacity,
							x: offset,
							ease: Power3.easeOut
						});
					}
				}
			}
		}
		
		new VerticalMouseDrivenCarousel();
		
	}
	
	
	/* Fouth Section JS */
	(function() {
	
		var slidersContainer = document.querySelector('.sliders-container');
		if(slidersContainer) {
		// Initializing the numbers slider
		var msNumbers = new MomentumSlider({
			el: slidersContainer,
			cssClass: 'ms--numbers',
			range: [1, 3],
			rangeContent: function (i) {
				return '0' + i;
			},
			style: {
				transform: [{scale: [0.4, 1]}],
				opacity: [0, 1]
			},
			interactive: false
		});
	
		// Initializing the titles slider
		var titles = [
			'Nullam erat felis, pellentesque',
			'Lorem ipsum dolor sit',
			'Nullam erat felis, pellentesque'
		];
		var msTitles = new MomentumSlider({
			el: slidersContainer,
			cssClass: 'ms--titles',
			range: [0, 2],
			rangeContent: function (i) {
				return '<h3>'+ titles[i] +'</h3>';
			},
			vertical: true,
			reverse: true,
			style: {
				opacity: [0, 1]
			},
			interactive: false
		});
	
		// Initializing the links slider
		// var msLinks = new MomentumSlider({
		//     el: slidersContainer,
		//     cssClass: 'ms--links',
		//     range: [0, 3],
		//     // rangeContent: function () {
		//     //     return '<a class="ms-slide__link">View Case</a>';
		//     // },
		//     vertical: true,
		//     interactive: false
		// });
	
		// Get pagination items
		var pagination = document.querySelector('.pagination');
		var paginationItems = [].slice.call(pagination.children);
	
		// Initializing the images slider
		var msImages = new MomentumSlider({
			// Element to append the slider
			el: slidersContainer,
			// CSS class to reference the slider
			cssClass: 'ms--images',
			// Generate the 4 slides required
			range: [0, 2],
			rangeContent: function () {
				return '<div class="ms-slide__image-container"><div class="ms-slide__image"></div></div>';
			},
			// Syncronize the other sliders
			sync: [msNumbers, msTitles],
			// Styles to interpolate as we move the slider
			style: {
				'.ms-slide__image': {
					transform: [{scale: [1.5, 1]}]
				}
			},
			// Update pagination if slider change
			change: function(newIndex, oldIndex) {
				if (typeof oldIndex !== 'undefined') {
					paginationItems[oldIndex].classList.remove('pagination__item--active');
				}
				paginationItems[newIndex].classList.add('pagination__item--active');
			}
		});
	
		// Select corresponding slider item when a pagination button is clicked
		pagination.addEventListener('click', function(e) {
			if (e.target.matches('.pagination__button')) {
				var index = paginationItems.indexOf(e.target.parentNode);
				msImages.select(index);
			}
		});
		}
	
	
	})();
	
	// Header & ToTop Btn Handler
	jQuery(document).scroll(function() {
		var y = jQuery(this).scrollTop();
		if (y > 300) {
		  jQuery('#toTop').css('opacity', '1');	
		  jQuery('.main-header').addClass('inverted');
		} else {
		  jQuery('#toTop').css('opacity', '0');
		  jQuery('.main-header').removeClass('inverted');
		}
	});
	
	// Smooth Transition on targted sections
	jQuery('a.smooth-scroll').bind('click.smoothscroll',function (e) {
		e.preventDefault();
		var target = this.hash;
		$target = jQuery(target);
		jQuery('html, body').stop().animate({
			'scrollTop': $target.offset().top
		}, 700, 'swing');
	});
	
	// Sidebar Menu Transitions
	jQuery('.menu-icon').on('click', function() {
		jQuery('body').toggleClass('js_nav');
		jQuery('#close_mobile_menu').toggleClass('open');
	})
	jQuery('#close_mobile_menu').on('click', function() {
		jQuery('body').toggleClass('js_nav');
		jQuery('#close_mobile_menu').toggleClass('open');
	});
	
	// On Hover show Bootstrap4 dropdowns
	function toggleDropdown (e) {
		const _d = jQuery(e.target).closest('.dropdown'),
		  _m = jQuery('.dropdown-menu', _d);
		setTimeout(function(){
		  const shouldOpen = e.type !== 'click' && _d.is(':hover');
		  _m.toggleClass('show', shouldOpen);
		  _d.toggleClass('show', shouldOpen);
		  jQuery('[data-toggle="dropdown"]', _d).attr('aria-expanded', shouldOpen);
		}, e.type === 'mouseleave' ? 100 : 0);
	}
	jQuery('body')
	.on('mouseenter mouseleave','.dropdown',toggleDropdown)
	.on('click', '.dropdown-menu a', toggleDropdown);
	
	// Single Room Slider 2
	if(jQuery('.single-room-slider-2').length) {
		var owl = jQuery('.single-room-slider-2 .owl-carousel');
		owl.owlCarousel({
			loop: true,
			nav: true,
			items: 1,
			smartSpeed: 1000,
			responsive: {
				0: {
					items: 1
				}
			}
		});
		owl.on('translate.owl.carousel', function(event) {
		  var index = event.item.index;
		  
		  jQuery('.owl-item').eq(index).addClass('in')
		  jQuery('.owl-item').eq(index-1).addClass('out'); // previous (this is the current slide)
		  
		  jQuery('.owl-next, .owl-prev').prop('disabled', true);
		});
		owl.on('translated.owl.carousel', function(event) {
		  jQuery('.carousel .in').removeClass('in'); 
		  jQuery('.carousel .out').removeClass('out');
		  
		  jQuery('.owl-next, .owl-prev').prop('disabled', false);
		});
		// On prev add a class to the carousel and let CSS reverse animation
		jQuery('.owl-prev').on('click', function () {
		  owl.addClass('reverse');
		});
		// On next remove reverse class
		jQuery('.owl-next').on('click', function () {
		  owl.removeClass('reverse');
		});
	}

	// Mobile Nav Multi Menu Animations
	jQuery('.mobile_main_nav li.has-submenu > a').on('click', function() {
		jQuery('.mobile_main_nav').removeClass('mainnav_in').addClass('mainnav_out');
		jQuery('#submenu_container').show().removeClass('subnav_out').addClass('subnav_in');
		jQuery(this).siblings('.sub-menu').clone().appendTo('#submenu_container .slide-in-menu');
		setTimeout(()=> {
			jQuery('.mobile_main_nav').hide();
		}, 400)
	})

	// Close Sidebar Second level menu
	jQuery('.close-sidebar-submenu').on('click', function(e) {
		e.pr
		jQuery('.mobile_main_nav').show().removeClass('mainnav_out').addClass('mainnav_in');
		jQuery('#submenu_container').removeClass('subnav_in').addClass('subnav_out');
		
		setTimeout(()=> {
			jQuery('#submenu_container .slide-in-menu').empty();
			jQuery('#submenu_container').hide();
		}, 400)
	})

	
	
});

