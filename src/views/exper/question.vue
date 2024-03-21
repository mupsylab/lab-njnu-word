<template>
    <div class="question-box">
        <div class="question-title">{{ props.questionTitle }}</div>
        <div class="question-table">
            <table>
                <colgroup>
                    <col width="30%">
                    <col width="10%">
                    <col width="10%">
                    <col width="10%">
                    <col width="10%">
                    <col width="10%">
                    <col width="10%">
                    <col width="10%">
                </colgroup>
                <tbody>
                    <tr>
                        <td></td>
                        <td style="font-weight: 700;" v-for="t in showSelectText">{{ t }}</td>
                    </tr>
                    <tr v-for="v, i in props.questionMeans">
                        <td style="text-align: left;">
                            <span style="font-weight: 700;">释义{{ i + 1 }}</span>:
                            <span style="font-size: 20px;">{{ v.match(/(.*)\*(.*)\*/) ? v.match(/(.*)\*(.*)\*/)[1] : v }}</span>
                            <span style="font-size: 18px; font-style: italic;">{{ v.match(/(.*)\*(.*)\*/) ? v.match(/(.*)\*(.*)\*/)[2] : "" }}</span>
                        </td>
                        <td v-for="v in [1, 2, 3, 4, 5, 6, 7]" @click="emits('clickVal', `${questionId}_${i}`, v)">
                            <input type="radio" :name="`${questionId}_${i}`" :value="v" />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
const re = new RegExp("\\*(.*?)\\*");
const props = defineProps({
    questionId: String,
    questionTitle: String,
    questionMeans: Array,
    isTrap: {
        type: Boolean,
        default: false
    }
});
const showSelectText = props.isTrap ? ["非常不熟悉", "比较不熟悉", "有点不熟悉", "一般熟悉", "有点熟悉", "比较熟悉", "非常熟悉"] : 
                                      ["非常不同意", "比较不同意", "有点不同意", "一般同意", "有点同意", "比较同意", "非常同意"];
const emits = defineEmits(["clickVal"]);
</script>

<style scoped>
    .question-box {
        width: 1200px;
        margin: 20px 0;
        font-size: 24px;
        font-weight: 400;
        user-select: none;
    }

    .question-title {
        font-weight: 700;
        text-align: left;
    }

    .question-table table {
        width: 100%;
        text-align: center;
        font-size: 20px;
        font-family: Arial, Helvetica, sans-serif;
    }

    .question-table table input[type=radio] {
        width: 32px;
        height: 32px;
    }
    .question-table table td {
        padding: 15px 0;
    }
</style>