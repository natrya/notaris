Ext.define('Admin.view.order.OrderController', {
    extend: 'Ext.app.ViewController',
    refs: [
        {
            ref: 'orderGrid', 			
            selector: '#orderGrid'
        }
    ],
    alias: 'controller.gridorder',
    init: function() {
        this.control({
            '#orderGrid': {
                itemdblclick: this.editOrder
            },
            '#btnadd': {
                click: this.onAddClick
            },
            '#btndelete':{
                click: this.onDelete
            },
            'ordertambah button[text=Tambah]':{
                click: this.tambahOrder
            },
            'ordertambah button[text=Simpan]':{
                click: this.simpanOrder
            }

        })
    },
    editOrder: function(grid,record){
        view = Ext.widget('ordertambah');
        view.down('form').loadRecord(record);
        view.setTitle('Edit Order');
        Ext.getCmp('btnSimpanMenu').setText('Simpan');
        Ext.getStore('storeklien').load(function(records, operation, success){
            if (success){
                Ext.getStore('storeofficer').load(function(records, operation, success){
                    if (success){
                        Ext.getStore('storebank').load();
                    }
                });
            }
        });
    },
    onAddClick: function(){
        if (!storekota)
        var storekota=Ext.create('Admin.store.Kotaid');
        if (!view)
        var view=Ext.create('Admin.view.order.OrderTambah',{create:true});
        view.setTitle('Tambah order');
    },
    onDelete: function(){
        var grid=Ext.getCmp('orderGrid');
        var selection = grid.getView().getSelectionModel().getSelection()[0];
        var storeorder = Ext.getStore('gridorder');
        if (selection) {
            Ext.MessageBox.confirm('Hapus data order', 'apakah anda yakin menghapus berkas order no "'+selection.data.no_berkas+'" ?',
                function(btn){
                    if (btn=='yes'){
                        storeorder.remove(selection);
                    }
                }
            );
        }
    },
    tambahOrder: function(button){
        var win = button.up('window'),
        form = win.down('form'),
        values = form.getValues(),
        storeorder = Ext.getStore('gridorder');
        if (form.getForm().isValid()){
            storeorder.add(values);
            storeorder.reload();
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
    simpanOrder: function(button){
        var win    = button.up('window'),
        form   = win.down('form'),
        record = form.getRecord(),
        values = form.getValues();
        storeOrder = Ext.getStore('gridorder');
        if (form.getForm().isValid()){
            record.set(values);
            storeOrder.reload();
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
        var gr = Ext.getStore('gridorder');
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
