Ext.define('Admin.store.Paketid', {
    extend: 'Ext.data.Store',
    model: 'Admin.model.Paketid',
    storeId: 'paketid',
    alias: 'store.paketid',
    remoteFilter:true,
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: false,
            storeId: 'paketid',
            pageSize: 5,
            autoSync:true
        }, cfg)]);
    },
    proxy: {
        type: 'direct',            
        api: {
            read: 'QueryPaket.getResultsId'
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
