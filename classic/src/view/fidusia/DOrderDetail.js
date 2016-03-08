Ext.define('Admin.view.fidusia.DOrderDetail', {
    extend: 'Ext.grid.Panel',
    itemId: 'doklayananfidusiaGrid',
    id: 'doklayananfidusiaGrid',
    xtype: 'doklayananfidusia',
    store: 'doklayananfidusia',
    controller: 'doklayananfidusia',
    initComponent: function(){
        Ext.create('Admin.store.DokumenLayananfidusia',{});
        Ext.apply(this, {
            dockedItems: [{
                xtype: 'toolbar',
                items: [{
                    type: 'button',
                    cls: 'delete-focus-bg',
                    iconCls:'x-fa fa-plus',
                    ui: 'soft-blue',
                    text: 'Tambah',
                    itemId: 'btnadd',
                    tooltip: 'Tambah order'

                }, {
                    cls: 'delete-focus-bg',
                    iconCls:'x-fa fa-trash',
                    ui: 'soft-blue',
                    text: 'Delete',
                    disabled: true,
                    itemId: 'btndelete'
                }]
            },{
                xtype: 'toolbar',
                dock: 'bottom',
                layout: 'fit',
                items: [{
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    store: 'doklayananfidusia',
                    displayInfo: true
                }]    
            }],
            columns: [{
                dataIndex: 'idorder_detil',
                hidden : true
            },{
                dataIndex: 'iddokumen',
                hidden : true
            },{
                header: 'Nama Layanan',
                flex:1,
                sortable: true,
                dataIndex: 'namalayanan',
                filter: {
                    type: 'string'
                },
                field: {
                    type: 'textfield'
                }
            },{
                header: 'Nama dokumen',
                flex:1,
                sortable: true,
                dataIndex: 'nama',
                filter: {
                    type: 'string'
                },
                field: {
                    type: 'textfield'
                },
                renderer: function(value) {
                    return '<a href="/notaris/dok/'+value+'" target="_blank">'+value+'</a>'; 
                }
            }, {
                header: 'Keterangan',
                flex:1,
                sortable: true,
                dataIndex: 'keterangan',
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
