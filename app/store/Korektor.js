Ext.define('Admin.store.Korektor', {
    extend: 'Ext.data.Store',
    model: 'Admin.model.Outsourceid',
    storeId: 'storekorektor',
    alias: 'store.storekorektor',
    remoteFilter:true,
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: false,
            storeId: 'storekorektor',
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
