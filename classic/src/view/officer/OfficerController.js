Ext.define('Admin.view.officer.OfficerController', {
    extend: 'Ext.app.ViewController',
    refs: [
        {
            ref: 'officerGrid', 			
            selector: '#officerGrid'
        }
    ],
    alias: 'controller.gridofficer',
    init: function() {
        this.control({
            '#btnadd': {
                click: this.onAddClick
            },
            '#btndelete':{
                click: this.onDelete
            },
            'officertambah button[text=Tambah]':{
                click: this.tambahOfficer
            }
        })
    },
    onAddClick: function(){
        var view=Ext.create('Admin.view.officer.OfficerTambah',{create:true});
        view.setTitle('Tambah officer');
    },
    onDelete: function(){
        var grid=Ext.getCmp('officerGrid');
        var selection = grid.getView().getSelectionModel().getSelection()[0];
        var storeofficer = Ext.getStore('gridofficer');
        if (selection) {
            Ext.MessageBox.confirm('Hapus data officer', 'apakah anda yakin menghapus Officer "'+selection.data.nama+'" ?',
                function(btn){
                    if (btn=='yes'){
                        storeofficer.remove(selection);
                    }
                }
            );
        }
    },
    tambahOfficer: function(button){
        var win = button.up('window'),
        form = win.down('form'),
        values = form.getValues(),
        storeofficer = Ext.getStore('gridofficer');
        if (form.getForm().isValid()){
            storeofficer.add(values);
            storeofficer.reload();
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
        var gr = Ext.getStore('gridofficer');
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
