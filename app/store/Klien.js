Ext.define('Admin.store.Klien', {
    extend: 'Ext.data.Store',
    model: 'Admin.model.Klien',
    remoteFilter:true,
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            storeId: 'gridklien',
            pageSize: 10,
            autoSync:true
        }, cfg)]);
    },
    proxy: {
        type: 'direct',            
        api: {
            create: 'QueryKlien.createRecord',
            read: 'QueryKlien.getResults',
            update: 'QueryKlien.updateRecords',
            destroy: 'QueryKlien.destroyRecord'

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
