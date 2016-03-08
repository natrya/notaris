Ext.define('Admin.model.Orderfidusia', {
    extend: 'Admin.model.Base',
    fields: [{
        name: 'idorder',
        type: 'int'
    },{
        name: 'idklien',
        type: 'int'
    },{
        name: 'idofficer',
        type: 'int'
    },{
        name: 'idbank',
        type: 'int'
    },{
        name: 'tipepembeli',
        type: 'int'
    },'penjual',
    'tgl_realisasi','tgl_order','diskripsi','no_berkas','no_akta','catatan',
    {
        name: 'status', 
        type: 'int'
    },'namaklien','namaofficer','namabank']
});

