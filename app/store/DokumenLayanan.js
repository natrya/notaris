Ext.define('Admin.store.DokumenLayanan', {
    extend: 'Ext.data.Store',
    model: 'Admin.model.DokumenLayanan',
    storeId: 'doklayanan',
    alias: 'store.doklayanan',
    remoteFilter:true,
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            storeId: 'doklayanan',
            pageSize: 10,
            autoSync:true
        }, cfg)]);
    },
    listeners: {
        'beforeload': function(store, options) {
            store.proxy.extraParams.kriteria = detailorderdok.idorder_detil; 
        }
    },
    proxy: {
        type: 'direct',            
        api: {
            create: 'QueryDokumenLayanan.createRecord',
            read: 'QueryDokumenLayanan.getResults',
            update: 'QueryDokumenLayanan.updateRecords',
            destroy: 'QueryDokumenLayanan.destroyRecord'
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
