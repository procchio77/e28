import Vue from 'vue';
import FeedBack from './components/FeedBack.vue'

let app = new Vue({
  el: "#app",
  data: {
    words: [
      ['newton', 'A city, a person, a law.', 1],
      ['oasis', 'A band that plays on fertile ground.', 1],
      ['bank', 'I have branches, but no fruit, trunk or leaves', 1],
      ['staircase', 'I go up and down but I do not move.', 2],
      ['minute', 'I am small in stature, or 60 times larger than one.', 2],
      ['converse', 'I am a chatty sneaker.', 2],
      ['temperature', 'I can be hot or cold.', 3],
      ['communication', 'The exchange of information.', 3],
      ['problematic', 'This is difficult to solve.', 3],
    ],
    playerName: null,
    feedback: '',
    difficultyLevel: 0,
    mysteryWord: '',
    correct: null,
    guess: '',
    userSubmitGuess: null,
    hint: '',
    randomArrayIndex: -1,

  },

  components: {
    'game-feedback': FeedBack
  },

  //Methods
  methods: {

    submitPlayerName: function () {
      console.log('Player name..')
    },

    //Knuth/Fisher Yates shuffle
    shuffleWord: function (word) {
      var a = word.split(""),
        b = a.length;
      for (var i = b - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
      }
      //make sure the shuffle doesn't return word
      if (a.join("") == word) {
        return this.shuffleWord(word);
      }

      return a.join("");
    },

    setRanomIndexByDifficulty: function () {
      let x = this.difficultyLevel + 2;
      let m = this.difficultyLevel;
      let arrayIndex = Math.floor(Math.random() * (x - m + 1)) + m;

      if (arrayIndex == this.randomArrayIndex) {
        return this.setRanomIndexByDifficulty();
      }

      this.randomArrayIndex = arrayIndex;
    },

    onDifficultyChange: function () {

      this.setRanomIndexByDifficulty();
      this.mysteryWord = this.words[this.randomArrayIndex][0];
      this.hint = this.words[this.randomArrayIndex][1];
      this.difficultyLevel = '';
      this.userSubmitGuess = null;
      this.feedback = '';
      this.guess = '';

    },

    submitGuess: function () {
      this.userSubmitGuess = true;
      if (this.guess.toLowerCase() === this.mysteryWord) {
        this.correct = true;
        this.feedback = "Awesome job! You got it!";
      }
      else {
        this.correct = false;
        this.feedback = "Opps! That is not correct, please try again.";
      }

    },

    playAgain: function () {
      this.difficultyLevel = 0; //set back to easy
      this.mysteryWord = "";
      this.guess = "";
      this.hint = "";
      this.correct = null;
      this.onDifficultyChange();

    }

  },

  //Lifecycle Hooks
  mounted: function () {
    this.onDifficultyChange();
  },

  //computed Properties
  computed: {
    scrambledWord: function () {
      return this.shuffleWord(this.mysteryWord);
    }
  },


})