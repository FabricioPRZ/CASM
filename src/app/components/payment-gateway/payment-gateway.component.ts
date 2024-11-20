import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-payment-gateway',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './payment-gateway.component.html',
  styleUrl: './payment-gateway.component.scss'
})
export class PaymentGatewayComponent {
  paymentForm: FormGroup;
  isPremium: boolean = false;

  constructor(private fb: FormBuilder) {
    this.paymentForm = this.fb.group({
      cardName: ['', [Validators.required]],
      cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
      expiryDate: ['', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])\/([0-9]{2})$')]],
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3,4}$')]],
    });
  }

  onSubmit() {
    if (this.paymentForm.valid) {
      this.isPremium = true;
      console.log('Usuario convertido a premium');
      alert('¡Felicidades! Ahora eres usuario Premium.');
    } else {
      alert('Por favor, completa el formulario correctamente.');
    }
  }
}