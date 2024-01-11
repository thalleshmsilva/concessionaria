$(function() {
    // Menu - INÍCIO
    checkUrl();
    function checkUrl() {
        var url = location.href.split('/');
        url = url[url.length - 1];
        if (url == 'index.html')
            $("[href='index.html']").css('color', '#EB2D2D');
        else if (url == 'venda.html')
            $("[href='venda.html']").css('color', '#EB2D2D');
        else if (url == 'sobre.html')
            $("[href='sobre.html']").css('color', '#EB2D2D');
        else if (url == 'index.html#contato') {
            $("[href$='#contato']").css('color', '#EB2D2D');
            scrollToContato();
        }
    }

    $('nav.mobile').click(function() {
        $('nav.mobile').find('ul').slideToggle();
    })

    function scrollToContato() {
        $('html, body').animate({scrollTop: $('#contato').offset().top});
        return false;
    }

    $("[href$='#contato']").click(function() {
        scrollToContato();
    })
    // Menu - FIM

    // Filtro-Preço - INÍCIO
    var isDrag = false;
    $('.barra-pointer').mousedown(function(){
        isDrag = true;
    })
    $(document).mouseup(function(){
        isDrag = false;
    })

    var currentValue = 0;
    var precoAtual = 0;
    var precoMaximo = 70000;
    $('.barra-preco').mousemove(function(e){
        if (isDrag) {
            var elBase = $(this);
            var mouseX = e.pageX - elBase.offset().left;
            if (mouseX < 0)
                mouseX = 0;
            if (mouseX > elBase.width())
                mouseX = elBase.width();
            
            $('.barra-pointer').css('left', (mouseX - 13) + 'px');

            currentValue = (mouseX / elBase.width()) * 100;
            $('.barra-preco-fill').css('width', currentValue + '%');

            precoAtual = formatarPreco(precoAtual);
            $('.preco-pesquisa').html('R$' + precoAtual);
        }
    })

    function formatarPreco(precoAtual){
        precoAtual = (currentValue / 100) * precoMaximo;
        precoAtual = precoAtual.toFixed(2);
        var precoArray = precoAtual.split('.');

        if (precoArray[0] < 1000) {
            return precoArray[0] + ',' + precoArray[1];
        } else if (precoArray[0] < 10000) {
            return precoArray[0][0] + '.' + precoArray[0].substr(1) + ',' + precoArray[1];
        } else {
            return precoArray[0][0] + precoArray[0][1] + '.' + precoArray[0].substr(2) + ',' + precoArray[1];
        }
    }
    // Filtro-Preço - FIM

    // Slide página de carro - início
    initSlider();
    function initSlider() {
        var elScroll = $('.nav-galeria-wraper');
        var elSingle = $('.mini-img-wraper');
        var amt = $(elSingle).length * 33.3;
        elScroll.css('width', amt + '%');
        elSingle.css('width', 33.3 * (100 / amt) + '%');
    }

    var imgShow = 3;
    var maxIndex = Math.ceil($('.mini-img-wraper').length / 3) - 1;
    var curIndex = 0;
    navigateSlider();
    function navigateSlider() {
        function scrollSlider() {
            var elOffSet = $('.mini-img-wraper').eq(curIndex * 3).offset().left - $('.nav-galeria-wraper').offset().left;
            $('.nav-galeria-imgs').animate({scrollLeft: elOffSet + 'px'});
        }

        $('.arrow-right').click(function(){
            if (curIndex < maxIndex) {
                curIndex++;
                scrollSlider();
            }
        })
        $('.arrow-left').click(function() {
            if (curIndex > 0) {
                curIndex--;
                scrollSlider();
            }
        })
    }

    clickSlider();
    function clickSlider() {
        $('.mini-img-wraper').click(function() {
            $('.mini-img-wraper').css('background-color', 'transparent');
            $(this).css('background-color', 'rgb(210,210,210)');
            var img = $(this).children().css('background-image');
            $('.foto-destaque').css('background-image', img);
        })

        $('.mini-img-wraper').eq(0).click();
    }
    // Slide página de carro - fim

    // Clicar e ir para a div#contato - início
    // Clicar e ir para a div#contato - fim
});