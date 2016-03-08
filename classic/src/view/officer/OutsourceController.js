Ext.define('Admin.view.officer.OutsourceController', {
    extend: 'Ext.app.ViewController',
    refs: [
        {
            ref: 'outsourceGrid', 			
            selector: '#outsourceGrid'
        }
    ],
    alias: 'controller.gridoutsource',
    init: function() {
        this.control({
            '#btnadd': {
                click: this.onAddClick
            },
            '#btndelete':{
                click: this.onDelete
            },
            'outsourcetambah button[text=Tambah]':{
                click: this.tambahOutsource
            }
        })
    },
    onAddClick: function(){
        var view=Ext.create('Admin.view.officer.OutsourceTambah',{create:true});
        view.setTitle('Tambah outsource');
    },
    onDelete: function(){
        var grid=Ext.getCmp('outsourceGrid');
        var selection = grid.getView().getSelectionModel().getSelection()[0];
        var storeoutsource = Ext.getStore('gridoutsource');
        if (selection) {
            Ext.MessageBox.confirm('Hapus data outsource', 'apakah anda yakin menghapus Outsource "'+selection.data.nama+'" ?',
                function(btn){
                    if (btn=='yes'){
                        storeoutsource.remove(selection);
                    }
                }
            );
        }
    },
    tambahOutsource: function(button){
        var win = button.up('window'),
        form = win.down('form'),
        values = form.getValues(),
        storeoutsource = Ext.getStore('gridoutsource');
        if (form.getForm().isValid()){
            storeoutsource.add(values);
            storeoutsource.reload();
            win.close();
        }
    },
    filterChange: function(field, newValue) {
        var gr = Ext.getStore('gridoutsource');
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
    }
});
