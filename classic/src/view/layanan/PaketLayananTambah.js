Ext.define('Admin.view.layanan.PaketLayananTambah', {
    extend: 'Ext.window.Window',
    alias : 'widget.paketlayanantambah',
    xtype : 'paketlayanantambah',
    controller: 'gridpaketlayanan',
    layout: 'fit',
    modal:true,
    autoShow: true,
    items:[{
        xtype: 'form',
        bodyPadding:'5 5 0',
        width:290,
        collapsible: false,
        frame: true,
        items:[{
            xtype: 'container',
            layout: 'hbox',
            items:[{
                xtype: 'container',
                flex: 1,
                layout: 'anchor',
                items: [{
                    xtype: 'hiddenfield',
                    itemId:'idpaket',
                    name: 'idpaket',
                    id: 'idpaket'

                },{
                    fieldLabel: 'Nama Paket',
                    xtype: 'label',
                    itemId:'labelpaket',
                    name: 'labelpaket',
                    id: 'labelpaket'
                },{
                    fieldLabel: 'Layanan',
                    emptyText	: '--Pilih Layanan --',
                    xtype: 'combobox',
                    store: {
                        type: 'storelayanan',
                        autoLoad: false
                    },
                    itemId:'idlayanan',
                    name: 'idlayanan',
                    id: 'idlayanan',
                    queryParam: 'q', 
                    queryMode	: 'remote',
					typeAhead	: true,
                    displayField: 'nama',
                    valueField: 'idlayanan'
                }]
            }]
        }]
    }],
    buttons : [{
        id:'btnSimpanMenu',
        text: 'Tambah'
    }]
});
