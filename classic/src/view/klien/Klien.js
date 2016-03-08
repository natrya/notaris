Ext.define('Admin.view.klien.Klien', {
    extend: 'Ext.grid.Panel',
    itemId: 'klienGrid',
    id: 'klienGrid',
    xtype: 'klien',
    store: 'gridklien',
    controller: 'gridklien',
    requires: [
        'Ext.form.field.Text',
        'Ext.grid.filters.Filters',
        'Ext.toolbar.TextItem'
    ],
    initComponent: function(){
        Ext.create('Admin.store.Klien',{});
        Ext.apply(this, {
            iconCls: 'x-fa fa-group',
            title: 'Management klien',
            plugins: ['gridfilters'],
            dockedItems: [{
                xtype: 'toolbar',
                items: [{
                    type: 'button',
                    cls: 'delete-focus-bg',
                    iconCls:'x-fa fa-plus',
                    ui: 'soft-blue',
                    text: 'Add',
                    itemId: 'btnadd',
                    tooltip: 'Add klien'

                }, {
                    cls: 'delete-focus-bg',
                    iconCls:'x-fa fa-trash',
                    ui: 'soft-blue',
                    text: 'Delete',
                    disabled: true,
                    itemId: 'btndelete'
            },'->',{
                fieldLabel: 'Filter',
                labelWidth: 40,
                xtype: 'textfield',
                listeners: {
                    change: {
                        fn: 'filterChange'
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
                    store: 'gridklien',
                    displayInfo: true

                }]    
            }],
            columns: [{
                dataIndex: 'idklien',
                hidden: true
            }, {
                dataIndex: 'namakota',
                hidden: true
            }, {
                header: 'nama',
                flex: 1,
                sortable: true,
                dataIndex: 'nama',
                filter: {
                    type: 'string'
                },
                field: {
                    type: 'textfield'
                }
            }, {
                header: 'Email',
                flex: 1,
                sortable: true,
                dataIndex: 'email',
                filter: {
                    type: 'string'
                },
                field: {
                    type: 'textfield'
                }
            }, {
                header: 'Telp',
                flex: 1,
                sortable: true,
                dataIndex: 'telp',
                filter: {
                    type: 'string'
                },
                field: {
                    type: 'textfield'
                }
            }, {
                header: 'Alamat',
                flex: 1,
                sortable: true,
                dataIndex: 'alamat',
                filter: {
                    type: 'string'
                },
                field: {
                    type: 'textfield'
                }
            }, {
                header: 'Kota',
                flex: 1,
                sortable: true,
                dataIndex: 'idkota',
                filter: {
                    type: 'string'
                },
                field: {
                    type: 'textfield'
                },
                renderer: function(val, meta, record, rowIndex){
                    return record.get('namakota');
                }
            }, {
                header: 'Tgl Terdaftar',
                flex: 1,
                sortable: true,
                dataIndex: 'tgl_daftar',
                filter: {
                    type: 'string'
                },
                field: {
                    type: 'textfield'
                }
            }, {
                header: 'catatan',
                flex: 1,
                sortable: true,
                dataIndex: 'catatan',
                filter: {
                    type: 'string'
                },
                field: {
                    type: 'textfield'
                }
            }]
        });
        this.callParent();
        this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
    },
    onSelectChange: function(selModel, selections){
        this.down('#btndelete').setDisabled(selections.length === 0);
    }
});
