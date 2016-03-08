Ext.define('Admin.store.Bank', {
    extend: 'Ext.data.Store',
    model: 'Admin.model.Bank',
    storeId: 'gridbank',
    remoteFilter:true,
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            storeId: 'gridbank',
            pageSize: 10,
            autoSync:true
        }, cfg)]);
    },
    proxy: {
        type: 'direct',            
        api: {
            create: 'QueryBank.createRecord',
            read: 'QueryBank.getResults',
            update: 'QueryBank.updateRecords',
            destroy: 'QueryBank.destroyRecord'

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
