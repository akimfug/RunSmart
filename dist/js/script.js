/*! jQuery v3.6.4 | (c) OpenJS Foundation and other contributors | jquery.org/license */
// import jquery from node_modules/jquery/dist/jquery.min.js

document.addEventListener('DOMContentLoaded', function() {
	$('.carousel__inner').slick({
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		speed: 700,
		adaptiveHeight: false,
		prevArrow: '<button type="button" class="slick-prev"><img src="images/icons/left.png"></button>',
		nextArrow: '<button type="button" class="slick-next"><img src="images/icons/right.png"></button>',
		responsive: [
			{
			  breakpoint: 992,
			  settings: {
				dots: true,
				arrows: false
			  }
			}
		]
	});

	// activeToTab

	let tabsButtons = document.querySelectorAll('.catalog__tab');
	let activeClass = 'catalog__tab' + '_active';
	let catalogItems = document.querySelectorAll('.catalog__content');
	function addActiveToTab (tabs, active) {
		tabs.forEach((item, i) => {
			item.addEventListener('click', () => {
				removeActiveToTabs(tabs, active);
				item.classList.add(activeClass);	
				removeActiceToTabsContent(catalogItems, 'catalog__content_active')
				catalogItems[i].classList.add('catalog__content_active');
			});
			
		});
	}
	function removeActiceToTabsContent (tabsContent, active) {
		tabsContent.forEach((tab) => {
			tab.classList.remove(active)
		});
		
	}
	function removeActiveToTabs (tabs, active) {
		tabs.forEach(item => {
			item.classList.remove(active);

		}); 
	}

	addActiveToTab(tabsButtons, activeClass);

	// activeToContent

	let catalog__content = document.querySelectorAll('.catalog-item__content'),
		catalog__list = document.querySelectorAll('.catalog-item__list'),
		catalog__button = document.querySelectorAll('.catalog-item a'),
		activeContent = 'catalog-item__content_active',
		activeList = 'catalog-item__list_active';

	function toggleActiveTabsContent (i) {
		catalog__content[i].classList.toggle(activeContent);
		catalog__list[i].classList.toggle(activeList);
	}

	catalog__button.forEach((item, i) => {
		item.addEventListener('click', () => {
			toggleActiveTabsContent(Math.floor(i/2)); // как это работает: нужно делить нацело на 2 чтобы оно считало попорядку кнопки, иначе оно скачет
		});
	});

	//

	let databuttons = document.querySelectorAll('[data-modal="consultation"]'),
		overlay = document.querySelector('.overlay'),
		consultation = document.querySelector('#consultation'),
		order = document.querySelector('#order'),
		order__descr = document.querySelector('#order .modal__descr'),
		forms = document.querySelectorAll('.feed-form'),
		buttons_mini = document.querySelectorAll('.button_mini'),
		subtitle = document.querySelectorAll('.catalog-item__subtitle');
		activeModal = '';

	databuttons.forEach(item => {
		item.addEventListener('click', (e) => {
			let target = e.target
			showModal(consultation);
			activeModal = consultation;
			console.log(`открытие окна ${target.classList} или ${consultation}`)
		});
	});

	buttons_mini.forEach((item, i) => {
		item.addEventListener('click', () => {
			showModal(order);
			activeModal = order;
			order__descr.textContent = subtitle[i].textContent;
		})
	});

	overlay.addEventListener('click', (e) => {
		let target = e.target

		if (target.classList == 'overlay' && target.classList != 'modal' || target.classList == 'modal__close') {
			console.log(`закрытие окна ${target.classList}`)
			closeModal(activeModal);
		};
	});
	let activeModalsAmount = 0;
	function showModal (modal) {
		overlay.style.position = "fixed";
		overlay.style.display = "block";
		modal.style.display = "block";
		activeModalsAmount++;
	}
	function closeModal(modal) {
		modal.style.display = "none";
		activeModalsAmount--;

		if (activeModalsAmount == 0) {
			console.log('уничтожаем ' + overlay)
			overlay.style.display = 'none';
			overlay.style.position = "none";
		}
		
	}
	
	function validateForms(form){
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: {
					required: true
				},
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Введите свое имя",
                    minlength: jQuery.validator.format("Введите {0} символа!")
                  },
                phone: "Введите свой номер телефона",
                email: {
                  required: "Введите свою почту",
                  email: "Неправильно введен адрес почты"
                }
            }
        });
    };
	validateForms('.feed-form')
    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');

    $('input[name=phone]').mask("+7 (999) 999-99-99");

	$('form').submit(function(e) {
		e.preventDefault();

		if (!$(this).valid()) {
			return;
		}

		$.ajax({
			type: "POST",
			url: "mailer/smart.php",
			data: $(this).serialize()
		}).done(function() {
			$(this).find("input").val("");
			$('#consultation, #order').fadeOut();
			$('.overlay, #thanks').fadeIn('slow');
			$('form').trigger('reset');
		});
		return false;                                                                            
	});

	// smooth scroll and pageup

	window.addEventListener('scroll', function(event) {
		if (window.scrollY > 1600) {
			$('.pageup').fadeIn();
		} else {
			$('.pageup').fadeOut();
		}
	});

	new WOW().init();
});

