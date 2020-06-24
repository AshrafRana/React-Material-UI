/*!

=========================================================
* Material Dashboard React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person  from "@material-ui/icons/Person";
// import DirectionsCar from "@material-ui/icons/DirectionsCar";
import Accessible from "@material-ui/icons/Accessible";
import  Business from "@material-ui/icons/Business";
// import LocalTaxi from "@material-ui/icons/LocalTaxi";
// import LibraryBooks from "@material-ui/icons/LibraryBooks";
// import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
// import Notifications from "@material-ui/icons/Notifications";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
// import UserProfile from "views/UserProfile/UserProfile.js";
// import TableList from "views/TableList/TableList.js";
// import Typography from "views/Typography/Typography.js";
// import Icons from "views/Icons/Icons.js";
// import Maps from "views/Maps/Maps.js";
// import NotificationsPage from "views/Notifications/Notifications.js";

// core components/views for RTL layout
import Brand from "views/Brand.js";
import BabySeat from "views/BabySeat.js";

import Client from "views/Client.js";
import Company from "views/Company.js";
import Driver from "views/Driver.js";
import Order from "views/Order.js";
import Category from "views/Category.js";
import VehicleStatus from "views/VehicleStatus.js";
import VehicleModel from "views/VehicleModel.js";
import VehicleFare from "views/VehicleFare.js";

const dashboardRoutes = [
  
  {
    path: "/brand",
    name: "Vehicle Brand",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: Brand,
    layout: "/admin"
  },
  {
    path: "/categories",
    name: "Vehicle Categories",
    icon: "content_paste",
    component: Category,
    layout: "/admin"
  },
  {
    path: "/status",
    name: "Vehicle Status",
    icon: "content_paste",
    component: VehicleStatus,
    layout: "/admin"
  },
  {
    path: "/vehicle-model",
    name: "Vehicle Model",
    icon: "content_paste",
    component: VehicleModel,
    layout: "/admin"
  },
  {
    path: "/orders",
    name: "Order Types",
    icon: "content_paste",
    component: Order,
    layout: "/admin"
  },
  {
    path: "/baby-seat",
    name: "Baby Seat",
    icon: "content_paste",
    component: BabySeat,
    layout: "/admin"
  },
  {
    path: "/baby-seat-fare",
    name: "Baby Seat Fare",
    icon: "content_paste",
    component: Order,
    layout: "/admin"
  },
  {
    path: "/pickup-categroy",
    name: "Pickup Categroy",
    icon: "content_paste",
    component: Order,
    layout: "/admin"
  },
  {
    path: "/pickup-place",
    name: "Pickup Place",
    icon: "content_paste",
    component: Order,
    layout: "/admin"
  },
  {
    path: "/pickup-location",
    name: "Pickup Location",
    icon: "content_paste",
    component: Order,
    layout: "/admin"
  },

  {
    path: "/vehicle-fare",
    name: "Vehicle Fare",
    icon: "content_paste",
    component: VehicleFare,
    layout: "/admin"
  },

  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/client",
    name: "Client List",
    icon: Person,
    component: Client ,
    layout: "/admin"
  },
  {
    path: "/driver",
    name: "Driver List",
    icon: Accessible,
    component: Driver,
    layout: "/admin"
  },
  {
    path: "/company",
    name: "Company List",
    icon: Business,
    component: Company,
    layout: "/admin"
  },
  {
    path: "/mission",
    name: "Mission List",
    icon: LocationOn,
    component: Brand,
    layout: "/admin"
  },
  // {
  //   path: "/vehicle",
  //   name: "Vehicle List",
  //   icon: LocalTaxi,
  //   component: Brand,
  //   layout: "/admin"
  // },
  
  // {
  //   path: "/user",
  //   name: "User Profile",
  //   rtlName: "ملف تعريفي للمستخدم",
  //   icon: Person,
  //   component: UserProfile,
  //   layout: "/admin"
  // },
  // {
  //   path: "/table",
  //   name: "Table List",
  //   rtlName: "قائمة الجدول",
  //   icon: "content_paste",
  //   component: TableList,
  //   layout: "/admin"
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   rtlName: "طباعة",
  //   icon: LibraryBooks,
  //   component: Typography,
  //   layout: "/admin"
  // },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   rtlName: "الرموز",
  //   icon: BubbleChart,
  //   component: Icons,
  //   layout: "/admin"
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   rtlName: "خرائط",
  //   icon: LocationOn,
  //   component: Maps,
  //   layout: "/admin"
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   rtlName: "إخطارات",
  //   icon: Notifications,
  //   component: NotificationsPage,
  //   layout: "/admin"
  // }
];

export default dashboardRoutes;
