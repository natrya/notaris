Ext.define('Admin.view.fidusia.OrderController', {
    extend: 'Ext.app.ViewController',
    refs: [
        {
            ref: 'orderfidusiaGrid', 			
            selector: '#orderfidusiaGrid'
        }
    ],
    alias: 'controller.gridorderfidusia',
    init: function() {
        this.control({
            '#orderfidusiaGrid': {
                itemdblclick: this.editOrder
            },
            '#btnadd': {
                click: this.onAddClick
            },
            '#btndelete':{
                click: this.onDelete
            },
            'orderfidusiatambah button[text=Tambah]':{
                click: this.tambahOrder
            },
            'orderfidusiatambah button[text=Simpan]':{
                click: this.simpanOrder
            }

        })
    },
    editOrder: function(grid,record){
        view = Ext.widget('orderfidusiatambah');
        view.down('form').loadRecord(record);
        view.setTitle('Edit Order');
        Ext.getCmp('btnSimpanMenu').setText('Simpan');
        Ext.getStore('storeklien').load(function(records, operation, success){
            if (success){
                Ext.getStore('storeofficer').load(function(records, operation, success){
                    if (success){
                        Ext.getStore('storekorektor').load(function(records, operation, success){
                            if (success){
                                Ext.getStore('storepihaklain').load();
                            }
                        });
                    }
                });
            }
        });
    },
    onAddClick: function(){
        //if (!storekota)
            //var storekota=Ext.create('Admin.store.Kotaid');
        if (!view)
            var view=Ext.create('Admin.view.fidusia.OrderTambah',{create:true});
        view.setTitle('Tambah order Fidusia');
        Ext.getStore('storeklien').load(function(records, operation, success){
            if (success){
                Ext.getStore('storeofficer').load(function(records, operation, success){
                    if (success){
                        Ext.getStore('storekorektor').load(function(records, operation, success){
                            if (success){
                                Ext.getStore('storepihaklain').load();
                            }
                        });
                    }
                });
            }
        });
        Ext.ComponentQuery.query('#namaklien')[0].setValue('IAF');
        Ext.ComponentQuery.query('#namaofficer')[0].setValue('Edi');

    },
    onDelete: function(){
        var grid=Ext.getCmp('orderfidusiaGrid');
        var selection = grid.getView().getSelectionModel().getSelection()[0];
        var storeorder = Ext.getStore('gridorderfidusia');
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
        storeorder = Ext.getStore('gridorderfidusia');
        if (form.getForm().isValid()){
            storeorder.add(values);
            storeorder.reload();
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
    simpanOrder: function(button){
        var win    = button.up('window'),
        form   = win.down('form'),
        record = form.getRecord(),
        values = form.getValues();
        storeOrder = Ext.getStore('gridorderfidusia');
        if (form.getForm().isValid()){
            record.set(values);
            storeOrder.reload();
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
        var gr = Ext.getStore('gridorderfidusia');
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
