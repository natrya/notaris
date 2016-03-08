Ext.define('Admin.view.dashboard.Selamatdatang', {
    extend: 'Ext.panel.Panel',
    itemId: 'dashboardselamatdatang',
    id: 'dashboardselamatdatang',
    xtype: 'dashboardselamatdatang',
    cls: 'dashboard-main-chart shadow-panel',
    height: 600,
    width: 450,
    title: 'Selamat Datang',
    layout: {
        type: 'fit',
        align: 'center',
        pack: 'center'
    },
    items: [{
        xtype: 'image',
        cls: 'widget-top-container-first-img',
        alt: 'Selamatdatang-image',
        src: 'resources/images/welcome.png'

    }]
});
