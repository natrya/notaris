Ext.define('Admin.store.Kotaid', {
    extend: 'Ext.data.Store',
    field:[
        {name:'idkota',type:'int'},
        {name: 'nama', type:'string'}
    ],
    storeId: 'storekota',
    alias: 'store.storekota',
    remoteFilter:true,
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            storeId: 'storekota',
            pageSize: 5
        }, cfg)]);
    },
    proxy: {
        type: 'direct',            
        api: {
            read: 'QueryKota.getResultsId'
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
