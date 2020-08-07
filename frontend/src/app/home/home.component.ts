import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  myData =  [
    ["Apples", 3, 2, 2.5],
    ["Oranges",2, 3, 2.5],
    ["Pears", 1, 5, 3],
    ["Bananas", 3, 9, 6],
    ["Plums", 4, 2, 3]
  ];
  myOptions = {
    title : 'Monthly Coffee Production by Country',
    vAxis: {title: 'Cups'},
    hAxis: {title: 'Month'},
    seriesType: 'bars',
    series: {2: {type: 'line'}}        };

  title = 'Fruits distribution';
  type = 'ComboChart';
  data = [
    ["Apples", 3, 2, 2.5],
    ["Oranges",2, 3, 2.5],
    ["Pears", 1, 5, 3],
    ["Bananas", 3, 9, 6],
    ["Plums", 4, 2, 3]
  ];
  columnNames = ['Fruits', 'Jane','Jone','Average'];
  options = {
    hAxis: {
      title: 'Person'
    },
    vAxis:{
      title: 'Fruits'
    },
    seriesType: 'bars',
    series: {2: {type: 'line'}},
    chartArea: {
      backgroundColor: {
        'fill': '#000000',
        'opacity': 0.1
      },
    }
  };
  width = 550;
  height = 400;
  constructor() { }

  ngOnInit() {
  }

}
