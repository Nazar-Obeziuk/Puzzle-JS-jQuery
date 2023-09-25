"use strict";

$(function () {
    
    let puzzleItem = $('.puzzle');
    let timerId;
    let puzzleCounter = 0;
    let timerRunning = false;

    // Function to start the timer
    function startTimer() {
        let minutes = +$('.timer-clock').text().slice(0, 2);
        let seconds = +$('.timer-clock').text().slice(3, 5);

        timerRunning = true;

        timerId = setInterval(function () {
            if (!timerRunning) {
                clearInterval(timerId);
                return;
            }

            if (minutes === 0 && seconds === 0) {
                clearInterval(timerId);
                $('.pity-popup').addClass('hidden');
                $("#check").attr("disabled", true);
                $('body').css('background', 'rgba(213, 213, 213, 0.6)');
                $('#close-pity').on('click', function () {
                    $('.pity-popup').removeClass('hidden');
                    $('body').css('background', 'white');
                })
            } else {
                if (seconds === 0) {
                    minutes -= 1;
                    seconds = 59;
                } else {
                    seconds -= 1;
                }

                const timerMinutes = String(minutes).padStart(2, '0');
                const timerSeconds = String(seconds).padStart(2, '0');
                const timerText = `${timerMinutes}:${timerSeconds}`;
                $('.timer-clock').text(timerText);
            }

        }, 1000);
    }

    // reset timer function 
    function resetTimer() {
        clearInterval(timerId);
        timerId = null;
        timerRunning = false;
    }

    // click button timer
    function clickTimer() {
        $('#start').on('click', function () {
            $("#start").attr("disabled", true);
            resetTimer();
            startTimer(); 
        });
    }

    clickTimer()

    // swipe picture piece timer
    function swipeTimer() {
        puzzleItem.each(function (index, itemElem) {
            $(itemElem).on('mousedown', function () {
                $("#start").attr("disabled", true);
                resetTimer(); 
                startTimer();
            })
        })
    }

    swipeTimer()

    // sort puzzle 
    function sortPuzzle() {
        $(".puzzle-wrapper").sortable({
            connectWith: ".puzzle-wrapper",
            containment: ".play-container",
            cursor: "move",
            scroll: false,
        })
        
        let checkArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        let currentPosition;

        for (let i = 0; i < 16; i++) {
            $('.collected-block > .puzzle-wrapper').removeAttr('value');

            do {
                currentPosition = Math.round(Math.random() * 15);
            } while (checkArray[currentPosition])

            $(`.puzzle:eq(${i})`).attr('value', `${currentPosition + 1}`);
            $(`.sorted-block > .puzzle-wrapper:eq(${i})`).append($(`.puzzle:eq(${i})`));
            checkArray[currentPosition] = 1;
        }

        $('.puzzle').css('background-image', 'url(images/arsenal.jpg)');
    }

    sortPuzzle();

    // check result 
    function checkResult() {
        $('#check').on('click', function () {
            $('.time-popup').addClass('hidden');
            $('body').css('background', 'rgba(213, 213, 213, 0.6)');

            $('#check-popup').on('click', function () {                        
                timerRunning = false;
                clearInterval(timerId);

                puzzleCounter = 0; 

                for (let i = 0; i < 16; i++) {
                    if ($(`.collected-block > .puzzle-wrapper:eq(${i}) > .puzzle`).attr('value') == i + 1) {
                        puzzleCounter++;
                    }
                }

                if (puzzleCounter === 16) {
                    $('.done-popup').addClass('hidden');
                    $("#check").attr("disabled", true);
                    $('#close-done').on('click', function () {
                        $('.done-popup').removeClass('hidden');
                        $('.time-popup').removeClass('hidden');
                        $('body').css('background', 'white');
                    })
                } else {
                    $('.pity-popup').addClass('hidden');
                    $("#check").attr("disabled", true);
                    $('#close-pity').on('click', function () {
                        $('.pity-popup').removeClass('hidden');
                        $('.time-popup').removeClass('hidden');
                        $('body').css('background', 'white');
                    })
                }

                if (timerRunning === false) {
                    clearInterval(timerId);
                }
            })
        })
    }

    checkResult();

    $('#close').on('click', function () {
        $('.time-popup').removeClass('hidden');
        $('body').css('background', 'white');
    })

    // new game
    function newGame() {
        $('#new').on('click', function () {
            puzzleItem.each(function (index, itemElem) {
                $(itemElem).on('mousedown', function () {
                    $("#start").attr("disabled", true);
                    let minutes = +$('.timer-clock').text().slice(0, 2);
                    let seconds = +$('.timer-clock').text().slice(3, 5);
        
                    if (!timerRunning) {
                        timerRunning = true;
    
                        timerId = setInterval(function () {
                            if (!timerRunning) {
                                clearInterval(timerId);
                                return;
                            }
    
                            if (minutes === 0 && seconds === 0) {
                                clearInterval(timerId);
                                $('.pity-popup').addClass('hidden');
                                $("#check").attr("disabled", true);
                                $('body').css('background', 'rgba(213, 213, 213, 0.6)');
                                $('#close-pity').on('click', function () {
                                    $('.pity-popup').removeClass('hidden');
                                    $('body').css('background', 'white');
                                })
                            } else {
                                if (seconds === 0) {
                                    minutes -= 1;
                                    seconds = 59;
                                } else {
                                    seconds -= 1;
                                }
                
                                const timerMinutes = String(minutes).padStart(2, '0');
                                const timerSeconds = String(seconds).padStart(2, '0');
                                const timerText = `${timerMinutes}:${timerSeconds}`;
                                $('.timer-clock').text(timerText);
                            }
                        }, 1000)
                    }
                })
            })

            $("#check").attr("disabled", false);

            $("#start").attr("disabled", false);
            $('.timer-clock').text('01:00');
                
            let checkArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            let currentPosition;
    
            for (let i = 0; i < 16; i++) {
                $('.collected-block > .puzzle-wrapper').removeAttr('value');
    
                do {
                    currentPosition = Math.round(Math.random() * 15);
                } while (checkArray[currentPosition])
    
                $(`.puzzle:eq(${i})`).attr('value', `${currentPosition + 1}`);
                $(`.sorted-block > .puzzle-wrapper:eq(${i})`).append($(`.puzzle:eq(${i})`));
                checkArray[currentPosition] = 1;
            }
    
            $('.puzzle').css('background-image', 'url(images/arsenal.jpg)');

            $("#check").attr("disabled", false);
    
            resetTimer();
        })
    }

    newGame()
})

