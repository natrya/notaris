Ext.define('Admin.model.Officer', {
    extend: 'Admin.model.Base',
    fields: [{
        name: 'idofficer',
        type: 'int'
    }, 'nama','catatan','keterangan',
    {
        name: 'status',
        type: 'int'
    }]
});
