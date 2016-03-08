Ext.define('Admin.view.layanan.PaketLayananController', {
    extend: 'Ext.app.ViewController',
    refs: [
        {
            ref: 'paketlayananGrid', 			
            selector: '#paketlayananGrid'
        }
    ],
    alias: 'controller.gridpaketlayanan',
    init: function() {
        this.control({
            '#btnadd': {
                click: this.onAddClick
            },
            '#btndelete':{
                click: this.onDelete
            },
            'paketlayanantambah button[text=Tambah]':{
                click: this.tambahPaket
            },
            '#paketlayananfilter': {
                change: this.onPaketLayananFilter
            }
        })
    },
    onDelete: function(){
        var grid=Ext.getCmp('paketlayananGrid');
        var selection = grid.getView().getSelectionModel().getSelection()[0];
        var storepaketlayanan = Ext.getStore('gridpaketlayanan');
        if (selection) {
            Ext.MessageBox.confirm('Hapus data paket layanan', 'apakah anda yakin menghapus paket layanan"'+selection.data.namalayanan+'" ?',
                function(btn){
                    if (btn=='yes'){
                        storepaketlayanan.remove(selection);
                    }
                }
            );
        }
    },
    onAddClick: function(){
        var pilihan = Ext.getCmp('paketlayananfilter').getRawValue();
        var valpilihan = Ext.getCmp('paketlayananfilter').getValue();
        if (pilihan.length > 0){
        var view=Ext.create('Admin.view.layanan.PaketLayananTambah',{create:true});
        view.setTitle('Tambah Paket Layanan');
        Ext.getCmp('labelpaket').setText('Nama Paket     :       '+pilihan); 
        Ext.getCmp('idpaket').setValue(valpilihan);
        }else{
            Ext.MessageBox.show({
                msg: "Pilih Paket sebelah kanan terlebih dahulu.",
                icon: Ext.MessageBox.INFO,
                title: "Info Paket",
                buttons: Ext.Msg.OK
            });
        }
    },
    tambahPaket: function(button){
        var win = button.up('window'),
        form = win.down('form'),
        values = form.getValues(),
        storepaketlayanan = Ext.getStore('gridpaketlayanan');
        if (form.getForm().isValid()){
            storepaketlayanan.add(values);
            storepaketlayanan.reload();
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
    onPaketLayananFilter : function(){
    var storepaketlayanan = Ext.getStore('gridpaketlayanan');
		storepaketlayanan.proxy.extraParams.text = Ext.ComponentQuery.query('combobox#paketlayananfilter')[0].getValue(); 		
		storepaketlayanan.proxy.extraParams.page = 1;
		storepaketlayanan.proxy.extraParams.start = 0;
		storepaketlayanan.load();	
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
