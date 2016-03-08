Ext.define('Admin.store.Layananid', {
    extend: 'Ext.data.Store',
    model: 'Admin.model.Layananid',
    storeId: 'storelayanan',
    alias: 'store.storelayanan',
    remoteFilter:true,
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: false,
            storeId: 'storelayanan',
            pageSize: 5,
            autoSync:true
        }, cfg)]);
    },
    proxy: {
        type: 'direct',            
        api: {
            read: 'QueryLayanan.getResultsId'
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
