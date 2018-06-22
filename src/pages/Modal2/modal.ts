import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { NavParams, ViewController, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'modal.html'
})
export class Salary {
  newSalary: any;
  newEpf: any;
  amtValid: boolean;
  amtValid2: boolean;

  constructor(params: NavParams, private storage: Storage, public viewCtrl: ViewController, private alertCtrl: AlertController) {

  }

  storeSalary() {

    this.amountInputValid(this.newSalary, this.newEpf);

    if (this.amtValid || this.amtValid2) {
      let alert = this.alertCtrl.create({
        title: '',
        subTitle: 'Sila Masukkan Nombor Sahaja.',
        buttons: ['Dismiss']
      });
      alert.present();
      return;
    }

    let gaji = this.newSalary;
    let epf = this.newEpf;

    this.viewCtrl.dismiss([gaji, epf]);

  }

  amountInputValid(val, val2) {
    val = parseInt(val);
    this.amtValid = Number.isNaN(val);

    val2 = parseInt(val2);
    this.amtValid2 = Number.isNaN(val2);
  }


}
