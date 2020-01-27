require('../styles/index.scss');

$(function () {
    $('.items').employees({
        count: 3
    });

    $('#nav-icon3').click(function(){
        $(this).toggleClass('open');
        $(this).next().toggleClass('open');
    });
});

// JQuery employees plugin
(function ( $ ) {

    $.fn.employees = function(params = []) {

        const defaultParams = {
            count: 3,
            promises: {
                names: 'https://techi.envivent.com/names.json',
                descr: 'https://techi.envivent.com/description.json',
                imagess: 'https://techi.envivent.com/images.json',
            }
        }

        params = Object.assign(defaultParams, params);
        const buildHtmlContent = (data) => {
            const items = [];
            for (const employee of data.employees) {

                var maxLength = 500;

                if ($(window).width() < 960 && $(window).width() > 576) {
                    maxLength = 200;
                }
                let trimmedString = employee.description.substr(0, maxLength);

                if(employee.description.length > trimmedString.length){
                    trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))
                }
                const wrapper = $("<div class='item'></div>");
                const wrapperContent = $("<div class='item__content'></div>");
                const itemImage = $(`<img src="${data['images-folder']}${employee.full}">`);
                const itemName = $(`<div class='item__name'> ${employee.first_name} ${employee.last_name} </div>`);
                const itemPosition = $(`<div class='item__position'> ${employee.title} </div>`);
                const itemDesc = $(`<div class='item__desc'> ${trimmedString} </div>`);
                wrapperContent.append(itemName);
                wrapperContent.append(itemPosition);
                wrapperContent.append(itemDesc);

                wrapper.append(itemImage);
                wrapper.append(wrapperContent);

                items.push(wrapper);
            }
            return items;
        };

        const getData = async (countPosts = 6) => {
            if (typeof countPosts == 'number')
                try {
                    const names = await $.get(params.promises.names);
                    const descr = await $.get(params.promises.descr);
                    const imagess = await $.get(params.promises.imagess);
                    const summ = [];
                    for (const [i, element] of names.employees.entries()) {
                        summ[i] = Object.assign(element, descr.employees[i], imagess.employees[i])
                    }
                    if (countPosts >= summ.length) countPosts = summ.length;
                    return {
                        'employees': shuffleArray(summ).slice(0, countPosts),
                        'images-folder': imagess['images-folder'],
                        'hasError': false
                    };

                } catch (e) {
                    return {hasError: true};
                }

        };

        function shuffleArray(array) {
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
            return array;
        }

        return getData(params.count).then(buildHtmlContent).then((items) => {
            this.append(items);
            setTimeout(() => {
                $('.preloader').addClass('hidden')
            }, 0);
            return this;

        });
    };

}( jQuery ));
