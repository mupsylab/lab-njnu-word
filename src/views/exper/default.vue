<template>
  <div id="exp"></div>
</template>

<script setup>
import { onMounted, h, render } from 'vue';
import { initJsPsych } from 'jspsych';
import { jsPsychHtmlKeyboardResponse, jsPsychHtmlButtonResponse, jsPsychSurveyHtmlForm, jsPsychInstructions } from '@/utils/jspsych/plugin_all_in_one.js';
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

// 指导语
const ss = "   \
    .title{ \
        font-size: " + 30 + "px;\
        text-align: center;\
        font-weight: 700;\
    }\
    p{ \
        font-size: " + 20 + "px; \
        text-indent: 2em; \
        text-align: left; \
        margin-block: " + 10 + "px; \
        line-height: 1.5em; \
        text-align: justify \
    } \
    .example{ \
        text-align: center; \
        font-weight: 100; \
    }";
timeline.push({
  // 指导语部分
  type: jsPsychInstructions,
  pages: [
    "<div class='contacts'>   <p class='title' style='color:#fff'>第一部分</p> <div style='color: white;'class='content_box'> \
            <style>" + ss + " \
        </style>    \
<div style='text-align: left'>\
<p>您需要对给出的词语进行维度评分，在每次实验开始您会看到以下问题：</p> \
<p class='example'>【词语】可以用于描述某个人的【维度】</p> \
<p class='example'>1  2  3  4  5  6  7  8  9 </p> \
<p class='example'><br/>维度定义</p> \
\
<p>其中【维度】是从能力, 道德, 社交能力, 外貌, 社会经济地位五个维度中随机选出的，您需要对该段描述进行1-9分的评分，其中1分表示非常不同意，9分表示非常同意。采用鼠标选择相应数字进行评分，在每次评分后请按“空格键”继续。</p> \
<p>其中：</p> \
<p>道德：用于描述人的道德品格或道德品质（包括积极与消极）</p> \
<p>能力：用于描述人可用来完成某一项目标或者任务的综合素质（这里的目标和任务不包括人际交往）</p> \
<p>社交能力：用于描述人的人际交往能力</p> \
<p>外貌：用于描述人的长相、身材等</p> \
<p>社会经济地位：用于描述人的社会地位和经济水平等</p> \
<p><strong>请注意：</strong>这些词可能有积极词，也可能有消极词，请您不要根据积极和消极进行评分，而是依据该词是否适合用来描述该维度进行评分。</p>\
</div>", "<div class='contacts'>   <p class='title' style='color:#fff'>第一部分</p> <div style='color: white;'class='content_box'>\
<style>" + ss + " \
</style>    \
<div style='text-align: left; margin: 0 15% 0 15%;'>\
<p>举个例子：“强盗”这个词，看到之后通常会想到“用暴力抢夺他人财物的人”，这时，虽然该词为消极词，但它是用来描述某人的道德水平低，因此对“【强盗】可以用于描述某个人的【道德】”这一问题的评分通常为8分或9分。而“拘泥”这个词，有的人看到后可能会想到它的动词含义，即“不懂得变通”，所以在“【拘泥】可以用于描述某个人的【能力】”这一问题上偏向于同意，即评分在7分以上；而有的人可能会联想到它的形容词含义，即“拘束,不自然”，所以他们认为这个词并不适合用来描述能力，即评分在3分以下；还有的人可能觉得这个词既可以描述，又不可以描述，那么此时的评分通常在5分左右。</p> \
<p><strong>因此，看到词汇的感受是因人而异的，没有对错之分，在评定的时候依据自己的第一感觉即可。</strong></p>\
</div>", "<div class='contacts'>   <p class='title' style='color:#fff'>第一部分</p> <div style='color: white;'class='content_box'>\
            <style>" + ss + " \
        </style>    \
<div style='text-align: left'>\
<p>实验的呈现界面如下：</p> \
<p class='example'><img src='' /></p>\
\
<p>如果您已经明白本研究的任务，请按 <strong>继续</strong> 开始正式实验。</p> \
<p>如果您还有疑问，请咨询实验人员。</p> \
</div>"
  ],
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
            a.splice(1, 0, trapQues.pop(1));
            a.splice(40, 0, trapQues.pop(1));
            res.push(a);
            t_res = [];
            t += 1;
          }
        }
        use_q = res;

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
        jsPsych.finishTrial({ answers: answer, rt: new Date().getTime() - start_time, isTrap });
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
    if (curr_index == use_q[curr_block].length) {
      curr_block += 1;
      curr_index = 0;
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
  stimulus() {
    if (trapError) {
      return "检测题错误，结束实验~";
    }
    return "回答完成~";
  },
  on_load() {
    jsPsych.data.get().localSave("csv", "a.csv");
  }
});

onMounted(() => {
  jsPsych.run(timeline);
});
</script>