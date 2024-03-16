<template>
    <div class="question-box">
        <div class="question-title">{{ props.questionTitle }}</div>
        <div class="question-table">
            <table>
                <colgroup>
                    <col width="30%">
                    <col width="14%">
                    <col width="14%">
                    <col width="14%">
                    <col width="14%">
                    <col width="14%">
                </colgroup>
                <tbody>
                    <tr>
                        <td></td>
                        <td>完全不熟悉</td>
                        <td>比较不熟悉</td>
                        <td>基本熟悉</td>
                        <td>比较熟悉</td>
                        <td>完全熟悉</td>
                    </tr>
                    <tr v-for="v, i in props.questionMeans">
                        <td style="text-align: left;">释义{{ i + 1 }}: {{ v }}</td>
                        <td v-for="v in [1, 2, 3, 4, 5]" @click="emits('clickVal', `${questionId}_${i}`, v)">
                            <input type="radio" :name="`${questionId}_${i}`" :value="v" />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    questionId: Number,
    questionTitle: String,
    questionMeans: Array
});
const emits = defineEmits(["clickVal"]);
</script>

<style scoped>
    .question-box {
        width: 900px;
        margin: 20px 0;
        font-size: 24px;
        font-weight: 400;
    }

    .question-title {
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