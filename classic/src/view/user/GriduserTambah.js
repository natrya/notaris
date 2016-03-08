Ext.define('Admin.view.user.GriduserTambah', {
    extend: 'Ext.window.Window',
    alias : 'widget.gridusertambah',
    xtype : 'gridusertambah',
    controller: 'griduser',
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
                    id:'iduser',
                    itemId:'iduser',
                    name:'iduser'
                },{
                    xtype:'textfield',
                    fieldLabel: 'Username',
                    itemId:'username',
                    name: 'username',
                    id: 'username',
                    allowBlank: false
                },{
                    xtype:'combobox',
                    fieldLabel: 'Level',
                    itemId:'level',
                    name: 'level',
                    id: 'level',
                    displayField: 'text',
                    valueField: 'id',
                    queryMode: 'local',
                    allowBlank: false,
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
                                    Ext.getCmp('levelname').setValue(record.get(me.displayField));
                                }
                            }
                        }
                    },
                    anchor: '-15',
                    store: {
                        type: 'level'
                    }
                },{
                    xtype:'textfield',
                    fieldLabel: 'Nama',
                    itemId:'nama',
                    name: 'nama',
                    id: 'nama',
                    allowBlank: false
                },{
                    xtype:'textfield',
                    fieldLabel: 'E-mail',
                    itemId:'email',
                    name: 'email',
                    vtype: 'email',
                    msgTarget: 'side',
                    id: 'email',
                    allowBlank: false
                },{
                    xtype:'textfield',
                    fieldLabel: 'No HP',
                    itemId:'nohp',
                    name: 'nohp',
                    id: 'nohp',
                    allowBlank: false
                },{
                    xtype:'hiddenfield',
                    fieldLabel: 'Status',
                    itemId:'status',
                    name: 'status',
                    id: 'status',
                    allowBlank: false,
                    value: '1'
                },{
                    xtype: 'hiddenfield',
                    itemId:'levelname',
                    name: 'levelname',
                    id: 'levelname'

                },{
                    xtype: 'hiddenfield',
                    itemId:'leveltran',
                    name: 'leveltran',
                    id: 'leveltran'

                },{
                    xtype:'hiddenfield',
                    fieldLabel: 'foto',
                    itemId:'foto',
                    name: 'foto',
                    id: 'foto',
                    allowBlank: false
                },{
                    xtype:'filefield',
                    fieldLabel: 'Foto',
                    itemId:'foto-file',
                    name: 'foto-file',
                    id: 'foto-file',
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
