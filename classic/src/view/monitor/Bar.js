Ext.define('Admin.view.monitor.Bar', {
    extend: 'Ext.Panel',
    xtype: 'monitorbar',
    controller: 'monitorbar',
    itemId: 'barGrid',
    id: 'barGrid',

    requires: [
        'Ext.chart.theme.Muted'
    ],

    width: 650,

    items: [{
        xtype: 'cartesian',
        flipXY: true,
        reference: 'chart',
        width: '100%',
        height: 500,
        insetPadding: '40 40 30 40',
        innerPadding: '3 0 0 0',
        theme: {
            type: 'muted'
        },
        store: {
            type: 'storebar'
        },
        animation: {
            easing: 'easeOut',
            duration: 500
        },
        interactions: ['itemhighlight'],
        axes: [{
            type: 'numeric3d',
            position: 'bottom',
            fields: 'ind',
            maximum: 4000000,
            majorTickSteps: 10,
            renderer: 'onAxisLabelRender',
            title: 'Billions of USD',
            grid: {
                odd: {
                    fillStyle: 'rgba(245, 245, 245, 1.0)'
                },
                even: {
                    fillStyle: 'rgba(255, 255, 255, 1.0)'
                }
            }
        }, {
            type: 'category3d',
            position: 'left',
            fields: 'country',
            label: {
                textAlign: 'right'
            },
            grid: true
        }],
        series: [{
            type: 'bar3d',
            xField: 'country',
            yField: 'ind',
            style: {
                minGapWidth: 10
            },
            highlight: true,
            label: {
                field: 'ind',
                display: 'insideEnd',
                renderer: 'onSeriesLabelRender'
            },
            tooltip: {
                trackMouse: true,
                renderer: 'onSeriesTooltipRender'
            }
        }],
        sprites: [{
            type: 'text',
            text: 'Industry size in major economies (2011)',
            fontSize: 22,
            width: 100,
            height: 30,
            x: 40, // the sprite x position
            y: 20  // the sprite y position
        }, {
            type: 'text',
            text: 'Source: http://en.wikipedia.org/wiki/List_of_countries_by_GDP_sector_composition',
            fontSize: 10,
            x: 12,
            y: 490
        }]
    }],

    tbar: [
        '->',
        {
            text: 'Preview',
            handler: 'onPreview'
        }
    ]

});
