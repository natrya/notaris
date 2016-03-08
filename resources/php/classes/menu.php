<?php
session_start();
if($_SESSION['level']==1){
?>
{"children":
[
            {
                "text":   "Profile",
                "view":   "profile.UserProfile",
                "leaf":   "true",
                "iconCls": "x-fa fa-male",
                "routeId": "profile"
            },{
                "text":   "Pengguna",
                "view":   "user.Griduser",
                "iconCls": "x-fa fa-group",
                "leaf":   "true",
                "routeId": "iduserGrid"

            },{
               text: 'Master Layanan',
                expanded: false,
                selectable: false,
                iconCls: 'x-fa fa-leanpub',
                routeId : 'layanan-parent',
                id:       'layanan-parent',
                children: [{
                        "text":   "Layanan",
                        "view":   "layanan.Layanan",
                        "iconCls": "x-fa fa-file",
                        "leaf":   "true",
                        "routeId": "layananGrid"
                },{
                        "text":   "Nama Paket",
                        "view":   "layanan.Paket",
                        "iconCls": "x-fa fa-folder-open",
                        "leaf":   "true",
                        "routeId": "paketGrid"
                },{
                        "text":   "Paket Layanan",
                        "view":   "layanan.PaketLayanan",
                        "iconCls": "x-fa fa-folder",
                        "leaf":   "true",
                        "routeId": "paketlayananGrid"

                }]
            },{
                "text":   "Officer",
                "view":   "officer.Officer",
                "iconCls": "x-fa fa-user",
                "leaf":   "true",
                "routeId": "officerGrid"
            },{
                "text":   "Bank",
                "view":   "bank.Bank",
                "iconCls": "x-fa fa-money",
                "leaf":   "true",
                "routeId": "bankGrid"
            }

        ],
"success":true
}
<?php
}else if($_SESSION['level']==2){
?>
{"children":
[
 {
                "text":   "Profile",
                "view":   "profile.UserProfile",
                "leaf":   "true",
                "iconCls": "x-fa fa-male",
                "routeId": "profile"
            },
            {
                "text":   "Klien",
                "view":   "klien.Klien",
                "leaf":   "true",
                "iconCls": "x-fa fa-desktop",
                "routeId": "klienGrid"
            },
            {
                "text":   "Order",
                "view":   "order.Order",
                "iconCls": "x-fa fa-send ",
                "leaf":   "true",
                "routeId": "orderGrid"

            }
        ],
"success":true
}
<?php
}else if($_SESSION['level']==3){
?>
{"children":[
{
                "text":   "Profile",
                "view":   "profile.UserProfile",
                "leaf":   "true",
                "iconCls": "x-fa fa-male",
                "routeId": "profile"
},
{
                "text":   "Order",
                "view":   "order.OrderDetailU",
                "leaf":   "true",
                "iconCls": "x-fa fa-bars",
                "routeId": "orderdetailGridU"
},
{
                "text":   "Fidusia",
                "view":   "fidusia.OrderDetailU",
                "leaf":   "true",
                "iconCls": "x-fa fa-bars",
                "routeId": "orderdetailfidusiaGridU"
}
]}
<?php
}else if($_SESSION['level']==4){
?>
{"children":[
{
                "text":   "Profile",
                "view":   "profile.UserProfile",
                "leaf":   "true",
                "iconCls": "x-fa fa-male",
                "routeId": "profile"
},{
                "text":   "Cari Order",
                "view":   "order.Cari",
                "leaf":   "true",
                "iconCls": "x-fa fa-search",
                "routeId": "cariGrid"
},{
                "text":   "Cari Order Fidusia",
                "view":   "fidusia.Cari",
                "leaf":   "true",
                "iconCls": "x-fa fa-search",
                "routeId": "carifidusiaGrid"
}

]}
<?php
}else if($_SESSION['level']==5){
?>
{"children":[
{
                "text":   "Profile",
                "view":   "profile.UserProfile",
                "leaf":   "true",
                "iconCls": "x-fa fa-male",
                "routeId": "profile"
},
{
                "text":   "Dashboard",
                "view":   "monitor.Bar",
                "leaf":   "true",
                "iconCls": "x-fa fa-male",
                "routeId": "barGrid"
}

]}
<?php
}else if($_SESSION['level']==6){
?>
{"children":
[
 {
                "text":   "Profile",
                "view":   "profile.UserProfile",
                "leaf":   "true",
                "iconCls": "x-fa fa-male",
                "routeId": "profile"
            },
            {
                "text":   "Klien",
                "view":   "klien.Klien",
                "leaf":   "true",
                "iconCls": "x-fa fa-desktop",
                "routeId": "klienGrid"
            },
            {
                "text":   "Fidusia",
                "view":   "fidusia.Order",
                "iconCls": "x-fa fa-send ",
                "leaf":   "true",
                "routeId": "orderfidusiaGrid"

            }
        ],
"success":true
}
<?php
}else{
?>
{"children":[]}
<?php
}
?>

