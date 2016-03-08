Ext.define('Admin.store.PaketLayanan', {
    extend: 'Ext.data.Store',
    model: 'Admin.model.PaketLayanan',
    storeId: 'gridpaketlayanan',
    remoteFilter:true,
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: false,
            storeId: 'gridpaketlayanan',
            pageSize: 10,
            autoSync:true
        }, cfg)]);
    },
    proxy: {
        type: 'direct',            
        api: {
            create: 'QueryPaketLayanan.createRecord',
            read: 'QueryPaketLayanan.getResults',
            update: 'QueryPaketLayanan.updateRecords',
            destroy: 'QueryPaketLayanan.destroyRecord'

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
