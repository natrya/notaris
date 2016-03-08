Ext.define('Admin.model.Outsource', {
    extend: 'Admin.model.Base',
    fields: [{
        name: 'idoutsource',
        type: 'int'
    }, 'nama','alamat','notelp',
    {
        name: 'status',
        type: 'int'
    }]
});
