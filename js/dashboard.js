(function ($) {
  "use strict";
	
	// preloader
	$(window).on('load', function() {
		
		$('#preloader').fadeOut(1000, function () {
			$(this).remove();
		});
		
	});
	
	// display toggler menu
	$('.main-nav-toggler button').click(function(){
		$('.mobile-nav').removeClass('slideOutLeft').addClass('slideInLeft').show();
	});
	
	$('.mobile-nav .close').click(function(){
		$('.mobile-nav').removeClass('slideInLeft').addClass('slideOutLeft').hide();
	});
	
	// display live search box
	$(".live-search input, .top_live_search input").keyup(function(){
		$(".live-search .search-results, .top_live_search .search-results").show();
	});
	
	// live search
	$(".live-search input, .top_live_search input").keyup(function() {
       if($(this).val().length > 0) {
          $(".live-search .search-results, .top_live_search .search-results").show();
       }
       else {
          $(".live-search .search-results, .top_live_search .search-results").hide();
       }
    });
	
	// display pay screen
	$(".payNow").click(function(){
		$(".pay-screen").show();
		$(".dasboard").hide();
	});
	
	// go back drawer
	$(".back-drawer").click(function(){
		$(".pay-screen").hide();
		$(".dasboard").show();
	});
	
	// pay options
	$(".cash_pay_sets .button_set .btn, .cardPay").click(function(){
		
		// hide backdrop first to remove slow fadeout
		$('.modal-backdrop').css('display','none');
		
		$(".pay-options .under-process").hide();
		$(".pay-options .order-complete").show();
	});
	
	// order done
	$(".markDone").click(function(){
		$(".pay-options .order-complete, .pay-screen").hide();
		$(".pay-options .under-process, .dasboard").show();
	});
	
	// active SMS button if input has number
	$(".comp_form .phone_num").keyup(function() {
       if($(this).val().match(/^\d+$/)) {
          $(".comp_form form .btn").removeClass('inactive').removeAttr('disabled');
       }
       else {
          $(".comp_form form .btn").addClass('inactive').attr('disabled');
       }
    });
	
	// discard sale
	$('.discard_sale').on('click', function () {
		$('.added-items li').remove();
		$('.dashsection-header a').addClass('inactive');
	});
	
	// delete item for order
	$(document).on('click','.rem_item',function() {
		$(this).closest("li").remove();
		$('.dashsection-header a').addClass('inactive');
		$('.payNow').attr('disabled', 'disabled').addClass('active');
	});
	
	// add items for order
	$('.acname').on('click', function () {
		$('.payNow').removeAttr('disabled').addClass('active');
		$('.dashsection-header a').removeClass('inactive');
		
		$('.drawer-calc').css({
				'position' : 'relative',
				'padding-top' : '14px'
			});
		
		var iname = $(this).parent().parent().parent().parent().find('.popup-body .item.selected .item-info .item_name').html();
		var price = $(this).parent().parent().parent().parent().find('.popup-body .item.selected .item-info .item_price i').html();
		var iQty = '1';
		var iCat = 'Wholemeal';
		
		$('.added-items').append('' +
			'<li class="clearfix">' +
			'<div class="visiable-item-info">' +
			'<div class="items-info pull-left">' +
			'<div class="item-quantity">' +
			'<input type="text" name="iqty" value="' + iQty + '">' +
			'</div>' +
			'<div class="item-name">' +
			'<strong>' + iname + '</strong>' +
			'<span>' + iCat + '</span>' +
			'</div></div><div class="price-info pull-right text-right"><span>' + price + '</span>' +
			'<a href="javascript:void(0);" class="rem_item" style="margin-left: 2px;"><i class="fa fa-trash"></i></a>' +
			'</div></div>' +
			'</li>');
	});
	
	
	// active buttons when there is item in the drawer
	var itemsAre = $('.added-items li').length;
	if(itemsAre > 0) {
		$('.payNow').removeAttr('disabled').addClass('active');
		$('.dashsection-header a').removeClass('inactive');
	} 
	
	$(document).on('click', '.rem_item', function(){
		var atemsAre = $('.added-items').empty();
		if(atemsAre) {
			$('.payNow').removeClass('active').attr('disabled', 'disabled');
			$('.dashsection-header a').addClass('inactive');
		}
	});
	
	
	// sub nav
	function navs() {
		$('.sub-navs ul').hide();
		
		if($('.side-nav li').hasClass('has-sub')){
			$('.sub-navs').addClass('active');
		}
		
		if($('.side-nav li').hasClass('sell-sub-nav')){
			$('.sub-navs .sell-sub-nav').show();
		}
		
		if($( '.sub-navs' ).hasClass( 'active' )) {
			$('#dashboard-holder .dasboard ').css('width', '83%');
			$('.dasboard .prod-cates, .dasboard .live-search, .dasboard .item-cats').css('margin-left', '20px');
		}
		
		if($( '.mobile-nav ul > li.active ' ).hasClass( 'has-sub' )) {
			$('.mobile-nav .close').css('right', '-165px');
		}
	}
	
	
	// owl for tabs
	$('.tabs-wrapper').owlCarousel({
		loop:true,
		margin: 10,
		responsiveClass:true,
		responsive:{
			0:{
				items:2,
				nav:true
			},
			400:{
				items:3,
				nav:true
			},
			800:{
				items:5,
				nav:false
			},
			1000:{
				items:6,
				nav:true,
				loop:false
			}
		}
	});
	
	// custom tabs
	$('.tabs-wrapper .owl-item a').on('click', function(){
		var tab_id = $(this).attr('data-tab');
		$('.modal_caro').trigger('to.owl.carousel', [0,0,true])

		$('.tabs-wrapper .owl-item a').removeClass('current');
		$('.carousel-card').removeClass('current');

		$(this).addClass('current');
		$("#"+tab_id).addClass('current');
	});
	
	
	// replace with icon on tab arrow
	$('.tabs-wrapper .owl-nav .owl-prev').html('<i class="fa fa-angle-left"></i>');
	$('.tabs-wrapper .owl-nav .owl-next').html('<i class="fa fa-angle-right"></i>');
	
	
	// rheight
	function respHeightDrawer(){
		var viewportHeight = $(window).height();
		
		$('.drawer-body').css({
			'max-height': +(viewportHeight-310),
			'min-height': +(viewportHeight-310),
		});
		
		$('.receipt-list').css({
			'max-height': +(viewportHeight-413)
		});
		
		$('.pay-options, .recipet').css({
			'max-height': +(viewportHeight-100),
			'min-height': +(viewportHeight-100),
		});
		
		$('.side-nav, .sub-navs').css({
			'max-height': + (viewportHeight-56),
			'min-height': + (viewportHeight-56),
		});
		
		$('.records-tab').css({
			'max-height': + (viewportHeight-198),
			'min-height': + (viewportHeight-198),
		});
		
		$('.prod-cates').css({
			'max-height': + (viewportHeight-346),
			'min-height': + (viewportHeight-346),
		});
	}
	
	
	// popovers 
	$(document).ready(function(){
		$('.discount').popover({ 
			html : true,
			content: function() {
			  return $('.discount_options').html();
			}
		});
	});
	
	$(document).ready(function(){
		$('.gstoptions').popover({ 
			html : true,
			content: function() {
			  return $('.gst-options').html();
			}
		});
	});
	
	// close popover on outsideclick
	$('body').on('click', function (e) {
		$('.gstoptions, .discount').each(function () {
			if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
				$(this).popover('hide');
			}
		});
	});
	
	
	// custom popup
	$('.pop-close, .acname').on('click', function() {
		$('.multiPop, .singlePop').css('display', 'none');
	});

	$('.singlePop, .multiPop').on('click', function(e){
		e.stopPropagation();
	});
	
	$('.multiPopAc').on('click', function(e) {
		e.stopPropagation();
		$('.multiPop').css('display', 'block');
		
		setTimeout(function() {
			$('.multiPop .popup-body .overlay').fadeOut('fast');
		}, 500);
	});
	
	$('.singlePopAc').on('click', function(e) {
		e.stopPropagation();
		$('.singlePop').css('display', 'block');
		
		setTimeout(function() {
			$('.singlePop .popup-body .overlay').fadeOut('fast');
		}, 500);
	});
	
	$(document).on('click', function() {
		$('.singlePop, .multiPop').css('display', 'none');
	});
	
	// owl carousel setting for popup
	$('.modal_caro').owlCarousel({
		loop:true,
		margin: 10,
		responsiveClass:true,
		responsive:{
			0:{
				items:2,
				nav:true
			},
			400:{
				items:3,
				nav:true
			},
			800:{
				items:4,
				nav:false
			},
			1000:{
				items:5,
				nav:true,
				loop:false
			},
			1300:{
				items:5,
				nav:true,
				loop:false
			}
		}
	});
	
	
	// categories carousel
	$('.item-cats-list').owlCarousel({
		loop: true,
		margin: 10,
		nav: true,
		responsiveClass: true,
		responsive:{
			0:{
				items: 3
			},
			480:{
				items: 5
			},
			600:{
				items: 6
			},
			768:{
				items: 7
			},
			992:{
				items: 8
			},
			1000:{
				items: 6
			}
		}
	});
	
	
	// owl carousel navigation reconstruction	
	var owl = $('.item-cats-list, .modal_caro');

	$('.carousel-navigation i.next, .item-cats .item-cats-head .cat_next').click(function(){
		owl.trigger('next.owl.carousel');
	})

	$('.carousel-navigation i.prev, .item-cats .item-cats-head .cat_prev').click(function(){
		owl.trigger('prev.owl.carousel');
	})
	

	// select multiple items from carousel
	$('.m_selec .carousel-body .item').on('click',function(){
		var $this = $(this);
		if($this.hasClass('selected')){
			$this.removeClass('selected');
		} else{
			$this.addClass('selected');
		}
	});


	// select single items from carousel
	$('.s_selec .carousel-body .item').on('click',function(){
		$('.s_selec .carousel-body .item').removeClass('selected');
		$(this).addClass('selected');
	});
	
	// init functions
	$(window).on('load resize', function () {
		respHeightDrawer();
		navs();
	});
	
	// return false
	$("a.discount, a.gstoptions").click(function(e) {
		e.preventDefault();
	});
	
})(jQuery, window, document);
