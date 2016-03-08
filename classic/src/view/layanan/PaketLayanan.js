Ext.define('Admin.view.layanan.PaketLayanan', {
    extend: 'Ext.grid.Panel',
    itemId: 'paketlayananGrid',
    id: 'paketlayananGrid',
    xtype: 'paketlayanan',
    store: 'gridpaketlayanan',
    controller: 'gridpaketlayanan',
    requires: [
        'Ext.form.field.Text',
        'Ext.toolbar.TextItem'
    ],
    initComponent: function(){
        Ext.create('Admin.store.PaketLayanan',{});
        Ext.apply(this, {
            iconCls: 'x-fa fa-group',
            title: 'Management paket',
            dockedItems: [{
                xtype: 'toolbar',
                items: [{
                    type: 'button',
                    cls: 'delete-focus-bg',
                    iconCls:'x-fa fa-plus',
                    ui: 'soft-blue',
                    text: 'Add',
                    itemId: 'btnadd',
                    tooltip: 'Add paket'

                }, {
                    cls: 'delete-focus-bg',
                    iconCls:'x-fa fa-trash',
                    ui: 'soft-blue',
                    text: 'Delete',
                    itemId: 'btndelete'
                },'->',{
                    fieldLabel: 'Pilih Paket',
                    emptyText	: '--Pilih Paket --',
                    xtype: 'combobox',
                    store: {
                        type: 'paketid',
                        autoLoad: false
                    },
                    itemId:'paketlayananfilter',
                    name: 'paketlayananfilter',
                    id: 'paketlayananfilter',
                    queryMode	: 'remote',
					typeAhead	: true,
                    displayField: 'nama',
                    valueField: 'idpaket'
                }]
            },{
                xtype: 'toolbar',
                dock: 'bottom',
                layout: 'fit',
                items: [{
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    store: 'gridpaketlayanan',
                    displayInfo: true

                }]    
            }],
            columns: [{
                dataIndex: 'idpaketlayanan',
                hidden: true
            },{
                dataIndex: 'namapaket',
                hidden: true
            },{
                dataIndex: 'namalayanan',
                hidden: true
            }, {
                header: 'Paket',
                flex: 1,
                sortable: true,
                dataIndex: 'idpaket',
                filter: {
                    type: 'string'
                },
                field: {
                    type: 'textfield'
                },
                renderer: function(value, metaData, record, rowIndex){
                    return record.data.namapaket;
                }
            },{
                header: 'Deskripsi Paket',
                flex: 1,
                sortable: true,
                dataIndex: 'deskripsipaket',
                filter: {
                    type: 'string'
                },
                field: {
                    type: 'textfield'
                }
            },  {
                header: 'Layanan',
                flex: 1,
                sortable: true,
                dataIndex: 'idlayanan',
                filter: {
                    type: 'string'
                },
                field: {
                    type: 'textfield'
                },
                renderer: function(value, metaData, record, rowIndex){
                    return record.data.namalayanan;
                }

            },{
                header: 'Deskripsi Layanan',
                flex: 1,
                sortable: true,
                dataIndex: 'deskripsilayanan',
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
