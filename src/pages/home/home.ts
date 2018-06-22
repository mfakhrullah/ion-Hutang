import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ModalController, NavParams, AlertController } from 'ionic-angular';
import { Modal } from '../Modal/modal';
import { Salary } from '../Modal2/modal';
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
  isChecked = false;
  constructor(public navCtrl: NavController, private storage: Storage, public modalCtrl: ModalController, private alertCtrl: AlertController) {

     // storage.remove('komitmen');
     // storage.remove('gaji');
     // storage.remove('baki');
     // storage.remove('jumlah');

    storage.get('gaji').then((gaji) => {
      if (gaji == null)
        this.viewGaji = "Tambah";
      else
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
        this.viewBaki = "0.00";
      else
        this.viewBaki = baki;
    });
  }

  presentProfileModal() {
    let profileModal = this.modalCtrl.create(Modal, { sGaji: this.viewGaji });
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

  newSalary() {
    let profileModal = this.modalCtrl.create(Salary);
    let i = 0;

    profileModal.onDidDismiss(data => {
      for (let x of data) {
        if (i == 0)
          this.salaryValid(x);

        i++;
      }
    })

    profileModal.present();
  }

  salaryValid(x) {
    this.viewGaji = x + ".00";
    this.storage.set('gaji', this.viewGaji);

    this.viewBaki = this.viewGaji;
    this.storage.set('baki', this.viewGaji);
  }

  updateChecking(value){


  }

}




// set a key/value
//storage.set('name', 'Max');

// Or to get a key/value pair
//storage.get('age').then((val) => {
//  console.log('Your age is', val);
//});
