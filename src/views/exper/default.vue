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

const curr = 2; // 1 or 2
const l = [62, 62, 61, 61];

let question_pos = -1;
let use_q = [];
timeline.push({
  type: jsPsychHtmlKeyboardResponse,
  choices: ["NO_KEYS"],
  stimulus: "请耐心等待资源加载完毕！",
  on_load: () => {
    import("@/assets/json/a.json")
      .then(r => r.default)
      .then(r => {
        const questions = [];

        for (let i = 0; i < 492; i++) {
          let w = r["词语"][i];
          let m1 = r["释义1"][i];
          let m2 = r["释义2"][i];
          let m3 = r["释义3"][i];

          let o = { "word": w, "mean": [m1], "id": i + 1, isTrap: false };
          if (m2 != null) { o["mean"].push(m2); }
          if (m3 != null) { o["mean"].push(m3); }
          questions.push(o);
        }

        // 对于处理好的结果，进行切分操作
        const j = (curr - 1) * 246;
        const res = []; let t = 0; let t_res = [];
        const trapQues = [
          { word: "检测题", mean: "人体的正常温度是100摄氏度", id: "t1", isTrap: true },
          { word: "检测题", mean: "巴黎是中国的首都", id: "t2", isTrap: true },
          { word: "检测题", mean: "道路交通规则是红灯停绿灯行", id: "t3", isTrap: true },
          { word: "检测题", mean: "中国属于亚洲", id: "t4", isTrap: true },
          { word: "检测题", mean: "一米等于两厘米", id: "t5", isTrap: true },
          { word: "检测题", mean: "人字总笔画数为2画", id: "t6", isTrap: true },
          { word: "检测题", mean: "四川省的省会是北京", id: "t7", isTrap: true },
          { word: "检测题", mean: "长方形有四条边", id: "t8", isTrap: true }
        ].reverse();
        for (let i = 0; i < 246; i++) {
          const index = j + i;
          t_res.push(questions[index]);
          if (t_res.length == l[t]) {
            const a = jsPsych.randomization.shuffle(t_res);
            a.splice(20, 0, trapQues.pop(1));
            a.splice(40, 0, trapQues.pop(1));
            res.push(a);
            t_res = [];
            t += 1;
          }
        }
        use_q = res;

        jsPsych.finishTrial({ load: true });
        console.log(res);
      })
  }
});

const trial = {
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
      if (question_pos >= 246) break;
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
};

const rest = {
  timeline: [{
    type: jsPsychHtmlKeyboardResponse,
    choices: [" "],
    stimulus: "<p style='font-size: 24px;'>休息一下吧</p><p style='font-size: 24px;'>按 空格键 继续</p>"
  }],
  conditional_function: () => {
    // 做80轮，休息一下
    return question_pos % 80 == 0;
  }
};

timeline.push({
  timeline: [trial, rest],
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