<template>
    <div id="nickserv-form"
         title="NickServ"
         style="text-align: center;"
         :class="['kiwi-' + themeName + '-simple-nick',
                  'u-form', 'u-input', 'u-input-text', 'u-input-text--focus',
                  'u-input-text--reveal-value']"
    >
        <p id="validate" :class="['kiwi-' + themeName + '-simple-error', 'kiwi-ns-login']">
            {{ LoginText }}
        </p>
        <div class="u-input-text kiwi-ns-input">
            <div class="u-input-text-inputs">
                <input v-model="accountInput"
                       class="u-input"
                       placeholder="Inserisci account NickServ"
                       type="text"
                />
            </div>
        </div>
        <div class="u-input-text kiwi-ns-input">
            <div class="u-input-text-inputs">
                <input v-model="pwdInput"
                       class="u-input"
                       placeholder="Inserisci la password"
                       type="password"
                />
            </div>
        </div>
        <div class="u-input-text-underline">
            <div class="u-input-text-underline-active"></div>
        </div>
        <button :class="['u-button', 'u-button-primary', 'u-submit',
                         'kiwi-welcome-simple-start', 'kiwi-ns-button']"
                @click="onIdentify"
        >{{ IDButton }}</button>
    </div>
</template>

<script>
import * as Utils from '../libs/Utils.js';

export default {
    data: function data() {
        return {
            accountInput: '',
            pwdInput: '',
        };
    },
    computed: {
        themeName: () => kiwi.themes.currentTheme().name.toLowerCase(),
        LoginText: () => Utils.getString('LoginText'),
        IDButton: () => Utils.getString('IDButton'),
    },

    methods: {
        onIdentify: () => {
            kiwi.state.$emit('input.raw', '/NS identify ' + this.accountInput + ' ' + this.pwdInput);
            kiwi.state.$emit('input.raw', '/NICK ' + this.accountInput);
        },
    },
};
</script>
