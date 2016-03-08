Ext.define('Admin.view.fidusia.OrderDetailTambahU', {
    extend: 'Ext.window.Window',
    alias : 'widget.orderdetailfidusiautambah',
    xtype : 'orderdetailfidusiautambah',
    controller: 'orderdetailfidusia',
    layout: 'fit',
    modal:true,
    iconCls: 'x-fa fa-bars',
    autoShow: true,
    items:[{
        xtype: 'form',
        bodyPadding:'5 5 0',
        collapsible: false,
        frame: false,
        items:[{
            xtype: 'container',
            flex: 1,
            layout: 'anchor',
            items: [{
                xtype: 'hiddenfield',
                id:'idorder_detil',
                itemId:'idorder_detil',
                name:'idorder_detil',
                allowBlank: true
            },{
                xtype: 'hiddenfield',
                id:'idorder',
                itemId:'idorder',
                name:'idorder',
                allowBlank: false

            },{
                xtype: 'hiddenfield',
                id:'idlayanan',
                itemId:'idlayanan',
                name:'idlayanan',
                allowBlank: false

            },{
                xtype: 'hiddenfield',
                id:'idusr',
                itemId:'idusr',
                name:'idusr',
                allowBlank: true

            },{
                xtype:'textareafield',
                fieldLabel: 'Keterangan',
                itemId:'keterangan',
                name: 'keterangan',
                id: 'keterangan',
                allowBlank: true
            }]
        }]        
    }],
    buttons : [{
        id:'btnSimpanMenu',
        text: 'Tambah'
    }]
});
