'use strict'
$(function() {
    $(".form__button").click(function(event) {

        let title = $(".form__ip-title").val();
        let description = $(".form__ta-description").val();

        checkWarning();

        if (title == '' || description == '') {
            warning();
            return false;
        }

        checkClose();

        $(".to-do-list__box")
            .append(createNewListItem(title, description));

        clearLines();

        event.preventDefault();
    });

    $(document).on('click', function(event) {
        let target = event.target;

        deleteListItem(target);
        hideContent(target);

        event.preventDefault();
    });

    function clearLines() {
        $(".form__ip-title").val('');
        $(".form__ta-description").val('');
    }

    function warning() {
        $(".form__box").css('border', '1px solid red');
    }

    function checkWarning() {
        if ($(".form__box").css('borderColor') == 'rgb(255, 0, 0)') {
            $(".form__box").css('border', '0 none');
        }
    }

    function getClass(obj) {
        return {}.toString.call(obj).slice(8, -1);
    }

    function checkClose() {
        let obj = document.querySelector('div.to-do-list__box').firstChild;
        let res = getClass(obj).toLowerCase();

        if (res != 'htmldivelement') {
            addClose();
        }

        if (res == 'text') {
            removeClose();
        }

    }

    function addClose() {
        $(".to-do-list__box").addClass('close');
        $(".to-do-list__box").text('Список пуст...');
    }

    function removeClose() {
        $(".to-do-list__box").removeClass('close');
        $(".to-do-list__box").empty();
    }

    function createNewListItem(t, d) {
        let el = $('<div class="list-item">' +
            '<p class="list-item__name">' + t +
            '<img src="cross.png" alt="крестик" class="cross">' +
            '<span class="arrow down">' +
            '</span>' +
            '</p>' +
            '<div class="list-item__content">' + d +
            '</div>' +
            '</div>');
        return el;
    }

    function hideContent(target) {
        let content = target.parentElement.parentElement.children[1];
        if (target.className == 'arrow down') {

            target.classList.remove('down');
            target.classList.add('left');
            content.classList.add('contentHidden');

        } else if (target.className == 'arrow left') {

            target.classList.remove('left');
            target.classList.add('down');
            content.classList.remove('contentHidden');
        }
    }

    function deleteListItem(target) {

        if (target.className == 'cross') {
            target.parentElement.parentElement.remove();
            checkClose();
        }
    }
    
});