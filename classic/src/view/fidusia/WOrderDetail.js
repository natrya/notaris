Ext.define('Admin.view.fidusia.WOrderDetail', {
    extend:'Ext.window.Window',
    alias :'widget.windoworderfidusiadetail',
    xtype :'windoworderfidusiadetail',
    requires:[
        'Admin.view.fidusia.OrderDetail'
    ],
    layout:'fit',
    height: 480,
    width: 760,
    modal:true,
    title: 'Detail Order Fidusia',
    iconCls:'x-fa fa-bars',
    autoShow:true,
    initComponent: function() {
        this.items = [
            {
                xtype: 'orderdetailfidusia'
            }
        ];
        this.callParent();
    }
});
