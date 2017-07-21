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

		this.loadReport();
		this.viewer.renderHtml('viewer');
	}

	ngOnInit() {

	}

	loadReport(): void {

		let self = this;
		this.report.loadFile('/assets/reports/testreport.mrt');
		//self.report.dictionary.variables.getByName("ReportTitleLabel").valueObject = this.l("VisitExceptionsReport");

		this.viewer.onInteraction = function(e)
        {
           self.loadReportData(e.variables.IntegerInput);

        };

		this.viewer.report = this.report;


		this.loadReportData(10); // default load
		// this.viewer.onInteraction = function (e) {
		//   self.loadReportData(moment(e.variables.StartDateTime),
		//     moment(e.variables.EndDateTime),
		//     e.variables.MaxVisits);

		// };




	}

	loadReportData(integerInput) {
		console.log('loading report (integerInput=' + integerInput + ')')
		let self = this;
		self.report.dictionary.databases.clear();

		self.report.dictionary.variables.getByName("IntegerInput").valueObject = integerInput;

		// get data (simulate taking seconds)

		console.log('start loading data');
		setTimeout(function () {
			console.log('end loading data');
			var jsonArray = [];

			for (var i = 0; i < integerInput; i++) {
				jsonArray.push(
					{
						userId: i+1,
						title: "test user " + i+1
					}
				);
			}

			self.bindData(jsonArray);

		}, 5000);

	}

	bindData(jsonArray) {
		console.log('binding data');
		this.dataSet = new Stimulsoft.System.Data.DataSet("test123");
		this.dataSet.readJson(JSON.stringify(jsonArray));
		this.report.regData("test123", "test123", this.dataSet);
		this.viewer.renderHtml('viewer');
		this.report.render(); //whole report refreshes here instead of just showing data
	}


}
