Ext.define('Admin.view.layanan.LayananController', {
    extend: 'Ext.app.ViewController',
    refs: [
        {
            ref: 'layananGrid', 			
            selector: '#layananGrid'
        }
    ],
    alias: 'controller.gridlayanan',
    init: function() {
        this.control({
            '#btnadd': {
                click: this.onAddClick
            },
            '#btndelete':{
                click: this.onDelete
            },
            'layanantambah button[text=Tambah]':{
                click: this.tambahLayanan
            }
        })
    },
    onAddClick: function(){
        var view=Ext.create('Admin.view.layanan.LayananTambah',{create:true});
        view.setTitle('Tambah layanan');
    },
    onDelete: function(){
        var grid=Ext.getCmp('layananGrid');
        var selection = grid.getView().getSelectionModel().getSelection()[0];
        var storelayanan = Ext.getStore('gridlayanan');
        if (selection) {
            Ext.MessageBox.confirm('Hapus data layanan', 'apakah anda yakin menghapus layanan "'+selection.data.nama+'" ?',
                function(btn){
                    if (btn=='yes'){
                        storelayanan.remove(selection);
                    }
                }
            );
        }
    },
    tambahLayanan: function(button){
        var win = button.up('window'),
        form = win.down('form'),
        values = form.getValues(),
        storelayanan = Ext.getStore('gridlayanan');
        if (form.getForm().isValid()){
            storelayanan.add(values);
            storelayanan.reload();
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
        var gr = Ext.getStore('gridlayanan');
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
