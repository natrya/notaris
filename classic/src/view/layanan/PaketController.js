Ext.define('Admin.view.layanan.PaketController', {
    extend: 'Ext.app.ViewController',
    refs: [
        {
            ref: 'paketGrid', 			
            selector: '#paketGrid'
        }
    ],
    alias: 'controller.gridpaket',
    init: function() {
        this.control({
            '#btnadd': {
                click: this.onAddClick
            },
            '#btndelete':{
                click: this.onDelete
            },
            'pakettambah button[text=Tambah]':{
                click: this.tambahPaket
            }
        })
    },
    onDelete: function(){
        var grid=Ext.getCmp('paketGrid');
        var selection = grid.getView().getSelectionModel().getSelection()[0];
        var storepaket = Ext.getStore('gridpaket');
        if (selection) {
            Ext.MessageBox.confirm('Hapus data paket', 'apakah anda yakin menghapus paket "'+selection.data.nama+'" ?',
                function(btn){
                    if (btn=='yes'){
                        storepaket.remove(selection);
                    }
                }
            );
        }
    },
    onAddClick: function(){
        var view=Ext.create('Admin.view.layanan.PaketTambah',{create:true});
        view.setTitle('Tambah Paket');
    },
    tambahPaket: function(button){
        var win = button.up('window'),
        form = win.down('form'),
        values = form.getValues(),
        storepaket = Ext.getStore('gridpaket');
        if (form.getForm().isValid()){
            storepaket.add(values);
            storepaket.reload();
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
        var gr = Ext.getStore('gridpaket');
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
