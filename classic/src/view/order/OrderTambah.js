Ext.define('Admin.view.order.OrderTambah', {
    extend: 'Ext.window.Window',
    alias : 'widget.ordertambah',
    xtype : 'ordertambah',
    controller: 'gridorder',
    layout: 'fit',
    modal:true,
    iconCls: 'x-fa fa-bars',
    autoShow: true,
    items:[{
        xtype: 'form',
        bodyPadding:'5 5 0',
        width:600,
        collapsible: false,
        frame: false,
        items:[{
            xtype: 'container',
            layout: 'hbox',
            items:[{
                xtype: 'container',
                flex: 1,
                layout: 'anchor',
                items: [{
                    xtype: 'hiddenfield',
                    id:'idorder',
                    itemId:'idorder',
                    name:'idorder',
                    allowBlank: true
                },{
                    xtype: 'hiddenfield',
                    id:'idklien',
                    itemId:'idklien',
                    name:'idklien',
                    allowBlank: false

                },{
                    xtype: 'hiddenfield',
                    id:'idofficer',
                    itemId:'idofficer',
                    name:'idofficer',
                    allowBlank: false

                },{
                    xtype: 'hiddenfield',
                    id:'idbank',
                    itemId:'idbank',
                    name:'idbank',
                    allowBlank: true

                },{
                    xtype:'combobox',
                    fieldLabel: 'Nama Klien',
                    itemId:'namaklien',
                    name: 'namaklien',
                    id: 'namaklien',
                    allowBlank: false,
                    queryMode: 'remote',
                    queryParam: 'q', 
                    displayField: 'nama',
                    valueField: 'idklien',
                    listeners:{
                        change:{
                            fn:function(field,newValue,oldValue){
                                var me = this,
                                value = newValue,
                                record = null;
                                if(value) {
                                    record = me.getStore().findRecord(me.valueField, value);
                                }
                                if(record) {
                                    Ext.getCmp('idklien').setValue(record.get(me.valueField));
                                }
                            }
                        }
                    },
                    store: {
                        type: 'storeklien' 
                    }                   
                },{
                    xtype:'combobox',
                    fieldLabel: 'Tipe',
                    itemId:'tipepembeli',
                    name: 'tipepembeli',
                    id: 'tipepembeli',
                    allowBlank: false,
                    displayField: 'nama',
                    valueField: 'tipepembeli',
                    store: {
                        type: 'pembeli' 
                    }                   
                },{
                    xtype:'textfield',
                    fieldLabel: 'Penjual',
                    itemId:'penjual',
                    name: 'penjual',
                    id: 'penjual',
                    allowBlank: false
                },{
                    xtype:'textarea',
                    fieldLabel: 'Deskripsi',
                    itemId:'deskripsi',
                    name: 'deskripsi',
                    id: 'deskripsi',
                    allowBlank: false
                },{
                    xtype:'datefield',
                    fieldLabel: 'Tgl Realisasi',
                    itemId:'tgl_realisasi',
                    name: 'tgl_realisasi',
                    id: 'tgl_realisasi',
                    format: 'Y-m-d',
                    allowBlank: false
                },{
                    xtype:'textfield',
                    fieldLabel: 'No Berkas',
                    itemId:'no_berkas',
                    name: 'no_berkas',
                    id: 'no_berkas',
                    allowBlank: false
                }]
            },{
                xtype: 'container',
                flex: 1,
                layout: 'anchor',
                items: [{
                    xtype:'textareafield',
                    fieldLabel: 'No Akta',
                    itemId:'no_akta',
                    name: 'no_akta',
                    id: 'no_akta',
                    allowBlank: true
                },{
                    xtype:'combobox',
                    fieldLabel: 'Nama Officer',
                    itemId:'namaofficer',
                    name: 'namaofficer',
                    id: 'namaofficer',
                    allowBlank: false,
                    queryMode: 'remote',
                    queryParam: 'q', 
                    displayField: 'nama',
                    valueField: 'idofficer',
                    listeners:{
                        change:{
                            fn:function(field,newValue,oldValue){
                                var me = this,
                                value = newValue,
                                record = null;
                                if(value) {
                                    record = me.getStore().findRecord(me.valueField, value);
                                }
                                if(record) {
                                    Ext.getCmp('idofficer').setValue(record.get(me.valueField));
                                }
                            }
                        }
                    },
                    store: {
                        type: 'storeofficer' 
                    }                   
                },{
                    xtype:'combobox',
                    fieldLabel: 'Bank',
                    itemId:'namabank',
                    name: 'namabank',
                    id: 'namabank',
                    allowBlank: true,
                    queryMode: 'remote',
                    queryParam: 'q', 
                    displayField: 'nama',
                    valueField: 'idbank',
                    listeners:{
                        change:{
                            fn:function(field,newValue,oldValue){
                                var me = this,
                                value = newValue,
                                record = null;
                                if(value) {
                                    record = me.getStore().findRecord(me.valueField, value);
                                }
                                if(record) {
                                    Ext.getCmp('idbank').setValue(record.get(me.valueField));
                                }
                            }
                        }
                    },
                    store: {
                        type: 'storebank' 
                    }                   
                },{
                    xtype:'textarea',
                    fieldLabel: 'Catatan',
                    itemId:'catatan',
                    name: 'catatan',
                    id: 'catatan',
                    allowBlank: true
                },{
                    fieldLabel: 'Pilih Paket',
                    emptyText	: '--Pilih Paket --',
                    xtype: 'combobox',
                    store: {
                        type: 'paketid',
                        autoLoad: false
                    },
                    itemId:'idpaket',
                    name: 'idpaket',
                    id: 'idpaket',
                    queryMode	: 'remote',
					typeAhead	: true,
                    allowBlank: false,
                    displayField: 'nama',
                    valueField: 'idpaket'
                }]
            }]
        }]
    }],
    buttons : [{
        id:'btnSimpanMenu',
        text: 'Tambah'
    }]
});
