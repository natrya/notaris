Ext.define('Admin.model.OrderDetailU', {
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
    },'no_berkas','no_akta','namaklien' ,'namalayanan','tgl_mulai','tgl_selesai','keterangan','namapihaklain',
    {
        name: 'status', 
        type: 'int'
    }]
});

