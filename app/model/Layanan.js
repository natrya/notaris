Ext.define('Admin.model.Layanan', {
    extend: 'Admin.model.Base',
    fields: [{
        name: 'idlayanan',
        type: 'int'
    }, 'nama','diskripsi',
    {
        name : 'durasi',
        type: 'int'
    },'satuan','als']
});
