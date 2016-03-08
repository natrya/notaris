Ext.define('Admin.view.authentication.AuthenticationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.authentication',
    onLoginButton: function(button, e, eOpts) {
        var form = button.up('form').getForm();
        var values = form.getValues();
        var me=this;
        if (form.isValid()) {
            Ext.getCmp('sandi').setValue(CryptoJS3.SHA3(values.sandi,{outputLength:256}).toString());
            form.submit({
                success: function(form, action) {
                    var mee=me;
                    var Loader = Ext.Loader;
                    Loader.loadScript({
                        url: 'resources/php/api.php',
                        scope: this,
                        onLoad:function(){
                            Ext.direct.Manager.addProvider(Ext.app.REMOTING_API);
                            Ext.getStore('NavigationTree').load({
                                scope:this,
                                callback: function(records,operation,success){
                                    if (success == true){
                                        mee.redirectTo('profile');
                                    }
                                }
                            });

                            Ext.getCmp('idtopuser').setText(Dataku.jabatan+' :: '+Dataku.nama);
                            Ext.getCmp('idfoto').setSrc('foto/'+Dataku.foto);
                        }
                    });
                },
                failure: function(form, action) {
                    Ext.Msg.alert('Gagal', action.result.msg);
                }
            });
        }
    },

    onLoginAsButton: function(button, e, eOpts) {
        this.redirectTo("authentication.login");
    },
    onPasswordClick: function(button, e, eOpts){
        var form = button.up('form').getForm();
        var values = form.getValues();
        var win = button.up('window');
        var me=this;
        if (values.oldpassword!=values.newpassword){
            if (form.isValid()) {
                Ext.getCmp('oldpassword').setValue(CryptoJS3.SHA3(values.oldpassword,{outputLength:256}).toString());
                Ext.getCmp('newpassword').setValue(CryptoJS3.SHA3(values.newpassword,{outputLength:256}).toString());
            form.submit({
                    success: function(form, action) {
                        if (action.result.success){
                            win.close();
                        }
                        Ext.Msg.alert('Info', action.result.msg);
                    },
                    failure: function(form, action) {
                        Ext.Msg.alert('Gagal', action.result.msg);
                    }
                });
            }
        }
    }
});
