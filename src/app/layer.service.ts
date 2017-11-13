import { Injectable } from "@angular/core";
import { NgLayer, NgLayerRef, NgLayerComponent } from "angular2-layer";

@Injectable()

export class LayerService{
  constructor(
    private ly:NgLayer,
    private lyRef:NgLayerRef
  ){}

  config:any = {
    inSelector:"bounceIn",
    outSelector:"fadeOutDown",
    align:"center",
    message:"",
    parent: this,
    closeAble: false
  }

  dialog(){
      return this.ly.dialog(this.config);
  }

  alert(){
      return this.ly.alert(this.config);
  }

  confirm(){
      return this.ly.confirm(this.config);
  }

  loading(){
      let tip = this.ly.loading(this.config);
      return tip;
      //setTimeout(()=>{tip.close();}, 2000)
  }

  tip(){
      return this.ly.tip(this.config);
  }

  close(){
      this.lyRef.close();
  }
}