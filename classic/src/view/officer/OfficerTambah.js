Ext.define('Admin.view.officer.OfficerTambah', {
    extend: 'Ext.window.Window',
    alias : 'widget.officertambah',
    xtype : 'officertambah',
    controller: 'gridofficer',
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
                    id:'idofficer',
                    itemId:'idofficer',
                    name:'idofficer'
                },{
                    xtype:'textfield',
                    fieldLabel: 'Nama officer',
                    itemId:'nama',
                    name: 'nama',
                    id: 'nama',
                    allowBlank: false,
                    tooltip: 'Isikan nama Officer / marketing'
                },{
                    xtype:'textfield',
                    fieldLabel: 'catatan',
                    itemId:'catatan',
                    name: 'catatan',
                    id: 'catatan',
                    allowBlank: true
                },{
                    xtype:'textfield',
                    fieldLabel: 'Keterangan',
                    itemId:'keterangan',
                    name: 'keterangan',
                    id: 'keterangan',
                    allowBlank: true
                },{
                    xtype: 'hiddenfield',
                    itemId: 'status',
                    name: 'status',
                    id: 'status',
                    value: '1'
                }]
            }]
        }]
    }],
    buttons : [{
        id:'btnSimpanMenu',
        text: 'Tambah'
    }]
});
