Ext.define('Admin.view.bank.BankTambah', {
    extend: 'Ext.window.Window',
    alias : 'widget.banktambah',
    xtype : 'banktambah',
    controller: 'gridbank',
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
                    id:'idbank',
                    itemId:'idbank',
                    name:'idbank'
                },{
                    xtype:'textfield',
                    fieldLabel: 'Nama bank',
                    itemId:'nama',
                    name: 'nama',
                    id: 'nama',
                    allowBlank: false
                },{
                    xtype:'textfield',
                    fieldLabel: 'Alamat',
                    itemId:'alamat',
                    name: 'alamat',
                    id: 'alamat',
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
