Ext.define('Admin.view.user.GriduserController', {
    extend: 'Ext.app.ViewController',
    refs: [
        {
            ref: 'iduserGrid', 			
            selector: '#iduserGrid'
        }
    ],
    alias: 'controller.griduser',
    init: function() {
        this.control({
            '#iduserGrid': {
                itemdblclick: this.editUser
            },
            '#btndelete':{
                click: this.onDelete
            },
            '#btnadd': {
                click: this.onAddClick
            },
            'gridusertambah button[text=Tambah]':{
                click: this.tambahUser
            },
            'gridusertambah button[text=Simpan]':{
                click: this.simpanUser
            }

        })
    },
    onAddClick: function(){
        var view=Ext.create('Admin.view.user.GriduserTambah',{create:true});
        view.setTitle('Tambah User');
    },
    editUser: function(grid,record){
        view = Ext.widget('gridusertambah');
        view.down('form').loadRecord(record);
        view.setTitle('Edit User');
        Ext.getCmp('btnSimpanMenu').setText('Simpan');
        //Ext.getCmp('idsellertran').setValue(record.data.idseller);
        //Ext.getCmp('idseller').setValue(record.data.namaseller);
    },
    tambahUser: function(button){
        var foto=Ext.getCmp('foto-file').getValue(),id=Ext.getCmp('nama').getValue();
        Ext.getCmp('foto').setValue(id+foto.replace("C:\\fakepath\\",""));
        var win = button.up('window'),
        form = win.down('form'),
        values = form.getValues(),
        storeuser = Ext.getStore('griduser');
        if (form.getForm().isValid()){
            if (foto.length>0){
                form.getForm().submit({
                    url: 'resources/php/classes/upload.php',
                    waitMsg: 'mengunggah foto...',
                    success: function(fp, o) {
                        var mb=Ext.Msg.show({
                            title: 'Sukses',
                            msg: 'File "' + o.result.file + '" berhasil di upload',
                            minWidth: 200,
                            modal: true,
                            icon: Ext.Msg.INFO,
                            buttons: Ext.Msg.OK
                        });
                        setTimeout(function(){
                            mb.close();
                        }, 2000);
                        storeuser.add(values);
                        storeuser.reload();
                        win.close();
                    }
                });
            }
        }else{
            fieldNames = [];                
            fields = this.getInvalidFields(button);
            for(var i=0; i <  fields.length; i++){
                field = fields[i];
                fieldNames.push(field.getFieldLabel());
            }
            Ext.MessageBox.alert('Invalid Fields', 'Mohon diperiksa isian berikut: ' + fieldNames.join(', '));
        }
    },
    onDelete: function(){
        var grid=Ext.getCmp('iduserGrid');
        var selection = grid.getView().getSelectionModel().getSelection()[0];
        var storeuser = Ext.getStore('griduser');
        if (selection) {
            Ext.MessageBox.confirm('Hapus data layanan', 'apakah anda yakin menghapus User "'+selection.data.nama+'" ?',
                function(btn){
                    if (btn=='yes'){
                        storeuser.remove(selection);
                    }
                }
            );
        }
    },
    simpanUser: function(button){
        var foto=Ext.getCmp('foto-file').getValue(),id=Ext.getCmp('nama').getValue();
        if (foto.length >0){
            Ext.getCmp('foto').setValue(id+foto.replace("C:\\fakepath\\",""));
        }
        var win = button.up('window'),
        form = win.down('form'),
        record = form.getRecord(),
        values = form.getValues(),
        storeuser = Ext.getStore('griduser');
        if (form.getForm().isValid()){
            record.set(values);
            if (foto.length>0){
                form.getForm().submit({
                    url: 'resources/php/classes/upload.php',
                    waitMsg: 'mengunggah foto...',
                    success: function(fp, o) {
                        var mb=Ext.Msg.show({
                            title: 'Sukses',
                            msg: 'File "' + o.result.file + '" berhasil di upload',
                            minWidth: 200,
                            modal: true,
                            icon: Ext.Msg.INFO,
                            buttons: Ext.Msg.OK
                        });
                        setTimeout(function(){
                            mb.close();
                            win.close();
                        }, 2000);
                    }
                });
            }
        }else{
            fieldNames = [];                
            fields = this.getInvalidFields(button);
            for(var i=0; i <  fields.length; i++){
                field = fields[i];
                fieldNames.push(field.getFieldLabel());
            }
            Ext.MessageBox.alert('Invalid Fields', 'Mohon diperiksa isian berikut: ' + fieldNames.join(', '));
        }
        if (foto.length==0){
            win.close();
        }
    },
    filterChange: function(field, newValue) {
        var gr = Ext.getStore('griduser');
        if (newValue) {
            if (newValue.length > 3){
                // mencari di local
                //gr.filter('text', newValue);
                //mencari di database / remote
                gr.load({params: { 'text': newValue}});
            }
        }
        else {
            gr.clearFilter();
        }
    },
    getInvalidFields: function(button) {
        var win    = button.up('window'),
        form   = win.down('form'),
        invalidFields = [];
        Ext.suspendLayouts();
        form.getForm().getFields().filterBy(function(field) {
            if (field.validate()) return;
            invalidFields.push(field);
        });
        Ext.resumeLayouts(true);
        return invalidFields;
    }
});
