Ext.define('Admin.view.layanan.LayananTambah', {
    extend: 'Ext.window.Window',
    alias : 'widget.layanantambah',
    xtype : 'layanantambah',
    controller: 'gridlayanan',
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
                    id:'idlayanan',
                    itemId:'idlayanan',
                    name:'idlayanan'
                },{
                    xtype:'textfield',
                    fieldLabel: 'Nama layanan',
                    itemId:'nama',
                    name: 'nama',
                    id: 'nama',
                    allowBlank: false
                },{
                    xtype:'textfield',
                    fieldLabel: 'Deskripsi',
                    itemId:'diskripsi',
                    name: 'diskripsi',
                    id: 'diskripsi',
                    allowBlank: false
                },{
                    xtype:'numberfield',
                    fieldLabel: 'Durasi',
                    itemId:'durasi',
                    name: 'durasi',
                    id: 'durasi',
                    minValue: 0,
                    maxValue: 1000,
                    allowBlank: false
                },{
                    xtype:'combobox',
                    fieldLabel: 'Satuan',
                    itemId:'satuan',
                    name: 'satuan',
                    id: 'satuan',
                    allowBlank: false,
                    typeAhead: false,
                    triggerAction: 'all',
                    store: [
                        ['J','Jam'],
                        ['H','Hari']
                    ]
                },{
                    xtype:'textfield',
                    fieldLabel: 'Alias',
                    itemId:'als',
                    name: 'als',
                    id: 'als',
                    allowBlank: false
                }]
            }]
        }]
    }],
    buttons : [{
        id:'btnSimpanMenu',
        text: 'Tambah'
    }]
});
