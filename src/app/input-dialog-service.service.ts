import { Injectable } from '@angular/core';
import {AlertController} from '@ionic/angular';
import { GroceriesServiceService } from './groceries-service.service';
@Injectable({
  providedIn: 'root'
})
export class InputDialogServiceService {

  constructor(public alertController: AlertController, public dataService: GroceriesServiceService) { }

  async showPrompt(item?, index?) {
    const prompt= await this.alertController.create({
      cssClass: 'my-custom-class',
      header: item ? 'Edit Item': 'Add item',
      message: item ? "Please edit item": "Please add item",
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Name',
          value: item ? item.name : null
        },
        {
          name: 'quantity',
          type: 'number',
          placeholder: 'Quantity',
          value: item ? item.quantity : null
        },
        {
          name: 'price',
          type: 'number',
          placeholder: 'Price',
          value: item ? item.price : null
        },
      ],
      buttons: [
        {
          text: 'cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'save',
          handler: item => {
            console.log('Saved clicked', item);
            if (index !== undefined) {
              this.dataService.editItem(item, index);
            }
            else {
              this.dataService.addItem(item);
            }
          }
        }
      ]
    });
    await prompt.present();
  }
}