Ext.define('Admin.store.Bar', {
    extend: 'Ext.data.Store',
    alias: 'store.storebar',

    fields: ['country', 'agr', 'ind', 'ser'],
    data: [
        { country: 'USA',     agr: 188217, ind: 2995787, ser: 12500746},
        { country: 'China',   agr: 918138, ind: 3611671, ser: 3792665},
        { country: 'Japan',   agr: 71568,  ind: 1640091, ser: 4258274},
        { country: 'UK',      agr: 17084,  ind: 512506,  ser: 1910915},
        { country: 'Russia',  agr: 78856,  ind: 727906,  ser: 1215198}
    ]

});
