Ext.define('Admin.view.user.Griduser', {
    extend: 'Ext.grid.Panel',
    itemId: 'iduserGrid',
    id: 'iduserGrid',
    xtype: 'user',
    store: 'griduser',
    controller: 'griduser',
    requires: [
        'Ext.grid.filters.Filters'
    ],
    initComponent: function(){
        Ext.create('Admin.store.GridUser',{});
        Ext.apply(this, {
            iconCls: 'x-fa fa-group',
            title: 'Management User',
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
                    tooltip: 'Tambah User'

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
                    store: 'griduser',
                    displayInfo: true

                }]    
            }],
            columns: [{
                dataIndex: 'idusr',
                hidden : true
            }, {
                header: 'Username',
                flex: 1,
                sortable: true,
                dataIndex: 'username',
                filter: {
                    type: 'string'
                },
                field: {
                    type: 'textfield'
                }
            }, {
                header: 'Nama',
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
                header: 'E-mail',
                flex: 1,
                sortable: true,
                dataIndex: 'email',
                vtype: 'email',
                msgTarget: 'side',
                filter: {
                    type: 'string'
                },
                field: {
                    type: 'textfield'
                }
            }, {
                header: 'No HP',
                flex: 1,
                sortable: true,
                dataIndex: 'nohp',
                filter: {
                    type: 'string'
                },
                field: {
                    type: 'textfield'
                }
            }, {
                header: 'Level',
                flex: 1,
                sortable: true,
                dataIndex: 'level',
                filter: {
                    type: 'string'
                },
                field: {
                    type: 'textfield'
                },
                renderer: function(value){
                    if (value==1){
                        return 'Administrator'
                    }else if(value==2){
                        return 'SPV PPAT'
                    }else if(value==3){
                        return 'User'
                    }else if(value==4){
                        return 'Receptionist'
                    }else if(value==5){
                        return 'Monitor'
                    }else if(value==6){
                        return 'SPV Fidusia'
                    }
                }
            }, {
                header: 'Foto',
                flex: 1,
                sortable: true,
                dataIndex: 'foto',
                filter: {
                    type: 'string'
                },
                field: {
                    type: 'textfield'
                }
            },{
                header: 'status',
                dataIndex: 'status',
                field: {
                    type: 'textfield'
                },
                renderer: function(value){
                    if (value==1){
                        return 'Aktif'
                    }else{
                        return 'Tidak Aktif'
                    }
                }
            },{
                xtype:'actioncolumn',
                text: 'Ubah Status',
                align: 'center',
                sortable: false,
                menuDisabled: true,
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
