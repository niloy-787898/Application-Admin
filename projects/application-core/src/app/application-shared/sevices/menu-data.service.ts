import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MenuDataService {
  menuData: any[] = [
    {
      id: 'c31474fe-562c-4bba-a003-1834a3da1bb1',
      label: 'Main',
      isActive: true,
      url: null,
      children: [
        {
          id: '84307741-c7d0-4921-b79a-aeac06c6d89c',
          parentId: 'c31474fe-562c-4bba-a003-1834a3da1bb1',
          label: 'Dashboard',
          icon: 'fa-solid fa-house',
          url: '/dashboard',
          isActive: true,
          children: [],
        },
        {
          id: 'b35176be-3025-4d94-a85b-9788f20a99c5',
          label: 'Items',
          icon: 'fa-solid fa-cart-shopping',
          url: '/item',
          isActive: true,
          children: [],
        },
      ],
    },
    {
      id: 'acb8cc94-9777-4f27-9a25-ddc456b563fc',
      label: 'Sales',
      url: null,
      children: [
        {
          id: '6094e1a9-6296-4afa-a346-6a2f940f8943',
          parentId: 'acb8cc94-9777-4f27-9a25-ddc456b563fc',
          icon: 'fa-solid fa-store',
          label: 'Invoice ',
          url:null,
          children: [
            {
              id: '5d99e3d1-6656-480b-a709-dade71af22ed',
              parentId: '6094e1a9-6296-4afa-a346-6a2f940f8943',
              icon: 'fa-solid fa-store',
              label: 'menu',
              url: '/sales/invoice',
            },
            {
              id: 'b862b75a-6e74-11ee-b962-0242ac120002',
              parentId: '6094e1a9-6296-4afa-a346-6a2f940f8943',
              icon: 'fa-solid fa-store',
              label: 'penu',
              url: '/sales/invoice',
            },
          ],
        },
        {
          icon: 'fa-solid fa-shop',
          label: 'Recurring Invoice',
          url: '/sales/recurring-invoice',
        },
        {
          icon: 'fa-solid fa-store',
          label: 'Credit Notes',
          url: '/sales/credit-notes',
          children: [
            {
              id: '5d99e3d1-6656-480b-a709-dade71af22ed',
              parentId: '6094e1a9-6296-4afa-a346-6a2f940f8943',
              icon: 'fa-solid fa-store',
              label: 'menu',
              url: '/sales/invoice',
            },
            {
              id: 'b862b75a-6e74-11ee-b962-0242ac120002',
              parentId: '6094e1a9-6296-4afa-a346-6a2f940f8943',
              icon: 'fa-solid fa-store',
              label: 'penu',
              url: '/sales/invoice',
            },
          ],
        },
        {
          icon: 'fa-solid fa-shop',
          label: 'Customers',
          url: '/sales/customers',
        },
      ],
    },
    {
      label: 'Purchases',
      url: '/purchases',
      children: [
        {
          icon: 'fa-solid fa-shop',
          label: 'Purchase Order',
          url: '/purchases/purchases-order',
        },
        {
          icon: 'fa-solid fa-shop',
          label: 'Purchase Invoice',
          url: '/purchases/purchases-invoice',
        },
        {
          icon: 'fa-solid fa-shop',
          label: 'Credit Notes',
          url: '/purchases/credit-notes',
        },
        {
          icon: 'fa-solid fa-shop',
          label: 'Vendors',
          url: '/purchases/vendors',
        },
      ],
    },
    {
      label: 'Accounting',
      icon: 'fas fa-wallet',
      url: '/accounting',
      children: [
        {
          icon: 'fas fa-wallet',
          label: 'Manual Journal',
          url: '/accounting/manual-journal',
          children: [],
        },
        {
          icon: 'fas fa-wallet',
          label: 'Expenses',
          url: '/accounting/expenses',
          children: [],
        },
        {
          icon: 'fas fa-wallet',
          label: 'Bills & Payment ',
          url: '/accounting/bills-payment',
          children: [],
        },
      ],
    },
    {
      label: 'Setting',
      icon: 'fa-solid fa-gear',
      url: '/setting',
      children: [
        {
          label: 'Setting',
          icon: 'fa-solid fa-gear',
          url: '/setting',
          children: [],
        },
      ],
    },
  ];

  constructor() {}

  getMenuData() {
    return this.menuData;
  }
}
