import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('inputField') inputField!: ElementRef;
  alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
  nextLetter: string = this.alphabet[Math.floor(Math.random() * this.alphabet.length)];
  userInput: string = '';
  userInputColor: 'black' | 'green' | 'red' = 'black';
  wordChain: string[] = [];

  ngAfterViewInit(): void {
    this.inputField.nativeElement.focus();
  }

  onInput(event: Event): void {
    const htmlElement = event.target as HTMLInputElement;
    this.userInput = htmlElement.value.toUpperCase();
  }

  onSubmit(): void {
    this.validateWord() ? this.handleSuccess() : this.handleMistake();
  }

  handleSuccess(): void {
    this.userInputColor = 'green';
    setTimeout(() => {
      this.wordChain.push(this.userInput);
      this.updateNextLetter();
    }, 250);
  }

  handleMistake(): void {
    this.userInputColor = 'red';
    setTimeout(() => {
      this.userInput = '';
      this.userInputColor = 'black';
    }, 500);
  }

  validateWord(): boolean {
    return this.userInput[0] === this.nextLetter;
  }

  updateNextLetter(): void {
    this.nextLetter = this.userInput[this.userInput.length - 1];
    this.userInput = '';
    this.userInputColor = 'black';
  }
}
