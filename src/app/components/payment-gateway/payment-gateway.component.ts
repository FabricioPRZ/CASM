import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './payment-gateway.component.html',
  styleUrls: ['./payment-gateway.component.scss'],
})
export class PaymentComponent implements OnInit {
  paymentForm!: FormGroup;
  isPremium: boolean = false;

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.paymentForm = this.fb.group({
      cardName: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      expiryDate: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/([0-9]{2})$/)]],  // Valida formato MM/YY
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]],
    });
  }

  onSubmit(): void {
    if (this.paymentForm.valid) {
      this.userService.updatePremiumStatus().subscribe(
        (user) => {
          this.isPremium = true;
        },
      );
    }
  }
}
