Ext.define('Admin.view.order.OrderDetailTambah', {
    extend: 'Ext.window.Window',
    alias : 'widget.orderdetailtambah',
    xtype : 'orderdetailtambah',
    controller: 'orderdetail',
    layout: 'fit',
    modal:true,
    iconCls: 'x-fa fa-bars',
    autoShow: true,
    items:[{
        xtype: 'form',
        bodyPadding:'5 5 0',
        collapsible: false,
        frame: false,
        items:[{
            xtype: 'container',
            flex: 1,
            layout: 'anchor',
            items: [{
                xtype: 'hiddenfield',
                id:'idorder_detil',
                itemId:'idorder_detil',
                name:'idorder_detil',
                allowBlank: true
            },{
                xtype: 'hiddenfield',
                id:'idorder',
                itemId:'idorder',
                name:'idorder',
                allowBlank: false

            },{
                xtype: 'hiddenfield',
                id:'idlayanan',
                itemId:'idlayanan',
                name:'idlayanan',
                allowBlank: false

            },{
                xtype: 'hiddenfield',
                id:'idusr',
                itemId:'idusr',
                name:'idusr',
                allowBlank: true

            },{
                xtype:'combobox',
                fieldLabel: 'Layanan',
                itemId:'namalayanan',
                name: 'namalayanan',
                id: 'namalayanan',
                allowBlank: false,
                queryMode: 'remote',
                queryParam: 'q', 
                displayField: 'nama',
                valueField: 'idlayanan',
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
                                Ext.getCmp('idlayanan').setValue(record.get(me.valueField));
                            }
                        }
                    }
                },
                store: {
                    type: 'storelayanan' 
                }                   
            },{
                xtype:'combobox',
                fieldLabel: 'Petugas',
                itemId:'namapihaklain',
                name: 'namapihaklain',
                id: 'namapihaklain',
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
                                Ext.getCmp('idusr').setValue(record.get(me.valueField));
                            }
                        }
                    }
                },
                store: {
                    type: 'storepihaklain' 
                }                   
            },{
                xtype:'textareafield',
                fieldLabel: 'Keterangan',
                itemId:'keterangan',
                name: 'keterangan',
                id: 'keterangan',
                allowBlank: true
            }]
        }]        
    }],
    buttons : [{
        id:'btnSimpanMenu',
        text: 'Tambah'
    }]
});
