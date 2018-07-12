import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { NavParams, ViewController, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'modal.html'
})
export class Modal {
  dataArray = [];
  newKomit: any;
  newAmt: any;
  storedData: string[];
  storedAmt: string[];
  storedBaki: any;
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
    storage.get('dataObject').then((object) => {
      if (object != null)
        this.dataArray = object;
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
    let sBaki = this.storedBaki;
    let amtLen = amt.length;

    // calculate Baki
    sBaki = sBaki.replace(/,/g, "");
    sBaki = sBaki.replace(".", "");
    sBaki = sBaki / 100 - amt;
    sBaki = sBaki.toString();

    let bakiLen = sBaki.length;
    let x = sBaki.length - 3;
    let i = amtLen - 3;

    if (amtLen >= 4 || amtLen >= '4')
      amt = amt.substring(0, i) + ',' + amt.substring(i) + '.00';
    else
      amt = amt + '.00';

    if (bakiLen >= 4 || bakiLen >= '4')
      sBaki = sBaki.substring(0, x) + ',' + sBaki.substring(x) + '.00';
    else
      sBaki = sBaki + '.00';

    this.storedData.push(data);
    this.storedAmt.push(amt);
    this.dataArray.push({ data: data, checked: false });

    this.storage.set('komitmen', this.storedData);
    this.storage.set('jumlah', this.storedAmt);
    this.storage.set('baki', sBaki);
    this.storage.set('dataObject', this.dataArray);

    this.viewCtrl.dismiss([amt, sBaki]);
    //dismiss(newAmount,newBaki);
  }

  amountInputValid(val) {
    val = parseInt(val);
    this.amtValid = Number.isNaN(val);
  }

}
