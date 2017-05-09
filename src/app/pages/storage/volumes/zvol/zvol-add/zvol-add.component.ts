import { ApplicationRef, Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup, } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { DynamicFormControlModel, DynamicFormService, DynamicCheckboxModel, DynamicInputModel, DynamicSelectModel, DynamicRadioGroupModel } from '@ng2-dynamic-forms/core';
import { GlobalState } from '../../../../global.state';
import { RestService, WebSocketService } from '../../../../../services/';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-zvol-add',
  template: `<entity-add [conf]="this"></entity-add>`
})
export class ZvolAddComponent {

  protected pk: any;
  protected path: string;
  private sub: Subscription;
  protected route_success: string[] = ['storage', 'volumes'];
  get resource_name(): string {
    return 'storage/volume/' + this.pk + '/zvols';
  }

  protected formModel: DynamicFormControlModel[] = [
    new DynamicInputModel({
      id: 'name',
      label: 'zvol name:',
    }),
    new DynamicInputModel({
      id: 'volsize',
      label: 'Size for this zvol:',
    }),
    new DynamicCheckboxModel({
      id: 'sparse',
      label: 'Sparse Volume:',
    }),
  ];

  constructor(protected router: Router, protected aroute: ActivatedRoute, protected rest: RestService, protected ws: WebSocketService, protected formService: DynamicFormService) {

  }

  clean_name(value) {
    let start = this.path.split('/').splice(1).join('/');
    if(start != '') {
      return start + '/' + value;
    } else {
      return value;
    }
  }

  afterInit(entityAdd: any) {
    this.sub = this.aroute.params.subscribe(params => {
      this.pk = params['pk'];
      this.path = params['path'];
    });
    // this.rest.get(this.resource_name, {limit: 0, bsdgrp_builtin: false}).subscribe((res) => {
    //   let gid = 999;
    //   res.data.forEach((item, i) => {
    //     if(item.bsdgrp_gid > gid) gid = item.bsdgrp_gid;
    //   });
    //   gid += 1;
    //   entityAdd.formGroup.controls['bsdgrp_gid'].setValue(gid);
    // });
  }

}
