let data = {
    LoginText: 'Identifiez vous à un compte',
    RegisterText: 'Enregistrer votre pseudo actuel :',
    RegButton: 'S\'inscrire',
    IDTitle: 'Identification',
    IDText: 'Ce pseudonyme est réservé, vous devez vous identifer pour le conserver.',
    IDButton: 'Se connecter',
    ConfirmReqText: 'Saisissez le code de confirmation que vous avez reçu par email pour finaliser votre inscription.',
    ConfirmButton: 'Confirmez l\'inscription',
};

export function getString(key) {
    return data[key];
}
