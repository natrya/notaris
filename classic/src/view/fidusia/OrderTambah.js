Ext.define('Admin.view.fidusia.OrderTambah', {
    extend: 'Ext.window.Window',
    alias : 'widget.orderfidusiatambah',
    xtype : 'orderfidusiatambah',
    controller: 'gridorderfidusia',
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
                    value: '13',
                    allowBlank: false

                },{
                    xtype: 'hiddenfield',
                    id:'idofficer',
                    itemId:'idofficer',
                    name:'idofficer',
                    value:'16',
                    allowBlank: false

                },{
                    xtype: 'hiddenfield',
                    id:'idkorektor',
                    itemId:'idkorektor',
                    name:'idkorektor',
                    allowBlank: false

                },{
                    xtype: 'hiddenfield',
                    id:'idkorektor2',
                    itemId:'idkorektor2',
                    name:'idkorektor2',
                    allowBlank: false

                },{
                    xtype:'textfield',
                    fieldLabel: 'Pemberi',
                    itemId:'pemberi',
                    name: 'pemberi',
                    id: 'pemberi',
                    allowBlank: false
                },{
                    xtype:'textfield',
                    fieldLabel: 'Debitur',
                    itemId:'debitur',
                    name: 'debitur',
                    id: 'debitur',
                    allowBlank: false
                },{
                    xtype:'numberfield',
                    fieldLabel: 'Jangka(bulan)',
                    itemId:'jangka',
                    name: 'jangka',
                    id: 'jangka',
                    emptyText: '12/24/36/48 bulan',
                    allowBlank: false
                },{
                    xtype:'datefield',
                    fieldLabel: 'Tgl Order',
                    itemId:'tgl_order',
                    name: 'tgl_order',
                    id: 'tgl_order',
                    format: 'Y-m-d',
                    listeners : {
                        render : function(datefield) {
                            datefield.setValue(new Date());
                        }
                    },
                    allowBlank: true
                },{
                    xtype:'textfield',
                    fieldLabel: 'No Berkas',
                    itemId:'no_berkas',
                    name: 'no_berkas',
                    id: 'no_berkas',
                    allowBlank: false
                },{
                    xtype:'textfield',
                    fieldLabel: 'No AJF',
                    itemId:'no_ajf',
                    name: 'no_ajf',
                    id: 'no_ajf',
                    allowBlank: false
                },{
                    xtype:'textfield',
                    fieldLabel: 'No PPK',
                    itemId:'no_ppk',
                    name: 'no_ppk',
                    id: 'no_ppk',
                    value: '9042015',
                    allowBlank: false
                },{
                    xtype:'combobox',
                    fieldLabel: 'Nama Klien',
                    itemId:'namaklien',
                    name: 'namaklien',
                    id: 'namaklien',
                    allowBlank: false,
                    queryMode: 'remote',
                    queryParam: 'q', 
                    minChars:3,
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
                }]
            },{
                xtype: 'container',
                flex: 1,
                layout: 'anchor',
                items: [{
                    xtype:'numberfield',
                    fieldLabel: 'Hutang',
                    itemId:'hutang',
                    name: 'hutang',
                    id: 'hutang',
                    value: 0,
                    allowBlank: true
                },{
                    xtype:'numberfield',
                    fieldLabel: 'Obyek',
                    itemId:'obyek',
                    name: 'obyek',
                    id: 'obyek',
                    value: 0,
                    allowBlank: true
                },{
                    xtype:'combobox',
                    fieldLabel: 'Nama Officer',
                    itemId:'namaofficer',
                    name: 'namaofficer',
                    id: 'namaofficer',
                    allowBlank: false,
                    queryMode: 'remote',
                    minChars: 3,
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
                    xtype:'datefield',
                    fieldLabel: 'Tgl AJF',
                    itemId:'tgl_ajf',
                    name: 'tgl_ajf',
                    id: 'tgl_ajf',
                    format: 'Y-m-d',
                    listeners : {
                        render : function(datefield) {
                            datefield.setValue(new Date());
                        }
                    },
                    allowBlank: true
                },{
                    xtype:'datefield',
                    fieldLabel: 'Tgl PPK',
                    itemId:'tgl_ppk',
                    name: 'tgl_ppk',
                    id: 'tgl_ppk',
                    format: 'Y-m-d',
                    listeners : {
                        render : function(datefield) {
                            datefield.setValue(new Date());
                        }
                    },
                    allowBlank: true
                },{
                    xtype:'textarea',
                    fieldLabel: 'Catatan',
                    itemId:'catatan',
                    name: 'catatan',
                    id: 'catatan',
                    allowBlank: true
                },{
                    xtype:'combobox',
                    fieldLabel: 'Korektor 1',
                    itemId:'namakorektor',
                    name: 'namakorektor',
                    id: 'namakorektor',
                    allowBlank: false,
                    queryMode: 'remote',
                    minChars:3,
                    queryParam: 'q', 
                    displayField: 'nama',
                    valueField: 'idusr',
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
                                    Ext.getCmp('idkorektor').setValue(record.get(me.valueField));
                                }
                            }
                        }
                    },
                    store: {
                        type: 'storekorektor' 
                    }                   
                },{
                    xtype:'combobox',
                    fieldLabel: 'Korektor 2',
                    itemId:'namakorektor2',
                    name: 'namakorektor2',
                    id: 'namakorektor2',
                    minChars:3,
                    allowBlank: false,
                    queryMode: 'remote',
                    queryParam: 'q', 
                    displayField: 'nama',
                    valueField: 'idusr',
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
                                    Ext.getCmp('idkorektor2').setValue(record.get(me.valueField));
                                }
                            }
                        }
                    },
                    store: {
                        type: 'storepihaklain' 
                    }                   
                }]
            }]
        }]
    }],
    buttons : [{
        id:'btnSimpanMenu',
        text: 'Tambah'
    }]
});
