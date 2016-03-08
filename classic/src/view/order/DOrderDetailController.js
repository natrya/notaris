Ext.define('Admin.view.order.DOrderDetailController', {
    extend: 'Ext.app.ViewController',
    refs: [
        {
            ref: 'doklayananGrid', 			
            selector: '#doklayananGrid'
        }
    ],
    alias: 'controller.doklayanan',
    init: function() {
        this.control({
            '#doklayananGrid': {
                itemdblclick: this.editDoklayanan
            },
            '#btnadd': {
                click: this.onAddClick
            },
            '#btndelete':{
                click: this.onDelete
            },
            'doklayanantambah button[text=Tambah]':{
                click: this.tambahDoklayanan
            },
            'doklayanantambah button[text=Simpan]':{
                click: this.simpanDoklayanan
            }

        })
    },
    onAddClick: function(grid){
        var view=Ext.create('Admin.view.order.DOrderDetailTambah',{create:true});
        view.setTitle('Tambah Order Detail');
        Ext.getCmp('idorder_detil').setValue(detailorderdok.idorder_detil);
    },
    editDoklayanan: function(grid,record){
        view = Ext.widget('doklayanantambah');
        view.down('form').loadRecord(record);
        view.setTitle('Edit Dokumen');
        Ext.getCmp('btnSimpanMenu').setText('Simpan');
    },
    tambahDoklayanan: function(button){
        var dok=Ext.getCmp('nama-file').getValue(),id=Ext.getCmp('idorder_detil').getValue()+Math.floor(Math.random()*10000);
        Ext.getCmp('nama').setValue(id+dok.replace("C:\\fakepath\\",""));
        var win = button.up('window'),
        form = win.down('form'),
        values = form.getValues(),
        storedoklayanan = Ext.getStore('doklayanan');
        if (form.getForm().isValid()){
            if (dok.length>0){
                form.getForm().submit({
                    url: 'resources/php/classes/uploaddokumen.php',
                    waitMsg: 'mengunggah dokumen...',
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
                        storedoklayanan.add(values);
                        storedoklayanan.reload();
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
    simpanDoklayanan: function(button){
        var win = button.up('window'),
        form = win.down('form'),
        record = form.getRecord(),
        values = form.getValues(),
        storedoklayanan = Ext.getStore('doklayanan');
        if (form.getForm().isValid()){
            record.set(values);
            storedoklayanan.load(); 
            win.close();
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
        var grid=Ext.getCmp('doklayananGrid');
        var selection = grid.getView().getSelectionModel().getSelection()[0];
        var storedoklayanan = Ext.getStore('doklayanan');
        if (selection) {
            Ext.MessageBox.confirm('Hapus dokumen', 'apakah anda yakin menghapus Dokumen "'+selection.data.nama+'" ?',
                function(btn){
                    if (btn=='yes'){
                        storedoklayanan.remove(selection);
                    }
                }
            );
        }
    },
    filterChange: function(field, newValue) {
        var gr = Ext.getStore('doklayanan');
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
