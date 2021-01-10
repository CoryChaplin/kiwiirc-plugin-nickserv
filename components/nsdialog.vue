<template>
    <form class="u-form" @submit="onIdentify">
        <div id="nickserv-form"
             :class="['kiwi-appsettings-block', 'kiwi-appsettings-block-aliases']"
             title="NickServ"
             style="text-align: center;"
        >
            <h3 id="validate" :class="['kiwi-appsettings-block', 'kiwi-appsettings-block-aliases']">
                {{ IDTitle }}</h3>
            <div>{{ IDText }}</div>
            <div>&nbsp;</div>
            <div class="u-input-text kiwi-ns-input">
                <div class="u-input-text-inputs">
                    <input v-model="pwdInput"
                           class="u-input"
                           placeholder="Mot de passe"
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
            >{{ IDButton }}
            </button>
        </div>
    </form>
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
        IDTitle: () => Utils.getString('IDTitle'),
        IDText: () => Utils.getString('IDText'),
        IDButton: () => Utils.getString('IDButton'),
    },

    methods: {
        onIdentify: function() {
            kiwi.state.$emit('input.raw', '/NS identify ' + this.pwdInput);
        },
    },
};
</script>
