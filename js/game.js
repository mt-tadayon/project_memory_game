class Game {

    /**
     * @description: get a random number between 0 - 16 
     * @constructor
     * @function
     * @returns: {number} get a random number
     */
    constructor() {

        this.iconsGrid = ["fa-heart", "fa-heart", "fa-magnet", "fa-magnet", "fa-balance-scale", "fa-balance-scale",
            "fa-bicycle", "fa-bicycle", "fa-bug", "fa-bug", "fa-car", "fa-car", "fa-coffee", "fa-coffee", "fa-dice-six", "fa-dice-six"
        ];
        this.indexArray = [];
        this.clickCounter = 0;
        this.firstClickedElement;
        this.correctClickCounter = 0;
    }
    getRandomIndex() {
        return Math.floor(Math.random() * Math.floor(16));
    }

    /**
     * @description: show and hide the random icon according to random number, start the timer
     * @function
     * @param: {string} element: each element of iconsGrid
     * @param: {number} index: number of each element in array 
     */
    start() {
        this.clickCounter = 0;
        this.resetIcons();
        this.indexArray = [];
        const ctx = this;
        timer.startCount();

        this.iconsGrid.forEach(function (element, index) {
            const icon = $('<i class="fas ' + element + '"></i>').hide();
            let randomIndex = ctx.getRandomIndex();

            while (ctx.indexArray.includes(randomIndex)) {
                randomIndex = ctx.getRandomIndex();
            }

            $($(".flex-item")[randomIndex]).append(icon);
            ctx.indexArray.push(randomIndex);
        });
    }

    /**
     * @description: check if two clicks show same icons or not - reduce the starts for each 8 clicks
     * @function: 
     * @return: return nothing if user click 2 time on the same icon
     */

    onClickOnFlexItem() {
        if ($(this) === $(game.firstClickedElement)) {
            return;
        }

        if (game.clickCounter % 8 === 7) {
            stars.reduceStar();
        }

        $(this).children().show(200);
        game.clickCounter++;
        game.showNumberOfMoves(game.clickCounter);
        if (game.clickCounter % 2 === 0) {
            if ($(this).children().attr("class") === $(game.firstClickedElement).children().attr("class")) {
                game.correctClickCounter++

            } else {
                $(this).children().hide(3000);
                $(game.firstClickedElement).children().hide(3000);
            }
            game.checkGameOver(game.correctClickCounter, game.clickCounter);
        } else {
            game.firstClickedElement = $(this);
        }
    }

    /**
     * @description: check if game is over
     * @function
     * @param {number} correctClickCounter: number of correct clicks
     * @param {number} clickCounter: number of clicks
     */
    checkGameOver(correctClickCounter, clickCounter) {
        if (correctClickCounter === 8) {
            alert('Congratulation! You won this game with.')
        } else if (clickCounter > 40) {
            alert('Game Over!')
        }
    }

    /**
     * @description: show the number of moves
     * function
     * @param {number} 
     */
    showNumberOfMoves(numClicks) {
        $(".moves").children().text(`Number of moves ${numClicks}`)
    }

    /**
     * @description: reset the timer, reset all icons, reset 5 stars and start the game again
     * @function
     */

    reset() {
        this.resetIcons();
        timer.resetTimer();
        stars.resetStars();
        game.start();
    }

    /**
     * @description: reset stars back to 5 full stars
     * @function
     */

    resetIcons() {
        $(".flex-item > i").remove();
    }


};