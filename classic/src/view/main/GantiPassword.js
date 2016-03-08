Ext.define('Admin.view.main.GantiPassword', {
    extend: 'Ext.window.Window',
    xtype: 'gantipassword',
    layout: 'fit',
    controller: 'mainviewport',
    modal:true,
    autoShow: true,
    requires: [
        'Admin.view.authentication.Dialog',
        'Ext.form.Label',
        'Ext.form.field.Text',
        'Ext.form.field.Checkbox',
        'Ext.button.Button'
    ],
    title: 'Ganti Password',
    defaultFocus: 'authdialog',  // Focus the Auth Form to force field focus as well
    items: [
        {
            xtype: 'authdialog',
            url: 'resources/php/classes/updatepass.php',
            bodyPadding: '20 20',
            width: 320,
            reference : 'authDialog',
            defaultButton : 'submitButton',
            autoComplete: true,
            cls: 'auth-dialog-register',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            defaults : {
                margin: '10 0',
                selectOnFocus : true
            },
            items: [{
                xtype: 'label',
                cls: 'lock-screen-top-label',
                text: 'Password Lama'
            },{
                xtype: 'textfield',
                cls: 'auth-textbox',
                height: 45,
                hideLabel: true,
                allowBlank : false,
                emptyText: 'Password Lama',
                name: 'oldpassword',
                id: 'oldpassword',
                itemId: 'oldpassword',
                inputType: 'password'
            },{
                xtype: 'label',
                cls: 'lock-screen-top-label',
                text: 'Password Baru'
            },{
                xtype: 'textfield',
                cls: 'auth-textbox',
                height: 45,
                hideLabel: true,
                allowBlank : false,
                emptyText: 'Password Baru',
                name: 'newpassword',
                itemId:'newpassword',
                id: 'newpassword',
                minLength: 4,
                maxLength: 64,
                inputType: 'password'
            },{
                xtype: 'label',
                cls: 'lock-screen-top-label',
                text: 'Password Baru (Ulangi)'
            },{
                xtype: 'textfield',
                tooltip: 'Ulangi pengisian password yang baru',
                cls: 'auth-textbox',
                height: 45,
                hideLabel: true,
                allowBlank : false,
                emptyText: 'Password Baru (Ulangi)',
                name: 'newpassword2',
                minLength: 4,
                maxLength: 64,
                inputType: 'password'
            },{
                xtype: 'button',
                scale: 'large',
                ui: 'soft-blue',
                formBind: true,
                reference: 'submitButton',
                bind: false,
                margin: '5 0',
                iconAlign: 'right',
                iconCls: 'x-fa fa-angle-right',
                text: 'Submit',
                listeners: {
                    click: 'onPasswordClick'
                }
            }]
        }
    ]
});
