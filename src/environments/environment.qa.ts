/* eslint-disable @typescript-eslint/naming-convention */
export const environment = {
    production: false,
    firebase : {
        apiKey: 'AIzaSyC1IijWXbcrLeXLN4QHj_BxP256jgp9b8I',
        authDomain: 'plataformaproveedores-dev.firebaseapp.com',
        projectId: 'plataformaproveedores-dev',
        storageBucket: 'plataformaproveedores-dev.appspot.com',
        messagingSenderId: '180596658808',
        appId: '1:180596658808:web:6a9621f2e0d818175a538d'
      },
    url:'',
    recaptcha:{
        // eslint-disable-next-line @typescript-eslint/naming-convention
        website_key:'6Ldgq8McAAAAAI1FzvirdBXeC34Gx96K59uaBqJT',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        secre_key:'6Ldgq8McAAAAAH5zmgDMOJIvd5HrMZ0B4Qnw5sOD'
    },
    backend: {
        Proveedor: 'http://localhost:11410/api',
        usuarios: 'http://localhost:11410/api',
        Admin: 'http://localhost:11410/api',
    }
};
