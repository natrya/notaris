Ext.define('Admin.store.Outsourceid', {
    extend: 'Ext.data.Store',
    model: 'Admin.model.Outsourceid',
    storeId: 'storepihaklain',
    alias: 'store.storepihaklain',
    remoteFilter:true,
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: false,
            storeId: 'storepihaklain',
            pageSize: 5,
            autoSync:true
        }, cfg)]);
    },
    proxy: {
        type: 'direct',            
        api: {
            read: 'QueryOutsource.getResultsId'
            },
        reader: {
            type: 'json',
            successProperty: 'success',
            messageProperty: 'message',
            rootProperty: 'hasil',
            totalProperty: 'totalCount'
        }
    }
});
