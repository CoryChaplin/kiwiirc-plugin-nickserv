import confirmdialog from '../components/confirmdialog.vue';
import nsdialog from '../components/nsdialog.vue';
import nslogindialog from '../components/nslogindialog.vue';
import nsregisterdialog from '../components/nsregisterdialog.vue';

import '../style.css';

kiwi.plugin('nickserv', (kiwi) => {
    // Plugin Config #########################################################################
    let lang = 'fr';

    // Wrong password text
    let WPText = 'Wrong password!';
    // Bad password text on register
    let BPText = 'Warning, try again with a more secure password.<br> Passwords must be at least 5 characters long, they must not be easily understood (eg your name or nick)<br> and they cannot contain space characters and tab.';

    // ANOPE NICKSERV
    // NickServ Identify Regex   include/language.h:92
    let IDString = '^This nickname is registered and protected. If this is yours';
    // Wrong password Regex include/language.h:71
    let WPString = '^Password incorrect';
    // Services enforce nick Regex  modules/pseudoclients/nickserv.cpp:254
    let ENString = '^Your nickname will be changed to';
    // Account confirmation request Regex  modules/commands/ns_register.cpp:260
    // modules/commands/ns_register.cpp:391
    let ConfirmReqString = '^Your email has not been confirmed. To confirm it, follow the instructions contained in the email you received when you registered';
    // Invalid Confirmation code Regex modules/commands/ns_register.cpp:83
    // modules/commands/ns_register.cpp:86
    let InvalidConfirmString = '^Invalid activation code';
    // Invalid Confirmation code text include/language.h:99
    let InvalidConfirmText = 'Invalid activation code. Enter the confirmation code received by email to complete the account registration.';
    // A valid confirmation code has been entered modules/commands/ns_register.cpp:67
    let ValidConfirmString = '^Your email address for (. *) Has been confirmed.';
    // Bad Password Notify include/language.h:73
    let BadPwdString = '^Warning, try again with a more secure password.';
    // Bad Email Notify include/language.h:86
    let BadEmailString = 'it is not a valid email address.';
    // Register delay modules/commands/ns_register.cpp:153
    let RegDelayString = '^You must have used this nick for at least 30 seconds before you can register it.';
    // Login success Valid Password Regex modules/commands/ns_identify.cpp:38
    let ValidPwdString = '^Password accepted - you are now recognized.';
    // Already identified modules/commands/ns_identify.cpp:87 modules/commands/os_login.cpp:34
    let AlreadyIdString = '^You are already identified.';
    // End Plugin Config  ####################################################################

    if (lang === 'fr') {
        // Wrong password text
        WPText = 'Mot de passe incorrect, veuillez le saisir à nouveau !';
        // Bad password text on register
        BPText = 'Attention, merci d\'essayer un mot de passe plus sécurisé.<br> Le mot de passe doit comporter au moins 5 caractères, ne doit pas pouvoir être compris facilement (par exemple votre prénom ou votre pseudo)<br> et ne doit pas contenir d\'espace ou de tabulation.';

        // ANOPE NICKSERV
        // NickServ Identify Regex   include/language.h:92
        IDString = '^Le pseudo est enregistré et protégé. Si c\'est votre pseudo';
        // Wrong password Regex include/language.h:71
        WPString = '^Mot de passe incorrect';
        // Services enforce nick Regex  modules/pseudoclients/nickserv.cpp:254
        ENString = '^Votre pseudo est maintenant changé en';
        // Account confirmation request Regex  modules/commands/ns_register.cpp:260
        // modules/commands/ns_register.cpp:391
        ConfirmReqString = '^Votre adresse email n\'est pas confirmée. Pour la confirmer, suivez les instructions qui vous ont été envoyées lors de votre enregistrement';
        // Invalid Confirmation code Regex modules/commands/ns_register.cpp:83
        // modules/commands/ns_register.cpp:86
        InvalidConfirmString = '^Mot code invalide';
        // Invalid Confirmation code text include/language.h:99
        InvalidConfirmText = 'Un mot-code invalide a été entré, merci de re-vérifier votre email et de réessayer';
        // A valid confirmation code has been entered modules/commands/ns_register.cpp:67
        ValidConfirmString = '^Votre adresse email pour (. *) a été confirmée';
        // Bad Password Notify include/language.h:73
        BadPwdString = '^Warning, try again with a more secure password.';
        // Bad Email Notify include/language.h:86
        BadEmailString = 'it is not a valid email address.';
        // Register delay modules/commands/ns_register.cpp:153
        RegDelayString = '^Vous devez rester connecté plus de %d secondes avant d\'enregistrer votre pseudo';
        // Login success Valid Password Regex modules/commands/ns_identify.cpp:38
        ValidPwdString = '^Mot de passe accepté - vous êtes maintenant identifié.';
        // Already identified modules/commands/ns_identify.cpp:87 modules/commands/os_login.cpp:34
        AlreadyIdString = '^Vous êtes déjà identifié.';
        // End Plugin Config  ####################################################################
    }

    let IDRe = new RegExp(IDString, '');
    let WPRe = new RegExp(WPString, '');
    let ENRe = new RegExp(ENString, '');
    let ConfirmReqRe = new RegExp(ConfirmReqString, '');
    let InvalidConfirmRe = new RegExp(InvalidConfirmString, '');
    let ValidConfirmRe = new RegExp(ValidConfirmString, '');
    let BadPwdRe = new RegExp(BadPwdString, '');
    let BadEmailRe = new RegExp(BadEmailString, '');
    let RegDelayRe = new RegExp(RegDelayString, '');
    let ValidPwdRe = new RegExp(ValidPwdString, '');
    let AlreadyIdRe = new RegExp(AlreadyIdString, '');

    let data = new kiwi.Vue({ data: { themeName: '' } });
    data.themeName = kiwi.themes.currentTheme().name.toLowerCase();

    kiwi.on('theme.change', (event) => {
        data.themeName = kiwi.themes.currentTheme().name.toLowerCase();
    });

    function registerFn() {
        kiwi.state.$emit('mediaviewer.show', { component: nsregisterdialog });
    }

    function logoutFn() {
        kiwi.state.$emit('input.raw', '/NS Logout');
    }

    function loginFn() {
        if (kiwi.state.getActiveNetwork().password !== undefined) {
            kiwi.state.$emit('input.raw', '/NS identify ' + kiwi.state.getActiveNetwork().password);
        }
        kiwi.state.$emit('mediaviewer.show', { component: nslogindialog });
    }

    let loginBtn = document.createElement('a');
    loginBtn.innerHTML = '<i aria-hidden="true" class="fa fa-lock"></i><span>S\'inscrire</span>';
    loginBtn.addEventListener('click', registerFn);
    kiwi.addUi('header_channel', loginBtn);

    kiwi.on('irc.mode', (event, network) => {
        if ((event.nick === 'NickServ') && (event.target === network.nick)) {
            setTimeout(() => {
                let net = kiwi.state.getActiveNetwork();
                let hasR = net.ircClient.user.modes.has('r');

                if (hasR === true) {
                    loginBtn.innerHTML = '<i aria-hidden="true" class="fa fa-sign-out"></i><span>Déconnexion</span>';
                    loginBtn.removeEventListener('click', loginFn);
                    loginBtn.removeEventListener('click', registerFn);
                    loginBtn.addEventListener('click', logoutFn);
                } else {
                    loginBtn.innerHTML = '<i aria-hidden="true" class="fa fa-sign-in"></i><span>Connexion</span>';
                    loginBtn.removeEventListener('click', logoutFn);
                    loginBtn.addEventListener('click', loginFn);
                }
            }, 0);
        }
    });

    kiwi.on('irc.notice', (event) => {
        if ((event.nick === 'NickServ') && (event.message.match(IDRe))) {
            kiwi.state.$emit('mediaviewer.show', { component: nsdialog });
        }
        if ((event.nick === 'NickServ') && (event.message.match(WPRe))) {
            let el = document.getElementById('validate');
            el.innerHTML = WPText;
        }
        if ((event.nick === 'NickServ') && (event.message.match(ConfirmReqRe))) {
            kiwi.state.$emit('mediaviewer.show', { component: confirmdialog });
        }

        if ((event.nick === 'NickServ') && (event.message.match(InvalidConfirmRe))) {
            let el = document.getElementById('validate');
            el.innerHTML = InvalidConfirmText;
        }

        if ((event.nick === 'NickServ') && (event.message.match(ENRe))) {
            kiwi.state.$emit('mediaviewer.hide');
        }

        if ((event.nick === 'NickServ') && (event.message.match(ValidConfirmRe))) {
            kiwi.state.$emit('mediaviewer.hide');
        }

        if ((event.nick === 'NickServ') && (event.message.match(BadPwdRe))) {
            let el = document.getElementById('validate');
            el.innerHTML = BPText;
        }

        if ((event.nick === 'NickServ') && (event.message.match(BadEmailRe))) {
            let el = document.getElementById('validate');
            el.innerHTML = event.message;
        }

        if ((event.nick === 'NickServ') && (event.message.match(RegDelayRe))) {
            let el = document.getElementById('validate');
            el.innerHTML = event.message;
            setTimeout(() => {
                kiwi.state.$emit('mediaviewer.hide');
            }, 2000);
        }
        if ((event.nick === 'NickServ') && (event.message.match(ValidPwdRe))) {
            let el = document.getElementById('validate');
            el.innerHTML = event.message;
            setTimeout(() => {
                kiwi.state.$emit('mediaviewer.hide');
            }, 2000);
        }

        if ((event.nick === 'NickServ') && (event.message.match(AlreadyIdRe))) {
            let el = document.getElementById('validate');
            el.innerHTML = event.message;
            setTimeout(() => {
                kiwi.state.$emit('mediaviewer.hide');
            }, 2000);
        }
    });

    kiwi.on('input.command.nick', (event) => {
        kiwi.state.$emit('mediaviewer.hide');
    });
});
