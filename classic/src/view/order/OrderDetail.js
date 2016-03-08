Ext.define('Admin.view.order.OrderDetail', {
    extend: 'Ext.grid.Panel',
    itemId: 'orderdetailGrid',
    id: 'orderdetailGrid',
    xtype: 'orderdetail',
    store: 'orderdetail',
    controller: 'orderdetail',
    requires: [
        'Ext.grid.filters.Filters'
    ],
    initComponent: function(){
        Ext.create('Admin.store.OrderDetail',{});
        Ext.apply(this, {
            plugins: ['gridfilters'],
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
                    store: 'orderdetail',
                    displayInfo: true
                }]    
            }],
            columns: [{
                dataIndex: 'idorder_detil',
                hidden : true
            },{
                dataIndex: 'idorder',
                hidden : true
            },{
                dataIndex: 'idlayanan',
                hidden : true
            },{
                dataIndex: 'idusr',
                hidden : true
            }, {
                header: 'Layanan',
                flex:1,
                sortable: true,
                dataIndex: 'namalayanan',
                filter: {
                    type: 'string'
                },
                field: {
                    type: 'textfield'
                }
            }, {
                header: 'Petugas',
                flex:1,
                sortable: true,
                dataIndex: 'namapihaklain',
                filter: {
                    type: 'string'
                },
                field: {
                    type: 'textfield'
                }
            }, {
                header: 'Tgl Mulai',
                flex:1,
                sortable: true,
                dataIndex: 'tgl_mulai',
                filter: {
                    type: 'string'
                },
                field: {
                    type: 'textfield'
                }
            }, {
                header: 'Tgl Selesai',
                flex:1,
                sortable: true,
                dataIndex: 'tgl_selesai',
                filter: {
                    type: 'string'
                },
                field: {
                    type: 'textfield'
                }
            }, {
                header: 'Keterangan',
                flex:1,
                width: 100,
                sortable: true,
                dataIndex: 'keterangan',
                filter: {
                    type: 'string'
                },
                field: {
                    type: 'textfield'
                }
            }, {
                flex:1,
                header: 'status',
                width:60,
                dataIndex: 'status',
                sortable: false,
                menuDisabled: true,
                field: {
                    type: 'textfield'
                },
                renderer: function(value){
                    if (value==0){
                        return 'Proses'
                    }else{
                        return 'Selesai'
                    }
                }
            },{
                xtype:'actioncolumn',
                text: 'Ubah',
                width:60,
                align: 'center',
                sortable: false,
                menuDisabled: true,
                items: [{
                    iconCls: 'fa fa-check-circle',
                    tooltip: 'Ubah Status',
                    handler: function(grid, rowIndex, colIndex) {
                        Ext.MessageBox.confirm('Ubah Status', 'Ubah status dari order "'+grid.getStore().getAt(rowIndex).data.namalayanan+'" ?',
                        function(btn){
                            if (btn=='yes'){
                                if (grid.getStore().getAt(rowIndex).get('status')=='0'){
                                    grid.getStore().getAt(rowIndex).set('status','1');
                                }else{
                                    grid.getStore().getAt(rowIndex).set('status','0');

                                }
                                grid.getStore().load({
                                    params:{
                                        kriteria:grid.getStore().getAt(rowIndex).data.idorder
                                    }
                                });
                            }
                        });
                    } 
                }]
            }, {
            xtype:'actioncolumn',
            text: 'Dokumen',
            align: 'center',
            sortable: false,
            items: [{
                iconCls: 'fa fa-folder',
                tooltip: 'Dokumen Terkait',
                handler: function(grid, rowIndex, colIndex) {
                    Ext.define('detailorderdok', { 
                        singleton: true, 
                        idorder_detil: grid.getStore().getAt(rowIndex).data.idorder_detil 
                    });  
                    Ext.create('Admin.view.order.WLOrderDetail',{
                        create:true,
                        title:'Dokumen untuk layanan :'+
                            grid.getStore().getAt(rowIndex).data.namalayanan                   
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
