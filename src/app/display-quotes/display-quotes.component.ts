import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Quote } from '../Quote';
import { QuotesService } from '../quotes.service';

@Component({
  selector: 'app-display-quotes',
  templateUrl: './display-quotes.component.html',
  styleUrl: './display-quotes.component.css'
})
export class DisplayQuotesComponent implements OnChanges {

  @Input() fetchCategories: boolean = false;

  showQuote = false;

  quotesCategories: string[] = [];

  selectedCategory: string = "";

  quoteToDisplay: Quote = new Quote("", "", "");

  constructor(private quotesService: QuotesService) { }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      let chng = changes[propName];
      let cur = chng.currentValue;
      if (cur === true) {
        this.fetchQuotesCategories();
      }
    }
  }

  fetchQuotesCategories(): void {
    this.quotesService.fetchQuotesCategories().subscribe(quotesCategories => this.quotesCategories = quotesCategories);
  }

  fetchQuoteForCategory(): void {
    this.quotesService.fetchQuoteForCategory(this.selectedCategory).subscribe(quote => {
      this.quoteToDisplay = quote;
      this.showQuote = true;
    });
  }

}
