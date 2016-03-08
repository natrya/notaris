Ext.define('Admin.store.Carifidusia', {
    extend: 'Ext.data.Store',
    model: 'Admin.model.Cari',
    storeId: 'gridcarifidusia',
    alias: 'store.gridcarifidusia',
    remoteFilter:true,
    groupField: 'ordername',
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: false,
            storeId: 'gridcarifidusia',
            pageSize: 25,
            autoSync:true
        }, cfg)]);
    },
    proxy: {
        type: 'direct',            
        api: {
            read: 'QueryOrderfidusia.getSummary'
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
