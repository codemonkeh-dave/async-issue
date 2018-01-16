import { Component } from '@angular/core';

declare var Stimulsoft: any;

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'app';

	viewer: any = new Stimulsoft.Viewer.StiViewer(null, 'StiViewer', false);
	report: any = new Stimulsoft.Report.StiReport();
	dataSet: any = new Stimulsoft.System.Data.DataSet("Dataset1");

	ngAfterViewInit() {

		this.viewer.renderHtml('viewer');
		
		//ignore hide spinner
		this.viewer.jsObject.controls.processImage.hide = function(){}; 
		
		this.loadReport();
	}

	ngOnInit() {

	}

	loadReport(): void {

		let self = this;
		this.report.loadFile('/assets/reports/testreport.mrt');

		// bind to parameter input change
		this.viewer.onInteraction = function(e)
        {
            self.loadReportData(e.variables.IntegerInput);
		    
			//ignore hide spinner
			this.jsObject.controls.processImage.hide = function(){};
        };
		
		this.viewer.report = this.report;
		this.loadReportData(10); // default load
	}

	loadReportData(integerInput) {
		console.log('loading report (integerInput=' + integerInput + ')')
		let self = this;
		self.report.dictionary.databases.clear();

		self.report.dictionary.variables.getByName("IntegerInput").valueObject = integerInput;

		// get data (simulate taking 5 seconds)
		console.log('start loading data');
		setTimeout(function () {
			console.log('end loading data');
			var jsonArray = [];

			// create fake data
			for (var i = 0; i < integerInput; i++) {
				jsonArray.push(
					{
						userId: i+1,
						title: "test user " + i+1
					}
				);
			}

			var json = {
				"DataSource":
				[
					{"userId":"test", "title":"123"},
					{"userId":"test2", "title":"456"},
				],
				"DataSource2":
				[
					{"age":"test3"},
					{"age":"test4"},
				]
			};

			self.bindData(json);
			
			//return hide spinner to default
			if (this.viewer.jsObject){
				this.jsObject.controls.processImage.hide = function(){
					this.style.display = "none";				
				};
				this.viewer.jsObject.controls.processImage.hide();
			}
		}, 500);

	}

	bindData(json) {
		console.log('binding data');
		this.dataSet = new Stimulsoft.System.Data.DataSet("test123");
		this.dataSet.readJson(JSON.stringify(json));
		this.report.dictionary.clear();
		this.report.regData("test123", "test123", this.dataSet);
		this.report.dictionary.synchronize();
		this.viewer.renderHtml('viewer');
		this.report.render(); //whole report refreshes here instead of just showing data
	}


}
