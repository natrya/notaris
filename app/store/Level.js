Ext.define('Admin.store.Level',{
    extend: 'Ext.data.Store',
    alias: 'store.level',
    model: 'Admin.model.Level',
    storeId: 'level',
    data: [
    [1,'Administrator'],
    [2,'SPV PPAT'],
    [3,'User'],
    [4,'Receptionist'],
    [5,'Monitor'],
    [6,'SPV Fidusia']
    ]
});
