import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {ActiveRouteService} from '../../../../services/active-route.service';
import {FormChild} from '../../../../models/form-child';

@Component({
  selector: '[form-promotion]',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.css']
})
export class PromotionComponent extends FormChild implements OnInit {

  titreProfessionnelId = new FormControl(0, Validators.required);
  villeId = new FormControl(0, Validators.required);
  dateDebut = new FormControl('', Validators.required);
  dateFin = new FormControl('', Validators.required);

  constructor(private fb: FormBuilder, private routeService: ActiveRouteService) {
    super();
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      id : this.id,
      version : this.version,
      titreProfessionnelId : this.titreProfessionnelId,
      villeId: this.villeId,
      dateDebut : this.dateDebut,
      dateFin : this.dateFin
    });
    if (this.object.selected) {
      this.form.setValue(this.object.selected);
    } else {
      const params = this.routeService.params;
      const titreId = params.get('titreId');
      const villeId = this.routeService.params.get('villeId');
      if (!isNaN(+villeId)) {
        this.villeId.setValue(+villeId);
      }
      if (!isNaN(+titreId)) {
        this.titreProfessionnelId.setValue(+titreId);
      }
      console.log(this.form.value);
    }
  }

}
