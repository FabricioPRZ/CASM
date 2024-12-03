import { Component } from '@angular/core';
import { PaymentComponent } from '../../components/payment-gateway/payment-gateway.component';
import { HeaderComponent } from "../../components/header/header.component";

@Component({
  selector: 'app-premium-form',
  standalone: true,
  imports: [PaymentComponent, HeaderComponent],
  templateUrl: './premium-form.component.html',
  styleUrl: './premium-form.component.scss'
})
export class PremiumFormComponent {

}
