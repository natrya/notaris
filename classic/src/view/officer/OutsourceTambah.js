Ext.define('Admin.view.officer.OutsourceTambah', {
    extend: 'Ext.window.Window',
    alias : 'widget.outsourcetambah',
    xtype : 'outsourcetambah',
    controller: 'gridoutsource',
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
                    id:'idpihaklain',
                    itemId:'idpihaklain',
                    name:'idpihaklain'
                },{
                    xtype:'textfield',
                    fieldLabel: 'Nama',
                    itemId:'nama',
                    name: 'nama',
                    id: 'nama',
                    allowBlank: false
                },{
                    xtype:'textfield',
                    fieldLabel: 'alamat',
                    itemId:'alamat',
                    name: 'alamat',
                    id: 'alamat',
                    allowBlank: false
                },{
                    xtype:'textfield',
                    fieldLabel: 'No Telp',
                    itemId:'notelp',
                    name: 'notelp',
                    id: 'notelp',
                    allowBlank: false
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
