<template>
    <div :class="['kiwi-' + themeName + '-simple-nick', 'u-form', 'u-input', 'u-input-text',
                  'u-input-text--focus', 'u-input-text--reveal-value']"
         id="nickserv-form"
         title="NickServ"
         style="text-align: center;"
    >
        <p id="validate" :class="['kiwi-' + themeName + '-simple-error', 'kiwi-ns-error']">
            {{ ConfirmReqText }}</p>
        <div class="u-input-text kiwi-ns-input">
            <div class="u-input-text-inputs">
                <input v-model="codeInput"
                       class="u-input"
                       placeholder="Inserisci il codice di conferma"
                       type="text"
                >
            </div>
        </div>
        <div class="u-input-text-underline">
            <div class="u-input-text-underline-active"></div>
        </div>
        <button :class="['u-button', 'u-button-primary', 'u-submit',
                         'kiwi-welcome-simple-start', 'kiwi-ns-button']"
                @click="onIdentify"
        >{{ ConfirmButton }}</button>
    </div>
</template>
<script>
import * as Utils from '../libs/Utils.js';

export default {
    data: function data() {
        return {
            codeInput: '',
        };
    },

    computed: {
        themeName: () => kiwi.themes.currentTheme().name.toLowerCase(),
        ConfirmReqText: () => Utils.getString('ConfirmReqText'),
        ConfirmButton: () => Utils.getString('ConfirmButton'),
    },

    methods: {
        onIdentify: () => kiwi.state.$emit('input.raw', '/NS confirm ' + this.codeInput),
    },
};
</script>
