import { Injectable, OnDestroy } from '@angular/core';

export interface Menu {
  path?: string;
  title?: string;
  icon?: string;
  type?: string;
  badgeType?: string;
  badgeValue?: string;
  active?: boolean;
  bookmark?: boolean;
  role?: string;
  roles?: string[];
  children?: Menu[];
}

@Injectable({
  providedIn: 'root'
})
export class NavService{

  constructor() {

   }

  MENUITEMS: Menu[] = [
    {
      title: 'Inicio',
      icon: 'dashboard',
      type: 'link',
      path: '/index',
      roles: ['user', 'admin'],
    }
  ]

}
