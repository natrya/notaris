Ext.define('Admin.view.klien.KlienController', {
    extend: 'Ext.app.ViewController',
    refs: [
        {
            ref: 'klienGrid', 			
            selector: '#klienGrid'
        }
    ],
    alias: 'controller.gridklien',
    init: function() {
        this.control({
            '#klienGrid': {
                itemdblclick: this.editKlien
            },
            '#btnadd': {
                click: this.onAddClick
            },
            '#btndelete':{
                click: this.onDelete
            },
            'klientambah button[text=Tambah]':{
                click: this.tambahKlien
            },
            'klientambah button[text=Simpan]':{
                click: this.simpanKlien
            }

        })
    },
    editKlien: function(grid,record){
        view = Ext.widget('klientambah');
        view.down('form').loadRecord(record);
        view.setTitle('Edit Klien');
        Ext.getCmp('btnSimpanMenu').setText('Simpan');
    },
    onAddClick: function(){
        if (!storekota)
        var storekota=Ext.create('Admin.store.Kotaid');
        if (!view)
        var view=Ext.create('Admin.view.klien.KlienTambah',{create:true});
        view.setTitle('Tambah klien');
    },
    onDelete: function(){
        var grid=Ext.getCmp('klienGrid');
        var selection = grid.getView().getSelectionModel().getSelection()[0];
        var storeklien = Ext.getStore('gridklien');
        if (selection) {
            Ext.MessageBox.confirm('Hapus data klien', 'apakah anda yakin menghapus klien "'+selection.data.nama+'" ?',
                function(btn){
                    if (btn=='yes'){
                        storeklien.remove(selection);
                    }
                }
            );
        }
    },
    tambahKlien: function(button){
        var win = button.up('window'),
        form = win.down('form'),
        values = form.getValues(),
        storeklien = Ext.getStore('gridklien');
        if (form.getForm().isValid()){
            storeklien.add(values);
            storeklien.reload();
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
    simpanKlien: function(button){
        var win    = button.up('window'),
        form   = win.down('form'),
        record = form.getRecord(),
        values = form.getValues();
        storeKlien = Ext.getStore('gridklien');
        if (form.getForm().isValid()){
            record.set(values);
            storeKlien.reload();
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
    filterChange: function(field, newValue) {
        var gr = Ext.getStore('gridklien');
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
