import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguagetransferService {

  constructor() {   }

  private languageData;

  setData(languageData){
    this.languageData = languageData;
  }

  getData(){
    let temp = this.languageData;
    this.clearData();
    return temp;
  }

  clearData(){
    this.languageData = undefined;
  }

}
