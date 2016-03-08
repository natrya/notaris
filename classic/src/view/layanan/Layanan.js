Ext.define('Admin.view.layanan.Layanan', {
    extend: 'Ext.grid.Panel',
    itemId: 'layananGrid',
    id: 'layananGrid',
    xtype: 'layanan',
    store: 'gridlayanan',
    controller: 'gridlayanan',
    requires: [
        'Ext.grid.plugin.RowEditing',
        'Ext.form.field.Text',
        'Ext.grid.filters.Filters',
        'Ext.toolbar.TextItem'
    ],
    initComponent: function(){
        Ext.create('Admin.store.Layanan',{});
        this.editing = Ext.create('Ext.grid.plugin.RowEditing');
        Ext.apply(this, {
            iconCls: 'x-fa fa-group',
            title: 'Management layanan',
            plugins: ['gridfilters' ,this.editing],
            dockedItems: [{
                xtype: 'toolbar',
                items: [{
                    type: 'button',
                    cls: 'delete-focus-bg',
                    iconCls:'x-fa fa-plus',
                    ui: 'soft-blue',
                    text: 'Add',
                    itemId: 'btnadd',
                    tooltip: 'Add layanan'

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
                    store: 'gridlayanan',
                    displayInfo: true

                }]    
            }],
            columns: [{
                dataIndex: 'idlayanan',
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
                header: 'Diskripsi',
                flex: 1,
                sortable: true,
                dataIndex: 'diskripsi',
                filter: {
                    type: 'string'
                },
                field: {
                    type: 'textfield'
                }
            }, {
                header: 'Durasi',
                flex: 1,
                sortable: true,
                dataIndex: 'durasi',
                editor: {
                    xtype: 'numberfield',
                    allowBlank: false,
                    minValue: 0,
                    maxValue: 1000
                }
            }, {
                header: 'Satuan',
                dataIndex: 'satuan',
                editor: new Ext.form.field.ComboBox({
                    typeAhead: false,
                    triggerAction: 'all',
                    store: [
                        ['J','Jam'],
                        ['H','Hari']
                    ]
                }),
                renderer: function(value){
                    if (value=='H')
                        return 'Hari';
                    if(value=='J')
                        return 'Jam';
                }
            }, {
                header: 'Alias',
                flex: 1,
                sortable: true,
                dataIndex: 'als',
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
