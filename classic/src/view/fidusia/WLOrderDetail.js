Ext.define('Admin.view.fidusia.WLOrderDetail', {
    extend:'Ext.window.Window',
    alias :'widget.windowlayananfidusia',
    xtype :'windowlayananfidusia',
    requires:[
        'Admin.view.fidusia.DOrderDetail'
    ],
    layout:'fit',
    modal:true,
    height: 400,
    width: 540,
    iconCls:'x-fa fa-bars',
    autoShow:true,
    initComponent: function() {
        this.items = [
            {
                xtype: 'doklayananfidusia'
            }
        ];
        this.callParent();
    }
});
