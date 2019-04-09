import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/iron-location/iron-location.js';

class GlyconaviCarbLink extends PolymerElement {
  static get template() {
    return html`
<style type="text/css">

.glyconavi_table_01{

}
.glyconavi_table_01 th{
width: 25%;
padding: 6px;
text-align: left;
vertical-align: top;
color: #333;
background-color: #eee;
border: 0.5px solid whitesmoke;
}
.glyconavi_table_01 td{
padding: 6px;
background-color: #fff;
border: 0.5px solid whitesmoke;
}

.glyconavi_table_tfoot tfoot{
border: 0px;
}
.glyconavi_table_tfoot tr{
border: 0px;
}
.glyconavi_table_tfoot td{
border: 0px;
text-align: right;
}
.glyconavi_table_radio td{
	text-align: left;
	width: 200;
}
.glyconavi_table_radio tr{
	text-align: left;
	width: 200;
}


</style>

<iron-location path="{{path}}" hash="{{hash}}" query="{{query}}" dwell-time="{{dwellTime}}"></iron-location>
<iron-ajax auto="" url="https://test.sparqlist.glyconavi.org/api/PDB-wc-carblink?[[query]]" handle-as="json" last-response="{{resultdata}}"></iron-ajax>
<div>
  <table class="glyconavi_table_01">
  <caption>
    <b><a href="http://wwpdb.org/" target="_blank">Protein Data Bank</a></b>
    <small><a href="http://rdf.wwpdb.org/pdb/" target="_blank">RDF</a></small>
    <details>
      <summary>Notes</summary>
      <p>GlyTouCan provides Accession Number for a carbohydrate moiety of a glycan structure. These links may not be a link with a complete chemical structure.</p>
    </details>
  </caption>
  <tr>
    <td class="glyconavi_table_radio" rowspan="5"  width="120" id="radiocontainer" > 
      <label><input type="radio" id="pdbjRadio" value="PDBj" on-click="entryPDBJ" />PDBj</label></br>
      <label><input type="radio" id="pdbeRadio" value="PDBe" on-click="entryPDBE" />PDBe</label></br>
      <label><input type="radio" id="rcsbRadio" value="RCSB" on-click="entryRCSB" />RCSB PDB</label>
    </td>
    <!-- 表示非表示切り替え -->
    <tr>
      <td><a href="http://wwpdb.org/data/ccd" target"_blank" >Chemical Component</a></td>
    </tr>
    <tr>
      <td id="firstCCBox">
        <!-- PDBj -->
        <template is="dom-repeat" items="[[resultdata]]">
          <a href="http://pdbj.org/chemie/summary/[[item.pdbid]]" target="_blank">[[item.pdbid]]</a>
        </template>
      </td>
      <td id="secondCCBox">
				<!-- PDBe -->
        <template is="dom-repeat" items="[[resultdata]]">
					<a href="http://www.ebi.ac.uk/pdbe-srv/pdbechem/chemicalCompound/show/[[item.pdbid]]" target="_blank">[[item.pdbid]]</a>
        </template>
			</td>
      <td id="thirdCCBox">
				<!-- RCSB PDB -->
        <template is="dom-repeat" items="[[resultdata]]">
					<a href="http://www.rcsb.org/pdb/ligand/ligandsummary.do?hetId=[[item.pdbid]]" target="_blank">[[item.pdbid]]</a>
        </template>
			</td>
    </tr>
  </tr>
  <tfoot class="glyconavi_table_tfoot">
    <tr>
	    <td colspan="2"><small>from <a href="http://glyconavi.org" target="_blank">GlycoNAVI</a></small></td>
    </tr>
  </tfoot>
</table>
</div>
`;
  }
  constructor() {
    super();
  }
  static get properties() {
    return {
      resultdata: {
        notify: true,
        type: Object,
        value: function () {
          return new Object();
        }
      },
      iddata: {
        notify: true,
        type: Object,
        value: function () {
          return new Object();
        }
      }

    };
  }

  _handleAjaxPostResponse(e) {
    console.log(e);
  }
  _handleAjaxPostError(e) {
    console.log('error: ' + e);
  }
  retrieveId(query) {
    console.log(query);
    var params = query.split("=");

    return params[1];
  }

  ready() {
    super.ready();
    this.entryPDBJ();
  }

  entryPDBJ() {
    console.log("entryPDBJ");


    console.log(this.shadowRoot.getElementById('firstCCBox').style);
    this.shadowRoot.getElementById('firstCCBox').style.display = "";
    this.shadowRoot.getElementById('secondCCBox').style.display = "none";
    this.shadowRoot.getElementById('thirdCCBox').style.display = "none";
    this.shadowRoot.getElementById('pdbeRadio').checked = false;
    this.shadowRoot.getElementById('rcsbRadio').checked = false;
    this.shadowRoot.getElementById('pdbjRadio').checked = true;
  }


  entryPDBE() {
    console.log("entryPDBE");
    console.log(this.shadowRoot.getElementById('firstCCBox').style);
    this.shadowRoot.getElementById('firstCCBox').style.display = "none";
    this.shadowRoot.getElementById('secondCCBox').style.display = "";
    this.shadowRoot.getElementById('thirdCCBox').style.display = "none";
    this.shadowRoot.getElementById('pdbeRadio').checked = true;
    this.shadowRoot.getElementById('rcsbRadio').checked = false;
    this.shadowRoot.getElementById('pdbjRadio').checked = false;
  }

  entryRCSB() {
    console.log("entryRCSB");
    // var rcsbRadio  = this.shadowRoot.querySelectorAll('#rcsbRadio');
    // console.log(rcsbRadio);
    // var pdbeRadio = this.shadowRoot.querySelectorAll('#pdbeRadio');
    // console.log(pdbeRadio);
    // var pdbjRadio = this.shadowRoot.querySelectorAll('#pdbjRadio');
    // console.log(pdbjRadio);
    this.shadowRoot.getElementById('pdbeRadio').checked = false;
    this.shadowRoot.getElementById('rcsbRadio').checked = true;
    this.shadowRoot.getElementById('pdbjRadio').checked = false;

    console.log(this.shadowRoot.getElementById('firstCCBox'));
    console.log(this.shadowRoot.getElementById('firstCCBox').style);
    this.shadowRoot.getElementById('firstCCBox').style.display = "none";
    this.shadowRoot.getElementById('secondCCBox').style.display = "none";
    this.shadowRoot.getElementById('thirdCCBox').style.display = "";
  }
}

customElements.define('wc-carblink', GlyconaviCarbLink);