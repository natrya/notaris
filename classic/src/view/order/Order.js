Ext.define('Admin.view.order.Order', {
    extend: 'Ext.grid.Panel',
    itemId: 'orderGrid',
    id: 'orderGrid',
    xtype: 'order',
    store: 'gridorder',
    controller: 'gridorder',
    requires: [
        'Ext.form.field.Text',
        'Ext.grid.filters.Filters',
        'Ext.toolbar.TextItem'
    ],
    initComponent: function(){
        Ext.create('Admin.store.Order',{});
        this.editing = Ext.create('Ext.grid.plugin.RowEditing');
        Ext.apply(this, {
            iconCls: 'x-fa fa-group',
            title: 'Management Order',
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
                    tooltip: 'Add order'

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
                    store: 'gridorder',
                    displayInfo: true

                }]    
            }],
            columns: [{
                dataIndex: 'idorder',
                hidden: true
            },{
                dataIndex: 'idklien',
                hidden: true
            },{
                header: 'Klien',
                dataIndex: 'namaklien',
                field: {
                    type: 'datefield'
                }
            },{
                header: 'Penjual',
                dataIndex: 'penjual',
                field: {
                    type: 'datefield'
                }
            },{
                dataIndex: 'idofficer',
                hidden: true
            },{
                dataIndex: 'namaofficer',
                hidden: true
            },{
                dataIndex: 'idbank',
                hidden: true
            },{
                dataIndex: 'namabank',
                hidden: true
            },{
                dataIndex: 'tipepembeli',
                hidden: true
            },{
                header: 'Tgl Realisasi',
                flex: 1,
                sortable: true,
                dataIndex: 'tgl_realisasi',
                field: {
                    type: 'textfield'
                }
            },{
                header: 'Deskripsi',
                flex: 1,
                sortable: true,
                dataIndex: 'deskripsi',
                filter: {
                    type: 'string'
                },
                field: {
                    type: 'textfield'
                }
            }, {
                header: 'No Berkas',
                flex: 1,
                sortable: true,
                dataIndex: 'no_berkas',
                filter: {
                    type: 'string'
                },
                field: {
                    type: 'textfield'
                }
            }, {
                header: 'No Akta',
                flex: 1,
                sortable: true,
                dataIndex: 'no_akta',
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
                        return 'Selesai'
                    }else{
                        return 'proses'
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
                    Ext.MessageBox.confirm('Ubah Status', 'Ubah status dari berkas "'+grid.getStore().getAt(rowIndex).data.no_berkas+'" ?',
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
        }, {
            xtype:'actioncolumn',
            text: 'Detail',
            align: 'center',
            sortable: false,
            items: [{
                iconCls: 'fa fa-folder-open',
                tooltip: 'Detail proses',
                handler: function(grid, rowIndex, colIndex) {
                    Ext.define('detailorder', { 
                        singleton: true, 
                        idorder: grid.getStore().getAt(rowIndex).data.idorder 
                    });  
                    Ext.create('Admin.view.order.WOrderDetail',{
                        create:true,
                        title:'No Berkas :'+
                            grid.getStore().getAt(rowIndex).data.no_berkas                   
                    }); 
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
