Ext.define('Admin.view.order.Cari', {
    extend: 'Ext.grid.Panel',
    itemId: 'cariGrid',
    id: 'cariGrid',
    xtype: 'cari',
    store: 'gridcari',
    requires: [
        'Ext.grid.*',
        'Ext.data.*',
        'Ext.form.field.Number',
        'Ext.form.field.Date',
        'Ext.tip.QuickTipManager',
        'Ext.form.field.Text',
        'Ext.grid.filters.Filters',
        'Ext.toolbar.TextItem'
    ],
    initComponent: function(){
        Ext.create('Admin.store.Cari',{});
        Ext.apply(this, {
            iconCls: 'x-fa fa-group',
            title: 'Search Order',
            plugins: ['gridfilters'],
            features: [{
                id: 'group',
                ftype: 'grouping',
                groupHeaderTpl: '{name}',
                hideGroupedHeader: true,
                enableGroupingMenu: false
            }],
            dockedItems: [{
                xtype: 'toolbar',
                items: ['->',{
                    fieldLabel: 'Cari',
                    labelWidth: 40,
                    xtype: 'textfield',
                    listeners: {
                        change: {
                            fn: function(field, newValue) {
                                var gr = Ext.getStore('gridcari');
                                if (newValue) {
                                    if (newValue.length > 3){
                                        // mencari di local
                                        //gr.filter('text', newValue);
                                        //mencari di database / remote
                                        gr.load({params: { 'text': newValue}});
                                    }
                                }
                                else {
                                    gr.clearFilter();
                                }
                            }
                        }
                    }
                }]
            },{
                xtype: 'toolbar',
                dock: 'bottom',
                layout: 'fit',
                items: [{
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    store: 'gridcari',
                    displayInfo: true

                }]    
            }],
            columns: [{
                dataIndex: 'idorder_detil',
                hidden: true
            },{
                header: 'Order',
                flex: 1,
                sortable: true,
                dataIndex: 'ordername',
                filter: {
                    type: 'string'
                },
                field: {
                    type: 'textfield'
                }
            },{
                header: 'Layanan',
                flex: 1,
                sortable: true,
                dataIndex: 'namalayanan',
                filter: {
                    type: 'string'
                },
                field: {
                    type: 'textfield'
                }
            },{
                header: 'Tgl Mulai',
                flex: 1,
                sortable: true,
                dataIndex: 'tgl_mulai',
                filter: {
                    type: 'string'
                },
                field: {
                    type: 'datefield'
                }
            },{
                header: 'Tgl Selesai',
                flex: 1,
                sortable: true,
                dataIndex: 'tgl_selesai',
                filter: {
                    type: 'string'
                },
                field: {
                    type: 'datefield'
                }
            },{
                header: 'Estimasi',
                flex: 1,
                sortable: true,
                dataIndex: 'estimasi',
                filter: {
                    type: 'string'
                },
                field: {
                    type: 'string'
                }
            },{
                header: 'Progress',
                flex: 1,
                sortable: true,
                dataIndex: 'als',
                filter: {
                    type: 'string'
                },
                field: {
                    type: 'datefield'
                }
            }, {
                header: 'Status',
                dataIndex: 'status',
                renderer: function(value){
                    if (value==1){
                        return 'Selesai'
                    }else{
                        return 'proses'
                    }
                }
            }]
        });
        this.callParent();
    }
});
