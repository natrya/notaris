Ext.require([
    'Ext.util.*',
    'Ext.window.MessageBox'
]);

Ext.define('Admin.Application', {
    extend: 'Ext.app.Application',
    name: 'Admin',
    stores: [
        'NavigationTree'
    ],
    requires:[
        'Ext.direct.*',
        'Ext.data.*',
        'Ext.grid.*'
    ],
    defaultToken : 'profile',
    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    },
    launch: function () {
        Ext.QuickTips.init();
        Ext.Ajax.on('requestexception', function(connection,response) {
            if(response.status == 403) {
                var msgBox = Ext.MessageBox.show({
                    title: 'Session sudah habis',
                    msg: 'Silahkan masuk lagi.',
                    progressText: 'Keluar dalam 5 detik..',
                    progress: true,
                    closable: false
                });
                Ext.TaskManager.start({
                    run: function(count) {
                        if(count == 5) {
                            msgBox.destroy();
                            var navi=Ext.getStore('NavigationTree');
                            navi.removeAll();
                            window.location.href='index.html';
                        }
                        msgBox.updateProgress(count/5,'keluar dalam '+(5-count)+'...');
                    },
                    interval: 1000
                });  
            }
        });             
    }
});
