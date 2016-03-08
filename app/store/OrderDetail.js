Ext.define('Admin.store.OrderDetail', {
    extend: 'Ext.data.Store',
    model: 'Admin.model.OrderDetail',
    storeId: 'orderdetail',
    alias: 'store.orderdetail',
    remoteFilter:true,
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: false,
            storeId: 'orderdetail',
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
            create: 'QueryOrderdetail.createRecord',
            read: 'QueryOrderdetail.getResults',
            update: 'QueryOrderdetail.updateRecords',
            destroy: 'QueryOrderdetail.destroyRecord'
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
