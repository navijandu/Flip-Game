$(document).ready(function () {
    const images = [
        "https://picsum.photos/id/1003/300/200",
        "https://picsum.photos/id/1015/300/200",
        "https://picsum.photos/id/1016/300/200",
        "https://picsum.photos/id/1020/300/200",
        "https://picsum.photos/id/1024/300/200",
        "https://picsum.photos/id/1027/300/200",
        "https://picsum.photos/id/1035/300/200",
        "https://picsum.photos/id/1039/300/200"
    ];

    let gameImages = [...images, ...images];
    let firstCard = null;
    let secondCard = null;
    let lock = false;
    let points = 0;
    let clicks = 0;
    let time = 0;
    let timer = null;
    let previewTimer = null;
    let gameStarted = false;

    function getBestScore() {
        return parseInt(localStorage.getItem("memoryBestScore")) || 0;
    }

    function setBestScore(score) {
        localStorage.setItem("memoryBestScore", score);
        $("#bestScore").text(score);
    }

    function loadBestScore() {
        $("#bestScore").text(getBestScore());
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function buildBoard() {
        shuffle(gameImages);
        $("#gameBoard").html("");

        gameImages.forEach((img) => {
            $("#gameBoard").append(`
                <div class="flip-card-inner2" data-img="${img}">
                    <div class="flip-card-front">
                        <img src="https://cdn-icons-png.flaticon.com/512/5726/5726532.png" alt="Card Front">
                    </div>
                    <div class="flip-card-back">
                        <img src="${img}" alt="Card Back">
                    </div>
                </div>
            `);
        });
    }

    function startTimer() {
        clearInterval(timer);
        timer = setInterval(function () {
            time++;
            $("#time").text(time + " Sec");
        }, 1000);
    }

    function startPreview() {
        let count = 3;
        $("#timer").text(count);
        $(".overLay").show();
        $(".flip-card-inner2").addClass("rollover");

        clearInterval(previewTimer);
        previewTimer = setInterval(function () {
            count--;
            $("#timer").text(count);

            if (count <= 0) {
                clearInterval(previewTimer);
                $(".flip-card-inner2").removeClass("rollover");
                $(".overLay").fadeOut();
            }
        }, 1000);
    }

    function resetState() {
        firstCard = null;
        secondCard = null;
        lock = false;
    }

    function updateBestIfNeeded() {
        const bestScore = getBestScore();
        if (points > bestScore) {
            setBestScore(points);
        }
    }

    function showWinPopup() {
        $("#finalStats").html(
            "Points: <strong>" + points + "</strong><br>" +
            "Turns: <strong>" + clicks + "</strong><br>" +
            "Time: <strong>" + time + " Sec</strong>"
        );
        $("#winPopup").addClass("show");
    }

    function checkWin() {
        if ($(".done").length === gameImages.length) {
            clearInterval(timer);
            gameStarted = false;
            updateBestIfNeeded();
            setTimeout(function () {
                showWinPopup();
            }, 350);
        }
    }

  $(document).on("click", ".flip-card-inner2", function () {
    if (!gameStarted) return;
    if (lock) return;
    if ($(this).hasClass("done")) return;
    if ($(".overLay").is(":visible")) return;

    if (firstCard && !secondCard && $(this).is(firstCard)) {
        $(this).removeClass("rollover");
        firstCard = null;
        return;
    }

    if ($(this).hasClass("rollover")) return;

    $(this).addClass("rollover");

    if (!firstCard) {
        firstCard = $(this);
        return;
    }

    secondCard = $(this);
    lock = true;

    clicks++;
    $("#click").text(clicks);

    let img1 = firstCard.data("img");
    let img2 = secondCard.data("img");

    if (img1 === img2) {
        points += 100;
        $("#points").text(points);

        setTimeout(function () {
            firstCard.addClass("done rollover");
            secondCard.addClass("done rollover");
            resetState();
            checkWin();
        }, 500);
    } else {
        points = Math.max(0, points - 20);
        $("#points").text(points);

        setTimeout(function () {
            firstCard.removeClass("rollover");
            secondCard.removeClass("rollover");
            resetState();
        }, 700);
    }
});

    function startGame() {
        clearInterval(timer);
        clearInterval(previewTimer);

        gameStarted = true;
        points = 0;
        clicks = 0;
        time = 0;
        resetState();

        $("#points").text(points);
        $("#click").text(clicks);
        $("#time").text("0 Sec");
        $("#winPopup").removeClass("show");

        gameImages = [...images, ...images];
        buildBoard();
        startPreview();
        startTimer();
    }

    $("#startGame").click(function () {
        startGame();
    });

    $("#reload").click(function () {
        startGame();
    });

    $("#playAgain").click(function () {
        startGame();
    });

    $("#close").click(function () {
        window.close();
    });

    loadBestScore();
});

var elem = document.documentElement;

function openFullscreen() {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    }
}
