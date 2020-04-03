<template>
  <div
    id="feedback"
    v-if="usersubmitguess"
    v-bind:class="{correct: correct, wrong : !correct }"
  >{{ feedback }}</div>
</template>


<script>
export default {
  data: function() {
    return {};
  },
  props: {
    // feedback
    feedback: String,
    usersubmitguess: Boolean,
    correct: Boolean
  },
  template: "#game-feedback",
  methods: {}
};
</script>

<style>
#feedback {
  color: #fff;
  padding: 1em;
}
.correct {
  background: #228b22;
}
.wrong {
  background: #b22222;
}
</style>

