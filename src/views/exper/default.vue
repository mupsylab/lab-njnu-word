<template>
  <div id="exp"></div>
</template>

<script setup>
import { onMounted, h, render } from 'vue';
import { initJsPsych } from 'jspsych';
import { jsPsychHtmlKeyboardResponse, jsPsychCallFunction } from '@/utils/jspsych/plugin_all_in_one.js';
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
let use_q = [];
const leng = 291;
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
}, {
  type: jsPsychCallFunction,
  func() {
    const curr = 1; // 1 or 2
    const j = (curr - 1) * leng;
    const res = [];

    let t_res = [];
    for(let i = 0; i < leng; i++) {
      const index = j + i;
      t_res.push(questions[index]);
      if (t_res.length == 80) {
        res.push(jsPsych.randomization.shuffle(t_res));
        t_res = [];
      }
    }
    if (t_res.length > 0) res.push(jsPsych.randomization.shuffle(t_res));
    use_q = res;
  }
});

timeline.push({
  timeline: [{
    type: jsPsychHtmlKeyboardResponse,
    choices: ["NO_KEYS"],
    stimulus: "<div id='main' style='outline: none;'></div>",
    on_load: () => {
      let max_num = 1;
      let i = 0;

      const answer = {};
      const domM = document.querySelector("#main");
      while (i < max_num) {
        // 问卷呈现达到了长度
        if (question_pos >= leng) break;
        const { word, mean, id } = use_q[Math.floor(question_pos / 80)][question_pos % 80];
        // 当前呈现的题目数量也达到了问卷长度
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

      const start_time = new Date().getTime();
      const EventListener = (e) => {
        if (e.code == "Space" && Object.keys(answer).length == i) {
          jsPsych.finishTrial({ answers: answer, rt: new Date().getTime() - start_time });
          document.body.removeEventListener("keyup", EventListener);
        }
      };
      document.body.addEventListener("keyup", EventListener);
    }
  }, {
    timeline: [{
      type: jsPsychHtmlKeyboardResponse,
      choices: [" "],
      stimulus: "<p style='font-size: 24px;'>休息一下吧</p><p style='font-size: 24px;'>按 空格键 继续</p>"
    }],
    conditional_function: () => {
      // 做80轮，休息一下
      return question_pos % 80 == 0;
    }
  }],
  conditional_function: () => {
    if (question_pos < 0) {
      question_pos = 0;
    }
    return true;
  },
  loop_function: () => {
    if (question_pos < leng) {
      return true;
    }
    return false;
  }
});

// setInterval(() => {
//   ["input", "#question-submit"].forEach(v => {
//     const doms = document.querySelectorAll(v);
//     doms.forEach(dom => {
//       dom.click();
//     });
//   });
//   document.body.dispatchEvent(new KeyboardEvent("keyup", {code: "Space"}));
// }, 100);

timeline.push({
  type: jsPsychHtmlKeyboardResponse,
  choices: ["NO_KEYS"],
  stimulus: "回答完成~",
  on_load() {
    jsPsych.data.get().localSave("csv", "a.csv");
  }
});

onMounted(() => {
  jsPsych.run(timeline);
});
</script>