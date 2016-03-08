Ext.define('Admin.view.fidusia.Order', {
    extend: 'Ext.grid.Panel',
    itemId: 'orderfidusiaGrid',
    id: 'orderfidusiaGrid',
    xtype: 'orderfidusia',
    store: 'gridorderfidusia',
    controller: 'gridorderfidusia',
    requires: [
        'Ext.form.field.Text',
        'Ext.grid.filters.Filters',
        'Ext.toolbar.TextItem'
    ],
    initComponent: function(){
        Ext.create('Admin.store.Orderfidusia',{});
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
                    store: 'gridorderfidusia',
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
                dataIndex: 'idofficer',
                hidden: true
            },{
                dataIndex: 'namaofficer',
                hidden: true
            },{
                dataIndex: 'hutang',
                hidden: true
            },{
                dataIndex: 'obyek',
                hidden: true
            },{
                dataIndex: 'catatan',
                hidden: true
            },{
                dataIndex: 'tipepembeli',
                hidden: true
            },{
                dataIndex: 'tgl_ajf',
                hidden: true
            },{
                dataIndex: 'tgl_ppk',
                hidden: true
            },{
                dataIndex: 'idkorektor',
                hidden: true
            },{
                dataIndex: 'idkorektor2',
                hidden: true
            },{
                dataIndex: 'namakorektor',
                hidden: true
            },{
                dataIndex: 'namakorektor2',
                hidden: true
            },{
                dataIndex: 'jangka',
                hidden: true
            },{
                dataIndex: 'tgl_order',
                hidden: true
            },{
                dataIndex: 'tgl_selesai',
                hidden: true
            },{
                dataIndex: 'namaklien',
                hidden: true
            },{
                header: 'Pemberi',
                flex:1,
                dataIndex: 'pemberi',
                field: {
                    type: 'textfield'
                }
            },{
                header: 'Debitur',
                flex:1,
                dataIndex: 'debitur',
                field: {
                    type: 'textfield'
                }
            },{
                header: 'No AJF',
                flex:1,
                dataIndex: 'no_ajf',
                field: {
                    type: 'textfield'
                }
            },{
                header: 'No Berkas',
                flex:1,
                dataIndex: 'no_berkas',
                field: {
                    type: 'textfield'
                }
            },{
                header: 'No PPK',
                flex:1,
                dataIndex: 'no_ppk',
                field: {
                    type: 'textfield'
                }
            },{
                header: 'Status',
                flex:1,
                dataIndex: 'status',
                renderer: function(value){
                    if (value==1){
                        return 'Selesai'
                    }else{
                        return 'proses'
                    }
                }
            },{
            xtype:'actioncolumn',
            flex:1,
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
                    Ext.create('Admin.view.fidusia.WOrderDetail',{
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
