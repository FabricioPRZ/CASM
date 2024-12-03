import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DirectoryService } from '../../services/directory.service';
import { VoluntaryUser } from '../../models/VoluntaryUser';
import { CommonModule } from '@angular/common';
import { DirectoryCardComponent } from '../../components/directory-card/directory-card.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterMenuComponent } from '../../components/footer-menu/footer-menu.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-directory',
  standalone: true,
  imports: [CommonModule, DirectoryCardComponent, SidebarComponent, HeaderComponent, FooterMenuComponent],
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.scss'],
})
export class DirectoryComponent implements OnInit {
  isSidebarVisible: boolean = true;
  isMobileView: boolean = false;
  chats: any[] = [];
  selectedChat: any = null;

  voluntaryUsers: VoluntaryUser[] = [];

  constructor(private router: Router, private directoryService: DirectoryService) {}

  ngOnInit(): void {
    this.checkScreenSize();
    this.loadVoluntaryUsers();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.checkScreenSize();
  }

  loadVoluntaryUsers(): void {
    this.directoryService.getVoluntaryUsers().subscribe({
      next: (users) => {
        this.voluntaryUsers = users;
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al cargar el directorio',
          text: 'Hubo un problema al cargar el directorio. Intenta nuevamente más tarde.',
          confirmButtonText: 'Aceptar',
        });
      },
    });
  }

  onMessageClicked(user: any): void {
    this.openTidioChat(user);
  }

  openTidioChat(user: any) {
    if (window.tidioChatApi) {
      window.tidioChatApi.open();
      window.tidioChatApi.setVisitorName(user.name);
      window.tidioChatApi.setVisitorEmail(user.email);
    }
  }

  checkScreenSize(): void {
    this.isMobileView = window.innerWidth <= 768;
    this.isSidebarVisible = !this.isMobileView;
  }

  redirect_to_favorites(event: Event): void {
    event.preventDefault();
    this.router.navigate(["/favorites"]);
  }

  redirect_to_feed(event: Event): void {
    event.preventDefault();
    this.router.navigate(["/feed"]);
  }

  redirect_to_chat(event: Event): void {
    event.preventDefault();
    this.router.navigate(["/chat"]);
  }

  redirect_to_notes(event: Event): void {
    event.preventDefault();
    this.router.navigate(["/notes"]);
  }
}
