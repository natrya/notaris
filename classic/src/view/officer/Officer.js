Ext.define('Admin.view.officer.Officer', {
    extend: 'Ext.grid.Panel',
    itemId: 'officerGrid',
    id: 'officerGrid',
    xtype: 'officer',
    store: 'gridofficer',
    controller: 'gridofficer',
    requires: [
        'Ext.grid.plugin.RowEditing',
        'Ext.form.field.Text',
        'Ext.grid.filters.Filters',
        'Ext.toolbar.TextItem'
    ],
    initComponent: function(){
        Ext.create('Admin.store.Officer',{});
        this.editing = Ext.create('Ext.grid.plugin.RowEditing');
        Ext.apply(this, {
            iconCls: 'x-fa fa-group',
            title: 'Management Officer',
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
                    tooltip: 'Add officer'

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
                    store: 'gridofficer',
                    displayInfo: true

                }]    
            }],
            columns: [{
                dataIndex: 'idofficer',
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
                header: 'Keterangan',
                flex: 1,
                sortable: true,
                dataIndex: 'keterangan',
                filter: {
                    type: 'string'
                },
                field: {
                    type: 'textfield'
                }
            }, {
                header: 'Catatan',
                flex: 1,
                sortable: true,
                dataIndex: 'catatan',
                filter: {
                    type: 'string'
                },
                field: {
                    type: 'textfield'
                }
            }, {
                header: 'Status',
                dataIndex: 'status',
                renderer: function(value){
                    if (value==1){
                        return 'Aktif'
                    }else{
                        return 'Tidak Aktif'
                    }
                }
            }, {
            xtype:'actioncolumn',
            text: 'Ubah Status',
            align: 'center',
            sortable: false,
            items: [{
                iconCls: 'fa fa-check-circle',
                tooltip: 'Ubah Status',
                handler: function(grid, rowIndex, colIndex) {
                    Ext.MessageBox.confirm('Ubah Status', 'Ubah status dari user "'+grid.getStore().getAt(rowIndex).data.nama+'" ?',
                    function(btn){
                        if (btn=='yes'){
                            if (grid.getStore().getAt(rowIndex).get('status')=='0'){
                                grid.getStore().getAt(rowIndex).set('status','1');
                            }else{
                                grid.getStore().getAt(rowIndex).set('status','0');
                            }
                            grid.getStore().sync();
                        }
                    }
                    );
                } 
            }]
        }]
        });
        this.callParent();
        this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
    },
    onSelectChange: function(selModel, selections){
        this.down('#btndelete').setDisabled(selections.length === 0);
    }
});
