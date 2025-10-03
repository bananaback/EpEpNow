(function ($) {
    'use strict';

    const SCROLL_OFFSET = 80;
    const AUTO_ROTATE_INTERVAL = 6500;

    function smoothScroll(targetSelector) {
        const $target = $(targetSelector);
        if ($target.length === 0) return;

        const offsetTop = $target.offset().top - SCROLL_OFFSET;
        $('html, body').animate({ scrollTop: offsetTop }, 650, 'swing');
    }

    function clamp(index, length) {
        if (length === 0) return 0;
        return ((index % length) + length) % length;
    }

    $(function () {
        const $mobileNav = $('#mobile-nav');
        const $mobileToggle = $('#mobile-nav-toggle');
        const $modal = $('#product-modal');
        const $modalTitle = $('#modal-title');
        const $modalPrice = $('#modal-price');
        const $modalDescription = $('#modal-description');
        const $modalHighlights = $('#modal-highlights');
        const $testimonialCards = $('#testimonial-carousel .testimonial-card');
        const $testimonialDots = $('.carousel-dot');
        const $testimonialPrev = $('#testimonial-prev');
        const $testimonialNext = $('#testimonial-next');
        const $orderForm = $('#order form');
        const $newsletterForm = $('#contact form[aria-label="Subscribe for updates"]');

        $('#current-year').text(new Date().getFullYear());

        $('.js-scroll').on('click', function (event) {
            const href = $(this).attr('href') || '';
            if (!href.startsWith('#')) {
                return;
            }
            event.preventDefault();
            smoothScroll(href);
            if ($mobileNav.is(':visible')) {
                $mobileNav.stop(true, true).slideUp(250);
                $mobileToggle.attr('aria-expanded', 'false');
            }
        });

        if ($mobileNav.hasClass('hidden')) {
            $mobileNav.removeClass('hidden').hide();
        }

        if ($mobileToggle.length) {
            $mobileToggle.on('click', function () {
                const isExpanded = $(this).attr('aria-expanded') === 'true';
                $(this).attr('aria-expanded', String(!isExpanded));
                $mobileNav.stop(true, true).slideToggle(260);
            });
        }

        let lastFocusedElement = null;

        function openModal({ name, price, description, highlights }) {
            $modalTitle.text(name);
            $modalPrice.text(price);
            $modalDescription.text(description);
            $modalHighlights.empty();

            highlights
                .map((item) => item.trim())
                .filter(Boolean)
                .forEach((item) => {
                    $('<li />', { text: item }).appendTo($modalHighlights);
                });

            lastFocusedElement = document.activeElement;
            $modal.addClass('is-visible');
            $modal.attr('aria-hidden', 'false');
            $('body').addClass('overflow-hidden');

            window.requestAnimationFrame(function () {
                $('#modal-close').trigger('focus');
            });
        }

        function closeModal() {
            $modal.removeClass('is-visible');
            $modal.attr('aria-hidden', 'true');
            $('body').removeClass('overflow-hidden');
            if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
                lastFocusedElement.focus();
            }
        }

        $('.js-product-details').on('click', function () {
            const $button = $(this);
            openModal({
                name: $button.data('name') || 'Juice',
                price: $button.data('price') || '',
                description: $button.data('description') || '',
                highlights: ($button.data('highlights') || '').split('|'),
            });
        });

        $modal.on('click', '[data-modal-close]', closeModal);
        $('#modal-close').on('click', closeModal);
        $(document).on('keydown', function (event) {
            if (event.key === 'Escape' && $modal.hasClass('is-visible')) {
                closeModal();
            }
        });

        let activeIndex = 0;

        function renderTestimonials(index) {
            const normalized = clamp(index, $testimonialCards.length);
            activeIndex = normalized;

            $testimonialCards
                .removeClass('is-active')
                .attr('aria-hidden', 'true')
                .each(function (cardIndex) {
                    if (cardIndex === normalized) {
                        $(this).addClass('is-active').attr('aria-hidden', 'false');
                    }
                });

            $testimonialDots
                .removeClass('is-active')
                .each(function (dotIndex) {
                    if (dotIndex === normalized) {
                        $(this).addClass('is-active');
                    }
                    $(this).attr('aria-selected', dotIndex === normalized ? 'true' : 'false');
                });
        }

        renderTestimonials(0);

        function goTo(delta) {
            renderTestimonials(activeIndex + delta);
        }

        $testimonialPrev.on('click', function () {
            goTo(-1);
        });

        $testimonialNext.on('click', function () {
            goTo(1);
        });

        $testimonialDots.on('click', function () {
            const targetIndex = Number($(this).data('index')) || 0;
            renderTestimonials(targetIndex);
        });

        let autoRotateTimer = null;

        function startAutoRotate() {
            if (autoRotateTimer) return;
            autoRotateTimer = window.setInterval(function () {
                goTo(1);
            }, AUTO_ROTATE_INTERVAL);
        }

        function stopAutoRotate() {
            if (!autoRotateTimer) return;
            window.clearInterval(autoRotateTimer);
            autoRotateTimer = null;
        }

        const $testimonialCarousel = $('#testimonial-carousel');
        startAutoRotate();

        $testimonialCarousel.on('mouseenter focusin', stopAutoRotate);
        $testimonialCarousel.on('mouseleave focusout', startAutoRotate);

        let touchStartX = null;

        $testimonialCarousel.on('touchstart', function (event) {
            stopAutoRotate();
            touchStartX = event.originalEvent.touches[0].clientX;
        });

        $testimonialCarousel.on('touchmove', function (event) {
            if (touchStartX === null) return;
            const currentX = event.originalEvent.touches[0].clientX;
            const deltaX = currentX - touchStartX;
            if (Math.abs(deltaX) > 60) {
                goTo(deltaX > 0 ? -1 : 1);
                touchStartX = null;
            }
        });

        $testimonialCarousel.on('touchend touchcancel', function () {
            touchStartX = null;
            startAutoRotate();
        });

        if ($orderForm.length) {
            const $feedback = $('<p />', {
                class: 'order-feedback hidden',
                text: 'Thanks! We have your request and will reach out shortly.',
            });
            $orderForm.append($feedback);

            $orderForm.on('submit', function (event) {
                event.preventDefault();
                const name = ($('#order-name').val() || 'friend').trim();
                $feedback.text(`Cảm ơn ${name}! Your juicy order is on our radar.`);
                $feedback.removeClass('hidden').addClass('is-visible');
                window.setTimeout(function () {
                    $feedback.removeClass('is-visible').addClass('hidden');
                }, 6000);
                this.reset();
            });
        }

        if ($newsletterForm.length) {
            const $feedback = $('<p />', {
                class: 'newsletter-feedback hidden',
                text: 'Welcome to the juice list! Expect fresh drops soon.',
            });
            $newsletterForm.after($feedback);

            $newsletterForm.on('submit', function (event) {
                event.preventDefault();
                $feedback.removeClass('hidden').addClass('is-visible');
                window.setTimeout(function () {
                    $feedback.removeClass('is-visible').addClass('hidden');
                }, 6000);
                this.reset();
            });
        }
    });
})(jQuery);
