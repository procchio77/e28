Vue.component('round-info', {
    data: function () {
        return {}
    },
    props: {
        number: {
            type: Number,
            default: 0
        },
        winner: String,
        player1score: {
            type: Number,
            default: 0
        },
        computerscore: {
            type: Number,
            default: 0
        },
        ties: {
            type: Number,
            default: 0
        }

    },
    template: '#round-info',
    methods: {

    }
})

let app = new Vue({
    el: '#app',
    data: {

        player1: 'X',
        player2: 'O',
        player1Score: 0,
        computerScore: 0,
        tie: 0,
        isEndGame: false,
        gamesToPlay: 0,
        gamesPlayed: 0,
        whoToBegin: null,
        winner: null,
        currentTurn: 'X',
        turnCounter: 0,
        cells: [
            { id: 0, text: "", highlighted: false },
            { id: 1, text: "", highlighted: false },
            { id: 2, text: "", highlighted: false },
            { id: 3, text: "", highlighted: false },
            { id: 4, text: "", highlighted: false },
            { id: 5, text: "", highlighted: false },
            { id: 6, text: "", highlighted: false },
            { id: 7, text: "", highlighted: false },
            { id: 8, text: "", highlighted: false }
        ],

        //only using this because there seems to be a wiring issue with using the cells.text property. come back undefined on first pass.
        cellsToPlay: [0, 1, 2, 3, 4, 5, 6, 7, 8],

        rounds: []

    },

    //Methods
    methods: {

        nextTurn: function (i) {


            if (!this.isEndGame && typeof this.cellsToPlay[i] == 'number') {

                this.turn(i);

                //computer turn
                if (!this.isEndGame) {
                    let randomCell = this.cellsToPlay[Math.floor(Math.random() * this.cellsToPlay.length)];
                    this.turn(randomCell);
                }

            }

        },


        turn: function (i) {

            this.cellsToPlay[i] = this.currentTurn;
            this.cells[i].text = this.currentTurn;
            this.turnCounter++;

            if (this.turnCounter > 4) {
                this.checkWinner();
            }

            this.currentTurn = (this.currentTurn === this.player1) ? this.player2 : this.player1;

        },



        checkWinner: function () {
            const winningCombos = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
            ];

            winningCombos.forEach((w) => {
                const [x, y, z] = w;
                const cellX = this.cells[x];
                const cellY = this.cells[y];
                const cellZ = this.cells[z];

                if (cellX.text && cellX.text === cellY.text && cellX.text === cellZ.text) {
                    this.isEndGame = true;
                    this.winner = this.currentTurn;
                    if (this.currentTurn == this.player1) {
                        this.player1Score++;
                    }
                    else {
                        this.computerScore++;
                    }

                    cellX.highlighted = cellY.highlighted = cellZ.highlighted = true;
                }
            });

            //check for tie
            if (this.turnCounter === 9) {
                this.isEndGame = true;
                this.tie++;
            }


            //Add round
            if (this.isEndGame) {
                var round = { number: this.rounds.length + 1, winner: this.currentTurn }
                this.rounds.push(round);
            }


        },

        playAgain: function () {
            this.cellsToPlay = [0, 1, 2, 3, 4, 5, 6, 7, 8];
            this.isEndGame = false;
            this.currentTurn = 'X';
            this.turnCounter = 0;
            this.cells = [
                { id: 0, text: "", highlighted: false },
                { id: 1, text: "", highlighted: false },
                { id: 2, text: "", highlighted: false },
                { id: 3, text: "", highlighted: false },
                { id: 4, text: "", highlighted: false },
                { id: 5, text: "", highlighted: false },
                { id: 6, text: "", highlighted: false },
                { id: 7, text: "", highlighted: false },
                { id: 8, text: "", highlighted: false }
            ];
        },

        reset: function () {
            this.playAgain();
            this.rounds = [];
            this.player1Score = 0;
            this.computerScore = 0;
            this.tie = 0;
        },

    },

    //computed Properties
    computed: {
        gameMessage: function () {
            if (this.isEndGame && this.winner) {
                return this.winner + ' wins the game !!';
            }

            if (this.isEndGame && !this.winner) {
                return 'The game is a tie !!';
            }

        }
    },

});



