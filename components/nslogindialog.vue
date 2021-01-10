<template>
    <form class="u-form" @submit.prevent="onIdentify">
        <div id="nickserv-form"
             title="NickServ"
             style="text-align: center;"
             :class="['kiwi-appsettings-block', 'kiwi-appsettings-block-aliases']"
        >
            <h3 id="validate" :class="['kiwi-ns-login']">
                {{ LoginText }}
            </h3>
            <div>&nbsp;</div>
            <div class="u-input-text kiwi-ns-input">
                <div class="u-input-text-inputs">
                    <input v-model="accountInput"
                           class="u-input"
                           placeholder="Identifiant de votre compte NickServ"
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
                <div>
                    <br>Vous n'avez pas encore de compte ?<br>
                    <a class="u-link kiwi-channel" @click="registerFn">
                        Inscrivez-vous
                    </a>
                </div>
            </div>
            <div class="u-input-text-underline">
                <div class="u-input-text-underline-active" />
            </div>
            <button :class="['u-button', 'u-button-primary', 'u-submit',
                             'kiwi-welcome-simple-start', 'kiwi-ns-button']"
            >{{ IDButton }}</button>
        </div>
    </form>
</template>

<script>
import * as Utils from '../libs/Utils.js';
import nsregisterdialog from './nsregisterdialog.vue';

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
        onIdentify: function() {
            kiwi.state.$emit('input.raw', '/NS identify ' + this.accountInput + ' ' + this.pwdInput);
            kiwi.state.getActiveNetwork().password = this.pwdInput;
            kiwi.state.$emit('input.raw', '/NICK ' + this.accountInput);
        },
        registerFn: function() {
            kiwi.state.$emit('mediaviewer.show', { component: nsregisterdialog });
        },
    },
};
</script>
