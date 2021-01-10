import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-user-detail-modal',
  templateUrl: './user-detail-modal.component.html',
  styleUrls: ['./user-detail-modal.component.css']
})
export class UserDetailModalComponent implements OnInit {
  @ViewChild('exampleModal') myModal: HTMLDivElement;

  constructor() { }

  ngOnInit(): void {
    this.openModal()
  }




  openModal() {
    this.myModal.className = 'modal fade show';
  }
  closeModal() {
    this.myModal.className = 'modal hide';
  }

}
