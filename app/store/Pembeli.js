Ext.define('Admin.store.Pembeli', {
    extend: 'Ext.data.Store',
    storeId: 'pembeli',
    alias: 'store.pembeli',
    fields: ['nama','tipepembeli'],
    proxy: {
        type: 'memory',            
        reader: {
            type: 'json'
        }
    },
    data: [{
        nama: 'Perseorangan',
        tipepembeli : 1
    },{
        nama: 'Perusahaan/Dev',
        tipepembeli : 2
    }]
});
