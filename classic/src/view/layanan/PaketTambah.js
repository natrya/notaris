Ext.define('Admin.view.layanan.PaketTambah', {
    extend: 'Ext.window.Window',
    alias : 'widget.pakettambah',
    xtype : 'pakettambah',
    controller: 'gridpaket',
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
                    id:'idpaket',
                    itemId:'idpaket',
                    name:'idpaket'
                },{
                    xtype:'textfield',
                    fieldLabel: 'Nama paket',
                    itemId:'nama',
                    name: 'nama',
                    id: 'nama',
                    allowBlank: false
                },{
                    xtype:'textfield',
                    fieldLabel: 'Deskripsi',
                    itemId:'deskripsi',
                    name: 'deskripsi',
                    id: 'deskripsi',
                    allowBlank: true
                }]
            }]
        }]
    }],
    buttons : [{
        id:'btnSimpanMenu',
        text: 'Tambah'
    }]
});
