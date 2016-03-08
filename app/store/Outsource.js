Ext.define('Admin.store.Outsource', {
    extend: 'Ext.data.Store',
    model: 'Admin.model.Outsource',
    storeId: 'gridoutsource',
    remoteFilter:true,
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            storeId: 'gridoutsource',
            pageSize: 10,
            autoSync:true
        }, cfg)]);
    },
    proxy: {
        type: 'direct',            
        api: {
            create: 'QueryOutsource.createRecord',
            read: 'QueryOutsource.getResults',
            update: 'QueryOutsource.updateRecords',
            destroy: 'QueryOutsource.destroyRecord'

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
