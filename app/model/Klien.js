Ext.define('Admin.model.Klien', {
    extend: 'Admin.model.Base',
    fields: [{
        name: 'idklien',
        type: 'int'
    }, 'nama','email','telp','alamat',
    {
        name: 'idkota', 
        type: 'int'
    },'tgl_daftar','catatan','namakota']
});
