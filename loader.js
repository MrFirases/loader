(function () {

// Localize jQuery variable
    var jQuery;

    /******** Load jQuery if not present *********/
    if (window.jQuery === undefined || window.jQuery.fn.jquery !== '3.2.1') {
        var script_tag = document.createElement('script');
        script_tag.setAttribute("type", "text/javascript");
        script_tag.setAttribute("src",
            "https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js");
        if (script_tag.readyState) {
            script_tag.onreadystatechange = function () { // For old versions of IE
                if (this.readyState == 'complete' || this.readyState == 'loaded') {
                    scriptLoadHandler();
                }
            };
        } else {
            script_tag.onload = scriptLoadHandler;
        }
        // Try to find the head, otherwise default to the documentElement
        (document.getElementsByTagName("head")[0] || document.documentElement || document.head).appendChild(script_tag);

        // Include CSS file
        includeCSS("https://cdn.rawgit.com/MrFirases/loader/ae4abb53/index.css");

    } else {

        // Include CSS file
        includeCSS("https://cdn.rawgit.com/MrFirases/loader/ae4abb53/index.css");

        // The jQuery version on the window is the one we want to use
        jQuery = window.jQuery;
        main();
    }

    /******** Called once jQuery has loaded ******/
    function scriptLoadHandler() {
        // Restore $ and window.jQuery to their previous values and store the
        // new jQuery in our local jQuery variable
        jQuery = window.jQuery.noConflict(true);
        if ( typeof $ === 'undefined' ) {
            $ = jQuery;
        }
        // Call our main function
        main();
    }

    /******** Our main function ********/
    function main() {
        jQuery(document).ready(function ($) {


            $('body').append('<div id="medzapp-widget-container"></div>');

            async function loader() {
                var token = await gettingToken();
                return token;
            };

            loader().then(token => {
                // Get thr the fab color
                tokenData = parseJwt(token)
                fabColor = '#' + tokenData.primarycolor;

                /******* Load HTML *******/

                $('#medzapp-widget-container').html(
                    "<div class='medzapp-fab'><div class='medzapp-change-icon-button'> <a id='prime' class='medzapp-fab-elem' style='background-color: " + fabColor + " '><i class='white-icon prime zmdi zmdi-comment-text-alt'></i></a> </div> </div>"
                    +
                    "<div class='medzapp-widget'><iframe allowfullscreen src='https://materializecss.com/' class='medzapp-iframe-card' id='medzapp-card' frameborder='0' style='display:none;'></iframe></div>"
                );



                setTimeout(function(){
                    $(".medzapp-fab-elem").show();
                    $(".medzapp-fab-elem").css({'-webkit-animation': 'medzapp-fab-swing 1s ease',
                    'animation': 'medzapp-fab-swing 1s ease',
                    '-webkit-animation-iteration-count': 1,
                    'animation-iteration-count': 1});

                },2000);



                changeIcon();
            });

        });
    }

    /* Additional Function for animation and token management */

    function changeIcon() {
        var mq = window.matchMedia( "(max-device-width: 667px) and (max-width: 535px)" );
        var count = 1;
        $(".medzapp-change-icon-button").click(function () {
            if (count) {
                $(".medzapp-fab-elem").html('<i class="white-icon prime zmdi zmdi-close"></i>');
                AnimateRotateLeftToRight(180);
                $("#medzapp-card").fadeIn(700);
                count = 0;
                    if (mq.matches) {
                    console.log(mq);
                    $(".medzapp-fab-elem").css({
                        'top':'0',
                        'margin':'0',
                        'box-shadow': 'none'
                    });
                    $( '.medzapp-fab-elem').each(function () {
                        this.style.setProperty( 'right', '30px', 'important' );
                    });
                }
            }
            else {
                $(".medzapp-fab-elem").html('<i class="white-icon prime zmdi zmdi-comment-text-alt"></i>');
                AnimateRotateRightToLeft(180);
                $("#medzapp-card").fadeOut(700)
                count = 1;
                 if (mq.matches) {
                    console.log(mq);
                    $(".medzapp-fab-elem").css({
                        'bottom':'8px',
                        'box-shadow': '0 0 4px rgba(0, 0, 0, 0.14), 0 4px 8px rgba(0, 0, 0, 0.28)',
                        'top':'',
                    });
                    $( '.medzapp-fab-elem').each(function () {
                        this.style.setProperty( 'right', '8px', 'important' );
                    });
                }
            }
        });

    }

    function AnimateRotateLeftToRight(angle) {
        var $elem = $('.prime');

        $({deg: 0}).animate({deg: angle}, {
            duration: 230,
            step: function (now) {
                $elem.css({
                    transform: 'rotate(' + now + 'deg)'
                });
            }
        });
    }

    function AnimateRotateRightToLeft(angle) {
        var $elem = $('.prime');

        $({deg: angle}).animate({deg: 0}, {
            duration: 230,
            step: function (now) {
                $elem.css({
                    transform: 'rotate(' + now + 'deg)'
                });
            }
        });
    }

    function gettingToken() {
        return new Promise(resolve => {
            var scripts = document.getElementsByTagName('script');
            for (var i = 0, l = scripts.length; i < l; i++) {
                if (scripts[i].src.indexOf('loader.js') !== (-1)) {
                    var token = scripts[i].getAttribute('token');
                    resolve(token);
                }
            }
        });
    }

    function parseJwt(token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }


function includeCSS(path) {
    // Include CSS file
        var cssTag = document.createElement('link');
        cssTag.setAttribute("rel", "stylesheet");
        cssTag.setAttribute("href", path);
        cssTag.setAttribute("type", "text/css");
        (document.getElementsByTagName("head")[0] || document.documentElement || document.head).appendChild(cssTag);


             // Make doctor website responsoive
        var metaTag = document.createElement('meta');
        metaTag.setAttribute("name", "viewport");
        metaTag.setAttribute("content", "width=device-width initial-scale=1.0 user-scalable=no");
        (document.getElementsByTagName("head")[0] || document.documentElement || document.head).appendChild(metaTag);
}



})(); // We call our anonymous function immediately
