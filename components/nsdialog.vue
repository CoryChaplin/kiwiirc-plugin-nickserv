<template>
    <div id="nickserv-form"
         :class="['kiwi-' + themeName + '-simple-nick', 'u-form', 'u-input',
                  'u-input-text', 'u-input-text--focus', 'u-input-text--reveal-value']"
         title="NickServ"
         style="text-align: center;"
    >
        <p id="validate" :class="['kiwi-' + themeName + '-simple-error', 'kiwi-ns-error']">
            {{ IDText }}</p>
        <div class="u-input-text kiwi-ns-input">
            <div class="u-input-text-inputs">
                <input v-model="pwdInput"
                       class="u-input"
                       placeholder="Inserisci la password"
                       type="password"
                       required
                >
            </div>
        </div>
        <div class="u-input-text-underline">
            <div class="u-input-text-underline-active" />
        </div>
        <button :class="['u-button', 'u-button-primary', 'u-submit',
                         'kiwi-welcome-simple-start', 'kiwi-ns-button']"
                @click="onIdentify"
        >{{ IDButton }}
        </button>
    </div>
</template>

<script>
import * as Utils from '../libs/Utils.js';

export default {
    data: function data() {
        return {
            pwdInput: '',
        };
    },

    computed: {
        themeName: () => kiwi.themes.currentTheme().name.toLowerCase(),
        IDText: () => Utils.getString('IDText'),
        IDButton: () => Utils.getString('IDButton'),
    },

    methods: {
        onIdentify: () => {
            kiwi.state.$emit('input.raw', '/NS identify ' + this.pwdInput);
        },
    },
};
</script>
