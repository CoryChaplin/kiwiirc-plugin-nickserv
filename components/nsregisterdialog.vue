<template>
    <form class="u-form" @submit.prevent="onRegister">
        <div id="nickserv-form"
             :class="['kiwi-appsettings-block', 'kiwi-appsettings-block-aliases']"
             title="NickServ"
             style="text-align: center;"
        >
            <h3 id="validate" :class="['kiwi-ns-register']">
                {{ RegisterText }} {{ currentNick }}
            </h3>
            <div>&nbsp;</div>
            <div>
                Inscription gratuite et sans engagement.<br>
                L'inscription permet de protéger votre pseudo.
            </div>
            <div>&nbsp;</div>
            <div class="u-input-text kiwi-ns-input">
                <div class="u-input-text-inputs">
                    <input v-model="accountInput"
                           class="u-input"
                           placeholder="Adresse e-mail"
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
            <div>
                Vous avez déjà un compte ?<br>
                <a class="u-link kiwi-channel" @click="loginFn">
                    Connectez-vous
                </a>
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
import nslogindialog from './nslogindialog.vue';

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
            kiwi.state.getActiveNetwork().password = this.pwdInput;
        },
        loginFn: function() {
            kiwi.state.$emit('mediaviewer.show', { component: nslogindialog });
        },
    },
};
</script>
