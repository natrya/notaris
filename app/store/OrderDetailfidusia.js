Ext.define('Admin.store.OrderDetailfidusia', {
    extend: 'Ext.data.Store',
    model: 'Admin.model.OrderDetail',
    storeId: 'orderdetailfidusia',
    alias: 'store.orderdetailfidusia',
    remoteFilter:true,
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: false,
            storeId: 'orderdetailfidusia',
            pageSize: 10,
            autoSync:true
        }, cfg)]);
    },
    listeners: {
        'beforeload': function(store, options) {
            store.proxy.extraParams.kriteria = detailorder.idorder; 
        }
    },
    proxy: {
        type: 'direct',            
        api: {
            create: 'QueryOrderdetailfidusia.createRecord',
            read: 'QueryOrderdetailfidusia.getResults',
            update: 'QueryOrderdetailfidusia.updateRecords',
            destroy: 'QueryOrderdetailfidusia.destroyRecord'
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
