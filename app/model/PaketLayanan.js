Ext.define('Admin.model.PaketLayanan', {
    extend: 'Admin.model.Base',
    fields: [{
        name: 'idpaketlayanan',
        type: 'int'
    }, 'namapaket','namalayanan',
    {
        name : 'idpaket',
        type: 'int'
    },'deskripsipaket','deskripsilayanan']
});
