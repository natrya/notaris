Ext.define('Admin.store.DokumenLayananfidusia', {
    extend: 'Ext.data.Store',
    model: 'Admin.model.DokumenLayanan',
    storeId: 'doklayananfidusia',
    alias: 'store.doklayananfidusia',
    remoteFilter:true,
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            storeId: 'doklayananfidusia',
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
            create: 'QueryDokumenLayananfidusia.createRecord',
            read: 'QueryDokumenLayananfidusia.getResults',
            update: 'QueryDokumenLayananfidusia.updateRecords',
            destroy: 'QueryDokumenLayananfidusia.destroyRecord'
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
