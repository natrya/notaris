Ext.define('Admin.store.Orderfidusia', {
    extend: 'Ext.data.Store',
    model: 'Admin.model.Orderfidusia',
    storeId: 'gridorderfidusia',
    alias: 'store.gridorderfidusia',
    remoteFilter:true,
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            storeId: 'gridorderfidusia',
            pageSize: 10,
            autoSync:true
        }, cfg)]);
    },
    proxy: {
        type: 'direct',            
        api: {
            create: 'QueryOrderfidusia.createRecord',
            read: 'QueryOrderfidusia.getResults',
            update: 'QueryOrderfidusia.updateRecords',
            destroy: 'QueryOrderfidusia.destroyRecord'

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
