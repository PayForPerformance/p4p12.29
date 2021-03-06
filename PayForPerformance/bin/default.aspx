﻿<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="default.aspx.cs" Inherits="PayForPerformance._default" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <link rel="stylesheet" href="stylesheets/jquery.mobile.icons.min.css" />
    <link rel="stylesheet" href="stylesheets/jquery.mobile.structure-1.4.2.min.css" />
    <link href="stylesheets/jquery.mobile.structure-1.4.2.min.css" rel="stylesheet" />
    <link rel="stylesheet" type="text/css" href="stylesheets/Comhar-misc.css" />

    <link rel="stylesheet" type="text/css" href="stylesheets/dx-common.css" />
    <link rel="stylesheet" type="text/css" href="stylesheets/dx-light.css" />

    <script src="Scripts/require.js"></script>
    <script src="Scripts/main.js"></script>

    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Pay For Performance</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/> 
    <link rel="stylesheet" href="stylesheets/comhar-2.0.6.min.css" />
    <style>
        .no-js {
            background: #4f8700;
            visibility: hidden;
        }
    </style>
</head>
<body ng-cloak class="no-js">

    <form id="form1">

        <div data-role="page" id="ETCM" data-theme="c" data-dom-cache="false">
            <div data-role="panel" id="leftPanel" data-position="left" data-display="push">
                <div ng-controller="programCtrl">
                    <ul data-role="listview" ng-repeat="program in programs">
                    <li><a ng-href="#{{ program.ProgramName }}">{{ program.ProgramName }}</a></li>
                    </ul>
                </div>
            </div>
        
            <div data-role="panel" id="rightPanel" data-position="right" data-display="push">
                <ul data-role="listview">
                    <li><a href="#About">About Pay For Performance</a></li>
                    <li><a href="#Help">Pay for Performance Help</a></li>
                    <li><a href="http://comhar.org">Comhar Web Site</a></li>
                </ul>
            </div>

            <div data-role="header">
                <a href="#leftPanel" data-icon="bars" style="margin-top:8px">Menu</a>
                <h1><span style="font-family: 'Times New Roman'; color: #0055a5; font-size:2em; font-style: italic; margin-left: 10px;">Pay For Performance</span></h1>
                <a href="#rightPanel" data-icon="info" style="margin-top:8px">Info</a>
                <div style="width:100%;border-bottom:solid 3px white;"></div>
            </div>


            <div role="main" class="ui-content" data-theme="c">
                <h1>ETCM</h1>
                <div ng-controller="dateCtrl">
                    
                      <label class="fiscalYearLabel" style="margin-left:6px;display:inline;font-size:1.2em">{{ selected.FiscalYearStartDate | date : longDate }} - {{ selected.FiscalYearEndDate | date : longDate }}</label>
                      <a href="#fiscalYearPopup" data-rel="popup" style="width:200px;margin-left:6px;text-align:left;display:inline;color:white;vertical-align:middle;font-size:.8em">select another fiscal year</a>

                      <div data-role="popup" id="fiscalYearPopup" data-position-to="open">
                          {{ selected.DataRangeName }}
                          <div style="padding:12px;">
                              <div ng-controller="dateList" popover-close>
                                  <div data-theme="a" style="font-weight:bold;font-size:.8em;margin-bottom:6px;" jquery-create>Select Another Fiscal Year:</div>
                                  <ul data-role="listview" class="fiscal-date-listview" ng-repeat="year in years" jquery-create>
                                      <li ng-click="setSelected($index)" jquery-create><a ng-href="#" class="fiscalYearListItem">{{ year.FiscalYearStartDate | date : longDate }} - {{ year.FiscalYearEndDate | date : longDate }}</a></li>
                                  </ul>
                              </div>
                          </div>
                      
                    </div>
                    <div data-role="collapsible" data-collapsed-icon="arrow-r" data-collapsed="false" data-theme="b" data-content-theme="c">
                        <h3 id="tcm-01-01" class="kpiContainer">TCM 01:Service Delivery and Continuity of Care</h3>
                        <div data-role="collapsible" data-collapsed-icon="arrow-r" data-collapsed="false">
                            <h3>Percent of authorizations having at least one 31 day gap between services</h3>
                            <div class="ui-grid-a ui-responsive">
                                <div class="ui-block-a">
                                    <div class="ui-bar ui-bar-a" style="background-color:white;">
                                        <div id="chart2-TCM-01-01" class="kpiChart"></div><!--Chart Here -->
                                    </div>
                                </div>

                                <div class="ui-block-b">
                                    <div class="ui-bar ui-bar-c">
                                        <div ng-controller="comharCtrl">
                                            <div data-role="collapsible" ng-repeat ="item in data | limitTo : 8" jquery-create>
                                                <h1>{{ item.Heading }}</h1>
                                                <p>{{ item.Text }}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div data-role="collapsible">
                                <h3>Encounter Details</h3>
                                <div id="gridContainer" class="gridContainer" style="width:100%; height:auto;"></div> <!--DataGrid -->
                                <div style="height:60px; width:100%" ng-controller="gridCtrl">
                                    
                                    <ul class="filter-buttons">
                                        <li>
                                            <div style="max-width:200px" dx-drop-down-menu="{
                                                dataSource: filterMenuData,
                                                buttonText: 'Show Filters',
                                                buttonIcon: 'menu',
                                                itemClickAction: heya 
                                            }"></div> <!--TODO Rename Me -->
                                        </li>
                                        <li>
                                            <div id="remove-visit-filter" style="max-width:200px"></div>
                                        </li>
                                    </ul>
                                
                                </div>
                        
                                <div style="width:100%">
                                    <center><button id="download-CSV" type="submit" style="max-width:400px;">Download as CSV</button></center>
                                </div>
                            
                            </div>
                        </div>
            

                        <div data-role="collapsible" data-collapsed-icon="arrow-r" data-collapsed="false">
                            <h3>Change in percent of authorizations with at least one 31 day gap in service in the reporting period</h3>
                            <div data-role="collapsible" data-collapsed-icon="arrow-r" data-collapsed="false">
                                <div class="ui-grid-a ui-responsive">

                                    <div class="ui-block-a">
                                        <div class="ui-bar ui-bar-a" style="background-color:white;">
                                            <div id="chart-TCM-01-02" class="kpiChart"></div>
                                        </div>
                                    </div>
                            
                                    <div class="ui-block-b">
                                        <div class="ui-bar ui-bar-c">
                                            <div ng-controller="comharCtrl">
                                                <div data-role="collapsible" ng-repeat ="item in data | limitTo: 8" jquery-create>
                                                    <h3>{{ item.Heading }}</h3>
                                                    <p>{{ item.Text }}</p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                    <div ng-controller="comharCtrl">
                        <div>
                            <div ng-repeat="kpi in namesandIds" jquery-create>
                                <div test-kpi></div>
                            </div>
                        </div>
                    </div>
                </div>



                <div data-role="footer" data-position="fixed">
                    <div style="width:100%;border-top:solid 3px white;"></div>
                    <h1><img style="width: 140px; vertical-align: middle" src="images/CLogo.png" alt="" /></h1>
                </div>

            </div>

        </div>

        <div data-role="page" id="BHRS" data-theme="a" data-dom-cache="false">

            <div data-role="panel" id="leftPanelBHRS" data-position="left" data-display="push">
                <div ng-controller="programCtrl">
                    <ul data-role="listview" ng-repeat="program in programs" jquery-create>
                        <li><a ng-href="#{{ program.ProgramAlias }}">{{ program.ProgramName }}</a></li>
                    </ul>
                </div>
            </div>
    

            <div data-role="panel" id="rightPanelBHRS" data-position="right" data-display="push">
                <ul data-role="listview">
                   <li><a href="#About">About Pay For Performance</a></li>
                   <li><a href="#Help">Pay for Prformance Help</a></li>
                   <li><a href="http://comhar.org">Comhar Web Site</a></li>
                </ul>
            </div>

            <div data-role="header">

                <a href="#leftPanelBHRS" data-icon="bars">Menu</a>
                <h1><img style="width: 140px; vertical-align: middle" src="images/CLogo.png" alt=" " /><span style="font-family: 'Times New Roman'; color: #0055a5; font-size:2em; font-style: italic; margin-left: 10px;">Pay For Performance</span></h1>
                <a href="#rightPanelBHRS" data-icon="info">Info</a>

            </div>

            <div role="main" class="ui-content" data-theme="a">
                <div data-role="collapsible" data-collapsed-icon="arrow-r" data-collapsed="true" data-theme="a" data-content-theme="b">
                    <h3>BHRS 01:Service Delivery and Continuity of Care</h3>

                    <div data-role="collapsible" data-collapsed-icon="arrow-r" data-theme="b" data-collapsed="false">
                        <h3>Percent of authorizations having at least one 31 day gap between services</h3>
                        <div id="chart-BHRS-04-01" class="kpiChart"></div>
                    </div>

                    <div data-role="collapsible" data-collapsed-icon="arrow-r" data-collapsed="false">
                        <h3>Change in percent of authorizations with at least one 31 day gap in service in the reporting period</h3>
                        <div id="chart-BCRS-04-01" class="kpiChart"></div>
                    </div>

                </div>
            </div>
        </div>

        <div data-role="page" id="About" data-theme="c" data-dom-cache="false">
            <div data-role="header">

                <a href="#leftPanel" data-icon="bars">Menu</a>
                <h1><img style="width: 140px; vertical-align: middle" src="/images/clogo.png" alt="" /><span style="font-family: 'Times New Roman'; color: #0055a5; font-size:2em; font-style: italic; margin-left: 10px;">Pay For Performance</span></h1>
                <a href="#rightPanel" data-icon="info">Info</a>

            </div>
            <div role="main" class="ui-content" data-theme="b">
                <div data-role="collapsible" data-collapsed-icon="arrow-r" data-collapsed="false">
                    <h3>About</h3>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet ultrices eros. Ut et pulvinar diam. Ut tristique blandit lacus semper vestibulum. Sed suscipit dui elit, non mollis neque commodo at. Maecenas viverra ante vel eleifend pellentesque. Vivamus sagittis mauris condimentum est tempus, non viverra neque feugiat. Morbi porta eros vitae mi pretium, et tristique est consectetur. Cras et dolor luctus, volutpat urna vitae, auctor risus. Cras arcu arcu, blandit a pellentesque et, pulvinar id erat. Suspendisse nec turpis imperdiet, auctor arcu et, consequat justo. Nullam est tortor, gravida vel urna ac, varius malesuada metus. Ut vitae suscipit ipsum. Nam vestibulum leo sed lectus egestas venenatis.
                    </p>
                </div>

            </div>
        </div>

        <div data-role="page" id="Help" data-theme="c" data-dom-cache="false">
            <div data-role="header">

                <a href="#leftPanel" data-icon="bars">Menu</a>
                <h1><img style="width: 140px; vertical-align: middle" src="images/clogo.png" alt="" /><span style="font-family: 'Times New Roman'; color: #0055a5; font-size:2em; font-style: italic; margin-left: 10px;">Pay For Performance</span></h1>
                <a href="#rightPanel" data-icon="info">Info</a>

            </div>
            <div role="main" class="ui-content" data-theme="b">
                <div data-role="collapsible" data-collapsed-icon="arrow-r" data-collapsed="false">
                    <h3>Help</h3>
                        <p>
                        Donec dapibus lorem eu auctor tempor. Vivamus dignissim, turpis et pulvinar varius, risus nunc tristique neque, sed tristique velit orci id turpis. Suspendisse sodales, purus mollis faucibus lacinia, risus metus venenatis quam, vitae mattis metus mi eget sapien. Cras porttitor ante ac porta feugiat. Suspendisse potenti. Curabitur ultricies dictum nisi, at consectetur purus rhoncus quis. Aenean quam nibh, elementum a sem sed, tempor adipiscing orci. Mauris egestas libero leo, a rhoncus mi rutrum ac. Sed accumsan augue in sollicitudin vulputate. In rhoncus dui erat, in congue nisi auctor nec. Aenean risus ipsum, lobortis non suscipit ut, tristique eu ipsum. Proin commodo, augue ac tincidunt posuere, massa mi rutrum sem, nec volutpat diam lacus in velit.
                    </p>
                </div>

            </div>
        </div>
    </form>
</body>
</html>
