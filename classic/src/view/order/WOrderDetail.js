Ext.define('Admin.view.order.WOrderDetail', {
    extend:'Ext.window.Window',
    alias :'widget.windoworderdetail',
    xtype :'windoworderdetail',
    requires:[
        'Admin.view.order.OrderDetail'
    ],
    layout:'fit',
    height: 480,
    width: 760,
    modal:true,
    title: 'Detail Order',
    iconCls:'x-fa fa-bars',
    autoShow:true,
    initComponent: function() {
        this.items = [
            {
                xtype: 'orderdetail'
            }
        ];
        this.callParent();
    }
});
