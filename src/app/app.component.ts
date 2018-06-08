import { Component } from '@angular/core';
import {GridOptions} from 'ag-grid/main';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private gridOptions: GridOptions;
  public rowData: any[];
  public columnDefs: any[];
  public defaultColDef: any;
  public columnTypes: any;
  public components: any;

  constructor(){
    this.gridOptions = <GridOptions>{
      onGridReady: () => {
        this.gridOptions.api.sizeColumnsToFit();
      },
      onCellValueChanged: () => {
        console.log(`Changed`);
      }
    }
    this.columnDefs = [
        {headerName: 'Make', field: 'make', rowDrag: true},
        {headerName: 'Model', field: 'model'},
        {headerName: 'Price', field: 'price', type: 'numericColumn'},
        {headerName: 'Date', field: 'date', type: 'dateColumn', cellEditor: 'datePicker'},
        {headerName: 'Favorite', field: 'fav', cellRenderer: 'makeCheckBox', cellEditor: 'checkBox'}  
    ];

    this.rowData = [
      {make: "Toyota", model: "Celica", price: 35000, date:'12-08-1995', fav: 'true'},
      {make: "Ford", model: "Mondeo", price: 32000, date:'12-08-1995', fav: 'false'},
      {make: "Porsche", model: "Boxter", price: 72000, date:'12-08-1995', fav: 'false'}
    ];

    this.defaultColDef = {
      editable: true,
      filter: 'agTextColumnFilter'
    };

    this.columnTypes = {
      numberColumn: {
        width: 50,
        filter: 'agNumberColumnFilter'
      },
      dateColumn:{
        filter: 'agDateColumnFilter',        
      }
    }
    this.components = { datePicker: getDatePicker(),
                        makeCheckBox: makeCheckBox(),
                        checkBox: checkBox()};
  }
  
}

function makeCheckBox(){
  return (param) => `<input type='checkbox' ${param.value=='true' ? 'checked': ''}/>`;
}

function checkBox(){
  return () => `<input type='checkbox'/>`;
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
