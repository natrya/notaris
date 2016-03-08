Ext.define('Admin.view.bank.Bank', {
    extend: 'Ext.grid.Panel',
    itemId: 'bankGrid',
    id: 'bankGrid',
    xtype: 'bank',
    store: 'gridbank',
    controller: 'gridbank',
    requires: [
        'Ext.grid.plugin.RowEditing',
        'Ext.form.field.Text',
        'Ext.grid.filters.Filters',
        'Ext.toolbar.TextItem'
    ],
    initComponent: function(){
        Ext.create('Admin.store.Bank',{});
        this.editing = Ext.create('Ext.grid.plugin.RowEditing');
        Ext.apply(this, {
            iconCls: 'x-fa fa-group',
            title: 'Management bank',
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
                    tooltip: 'Add bank'

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
                    store: 'gridbank',
                    displayInfo: true

                }]    
            }],
            columns: [{
                dataIndex: 'idbank',
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
                header: 'alamat',
                flex: 1,
                sortable: true,
                dataIndex: 'alamat',
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
