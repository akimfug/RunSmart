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
});