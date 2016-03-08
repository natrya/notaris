Ext.define('Admin.model.OrderDetail', {
    extend: 'Admin.model.Base',
    fields: [{
        name: 'idorder_detil',
        type: 'int'
    },{
        name: 'idorder',
        type: 'int'
    },{
        name: 'idlayanan',
        type: 'int'
    },{
        name: 'idusr',
        type: 'int'
    }, 'tgl_mulai','tgl_selesai','keterangan',
    {
        name: 'status', 
        type: 'int'
    }]
});

