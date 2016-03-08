Ext.define('Admin.store.Bankid', {
    extend: 'Ext.data.Store',
    model: 'Admin.model.Bankid',
    storeId: 'storebank',
    alias: 'store.storebank',
    remoteFilter:true,
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: false,
            storeId: 'storebank',
            pageSize: 5
        }, cfg)]);
    },
    proxy: {
        type: 'direct',            
        api: {
            read: 'QueryBank.getResultsId'
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
