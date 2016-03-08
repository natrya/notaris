Ext.define('Admin.store.Officerid', {
    extend: 'Ext.data.Store',
    model: 'Admin.model.Officerid',
    storeId: 'storeofficer',
    alias: 'store.storeofficer',
    remoteFilter:true,
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: false,
            storeId: 'storeofficer',
            pageSize: 5
        }, cfg)]);
    },
    proxy: {
        type: 'direct',            
        api: {
            read: 'QueryOfficer.getResultsId'
        },
        reader: {
            type: 'json',
            successProperty: 'success',
            messageProperty: 'message',
            rootProperty: 'hasil',
            totalProperty: 'totalCount'
        }
    }
});
