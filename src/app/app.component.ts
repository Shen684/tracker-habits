import { Component } from '@angular/core';
import { Habit } from './models/habit';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'tracker';

  public editing = false;
  public editingIndex!: number;
  public addNew = false

  public habitForm = new FormGroup({
    name: new FormControl(''),
    frequency: new FormControl(''),
    description: new FormControl('')
  }) // добавляем новую привычку через formControl в html

  public habits: Habit[] = [
    <Habit>{
      name: 'Пройтись 15 минут пешком',
      frequency: 'Ежедневно',
      description: 'Эта привычка улучшает мое здоровье и настроение',
    },
  ]

  public onSubmit() {
    const habit = this.habitForm.value as Habit  

    if (this.editing) {
      this.habits.splice(this.editingIndex, 1, habit)
    } else if (habit.description.length >= 1 && habit.frequency.length >= 1 && habit.name.length >= 1 ) {
      this.habits.push(habit)
    } // редактирование допустимой длинны ввода в инпут для создания привычки

    this.addNew = false;
    this.editing = false;
    this.exitForm()
    
  }
  
  public setEditForm(habit: Habit, index: number) {
    this.habitForm.patchValue({
      name: habit.name,
      frequency: habit.frequency,
      description: habit.description
    }) // patchValue - устанавливает значения напрямую всей группе форм
    this.editing = true
    this.editingIndex = index
  }
  public onDelete(index: number) {
    this.habits.splice(index, 1)
  } // реализация удаления привычки
  
  exitForm() {
    this.addNew = false
    this.editing = false
    this.habitForm.reset()
  } // функция reset сбрасывает все значения введенные ранее в полях
  public onClose() {
    this.addNew = false
    this.habitForm.reset()

  } // кнопка

}
