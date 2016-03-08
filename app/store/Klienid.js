Ext.define('Admin.store.Klienid', {
    extend: 'Ext.data.Store',
    model: 'Admin.model.Klienid',
    alias: 'store.storeklien',
    storeId: 'storeklien',
    remoteFilter:true,
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: false,
            storeId: 'storeklien',
            pageSize: 5
        }, cfg)]);
    },
    proxy: {
        type: 'direct',            
        api: {
            read: 'QueryKlien.getResultsId'
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
