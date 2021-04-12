var MobileLib = (function () {
    var _pagetoken = '';
    var _domainurl = 'http://message-list.appspot.com/';
    var _callstate = false;
    var _clientX;
    var _init = function () {
        _populateUI();
        $('#page_list').on('scroll', _handlePageScroll);
        $('#menu').on('click', _toggleNav)
    }
    var _populateUI = function () {
        ajaxRequest(function (data) {
            var messages = data.messages;
            var html = '';
            for (var i in messages) {
                var message = messages[i]

                var content = message.content;
                if (content.length > 125) {
                    content = content.slice(0, 125) + '... <span class="readmore" onclick="MobileLib.readMore(this)">Read more</span>'
                }

                html += '<div class="user_box" onmousedown="MobileLib.swipe(event);" onmouseup="MobileLib.swipe(event, true);">' +
                    '<div class="delete" onclick="MobileLib.deleteMessage(this)"><div class="delete_main"><em class="delete_icon"></em><span>Delete</span></div></div>' +
                    '<div class="li_hdr">' +
                    '<img src="' + _domainurl + message.author.photoUrl + '" class="user_img">' +
                    '<div class="textleft">' +
                    '<div class="user_name">' + message.author.name + '</div>' +
                    '<span class="user_date">' + timeSince(new Date(message.updated)) + '</span>' +
                    '</div>' +
                    '</div>' +
                    '<div class="user_abt" title="' + message.content.replace(/"/gi, '') + '">' + content + '</div>' +
                    '</div>';
            }

            $('#page_list').append(html);

            if (!_pagetoken) {
                $('#page_list').addClass('page_anim');
            }

            _pagetoken = data.pageToken;

            if ($('#page_list').innerHeight() >= $('#page_list')[0].scrollHeight) { //to get next list of data when there is on page scroll.
                _populateUI();
            }
        });

    }
    var _readMore = function (curr) {
        var $curr = $(curr);
        var $parent = $(curr).parent();
        $parent.text($parent.attr('title'));
        $curr.remove();
    }
    var _swipe = function (event, ismouseup) {
        var $target = $(event.target)
        var $parent = $target.hasClass('user_box') ? $target : $target.parents('.user_box');
        if (!$parent.length) {
            return;
        }

        if (!ismouseup) {
            _clientX = event.clientX;
            return;
        }
        var isMobile = ($('body').innerWidth() < 850 && (_clientX <= event.clientX));
        if ((_clientX + 20 <= event.clientX) || isMobile) {
            if (isMobile && $parent.hasClass('show_delete')) {
                $parent.removeClass('show_delete');
                return;
            }
            $parent.addClass('show_delete');
            return;
        }
        $parent.removeClass('show_delete');
    }
    var _handlePageScroll = function () {
        var $curr = $("#page_list")
        if (_callstate) {
            return;
        }
        if ($curr.scrollTop() + $curr.innerHeight() >= $curr[0].scrollHeight) {
            _populateUI();
        }
    }
    var _handleDeleteIcon = function (event) {
        var $target = $(event.target)
        var $parent = $target.hasClass('user_box') ? $target : $target.parents('.user_box');
        if (!$parent.length) {
            return;
        }
        $('#page_list').find('.show_delete').removeClass('show_delete')
        $parent.addClass('show_delete');
    }
    var timeSince = function (date) {

        var seconds = Math.floor((new Date().getTime() - date) / 1000);

        var interval = seconds / 86400;
        if (interval > 1) {
            if (interval > 365) {
                return Math.floor(interval / 365) + " Years ago";
            }
            if (interval > 30) {
                return Math.floor(interval / 30) + " Mays ago";
            }
            return Math.floor(interval) + " days ago";
        }
        return "Just now";
    }
    var _deleteMessage = function (curr) {
        $(curr).parent().remove();
    }
    var _toggleNav = function () {
        var $page_nav = $('#page_nav');
        if ($page_nav.hasClass('show_nav')) {
            $page_nav.removeClass('show_nav');
            return;
        }
        $page_nav.addClass('show_nav');
    }
    var ajaxRequest = function (callback) {
        _callstate = true;
        var link = _domainurl + "messages";
        link = (_pagetoken) ? link + '?pageToken=' + _pagetoken : link;

        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                _callstate = false;
                callback(JSON.parse(xmlHttp.responseText))
            }
        }
        xmlHttp.open("GET", link);
        xmlHttp.send();
    }
    return {
        init: _init,
        deleteMessage: _deleteMessage,
        swipe: _swipe,
        readMore: _readMore,
        ajaxRequest: ajaxRequest
    }
}());
