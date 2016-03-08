Ext.define('Admin.view.order.WLOrderDetail', {
    extend:'Ext.window.Window',
    alias :'widget.windowlayanan',
    xtype :'windowlayanan',
    requires:[
        'Admin.view.order.DOrderDetail'
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
                xtype: 'doklayanan'
            }
        ];
        this.callParent();
    }
});
