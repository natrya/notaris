Ext.define('Admin.store.OrderDetailfidusiaU', {
    extend: 'Ext.data.Store',
    model: 'Admin.model.OrderDetailU',
    storeId: 'orderdetailfidusiaU',
    alias: 'store.orderdetailfidusiaU',
    remoteFilter:true,
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: false,
            storeId: 'orderdetailfidusiaU',
            pageSize: 10,
            autoSync:true
        }, cfg)]);
    },
    proxy: {
        type: 'direct',            
        api: {
            read: 'QueryOrderdetailfidusia.getResultsU',
            update: 'QueryOrderdetailfidusia.updateRecords'
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
