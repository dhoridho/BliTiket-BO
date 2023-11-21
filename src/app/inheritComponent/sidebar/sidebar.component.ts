import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { NavigationModel } from 'src/app/@core/model/navigation.model';
import { MenuService } from 'src/app/services/user-management/menu.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  page: 1;
  offset: 10;
  navigation = new NavigationModel();
  navigationData: any;
  child: any;
  haveClass = false;
  collapseSidebar = false;
  constructor(
    private menuService: MenuService,
    private eRef: ElementRef
  ) { }

  @HostListener('document:click', ['$event'])
  clickout(event:any) {
    if(!this.eRef.nativeElement.contains(event.target)) {
      if(event?.target?.classList?.contains('icon-close-menu') === false) {
        this.unexpandMenu();
      }
    }
  }

  ngOnInit(): void {
    this.getSidebar();
  }

  getSidebar = () => {
    this.menuService.getMenu(this.page, this.offset).subscribe(
      resp => {
        this.navigationData = resp.data;
      },
      () => {
      }
    );
  }

  unexpandMenu() {
    const html: any = document.querySelector('html');
    if(html) {
      html?.classList?.add('layout-transitioning');
      html?.classList?.remove('layout-menu-expanded');
      setInterval(() => {
        html?.classList?.remove('layout-transitioning');
      }, 1000);
    }
  }

  dropDownCLick = (id: any) => {
    console.log(id)
    if (document.getElementById(`menu-${id}`)?.classList.contains('open')){
      document.getElementById(`menu-${id}`)?.classList.remove('open');
    }else{
      document.getElementById(`menu-${id}`)?.classList.add('open');
    }
  }
}
