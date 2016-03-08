Ext.define('Admin.view.profile.Description', {
    extend: 'Ext.container.Container',
    xtype: 'profiledescriptionpanel',

    height: 300,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    cls:'timeline-items-wrap user-profile-desc shadow-panel',

    items: [
        {
            xtype: 'box',
            componentCls: 'x-fa fa-home',
            html: 'Jl. Medokan sawah Tira medayu',
            padding: '0 0 12 0'
        },
        {
            xtype: 'box',
            componentCls: 'x-fa fa-clock-o',
            html: 'Berdiri sejak 1990, 0817309405',
            padding: '0 0 12 0'
        },
        {
            xtype: 'box',
            componentCls: 'x-fa fa-globe',
            html: '<a href="#"\'>http://localhost/notaris/</a>',
            padding: '0 0 12 0'
        },
        {
            xtype: 'container',
            flex: 1,
            cls: 'about-me-wrap',
            html: '<h3 class="x-fa fa-user">Tentang kami</h3><p>Kep MENKUMHAM NO 12345555555</p>'
        }]
});
