import { Component, OnInit, AfterViewInit } from '@angular/core';
import { RequestsService } from '../../services/requests.service';
import { Router } from '@angular/router'
import { Location } from '@angular/common'


declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: 'home', title: 'Home', icon: 'dashboard', class: '' },
    { path: 'requests', title: 'Visitatori', icon: 'group', class: '' },
    // MOVED IN THE TEMPLATE: IS NECESSARY TO LINK THE CHAT IN A EXTERNAL PAGE
    // { path: 'chat', title: 'Chat', icon: 'chat', class: '' },
    // { path: 'analytics', title: 'Analytics', icon: 'trending_up', class: '' },
    // MOVED IN THE TEMPLATE: IS NECESSARY TO MANAGE THE SETTING SUB MENU
    // { path: 'settings', title: 'Impostazioni',  icon: 'settings', class: '' },

    // { path: 'dashboard', title: 'Dashboard', icon: 'dashboard', class: '' },
    // { path: 'user-profile', title: 'User Profile', icon: 'person', class: '' },
    // { path: 'table-list', title: 'Table List', icon: 'content_paste', class: '' },
    // { path: 'typography', title: 'Typography', icon: 'library_books', class: '' },
    // { path: 'icons', title: 'Icons', icon: 'bubble_chart', class: '' },
    // { path: 'maps', title: 'Maps', icon: 'location_on', class: '' },
    // { path: 'notifications', title: 'Notifications', icon: 'notifications', class: '' },
    // { path: 'upgrade', title: 'Upgrade to PRO', icon: 'unarchive', class: 'active-pro' },
];

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, AfterViewInit {
    menuItems: any[];

    // SHOW_SETTINGS_SUBMENU = false;
    SHOW_SETTINGS_SUBMENU = false;
    SETTINGS_SUBMENU_WAS_OPEN: any;
    // NO MORE USED
    // isActive: string;

    // switch up and down the caret of menu item settings
    // trasform = 'none';
    trasform = 'none';
    unservedRequestCount: number;

    route: string;
    LOGIN_PAGE: boolean;
    IS_UNAVAILABLE = false;


    constructor(
        private requestsService: RequestsService,
        private router: Router,
        public location: Location,
    ) { }

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);

        // GET COUNT OF UNSERVED REQUESTS
        this.requestsService.getCountUnservedRequest().subscribe((count: number) => {
            this.unservedRequestCount = count;
            // console.log(' ++ +++ (sidebar) COUNT OF UNSERVED REQUEST ', this.unservedRequestCount);

        });

        // SUBSCRIBE TO UNSERVED REQUESTS PUBLISHED BY REQUEST SERVICE
        this.requestsService.mySubject.subscribe((values) => {
            // console.log('xxxxx xxxxx', values)
            if (values) {
                this.unservedRequestCount = values.length
                // console.log('SIDEBAR SUBSCRIBE TO REQUEST SERVICE PUBLISHED REQUESTS ', values)
                // console.log('SIDEBAR SUBSCRIBE TO REQUEST PUBLISHED COUNT OF UNSERVED REQUEST ', this.unservedRequestCount);
            }
        });

        // WHEN THE PAGE IS REFRESHED GETS FROM LOCAL STORAGE IF THE SETTINGS SUBMENU WAS OPENED OR CLOSED
        // this.SETTINGS_SUBMENU_WAS_OPEN = localStorage.getItem('show_settings_submenu')
        // console.log('LOCAL STORAGE VALU OF KEY show_settings_submenu', localStorage.getItem('show_settings_submenu'))
        // this.SHOW_SETTINGS_SUBMENU = this.SETTINGS_SUBMENU_WAS_OPEN
        // console.log('ON INIT - SHOW SETTINGS SUBMENU ', this.SHOW_SETTINGS_SUBMENU)
        // if (localStorage.getItem('show_settings_submenu') === 'true') {
        //     this.trasform = 'rotate(180deg)';
        // } else {
        //     this.trasform = 'none';
        // }
    }

    ngAfterViewInit() {
        //     this.SETTINGS_SUBMENU_WAS_OPEN = localStorage.getItem('show_settings_submenu')
        //     console.log('LOCAL STORAGE VALUE OF KEY show_settings_submenu: ', localStorage.getItem('show_settings_submenu'))

        //     if (this.SETTINGS_SUBMENU_WAS_OPEN === 'true') {
        //         console.log(' XXXXX ', this.SETTINGS_SUBMENU_WAS_OPEN)
        //         this.trasform = 'rotate(180deg)';

        //     } else {
        //         this.trasform = 'none';
        //         console.log(' XXXXX ', this.SETTINGS_SUBMENU_WAS_OPEN)
        //     }

    }
    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };

    has_clicked_settings(SHOW_SETTINGS_SUBMENU: boolean) {
        this.SHOW_SETTINGS_SUBMENU = SHOW_SETTINGS_SUBMENU;
        console.log('HAS CLICKED SETTINGS - SHOW_SETTINGS_SUBMENU ', this.SHOW_SETTINGS_SUBMENU);

        // SAVE IN 'show_settings_submenu' KEY OF LOCAL STORAGE THE VALUE OF this.SHOW_SETTINGS_SUBMENU
        // (IS USED TO DISPLAY / HIDE THE SUBMENU WHEN THE PAGE IS REFRESHED)
        localStorage.setItem('show_settings_submenu', `${this.SHOW_SETTINGS_SUBMENU}`);

        if (this.SHOW_SETTINGS_SUBMENU === true) {
            this.trasform = 'rotate(180deg)';
        } else {
            this.trasform = 'none';
        }
    }

    // NO MORE USED
    // setActiveClassToSettings() {
    //     this.isActive = 'active';
    //     console.log('HAS CLICKED SET ACTIVE TO SETTINGS MENU ITEM ', this.isActive);
    // }

    availale_unavailable_status(hasClickedChangeStatus: boolean) {
        hasClickedChangeStatus = hasClickedChangeStatus;
        if (hasClickedChangeStatus) {
            //   this.display = 'block';

            this.IS_UNAVAILABLE = hasClickedChangeStatus
            console.log('HAS CLICKED CHANGE STATUS - IS_UNAVAILABLE ? ', this.IS_UNAVAILABLE);
        }

        if (!hasClickedChangeStatus) {
            //   this.display = 'none';
            console.log('HAS CLICKED CHANGE STATUS ', hasClickedChangeStatus);
            this.IS_UNAVAILABLE = hasClickedChangeStatus
            console.log('HAS CLICKED CHANGE STATUS - IS_UNAVAILABLE ? ', this.IS_UNAVAILABLE);
        }


    }
}