Ext.define('Admin.view.authentication.Login', {
    extend: 'Admin.view.authentication.LockingWindow',
    xtype: 'pageslogin',

    requires: [
        'Admin.view.authentication.Dialog',
        'Ext.container.Container',
        'Ext.form.field.Text',
        'Ext.form.field.Checkbox',
        'Ext.button.Button'
    ],

    title: 'Kantor Notaris & PPAT Notaris',
    defaultFocus: 'authdialog', // Focus the Auth Form to force field focus as well

    items: [
        {
            xtype: 'authdialog',
            defaultButton : 'loginButton',
            autoComplete: true,
            bodyPadding: '20 20',
            url: 'resources/php/classes/authLogin.php',
            cls: 'auth-dialog-login',
            header: false,
            width: 300,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            defaults : {
                margin : '5 0'
            },
            items: [
                {
                    xtype: 'label',
                    text: 'Selamat datang'
                },
                {
                    xtype: 'textfield',
                    cls: 'auth-textbox',
                    name: 'un',
                    bind: '{un}',
                    height: 55,
                    hideLabel: true,
                    allowBlank : false,
                    emptyText: 'user id',
                    triggers: {
                        glyphed: {
                            cls: 'trigger-glyph-noop auth-email-trigger'
                        }
                    }
                },
                {
                    xtype: 'textfield',
                    cls: 'auth-textbox',
                    height: 55,
                    hideLabel: true,
                    emptyText: 'Password',
                    inputType: 'password',
                    name: 'sandi',
                    id: 'sandi',
                    itemId: 'sandi',
                    bind: '{sandi}',
                    allowBlank : false,
                    triggers: {
                        glyphed: {
                            cls: 'trigger-glyph-noop auth-password-trigger'
                        }
                    }
                },
                {
                    xtype: 'container',
                    layout: 'vbox',
                    items: [
                                                {
                            xtype: 'box',
                            html: '<a href="#authentication.passwordreset" class="link-forgot-password"> Lupa Sandi ?</a>'
                        }
                    ]
                },
                {
                    xtype: 'button',
                    itemId: 'loginButton',
                    name: 'loginButton',
                    id: 'loginButton',
                    scale: 'large',
                    ui: 'soft-green',
                    iconAlign: 'right',
                    iconCls: 'x-fa fa-angle-right',
                    text: 'Login',
                    formBind: true,
                    listeners: {
                        click: 'onLoginButton'
                    }
                }
            ]
        }
    ],

    initComponent: function() {
        this.addCls('user-login-register-container');
        this.callParent(arguments);
    }
});
