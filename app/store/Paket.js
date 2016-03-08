Ext.define('Admin.store.Paket', {
    extend: 'Ext.data.Store',
    model: 'Admin.model.Paket',
    storeId: 'gridpaket',
    remoteFilter:true,
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            storeId: 'gridpaket',
            pageSize: 10,
            autoSync:true
        }, cfg)]);
    },
    proxy: {
        type: 'direct',            
        api: {
            create: 'QueryPaket.createRecord',
            read: 'QueryPaket.getResults',
            update: 'QueryPaket.updateRecords',
            destroy: 'QueryPaket.destroyRecord'

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
