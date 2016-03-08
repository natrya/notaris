Ext.define('Admin.view.fidusia.OrderDetailController', {
    extend: 'Ext.app.ViewController',
    refs: [
        {
            ref: 'orderdetailGrid', 			
            selector: '#orderdetailGrid'
        }
    ],
    alias: 'controller.orderdetailfidusia',
    init: function() {
        this.control({
            '#orderdetailfidusiaGrid': {
                itemdblclick: this.editOrderdetail
            },
            '#orderdetailfidusiaGridU': {
                itemdblclick: this.editOrderdetailU
            },
            '#btnadd': {
                click: this.onAddClick
            },
            '#btndelete':{
                click: this.onDelete
            },
            'orderdetailfidusiatambah button[text=Tambah]':{
                click: this.tambahOrderdetail
            },
            'orderdetailfidusiatambah button[text=Simpan]':{
                click: this.simpanOrderdetail
            },
            'orderdetailfidusiautambah button[text=Simpan]':{
                click: this.simpanOrderdetailU
            }
        })
    },
    onAddClick: function(grid){
        var view=Ext.create('Admin.view.fidusia.OrderDetailTambah',{create:true});
        view.setTitle('Tambah Order Detail');
        Ext.getCmp('idorder').setValue(detailorder.idorder);
    },
    editOrderdetail: function(grid,record){
        view = Ext.widget('orderdetailfidusiatambah');
        view.down('form').loadRecord(record);
        view.setTitle('Edit Order Detail');
        Ext.getCmp('btnSimpanMenu').setText('Simpan');
        Ext.getStore('storelayanan').load(function(records, operation, success){
            if (success){
                Ext.getStore('storepihaklain').load();
            }
        });
    },
    editOrderdetailU: function(grid,record){
        view = Ext.widget('orderdetailfidusiautambah');
        view.down('form').loadRecord(record);
        view.setTitle('Edit Order Detail');
        Ext.getCmp('btnSimpanMenu').setText('Simpan');
    },

    tambahOrderdetail: function(button){
        var win = button.up('window'),
        form = win.down('form'),
        values = form.getValues(),
        storeorderdetail = Ext.getStore('orderdetailfidusia');
        if (form.getForm().isValid()){
            storeorderdetail.add(values);
            storeorderdetail.reload();
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
    simpanOrderdetail: function(button){
        var win = button.up('window'),
        form = win.down('form'),
        record = form.getRecord(),
        values = form.getValues(),
        storeorderdetail = Ext.getStore('orderdetailfidusia');
        if (form.getForm().isValid()){
            record.set(values);
            storeorderdetail.load(); 
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
    simpanOrderdetailU: function(button){
        var win = button.up('window'),
        form = win.down('form'),
        record = form.getRecord(),
        values = form.getValues(),
        storeorderdetail = Ext.getStore('orderdetailfidusiaU');
        if (form.getForm().isValid()){
            record.set(values);
            storeorderdetail.load(); 
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
    onDelete: function(){
        var grid=Ext.getCmp('orderdetailfidusiaGrid');
        var selection = grid.getView().getSelectionModel().getSelection()[0];
        var storeorderdetail = Ext.getStore('orderdetailfidusia');
        if (selection) {
            Ext.MessageBox.confirm('Hapus data layanan', 'apakah anda yakin menghapus Layanan "'+selection.data.namalayanan+'" ?',
                function(btn){
                    if (btn=='yes'){
                        storeorderdetail.remove(selection);
                    }
                }
            );
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
