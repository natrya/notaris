Ext.define('Admin.store.Cari', {
    extend: 'Ext.data.Store',
    model: 'Admin.model.Cari',
    storeId: 'gridcari',
    alias: 'store.gridcari',
    remoteFilter:true,
    groupField: 'ordername',
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: false,
            storeId: 'gridcari',
            pageSize: 25,
            autoSync:true
        }, cfg)]);
    },
    proxy: {
        type: 'direct',            
        api: {
            read: 'QueryOrder.getSummary'
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
