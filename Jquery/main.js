$(document).ready(function () {
    var arrayNum = [
        'https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg', 'https://miro.medium.com/max/10000/0*wZAcNrIWFFjuJA78', 'https://media-exp1.licdn.com/dms/image/C4D03AQHX7pCBVKSZBQ/profile-displayphoto-shrink_200_200/0/1541620784757?e=1616025600&v=beta&t=pDZzQwMsIWcFLJJEuQKecMRW43JZxkysrgUSJvB3tII', 'https://pbs.twimg.com/profile_images/960684957055164416/qcflQM0w_400x400.jpg', 'https://media-cdn.tripadvisor.com/media/photo-s/12/0b/9f/a2/getlstd-property-photo.jpg', 'https://cdn.pixabay.com/photo/2013/07/18/10/56/railroad-163518__340.jpg', 'https://cdn.shopify.com/s/files/1/3026/6974/files/happy-alpacas-landscape_1024x1024.jpg?v=1532619630', 'https://www.advisor.ca/wp-content/uploads/sites/5/2018/08/800x600_Toronto_city_56928429_123RFStockPhoto.jpg', 'https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg', 'https://miro.medium.com/max/10000/0*wZAcNrIWFFjuJA78', 'https://media-exp1.licdn.com/dms/image/C4D03AQHX7pCBVKSZBQ/profile-displayphoto-shrink_200_200/0/1541620784757?e=1616025600&v=beta&t=pDZzQwMsIWcFLJJEuQKecMRW43JZxkysrgUSJvB3tII', 'https://pbs.twimg.com/profile_images/960684957055164416/qcflQM0w_400x400.jpg', 'https://media-cdn.tripadvisor.com/media/photo-s/12/0b/9f/a2/getlstd-property-photo.jpg', 'https://cdn.pixabay.com/photo/2013/07/18/10/56/railroad-163518__340.jpg', 'https://cdn.shopify.com/s/files/1/3026/6974/files/happy-alpacas-landscape_1024x1024.jpg?v=1532619630', 'https://www.advisor.ca/wp-content/uploads/sites/5/2018/08/800x600_Toronto_city_56928429_123RFStockPhoto.jpg'
    ]
    /*\\
    delare the array*/
    points = 0; /*set pointes 0 default*/
    clicks = 0; /*set score 0 by default*/
    timer = 3;
    t = 0;
    /*Shuffe the array randomaly */
    function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
    }
    shuffle(arrayNum); /*Shuffle funtion*/
    /* creating box */
    for (i = 0; i < arrayNum.length; i++) {
        $(".flip-card-inner").append (' <div class="flip-card-inner2 rollover"><div class="flip-card-front "> <img src="https://i.pinimg.com/736x/f3/09/28/f30928e4df8826714ada61ef5790eadf.jpg" ></div><div class="flip-card-back" > <img src="' + arrayNum[i] + '" class="img-responsive"> </div></div>');
    }
    /*time taken*/

    setInterval(function () {
        t = t + 1
        $("#time").text("0 hr " + t + " Sec");
    }, 1000);
    /*this is for starting few sec to view the back of box's*/
        var myinterval = setInterval(function () {
            if (timer == 0) {
                clearInterval(myinterval)
            } else {
                timer = timer - 1;
                $("#timer").text(timer)
            }
        }, 1000)
        setTimeout(function () {
            $(".flip-card-inner .flip-card-inner2").each(function () {
                $(this).removeClass("rollover");
            })
            $(".overLay").fadeOut();
        }, 3000)

    /*click on box to rotate*/
    $(".flip-card-inner2").click(function (index) {
        var checkArray = []
        $(".flip-card-inner .flip-card-inner2").each(function () {
            if ($(this).hasClass("done")) {
                checkArray.push(1)
            }
        })
        if (checkArray.length == arrayNum.length) {
            /*calulate if all the boxes are revieled */
            alert("Thanks for playing ")
        } else {
            clicks = clicks + 1; /*  Increasing the clicks */
            $("#click").text(clicks);

            var elmId = $(this).attr('id');
            if ($(this).hasClass("done")) {} else {
                var firstClick = $(this) /*first click this declare */
                $(this).addClass("rollover");
                var r = $(this).find(".flip-card-back img").attr("src"); /* first vale on first click*/

                var currentIndex = $(this).index(); /*index of the box */

                $(".flip-card-inner .flip-card-inner2").each(function (index) {
                    if (currentIndex == $(this).index()) {
                        /*nothing will happen */
                    } else {
                        if ($(this).hasClass("rollover")) {
                            var r2 = $(this).find(".flip-card-back img").attr("src"); /*value of 2nd clcik*/

                            if (r == r2) {
                                points = points + 100; /*calclulate points on match */
                                $("#points").text(points);

                                var thisele = $(this) /*  2nd clcik to get the 2nd val */
                                setTimeout(function () {
                                    thisele.addClass("done").removeClass("rollover");
                                    firstClick.addClass("done").removeClass("rollover");
                                }, 1000)
                            } else {
                                if (points == 0) {

                                } else {
                                    points = points - 20;
                                    $("#points").text(points);
                                }

                                var thisele = $(this)
                                setTimeout(function () {
                                    thisele.removeClass("rollover");
                                    firstClick.removeClass("rollover");

                                }, 800)
                            }
                        }
                    }
                })
            }
        }
    });

    $("#reload").click(function () {
        location.reload();
    });

});
/*Full Screen open*/
var elem = document.documentElement;

function openFullscreen() {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
        /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
        /* IE11 */
        elem.msRequestFullscreen();
    }
}
/*Full Screen open End*/
