<template>
    <div class="exp_inst_1">
        <div class="title">实验指导语</div>
        <div class="content">
            <p>您需要对给出<strong>词语的每个释义的熟悉度</strong>进行评分，在每个释义中，给出了词语在表达该释义时的词性，相应的释义，相关例子。在每次实验开始您会看到以下问题：</p>
            <div><question question-id="s1" :question-means="means" question-title="词语"></question></div>
            <p style="font-weight: 700;">您需要对词语的每个释义的熟悉度进行评分，评分采用鼠标选择相应选项即可，在每次评分后请按“空格键”继续。</p>
            <p style="font-weight: 700;">注意，对于每个词语的每个释义的熟悉程度是因人而异的，没有对错之分，在评定的时候依据自己的第一感觉即可。</p>
            <p>实验的呈现界面如下：</p>
            <p><img style="width: 100%;" src="../../../assets/images/e2.png" alt=""></p>
            <p>如果您已经明白本研究的任务，请按 继续 开始正式实验。</p>
            <p>如果您还有疑问，请咨询实验人员。</p>
        </div>
    </div>
</template>

<script setup>
import question from "../question.vue";
const means = ["词性, 释义, *例子*", "词性, 释义, *例子*", "..."];
</script>

<style scoped>
.exp_inst_1 {
    text-align: left;
    font-size: 18px;
}

.exp_inst_1 .title {
    font-size: 24px;
    font-weight: 700;
    text-align: center;
}

.exp_inst_1 .content {
    text-indent: 2em;
}

.exp_inst_1 .content>div {
    margin: auto;
}
</style>