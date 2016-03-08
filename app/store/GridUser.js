Ext.define('Admin.store.GridUser', {
    extend: 'Ext.data.Store',
    model: 'Admin.model.GridUser',
    remoteFilter:true,
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            storeId: 'griduser',
            pageSize: 10,
            autoSync:true
        }, cfg)]);
    },
    proxy: {
        type: 'direct',            
        api: {
            create: 'QueryUser.createRecord',
            read: 'QueryUser.getResults',
            update: 'QueryUser.updateRecords',
            destroy: 'QueryUser.destroyRecord'

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
