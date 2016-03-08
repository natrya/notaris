Ext.define('Admin.store.Layanan', {
    extend: 'Ext.data.Store',
    model: 'Admin.model.Layanan',
    storeId: 'gridlayanan',
    remoteFilter:true,
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            storeId: 'gridlayanan',
            pageSize: 10,
            autoSync:true
        }, cfg)]);
    },
    proxy: {
        type: 'direct',            
        api: {
            create: 'QueryLayanan.createRecord',
            read: 'QueryLayanan.getResults',
            update: 'QueryLayanan.updateRecords',
            destroy: 'QueryLayanan.destroyRecord'

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
