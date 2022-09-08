import {Component, OnInit} from '@angular/core';
import {FormChild} from '../../../../models/form-child';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {ActiveRouteService} from '../../../../services/active-route.service';

@Component({
  selector: '[form-competence]',
  templateUrl: './competence.component.html',
  styleUrls: ['./competence.component.css']
})
export class CompetenceComponent extends FormChild implements OnInit {

  blocCompetencesId = new FormControl(0, Validators.required);
  titre = new FormControl('', Validators.required);
  description = new FormControl('', Validators.required);

  constructor(private fb: FormBuilder, private routeService: ActiveRouteService) {
    super();
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      id : this.id,
      version : this.version,
      blocCompetencesId : this.blocCompetencesId,
      titre : this.titre,
      description : this.description
    });
    if (this.object.selected) {
      this.form.setValue(this.object.selected);
    } else {
      const blocCompetencesId = this.routeService.params.get('blocCompetencesId');
      if (!isNaN(+blocCompetencesId)) {
        this.blocCompetencesId.setValue(+blocCompetencesId);
      }
    }
  }

}
