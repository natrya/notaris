Ext.define('Admin.store.Officer', {
    extend: 'Ext.data.Store',
    model: 'Admin.model.Officer',
    storeId: 'gridofficer',
    remoteFilter:true,
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            storeId: 'gridofficer',
            pageSize: 10,
            autoSync:true
        }, cfg)]);
    },
    proxy: {
        type: 'direct',            
        api: {
            create: 'QueryOfficer.createRecord',
            read: 'QueryOfficer.getResults',
            update: 'QueryOfficer.updateRecords',
            destroy: 'QueryOfficer.destroyRecord'

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
