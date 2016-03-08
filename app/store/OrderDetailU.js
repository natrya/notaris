Ext.define('Admin.store.OrderDetailU', {
    extend: 'Ext.data.Store',
    model: 'Admin.model.OrderDetailU',
    storeId: 'orderdetailU',
    alias: 'store.orderdetailU',
    remoteFilter:true,
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: false,
            storeId: 'orderdetailU',
            pageSize: 10,
            autoSync:true
        }, cfg)]);
    },
    proxy: {
        type: 'direct',            
        api: {
            read: 'QueryOrderdetail.getResultsU',
            update: 'QueryOrderdetail.updateRecords'
            },
        reader: {
            type: 'json',
            successProperty: 'success',
            messageProperty: 'message',
            rootProperty: 'hasil',
            totalProperty: 'totalCount'
        },
        writer: {
            writeAllFields: true
        }
    }
});
