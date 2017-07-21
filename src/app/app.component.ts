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


    // this.loadReportData(moment().subtract(6, 'days').startOf('day'),
    //   moment().endOf('day'),
    //   10);

    this.viewer.report = this.report;

    // this.viewer.onInteraction = function (e) {
    //   self.loadReportData(moment(e.variables.StartDateTime),
    //     moment(e.variables.EndDateTime),
    //     e.variables.MaxVisits);

    // };




  }

}
