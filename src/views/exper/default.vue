<template>
  <div id="exp"></div>
</template>

<script setup>
import { onMounted, h, render } from 'vue';
import { initJsPsych } from 'jspsych';
import { jsPsychHtmlKeyboardResponse, jsPsychSurveyHtmlForm } from '@/utils/jspsych/plugin_all_in_one.js';
import question from "./question.vue";

const jsPsych = initJsPsych({
  display_element: "exp",
  on_finish() {
    console.log(jsPsych.data.get().csv());
  }
});

const timeline = [{
  timeline: [{
    type: jsPsychHtmlKeyboardResponse,
    choices: "NO_KEYS",
    stimulus: () => {
      return "请用本地浏览器打开";
    }
  }],
  conditional_function: () => {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/micromessenger/i) == "micromessenger") {
      return true;
    } else {
      return false;
    }
  }
}];

let question_pos = -1;
const questions = [];
timeline.push({
  type: jsPsychHtmlKeyboardResponse,
  choices: ["NO_KEYS"],
  stimulus: "请耐心等待资源加载完毕！",
  on_load: () => {
    import("@/assets/json/a.json")
      .then(r => r.default)
      .then(r => {
        for (let i = 0; i < 492; i++) {
          let w = r["词语"][i];
          let m1 = r["释义1"][i];
          let m2 = r["释义2"][i];
          let m3 = r["释义3"][i];

          let o = { "word": w, "mean": [m1], "id": i + 1 };
          if (m2 != null) { o["mean"].push(m2); }
          if (m3 != null) { o["mean"].push(m3); }
          questions.push(o);
        }
        jsPsych.finishTrial({ load: true });
      })
  }
});

timeline.push({
  timeline: [{
    type: jsPsychHtmlKeyboardResponse,
    choices: ["NO_KEYS"],
    stimulus: "<div id='main'></div>",
    on_load: () => {
      let max_num = 1;
      let i = 0;

      const answer = {};
      const domM = document.querySelector("#main");
      while (i < max_num) {
        if(question_pos >= questions.length) break;
        const { word, mean, id } = questions[question_pos];
        if (i > 0 && i + mean.length >= max_num) break;
        i += mean.length;
        question_pos += 1;
        const dom = document.createElement("div");
        render(h(question, {
          questionId: id,
          questionTitle: word,
          questionMeans: mean,
          onClickVal(id, v) {
            answer[id] = v;
          }
        }), dom);
        domM.appendChild(dom);
      }

      const dom = document.createElement("div");
      dom.id = "question-submit";
      dom.innerText = "提交";
      dom.style = `display: block;
        width: 64px;
        height: 32px;
        margin: 0 0 0 auto;
        padding: 7px;
        box-sizing: content-box;
        background: #fff;
        color: black;
        font-size: 24px;
        text-align: center;
        line-height: 32px;
        border-radius: 10px;
        cursor: pointer;`;
      dom.addEventListener("click", (e) => {
        if (Object.keys(answer).length == i) jsPsych.finishTrial({ answers: answer });
      });
      domM.appendChild(dom);
    }
  }],
  conditional_function: () => {
    if (question_pos < 0) {
      question_pos = 0;
    }
    return true;
  },
  loop_function: () => {
    if (question_pos < questions.length) {
      return true;
    }
    return false;
  }
});

// setInterval(() => {
//   ["input", "#question-submit"].forEach(v => {
//   const doms = document.querySelectorAll(v);
//   doms.forEach(dom => {
//     dom.click();
//   });
// });
// }, 100);

timeline.push({
  type: jsPsychHtmlKeyboardResponse,
  choices: ["NO_KEYS"],
  stimulus: "回答完成~",
  on_load() {
    // jsPsych.data.get().localSave("csv", "a.csv");
  }
});

onMounted(() => {
  jsPsych.run(timeline);
});
</script>