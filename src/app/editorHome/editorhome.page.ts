import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { DeckDescriptorDTO } from './../shared/DTO/deckDescriptorDTO';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "../shared/header/header.component";
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { SaveService } from '../services/save.service';
import { UserComponent } from '../shared/user/user.component';
import { actionSheetController } from '@ionic/core';

@Component({
  selector: 'app-editorhome',
  templateUrl: './editorhome.page.html',
  styleUrls: ['./editorhome.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, UserComponent, HeaderComponent]
})
export class EditorHomePage implements OnInit {
  descriptors: DeckDescriptorDTO[] = Array<DeckDescriptorDTO>();

  constructor(private router: Router, private saveService: SaveService) {
  }

  ngOnInit() {
    this.saveService.getDescriptorsList().subscribe(value => this.descriptors = value)
  }


  newDeck() {
    this.router.navigateByUrl('/editor/new');
  }

  loadDeck(dto: DeckDescriptorDTO) {
    this.router.navigateByUrl('/editor/' + dto.id);
  }



  async contextOwn(event: any, dto: DeckDescriptorDTO) {
    event.preventDefault();
    event.stopPropagation();
    actionSheetController.create({
      header: dto.title,
      buttons: [
        { text: 'Share', icon: 'share-social', handler: () => this.shareDeck(dto) },
        { text: 'Delete', role: 'destructive', icon: 'trash', handler: () => this.saveService.deleteDescriptor(dto) },
        { text: 'Cancel', role: 'cancel' },
      ],
    }).then((as) => {
      as.present();
    });
  }

  shareDeck(dto: DeckDescriptorDTO) {

  }



}
