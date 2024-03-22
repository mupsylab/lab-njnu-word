<template>
  <div id="exp"></div>
</template>

<script setup>
import { onMounted, h, render } from 'vue';
import { initJsPsych } from 'jspsych';
import { jsPsychHtmlKeyboardResponse, jsPsychHtmlButtonResponse, jsPsychSurveyHtmlForm, jsPsychInstructions, jsPsychFullscreen } from '@/utils/jspsych/plugin_all_in_one.js';
import question from "./question.vue";
import inst1 from "./inst/i1.vue";
import inst2 from "./inst/i2.vue";
import inst3 from "./inst/i3.vue";
import expInst1 from "./inst/e1.vue";

const debug = true;
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
}, {
  type: jsPsychFullscreen,
  fullscreen_mode: true,
  message: "<div>点击开始进入全屏</div>",
  button_label: "开始"
}];

// 指导语
timeline.push({
  // 指导语部分
  type: jsPsychInstructions,
  pages() {
    const dom1 = document.createElement("div");
    render(h(inst1), dom1);
    const dom2 = document.createElement("div");
    render(h(inst2), dom2);
    const dom3 = document.createElement("div");
    render(h(inst3), dom3);
    return [dom1.outerHTML, dom2.outerHTML, dom3.outerHTML];
  },
  show_clickable_nav: true,
  allow_backward: true,
  button_label_previous: "返回",
  button_label_next: "继续",
}, {
  // 指导语部分
  type: jsPsychInstructions,
  pages() {
    const dom1 = document.createElement("div");
    render(h(expInst1), dom1);
    return [dom1.outerHTML];
  },
  show_clickable_nav: true,
  allow_backward: true,
  button_label_previous: "返回",
  button_label_next: "继续",
});

// 被试信息
const info = {};
timeline.push({
  timeline: [{
    type: jsPsychSurveyHtmlForm,
    preamble: "<p style =' color : white'>你的名字是</p>",
    html: "<p><input name='Q0' type='text' value='' required /></p>",
    button_label: "继续",
    on_finish: function (data) {
      info["Name"] = data.response.Q0;
    }
  }, {
    type: jsPsychHtmlButtonResponse,
    stimulus: "<p style = 'color : white'>你的性别</p>",
    choices: ['男', '女', '其他'],
    on_finish: function (data) {
      // console.log(data)
      info["Sex"] = data.response == 0 ? "Male" : (data.response == 1 ? "Female" : "Other")
    }
  }, {
    type: jsPsychSurveyHtmlForm,
    preamble: "<p style = 'color : white'>你的出生年</p>",
    html: `
        <p><input name="Q0" type="number" placeholder="1900~2021" min=1900 max=2021
        oninput="if(value.length>4) value=value.slice(0,4)" required /></p>`,
    button_label: '继续',
    on_finish: function (data) {
      info["BirthYear"] = data.response.Q0;
    }
  }, {
    type: jsPsychSurveyHtmlForm,
    preamble: "<p style = 'color : white'>教育经历</p>",
    html: `
           <p><select name="Q0" size=10>
           <option value=1>小学以下</option>
           <option value=2>小学</option>
           <option value=3>初中</option>
           <option value=4>高中</option>
           <option value=5>大学</option>
           <option value=6>硕士</option>
           <option value=7>博士</option>
           <option value=8>其他</option>
           </select></p>`,
    button_label: '继续',
    on_finish: function (data) {
      let edu = ["below primary school", "primary school", "junior middle school", "high school", "university", "master", "doctor", "other"];

      info["Education"] = edu[parseInt(data.response.Q0) - 1];
      console.log(info)
    }
  }]
});

const curr = 2; // 1 or 2
const block_num = [62, 62, 61, 61];
// 预处理数据
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
          { ans: 1, word: "检测题", mean: ["人体的正常温度是100摄氏度"], id: "t1", isTrap: true },
          { ans: 1, word: "检测题", mean: ["巴黎是中国的首都"], id: "t2", isTrap: true },
          { ans: 7, word: "检测题", mean: ["道路交通规则是红灯停绿灯行"], id: "t3", isTrap: true },
          { ans: 7, word: "检测题", mean: ["中国属于亚洲"], id: "t4", isTrap: true },
          { ans: 1, word: "检测题", mean: ["一米等于两厘米"], id: "t5", isTrap: true },
          { ans: 7, word: "检测题", mean: ["人字总笔画数为2画"], id: "t6", isTrap: true },
          { ans: 1, word: "检测题", mean: ["四川省的省会是北京"], id: "t7", isTrap: true },
          { ans: 7, word: "检测题", mean: ["长方形有四条边"], id: "t8", isTrap: true }
        ].reverse();
        for (let i = 0; i < 246; i++) {
          const index = j + i;
          t_res.push(questions[index]);
          if (t_res.length == block_num[t]) {
            const a = jsPsych.randomization.shuffle(t_res);
            a.splice(20, 0, trapQues.pop(1));
            a.splice(40, 0, trapQues.pop(1));
            res.push(a);
            t_res = [];
            t += 1;
          }
        }
        use_q = res;
        if (debug) {
          const r = [];
          for (let i = 0; i < 15; i++) {
            r.push(use_q[0][i]);
          }
          use_q = [r];
        }
        jsPsych.finishTrial({ load: true });
      })
  }
});

// 正式实验部分
let curr_block = 0;
let curr_index = 0;
let trapError = false;
const trial = {
  type: jsPsychHtmlKeyboardResponse,
  choices: ["NO_KEYS"],
  stimulus: "<div id='main' style='outline: none;'></div>",
  on_load: () => {
    const answer = {};
    const { word, mean, id, isTrap } = use_q[curr_block][curr_index];
    curr_index += 1;

    const dom = document.createElement("div");
    render(h(question, {
      questionId: id.toString(),
      questionTitle: word,
      questionMeans: mean,
      onClickVal(id, v) {
        answer[id] = v;
      }
    }), dom);
    document.querySelector("#main").appendChild(dom);

    const start_time = new Date().getTime();
    const EventListener = (e) => {
      if (e.code == "Space" && Object.keys(answer).length == mean.length) {
        if (isTrap) {
          const ans = use_q[curr_block][curr_index - 1]["ans"];
          if (answer[Object.keys(answer)[0]] != ans) {
            trapError = true;
          }
        }
        const rt = new Date().getTime() - start_time;
        Object.keys(answer).forEach(k => {
          let o = {
            save: true,
            rt: rt,
            qId: k,
            qVal: answer[k]
          };
          jsPsych.data.write(o);
        });
        jsPsych.finishTrial({ answers: answer, rt: rt, isTrap });
        document.body.removeEventListener("keyup", EventListener);
      }
    };
    document.body.addEventListener("keyup", EventListener);
  }
};
const rest = {
  timeline: [{
    type: jsPsychHtmlKeyboardResponse,
    choices: ["NO_KEYS"],
    stimulus: "<p style='font-size: 24px;'>休息一下吧</p><p style='font-size: 24px;'>按 空格键 继续</p>",
    on_load() {
      const start_time = new Date().getTime();
      const EventListener = (e) => {
        if (e.code == "Space" && Object.keys(answer).length == mean.length) {
          const rt = new Date().getTime() - start_time;
          jsPsych.data.write({
            save: true,
            rt: rt,
            qId: "rest"
          });
          document.body.removeEventListener("keyup", EventListener);
        }
      };
      document.body.addEventListener("keyup", EventListener);
    }
  }],
  conditional_function: () => {
    if (curr_index == use_q[curr_block].length) {
      curr_block += 1;
      curr_index = 0;
      if (curr_block == use_q.length) return false;
      return true;
    }
    return false;
  }
};
timeline.push({
  timeline: [trial, rest],
  loop_function: () => {
    if (trapError) return false;
    if (curr_block < use_q.length) {
      return true;
    }
    return false;
  }
});

timeline.push({
  type: jsPsychHtmlKeyboardResponse,
  choices: ["NO_KEYS"],
  stimulus() {
    if (trapError) {
      return "检测题错误，结束实验~";
    }
    return "回答完成~";
  },
  stimulus_duration: 10000,
  on_load() {
    const time = new Date().getTime();
    jsPsych.data.get().localSave("csv", `${time}_raw.csv`);
    jsPsych.data.get().filter({ save: true }).addToAll(info).localSave("csv", `${time}_clean.csv`);
  }
}, {
  type: jsPsychFullscreen,
  fullscreen_mode: false
});

onMounted(() => {
  jsPsych.run(timeline);
});
</script>