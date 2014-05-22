Ext.application({
    name: 'HelloExt',
    launch: function() {
        
        Ext.QuickTips.init();

        // NOTE: This is an example showing simple state management. During development,
        // it is generally best to disable state management as dynamically-generated ids
        // can change across page loads, leading to unpredictable results.  The developer
        // should ensure that stable state ids are set for stateful components in real apps.
        Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));

        var viewport = Ext.create('Ext.Viewport', {
            id: 'border-example',
            layout: 'border',
            items: [
            // create instance immediately
            Ext.create('Ext.Component', {
                region: 'north',
                height: 32, // give north and south regions a height
                autoEl: {
                    tag: 'div',
                    html:'<p>hello ...</p>',
                    // html:'<p>north - generally for menus, toolbars and/or advertisements</p>'
                }
            }), {
                html: '<p style="padding: 10px;">Who am i?</p>',
                region: 'east',
                title: 'Sidebar',
                animCollapse: true,
                collapsible: true,
                split: true,
                width: 225, // give east and west regions a width
                minSize: 175,
                maxSize: 400,
                margins: '0 5 0 0'
            }, {
                region: 'west',
                stateId: 'navigation-panel',
                id: 'west-panel', // see Ext.getCmp() below
                title: 'Left menu',
                split: true,
                width: 200,
                minWidth: 175,
                maxWidth: 400,
                collapsible: true,
                animCollapse: true,
                margins: '0 0 0 5',
                layout: 'accordion',
                items: [{
                    contentEl: 'west',
                    title: 'Person',
                    iconCls: 'person' // see the HEAD section for style used
                }, {
                    title: 'Location',
                    html: '<p>Blabla two.</p>',
                    iconCls: 'location'
                }, {
                    title: 'Logistics',
                    html: '<p>Blabla three</p>',
                    iconCls: 'logistics'
                }]
            },
            // in this instance the TabPanel is not wrapped by another panel
            // since no title is needed, this Panel is added directly
            // as a Container
            Ext.create('Ext.tab.Panel', {
                region: 'center', // a center region is ALWAYS required for border layout
                deferredRender: false,
                activeTab: 0,     // first tab initially active
                items: [{
                    // contentEl: 'center1',
                    title: 'General',
                    // closable: true,
                    autoScroll: true,
                    items: [
                        Ext.define('KitchenSink.view.panel.FramedPanels', {
                            extend: 'Ext.Container',
                            xtype: 'framed-panels',
                            width: '660',

                            layout: {
                                type: 'table',
                                columns: 2,
                                tdAttrs: { style: 'padding: 10px;' }
                            },

                            defaults: {
                                xtype: 'panel',
                                width: 300,
                                bodyPadding: 10,
                                frame: true
                            },

                            initComponent: function () {
                                this.items = [
                                    Ext.create('Ext.form.Panel', {
                                        title: 'User Form',
                                        rowspan: 3,
                                        height: 600,
                                        defaultType: 'textfield',
                                        items: [
                                            {
                                                fieldLabel: 'First Name',
                                                name: 'firstName'
                                            },
                                            {
                                                fieldLabel: 'Last Name',
                                                name: 'lastName'
                                            },
                                            {
                                                xtype: 'datefield',
                                                fieldLabel: 'Date of Birth',
                                                name: 'birthDate'
                                            }
                                        ]
                                    }),
                                    {
                                        title: 'Additional name/in other language',
                                        html: 'abc2',
                                        height: 200
                                    },
                                    {
                                        title: 'No.3',
                                        html: 'abc3',
                                        height: 150
                                    },
                                    {
                                        title: 'No.4',
                                        html: 'abc4',
                                        height: 150
                                    }
                                ];

                                this.callParent();
                            }
                        })
                    ]
                }, {
                    // contentEl: 'center2',
                    title: 'Education',
                    autoScroll: true
                }, {
                    title: 'Experiences',
                    autoScroll: true
                }]
            })]
        });
        // get a reference to the HTML element with id "hideit" and add a click listener to it
        Ext.get("hideit").on('click', function(){
            // get a reference to the Panel that was created with id = 'west-panel'
            var w = Ext.getCmp('west-panel');
            // expand or collapse that Panel based on its collapsed property state
            w.collapsed ? w.expand() : w.collapse();
        });

    }
});

