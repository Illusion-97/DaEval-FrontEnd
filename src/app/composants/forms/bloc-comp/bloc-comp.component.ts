import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {FormChild} from '../../../../models/form-child';
import {ActiveRouteService} from '../../../../services/active-route.service';

@Component({
  selector: '[form-bloc-comp]',
  templateUrl: './bloc-comp.component.html',
  styleUrls: ['./bloc-comp.component.css']
})

export class BlocCompComponent extends FormChild implements OnInit {

  titreProfessionnelId = new FormControl(0, Validators.required);
  titre = new FormControl('', Validators.required);
  description = new FormControl('', Validators.required);

  constructor(private fb: FormBuilder, private routeService: ActiveRouteService) {
    super();
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      id : this.id,
      version : this.version,
      titreProfessionnelId : this.titreProfessionnelId,
      titre : this.titre,
      description : this.description
    });
    if (this.object.selected) {
      this.form.setValue(this.object.selected);
    } else {
      const titreId = this.routeService.params.get('titreProfessionnelId');
      if (!isNaN(+titreId)) {
        this.titreProfessionnelId.setValue(+titreId);
      }
    }
  }

}
