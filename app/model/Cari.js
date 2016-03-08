Ext.define('Admin.model.Cari', {
    extend: 'Admin.model.Base',
    idProperty: 'idorder_detil',
    fields: [{
        name: 'idorder_detil',
        type: 'int'
    },{
        name: 'status',
        type: 'int'
    },'ordername','tgl_mulai','tgl_selesai','namalayanan','als','estimasi']
});
