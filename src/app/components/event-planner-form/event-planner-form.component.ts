import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DataService } from '../../services/data/data.service';
import { NgFor, NgIf } from '@angular/common';
import { CustomValidators } from '../../validators/custom-validators';

@Component({
  selector: 'app-event-planner-form',
  imports: [ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './event-planner-form.component.html',
  styleUrl: './event-planner-form.component.css',
})
export class EventPlannerFormComponent implements OnInit {
  eventPlannerForm: FormGroup;

  @Input() editEvent: any = null;
  @Output() submit = new EventEmitter<any>();

  addEventsForm(): FormGroup {
    return this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      eventDate: ['', [Validators.required]],
      location: ['', [Validators.required, Validators.maxLength(40)]],
      guests: this.fb.array(
        (this.editEvent?.guests || []).map((guest: any) =>
          this.fb.control(guest)
        ),
        CustomValidators.minLengthArray(1)
      ),
    });
  }

  constructor(private fb: FormBuilder, private dataService: DataService) {
    this.eventPlannerForm = this.addEventsForm();
  }

  ngOnInit(): void {}

  get guests(): FormArray {
    return this.eventPlannerForm.get('guests') as FormArray;
  }

  guestInput = new FormControl('', Validators.required);

  addguest() {
    if (this.guestInput.valid) {
      this.guests.push(new FormControl(this.guestInput.value));
      this.guestInput.reset();
    }
  }

  removeGuest(index: number) {
    this.guests.removeAt(index);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.eventPlannerForm = this.addEventsForm();

    if (changes['editEvent'] && this.editEvent) {
      this.eventPlannerForm.patchValue(this.editEvent);
    }
  }

  onSubmit() {
    if (this.eventPlannerForm.valid) {
      if (this.editEvent) {
        this.dataService
          .updateEvent(this.editEvent.id, this.eventPlannerForm.value)
          .subscribe((response) => {
            this.submit.emit(response);
          });
      } else {
        this.dataService
          .addEvent(this.eventPlannerForm.value)
          .subscribe((response) => {
            this.submit.emit(response);
          });
      }

      this.eventPlannerForm.reset();
      this.guests.clear();
    }
  }
}
