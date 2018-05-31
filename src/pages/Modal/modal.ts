import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { NavParams, ViewController, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'modal.html'
})
export class Profile {
  newKomit: any;
  newAmt: any;
  storedData: string[];
  storedAmt: string[];
  storedBaki: string[];
  amtValid: boolean;

  constructor(params: NavParams, private storage: Storage, public viewCtrl: ViewController, private alertCtrl: AlertController) {
    storage.get('baki').then((baki) => {
      if (baki == null)
        this.storedBaki = params.get('sGaji');
      else
        this.storedBaki = baki;
    });
    storage.get('komitmen').then((komit) => {
      if (komit != null)
        this.storedData = komit;
      else
        this.storedData = [];
    });
    storage.get('jumlah').then((jumlah) => {
      if (jumlah != null)
        this.storedAmt = jumlah;
      else
        this.storedAmt = [];
    });
  }

  storeData() {

    this.amountInputValid(this.newAmt);

    if (this.amtValid) {
      let alert = this.alertCtrl.create({
        title: '',
        subTitle: 'Sila Masukkan Nombor Sahaja Di Medan Jumlah.',
        buttons: ['Dismiss']
      });
      alert.present();
      return;
    }

    let data = this.newKomit;
    let amt = this.newAmt;
    let baki = '0.00';
    let amtLen = amt.length

    if (amtLen >= 4 || amtLen >= '4') {
      let i = amtLen - 3;
      amt = amt.substring(0, i) + ',' + amt.substring(i) + '.00';
    }

    this.storedData.push(data);
    this.storedAmt.push(amt);

    this.storage.set('komitmen', this.storedData);
    this.storage.set('jumlah', this.storedAmt);

    this.viewCtrl.dismiss([data, amt, baki]);
  }

  amountInputValid(val) {
    val = parseInt(val);
    this.amtValid = Number.isNaN(val);
  }

}
