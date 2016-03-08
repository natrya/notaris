Ext.define('Admin.store.NavigationTree', {
    extend: 'Ext.data.TreeStore',
    storeId: 'NavigationTree',
    autoLoad: true,
    root: {
        expanded: true  
    },
    proxy: {
        type: 'ajax',
        api: {
            read : 'resources/php/classes/menu.php'
        },
        reader: {
            type: 'json',
            rootProperty: 'children',
            successProperty: 'success'
        }
    },
    fields: [
        {
            name: 'text'
        }
    ]
});
