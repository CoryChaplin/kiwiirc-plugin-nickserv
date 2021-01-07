<template>
    <form @submit.prevent="onRegister">
        <div id="nickserv-form"
             :class="['kiwi-' + themeName + '-simple-nick', 'u-form', 'u-input',
                      'u-input-text', 'u-input-text--focus', 'u-input-text--reveal-value']"
             title="NickServ"
             style="text-align: center;"
        >
            <p id="validate" :class="['kiwi-' + themeName + '-simple-error', 'kiwi-ns-register']">
                {{ RegisterText }} {{ currentNick }}
            </p>
            <div class="u-input-text kiwi-ns-input">
                <div class="u-input-text-inputs">
                    <input v-model="accountInput"
                           class="u-input"
                           placeholder="Merci de saisir un email valide"
                           type="text"
                    />
                </div>
            </div>
            <div class="u-input-text kiwi-ns-input">
                <div class="u-input-text-inputs">
                    <input v-model="pwdInput"
                           class="u-input"
                           placeholder="Mot de passe"
                           type="password"
                    />
                </div>
            </div>
            <div class="u-input-text-underline">
                <div class="u-input-text-underline-active"></div>
            </div>
            <button
                :class="['u-button', 'u-button-primary', 'u-submit',
                         'kiwi-welcome-simple-start', 'kiwi-ns-button']"
            >
                {{ RegButton }}
            </button>
        </div>
    </form>
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
        currentNick: () => {
            let net = kiwi.state.getActiveNetwork();
            return net.ircClient.user.nick;
        },
        RegisterText: () => Utils.getString('RegisterText'),
        RegButton: () => Utils.getString('RegButton'),
    },
    methods: {
        onRegister: function() {
            kiwi.state.$emit('input.raw', '/NS register ' + this.pwdInput + ' ' + this.accountInput);
        },
    },
};
</script>
