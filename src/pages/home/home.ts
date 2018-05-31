import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ModalController, NavParams } from 'ionic-angular';
import { Profile } from '../Modal/modal';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  pushKomit: string[];
  pushAmt: string[];
  viewBaki: string;
  viewGaji: string;

  constructor(public navCtrl: NavController, private storage: Storage, public modalCtrl: ModalController) {

    // storage.remove('komitmen');
    // storage.remove('jumlah');
    // this.storage.set('gaji', '2,900.00');

    storage.get('gaji').then((gaji) => {
      this.viewGaji = gaji;
    });
    storage.get('komitmen').then((komit) => {
      if (komit == null)
        this.pushKomit = [];
      else
        this.pushKomit = komit;
    });
    storage.get('jumlah').then((jumlah) => {
      if (jumlah == null)
        this.pushAmt = [];
      else
        this.pushAmt = jumlah;
    });
    storage.get('baki').then((baki) => {
      if (baki == null)
        this.viewBaki = this.viewGaji;
      else
        this.viewBaki = baki;
    });
  }

  presentProfileModal() {
    let profileModal = this.modalCtrl.create(Profile, { sGaji: this.viewGaji });
    let i = 0;

    profileModal.onDidDismiss(data => {
      for (let x of data) {
        if (i == 0)
          this.pushKomit.push(x);
        else if (i == 1)
          this.pushAmt.push(x);
        else
          this.viewBaki = x;

        i++;
      }
    })

    profileModal.present();
  }

}




// set a key/value
//storage.set('name', 'Max');

// Or to get a key/value pair
//storage.get('age').then((val) => {
//  console.log('Your age is', val);
//});
