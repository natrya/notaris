Ext.define('Admin.view.klien.KlienTambah', {
    extend: 'Ext.window.Window',
    alias : 'widget.klientambah',
    xtype : 'klientambah',
    controller: 'gridklien',
    layout: 'fit',
    modal:true,
    autoShow: true,
    items:[{
        xtype: 'form',
        bodyPadding:'5 5 0',
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
                    id:'idklien',
                    itemId:'idklien',
                    name:'idklien'
                },{
                    xtype: 'hiddenfield',
                    id:'idkota',
                    itemId:'idkota',
                    name:'idkota',
                    allowBlank: false

                },{
                    xtype:'textfield',
                    fieldLabel: 'Nama klien',
                    itemId:'nama',
                    name: 'nama',
                    id: 'nama',
                    blankText:'Silahkan input nama anda',
                    allowBlank: false
                },{
                    xtype:'textfield',
                    fieldLabel: 'E-mail',
                    itemId:'email',
                    name: 'email',
                    id: 'email',
                    vtype: 'email',
                    blankText:'Silahkan input E-mail anda',
                    allowBlank: false
                },{
                    xtype:'textfield',
                    fieldLabel: 'No HP',
                    itemId:'telp',
                    name: 'telp',
                    id: 'telp',
                    regex: /^[(+{62})|(0{1})]+([0-9]){7,14}$/,
                    regexText:'Silahkan input no HP yang benar',
                    blankText:'Silahkan input no HP anda',
                    allowBlank: false
                },{
                    xtype:'textfield',
                    fieldLabel: 'Alamat',
                    itemId:'alamat',
                    name: 'alamat',
                    id: 'alamat',
                    blankText:'Silahkan input alamat anda',
                    allowBlank: false
                },{
                    xtype:'combobox',
                    fieldLabel: 'Kota',
                    itemId:'namakota',
                    name: 'namakota',
                    id: 'namakota',
                    blankText:'Silahkan input Kota anda',
                    allowBlank: false,
                    queryMode: 'remote',
                    queryParam: 'q', 
                    displayField: 'nama',
                    valueField: 'idkota',
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
                                    Ext.getCmp('idkota').setValue(record.get(me.valueField));
                                }
                            }
                        }
                    },
                    store: {
                        type: 'storekota' 
                    }                   
                },{
                    xtype:'textfield',
                    fieldLabel: 'Catatan',
                    itemId:'catatan',
                    name: 'catatan',
                    id: 'catatan',
                    allowBlank: true
                }]
            }]
        }]
    }],
    buttons : [{
        id:'btnSimpanMenu',
        text: 'Tambah'
    }]
});
