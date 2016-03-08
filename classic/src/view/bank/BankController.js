Ext.define('Admin.view.bank.BankController', {
    extend: 'Ext.app.ViewController',
    refs: [
        {
            ref: 'bankGrid', 			
            selector: '#bankGrid'
        }
    ],
    alias: 'controller.gridbank',
    init: function() {
        this.control({
            '#btnadd': {
                click: this.onAddClick
            },
            '#btndelete':{
                click: this.onDelete
            },
            'banktambah button[text=Tambah]':{
                click: this.tambahBank
            }
        })
    },
    onAddClick: function(){
        var view=Ext.create('Admin.view.bank.BankTambah',{create:true});
        view.setTitle('Tambah bank');
    },
    onDelete: function(){
        var grid=Ext.getCmp('bankGrid');
        var selection = grid.getView().getSelectionModel().getSelection()[0];
        var storebank = Ext.getStore('gridbank');
        if (selection) {
            Ext.MessageBox.confirm('Hapus data bank', 'apakah anda yakin menghapus bank "'+selection.data.nama+'" ?',
                function(btn){
                    if (btn=='yes'){
                        storebank.remove(selection);
                    }
                }
            );
        }
    },
    tambahBank: function(button){
        var win = button.up('window'),
        form = win.down('form'),
        values = form.getValues(),
        storebank = Ext.getStore('gridbank');
        if (form.getForm().isValid()){
            storebank.add(values);
            storebank.reload();
            win.close();
        }else{
            fieldNames = [];                
            fields = this.getInvalidFields(button);
            for(var i=0; i <  fields.length; i++){
                field = fields[i];
                fieldNames.push(field.getName());
            }
            Ext.MessageBox.alert('Invalid Fields', 'Mohon diperiksa isian berikut: ' + fieldNames.join(', '));
        }
    },
    filterChange: function(field, newValue) {
        var gr = Ext.getStore('gridbank');
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
