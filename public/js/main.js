$(function () {
    var page = $('#PG').data('pg');
    var C = document.getElementById('msgBox');
    var CW = document.documentElement.clientWidth;
    var Act = {
        moveChoice: function (sT, WH) {
            var mT = '';
            if (CW < 830) {
                mT = -1.33333 + ((sT + WH - $(C).offset().top) * 20 / 750) * 0.8;
                $(window.M).css('top', mT + 'rem')
            } else {
                mT = -80 + (sT + WH - $(C).offset().top) * 0.17;
                $(window.M).css('top', mT + 'px')
            }
        },
    };
    var navU = $('.nav-unit .n', '#nav')
    navU.each(function (i, e) {
        var c = $(e).attr('href');
        if (c.indexOf(page) != -1) {
            $(e).addClass('now-in')
        } else if (page == 'index') {
            navU.eq(0).addClass('now-in')
        }
    });

    window.addEventListener('scroll', function () {
        var sT = $(this).scrollTop();
        var WH = $(this).height();
        if (sT > 500) {
            $('#backToTop').show()
        } else {
            $('#backToTop').hide()
        }
        if (( $(C).offset().top - $(this).scrollTop() ) > $(this).height()) return;
        Act.moveChoice(sT, WH)
    }, false);
    $('#backToTop').on('click', function () {
        $('body,html').animate({scrollTop: 0}, 400);
    });
    AOS.init();

    $('.hamburger-menu').on('click', function () {
        $('.bar').toggleClass('animate');
        $(this).toggleClass('bg');
        $('.nav-body').toggleClass('show');
        $('body').toggleClass('no-flow');
    });

    $('.nav-body').on('click', function (e) {
        e = e || window.event;
        if (e.target == e.currentTarget && CW < 831) {
            $('.hamburger-menu').trigger('click')
        }
    });

    if (CW <= 830) {
        var DH = $(window).height() + 'px';

        $('.nav-body').css('height', DH);
        $('#nav').css('height', DH)
    }

    if (page == 'index') {
        (function () {
            // 事件及常量 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
            var T = null;

            var SL = $('#solutionList');
            var SLW = SL.width();

            var ml = 0;
            var ml2 = 0;
            var A = {
                generateSolutionPosition: function () {
                    var clientWidth = document.documentElement.clientWidth;
                    if ((clientWidth < 2264 && clientWidth >= 1200)) {
                        ml = (2264 - clientWidth) / 2;
                        SL
                            .css('marginLeft', '-' + ml + 'px')
                    } else if (clientWidth < 1200 && clientWidth >= 830) {
                        ml = '304px';
                        SL
                            .css('marginLeft', '-304px')
                    } else if (clientWidth < 830) {
                        ml2 = ( 20 * (SLW / document.documentElement.clientWidth) - 20 - 10.56) / 2;
                        SL
                            .css('marginLeft', '-' + ml2 + 'rem')


                    }
                }
            };
            // 事件初始化及绑定 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

            $("#owl").owlCarousel({
                slideSpeed: 300,
                singleItem: true
            });

            window.addEventListener("resize", function () {
                clearTimeout(T);
                T = setTimeout(A.generateSolutionPosition, 300)
            }, false);

            A.generateSolutionPosition();

            SL.on('click', '.solution-item', function () {
                var _this = $(this);
                var ACT = SL.find('.active');
                var AI = ACT.index();
                var I = _this.index();

                if (AI == I) return;
                ACT.removeClass('active');
                _this.addClass('active');

                var X = I - AI;
                var nml, baz, rst, unit;

                if (CW > 830) {
                    nml = +window.getComputedStyle(SL.get(0)).marginLeft.slice(0, -2);
                    baz = Math.abs(X) * 244;
                    rst = X > 0 ? nml - baz : nml + baz;
                    unit = 'px';
                } else {
                    nml = (+window.getComputedStyle(SL.get(0)).marginLeft.slice(0, -3)) * 20 / CW;
                    baz = Math.abs(X) * 10.56;
                    rst = X > 0 ? nml - baz : nml + baz;
                    unit = 'rem';
                }

                SL.velocity({'marginLeft': rst + unit}, {
                    duration: 400,
                    complete: function () {
                        var bazz = 0;
                        if (CW >= 1200 && CW < 2264) {
                            bazz = ml
                        } else if (CW < 1200 && CW > 830) {
                            bazz = 304
                        } else if (CW <= 830) {
                            bazz = ml2
                        } else {
                            bazz = 0
                        }
                        SL.css('marginLeft', '-' + bazz + unit);
                        if (X > 0) {
                            $('.solution-item:lt(' + X + ')').insertAfter('.solution-item:last');
                        } else {
                            $('.solution-item:gt(' + (9 + X) + ')').insertBefore('.solution-item:first');
                        }
                    }
                })

            })
        })();
    }

    if (page == 'news') {
        (function () {
            $('#page').pagination({
                items: +document.getElementById('TIT').getAttribute('data'),
                currentPage: +document.getElementById('CPG').getAttribute('data'),
                itemsOnPage: 6,
                displayedPages: 3,
                prevText: '<',
                nextText: '>',
                hrefTextPrefix: '/news?p=',
                onPageClick: function (pageNumber, event) {
                    window.location.reload()
                },
                cssStyle: 'light-theme'
            });
        })();
    }

    if (page == 'solution') {
        (function () {
            var S1T = window.s.offsetTop;
            var S2T = window.m.offsetTop;
            var S3T = window.l.offsetTop;
            var A3 = {
                genHrPosition: function (a) {
                    var b = CW < 830 ? a - 700 : a - 300;
                    var c = CW < 830 ? a + CW * 100 / 750 : a;
                    if (c > window.SSB.offsetTop) {
                        window.SSB.classList.add('fixed')
                    } else {
                        window.SSB.classList.remove('fixed')
                    }
                    if (b < S1T) {
                        $('.hr').removeClass('l1 l2 l3').addClass('l1');
                    } else if (b > S1T && b < S2T) {
                        $('.hr').removeClass('l1 l2 l3').addClass('l2');
                    } else if (b > S2T && b < S3T) {
                        $('.hr').removeClass('l1 l2 l3').addClass('l3');
                    }
                }
            };

            $('#SSB')
                .on('mouseenter', '.subnav-unit', function () {
                    var i = $(this).index();
                    $('.hr').removeClass('l1 l2 l3').addClass('l' + (i + 1));
                })
                .on('mouseleave', '.subnav-unit', function () {
                    var sT = $(window).scrollTop();
                    A3.genHrPosition(sT)
                });

            window.addEventListener('scroll', function () {
                var sT = $(this).scrollTop();
                A3.genHrPosition(sT)
            }, false);

        })();
    }

    if (page == 'about') {
        (function () {
            (function () {
                var IT = window.I.offsetTop;
                var HT = window.H.offsetTop;
                var MT = window.m.offsetTop;
                var BT = window.B.offsetTop;
                var sub = $(window.ASB).find('.subnav-unit');

                var A4 = {
                    genHrPosition: function (a) {
                        var b = CW < 830 ? a - 700 : a - 300;
                        var c = CW < 830 ? a + CW * 100 / 750 : a;
                        if (c > window.ASB.offsetTop) {
                            window.ASB.classList.add('fixed')
                        } else {
                            window.ASB.classList.remove('fixed')
                        }
                        if (b < IT) {
                            sub.removeClass('act').eq(0).addClass('act');
                        } else if (b > IT && b < HT) {
                            sub.removeClass('act').eq(1).addClass('act');
                        } else if (b > HT && b < MT) {
                            sub.removeClass('act').eq(2).addClass('act');
                        } else if (b > MT && b < BT) {
                            sub.removeClass('act').eq(3).addClass('act');
                        }
                    }
                };

                window.addEventListener('scroll', function () {
                    var sT = $(this).scrollTop();
                    A4.genHrPosition(sT)
                }, false);

            })();
        })()
    }
});