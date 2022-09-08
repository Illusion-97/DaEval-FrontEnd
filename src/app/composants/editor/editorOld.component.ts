import {Component, Inject, OnInit, Optional} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Select} from '../../../models/Select';
import {LibraryService} from '../../../services/library.service';
import {NgProgress, NgProgressRef} from 'ngx-progressbar';
import {AntiAbuseService} from '../../../services/anti-abuse.service';

@Component({
  selector: 'app-editorOld',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorOldComponent implements OnInit {

  jeu: Select = undefined;

  form = new FormGroup({});
  id = new FormControl(-1, Validators.required);
  title = new FormControl('', Validators.required);
  desc = new FormControl('');
  played = new FormControl(false);
  progressRef: NgProgressRef;

  constructor(public dialogRef: MatDialogRef<EditorOldComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: Select,
              private service: LibraryService, fb: FormBuilder, private progress: NgProgress, public abuseGard: AntiAbuseService) {
    this.form = fb.group(
      {
        id: this.id,
        title: this.title,
        desc: this.desc,
        played: this.played
      }
    );
    this.jeu = data;
  }

  ngOnInit(): void {
    this.progressRef = this.progress.ref('editorBar');
    if (this.jeu) {
      this.form.setValue(this.jeu);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit() {
    if (this.jeu) {
      this.abuseGard.engage(this.jeu.selected.id);
    }
    this.progressRef.start();
    /*this.service.save(this.form.value).subscribe(jeu => {
      this.service.update.emit(jeu);
      this.abuseGard.setFree(jeu.id);
      this.progressRef.complete();
      this.onNoClick();
    });*/
  }

  remove() {
    this.abuseGard.engage(this.jeu.selected.id);
    this.progressRef.start();
    /*this.service.delete(this.jeu.id).subscribe(() => {
      this.service.update.emit(undefined);
      this.abuseGard.setFree(this.jeu.id);
      this.progressRef.complete();
      this.onNoClick();
    });*/
  }
}
