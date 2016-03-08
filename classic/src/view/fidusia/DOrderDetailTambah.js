Ext.define('Admin.view.fidusia.DOrderDetailTambah', {
    extend: 'Ext.window.Window',
    alias : 'widget.doklayananfidusiatambah',
    xtype : 'doklayananfidusiatambah',
    controller: 'doklayananfidusia',
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
                    id:'idorder_detil',
                    itemId:'idorder_detil',
                    name:'idorder_detil'
                },{
                    xtype: 'hiddenfield',
                    id:'nama',
                    itemId:'nama',
                    name:'nama'
                },{
                    xtype:'filefield',
                    fieldLabel: 'nama',
                    itemId:'nama-file',
                    name: 'nama-file',
                    id: 'nama-file',
                    allowBlank: true
                },{
                    xtype:'textfield',
                    fieldLabel: 'Keterangan',
                    itemId:'keterangan',
                    name: 'keterangan',
                    id: 'keterangan',
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
