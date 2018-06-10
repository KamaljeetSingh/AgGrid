import { Component, ElementRef } from '@angular/core';
import {GridOptions} from 'ag-grid/main';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private gridOptions: GridOptions;
  private rowData: any[];
  private columnDefs: any[];
  private defaultColDef: any;
  private columnTypes: any;
  private components: any;
  private getNodeChildDetails;

  constructor(private el: ElementRef){
    this.gridOptions = <GridOptions>{
      onGridReady: () => {
        this.gridOptions.api.sizeColumnsToFit();
        
      },
      onCellValueChanged: (cellObj) => {
        console.log(cellObj);
        console.log(`Changed`);
      }
      
    }
    this.columnDefs = [
        {headerName: 'Make', field: 'make', rowDrag: true, width: 60, cellRenderer: "agGroupCellRenderer"},
        {headerName: 'Model', field: 'model', suppressFilter: true},
        {headerName: 'Price', field: 'price', type: 'numericColumn'},
        {headerName: 'Date', field: 'date', type: 'dateColumn', cellEditor: 'datePicker'},
        {headerName: 'Favorite', field: 'fav', editable: false, cellRenderer: 'makeCheckBox'},  
        {headerName: 'Misc', field: 'misc', editable: false, cellRenderer: 'makeRadioBox'}
    ];

    this.rowData = [
      {make: "Toyota", model: "Celica", price: 35000, date:'12/08/1995', fav: true, misc: true},
      {make: "Ford", model: "Mondeo", price: 32000, date:'12/08/1995', fav: false, misc: false},
      {make: "Porsche", model: "Boxter", price: 72000, date:'12/08/1995', fav: false, misc: true},
      {make: "Honda", model: "Boxter", price: 72000, date:'12/08/1995', fav: false, misc: true,
      participants: [{
        make: "Porsche", model: "Boxter", price: 72000, date:'12/08/1995', fav: false, misc: true,
        participants: [{
          make: "Porsche", model: "Boxter", price: 72000, date:'12/08/1995', fav: false, misc: true,
        }]},
      {
        make: "Porsche", model: "Boxter", price: 72000, date:'12/08/1995', fav: false, misc: true
      }
      ]}
    ];

    this.defaultColDef = {
      editable: true,
      filter: 'agTextColumnFilter'
    };

    this.columnTypes = {
      numberColumn: {
        width: 100,
        filter: 'agNumberColumnFilter'
      },
      dateColumn:{
        filter: 'agDateColumnFilter',        
      }
    }
    this.components = { datePicker: getDatePicker(),
                        makeCheckBox: makeCheckBox(),
                        makeRadioBox: makeRadioBox(),
                      };
    this.getNodeChildDetails = function getNodeChildDetails(rowItem) {
      console.log(rowItem);
      if (rowItem.participants == null) {
       return null;
      } else {
        return {
          group: true,
          expanded: rowItem.make == 'Honda',
          children: rowItem.participants,
          key: rowItem.make
        };
      }
    };
  }

  
}


//Custom Rendering Functions
function makeCheckBox(){
  function checkBox(param){
    let chkbx = document.createElement('input');
    chkbx.type = 'checkbox';
    chkbx.checked = param.value;

    chkbx.addEventListener('change', function(){
      console.log('changed checkbox');
    })
    return chkbx;
  }
  return checkBox;
}

function makeRadioBox(){
  function radioBox(param){
    console.log(param); //to store indexes 
    let radio = document.createElement('input');
    radio.type = 'radio';
    radio.checked = param.value;

    radio.addEventListener('change', function(){
      console.log('changed radio');
    })
    return radio;
  }
  return radioBox;
}

function getDatePicker() {
  function Datepicker() {}
  Datepicker.prototype.init = function(params) {
    this.eInput = document.createElement("input");
    this.eInput.value = params.value;
    $(this.eInput).datepicker({ dateFormat: "dd/mm/yy" });
  };
  Datepicker.prototype.getGui = function() {
    return this.eInput;
  };
  Datepicker.prototype.afterGuiAttached = function() {
    this.eInput.focus();
    this.eInput.select();
  };
  Datepicker.prototype.getValue = function() {
    return this.eInput.value;
  };
  Datepicker.prototype.destroy = function() {};
  Datepicker.prototype.isPopup = function() {
    return false;
  };
  return Datepicker;
}
