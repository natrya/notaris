Ext.define('Admin.view.main.Viewport', {
    extend: 'Ext.container.Viewport',
    xtype: 'mainviewport',

    requires: [
        'Ext.list.Tree'
    ],

    controller: 'mainviewport',
    viewModel: {
        type: 'mainviewport'
    },

    cls: 'sencha-dash-viewport',
    itemId: 'mainView',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    listeners: {
        render: 'onMainViewRender'
    },

    items: [{
        xtype: 'toolbar',
        cls: 'sencha-dash-dash-headerbar toolbar-btn-shadow',
        height: 64,
        itemId: 'headerBar',
        items: [
            {
                xtype: 'component',
                reference: 'senchaLogo',
                cls: 'sencha-logo',
                html: '<div class="main-logo"><img src="resources/images/bendera.png">Nama Notaris</div>',
                width: 250
            },
            {
                margin: '0 0 0 8',
                cls: 'delete-focus-bg',
                iconCls:'x-fa fa-navicon',
                id: 'main-navigation-btn',
                handler: 'onToggleNavigationSize'
            },
            {
                xtype: 'tbspacer',
                flex: 1
            },{
                xtype: 'tbtext',
                id: 'idtopuser',
                name: 'idtopuser',
                text: 'tika',
                cls: 'top-user-name'
            },{
                xtype: 'image',
                id: 'idfoto',
                name: 'idfoto',
                cls: 'header-right-profile-image',
                height: 35,
                width: 35,
                alt:'current user image',
                href: '#profile',
                hrefTarget: '_self',
                src: 'resources/images/user-profile/anon.png'
            },{
                iconCls:'x-fa fa-bars',
                text:'Profile',
                menu:[{
                    iconCls:'x-fa fa-key',
                    text:'Ganti Password',
                    handler: 'onPassword',
                    tooltip: 'logout'
                },{
                    iconCls:'x-fa fa-sign-out',
                    text:'Logout',
                    handler: 'onLogout',
                    tooltip: 'logout'
                }]
            }]
    },{
        xtype: 'maincontainerwrap',
        id: 'main-view-detail-wrap',
        reference: 'mainContainerWrap',
        flex: 1,
        items: [
            {
                xtype: 'treelist',
                reference: 'navigationTreeList',
                itemId: 'navigationTreeList',
                ui: 'navigation',
                store: 'NavigationTree',
                width: 250,
                expanderFirst: false,
                expanderOnly: false,
                listeners: {
                    selectionchange: 'onNavigationTreeSelectionChange'
                }
            },
            {
                xtype: 'container',
                flex: 1,
                reference: 'mainCardPanel',
                cls: 'sencha-dash-right-main-container',
                itemId: 'contentPanel',
                layout: {
                    type: 'card',
                    anchor: '100%'
                }
            }
        ]
    }
    ]
});
